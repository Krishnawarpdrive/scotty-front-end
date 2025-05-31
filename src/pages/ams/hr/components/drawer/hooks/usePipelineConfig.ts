
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface PipelineData {
  id?: string;
  role_id: string;
  stages: Stage[];
  created_at?: string;
  updated_at?: string;
}

const defaultAvailableStages = [
  { id: 'phone', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'background', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude', name: 'Aptitude Test', category: 'internal' as const },
  { id: 'group', name: 'Group Discussion', category: 'internal' as const },
  { id: 'internal-interview', name: 'Internal Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'partner-interview', name: 'Partner Interview', category: 'partner' as const },
  { id: 'external-interview', name: 'External Interview', category: 'external' as const },
];

export const usePipelineConfig = (roleId?: string) => {
  const [pipelineStages, setPipelineStages] = useState<Stage[]>([]);
  const [availableStages] = useState(defaultAvailableStages);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pipelineId, setPipelineId] = useState<string | null>(null);

  // Load existing pipeline data
  useEffect(() => {
    if (roleId) {
      loadPipelineData();
    }
  }, [roleId]);

  const loadPipelineData = async () => {
    if (!roleId) return;

    try {
      setLoading(true);
      console.log('Loading pipeline data for role:', roleId);

      // Query the hiring_pipelines table directly
      const { data: existingPipeline, error } = await supabase
        .from('hiring_pipelines')
        .select('*')
        .eq('role_id', roleId)
        .maybeSingle();

      if (error) {
        console.error('Error loading pipeline:', error);
        setDefaultPipeline();
        return;
      }

      if (existingPipeline) {
        console.log('Found existing pipeline:', existingPipeline);
        setPipelineId(existingPipeline.id);
        // Parse the stages from JSONB with proper type handling
        const stages = Array.isArray(existingPipeline.stages) 
          ? (existingPipeline.stages as any[]).map((stage: any) => ({
              id: stage.id || `stage-${Date.now()}`,
              name: stage.name || 'Unnamed Stage',
              category: stage.category || 'internal',
              order: stage.order || 1,
              config: stage.config || {}
            } as Stage))
          : [];
        setPipelineStages(stages);
      } else {
        console.log('No existing pipeline found, setting defaults');
        setDefaultPipeline();
      }
    } catch (error) {
      console.error('Error in loadPipelineData:', error);
      setDefaultPipeline();
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPipeline = () => {
    const defaultStages: Stage[] = [
      { id: 'phone-default', name: 'Phone Screening', category: 'internal', order: 1 },
      { id: 'internal-interview-default', name: 'Internal Interview', category: 'internal', order: 2 },
    ];
    setPipelineStages(defaultStages);
  };

  const addStageToPipeline = (stage: any) => {
    const newStage: Stage = {
      id: `${stage.id}-${Date.now()}`,
      name: stage.name,
      category: stage.category,
      order: pipelineStages.length + 1,
    };
    setPipelineStages([...pipelineStages, newStage]);
  };

  const removeStageFromPipeline = (stageId: string) => {
    const filteredStages = pipelineStages.filter(stage => stage.id !== stageId);
    const reorderedStages = filteredStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    setPipelineStages(reorderedStages);
  };

  const reorderStages = (dragIndex: number, hoverIndex: number) => {
    const draggedStage = pipelineStages[dragIndex];
    const newStages = [...pipelineStages];
    newStages.splice(dragIndex, 1);
    newStages.splice(hoverIndex, 0, draggedStage);
    
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    
    setPipelineStages(reorderedStages);
  };

  const openStageConfig = (stage: Stage) => {
    setSelectedStage(stage);
    setConfigModalOpen(true);
  };

  const updateStageConfig = (stageId: string, config: any) => {
    setPipelineStages(stages =>
      stages.map(stage =>
        stage.id === stageId ? { ...stage, config } : stage
      )
    );
    setConfigModalOpen(false);
    setSelectedStage(null);
  };

  const handleSavePipeline = async () => {
    if (!roleId) {
      console.error('No role ID provided for saving pipeline');
      return;
    }

    try {
      console.log('Saving pipeline for role:', roleId);
      
      // Convert stages to plain objects for JSONB storage
      const stagesToSave = pipelineStages.map(stage => ({
        id: stage.id,
        name: stage.name,
        category: stage.category,
        order: stage.order,
        config: stage.config || {}
      }));
      
      if (pipelineId) {
        // Update existing pipeline
        const { error } = await supabase
          .from('hiring_pipelines')
          .update({ 
            stages: stagesToSave as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', pipelineId);

        if (error) throw error;
        console.log('Pipeline updated successfully');
      } else {
        // Create new pipeline
        const { data, error } = await supabase
          .from('hiring_pipelines')
          .insert({ 
            role_id: roleId, 
            stages: stagesToSave as any
          })
          .select()
          .single();

        if (error) throw error;
        setPipelineId(data.id);
        console.log('Pipeline created successfully');
      }

      // Handle template saving
      if (saveAsTemplate) {
        const { error: templateError } = await supabase
          .from('pipeline_templates')
          .insert({
            name: `${roleId}-pipeline-template`,
            stages: stagesToSave as any,
            created_from_role: roleId,
          });

        if (templateError) {
          console.error('Error saving template:', templateError);
        } else {
          console.log('Template saved successfully');
        }
      }

    } catch (error) {
      console.error('Error saving pipeline:', error);
    }
  };

  const handleCancel = () => {
    // Reset to last saved state
    if (roleId) {
      loadPipelineData();
    }
    setSaveAsTemplate(false);
    setApplyToAll(false);
  };

  return {
    pipelineStages,
    availableStages,
    selectedStage,
    configModalOpen,
    saveAsTemplate,
    applyToAll,
    loading,
    addStageToPipeline,
    removeStageFromPipeline,
    reorderStages,
    openStageConfig,
    updateStageConfig,
    handleSavePipeline,
    handleCancel,
    setSaveAsTemplate,
    setApplyToAll,
    setConfigModalOpen,
    setSelectedStage,
    refreshPipeline: loadPipelineData,
  };
};

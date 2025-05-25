
import { useState } from 'react';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
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

export const usePipelineConfig = () => {
  const [pipelineStages, setPipelineStages] = useState<Stage[]>([
    { id: 'phone', name: 'Phone Screening', category: 'internal', order: 1 },
    { id: 'internal-interview', name: 'Internal Interview', category: 'internal', order: 2 },
  ]);
  
  const [availableStages] = useState(defaultAvailableStages);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

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
    setPipelineStages(pipelineStages.filter(stage => stage.id !== stageId));
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

  const handleSavePipeline = () => {
    console.log('Saving pipeline:', { pipelineStages, saveAsTemplate, applyToAll });
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log('Cancelling pipeline configuration');
    // TODO: Implement cancel functionality
  };

  return {
    pipelineStages,
    availableStages,
    selectedStage,
    configModalOpen,
    saveAsTemplate,
    applyToAll,
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
  };
};


import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Divider, Button } from '@mui/material';
import { EnhancedStage, Interviewer } from './types/StageTypes';
import { StageConfigUnion } from './types/StageConfigTypes';
import AvailableStagesSection from './components/AvailableStagesSection';
import KanbanPipelineFlow from './KanbanPipelineFlow';
import StageConfigModal from './components/StageConfigModal';

// Available stages that can be added to the pipeline
const AVAILABLE_STAGES = [
  { id: 'phone-screening', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene-screening', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'technical-interview', name: 'Technical Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'background-verification', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude-test', name: 'Aptitude Test', category: 'external' as const },
  { id: 'vendor-interview', name: 'Vendor Interview', category: 'partner' as const },
];

// Helper function to convert stage config to proper format
const createStageConfig = (stageId: string, config?: any) => {
  const baseConfig = {
    stageType: stageId,
    notes: '',
    isConfigured: false,
  };

  // Return base config without stageType since StageConfig doesn't include it
  return {
    interviewFormat: config?.interviewFormat || 'one-to-one',
    interviewMode: config?.interviewMode || 'virtual',
    interviewers: config?.interviewers || [],
    notes: config?.notes || '',
    maxCandidatesPerRound: config?.maxCandidatesPerRound || 1,
    candidateInstructions: config?.candidateInstructions || '',
  };
};

const KanbanHiringPipelineConfig: React.FC = () => {
  const [selectedStages, setSelectedStages] = useState<EnhancedStage[]>([
    {
      id: 'phone-screening-1',
      name: 'Phone Screening',
      category: 'internal',
      order: 1,
      status: 'configured',
      interviewers: [],
      scheduling: {
        isScheduled: true,
        date: '2024-01-15',
        duration: 30,
        timeSlot: '10:00 AM',
      },
      config: createStageConfig('phone-screening'),
    },
    {
      id: 'technical-interview-1',
      name: 'Technical Interview',
      category: 'internal',
      order: 2,
      status: 'partially-configured',
      interviewers: [],
      scheduling: {
        isScheduled: false,
      },
      config: createStageConfig('technical-interview'),
    },
    {
      id: 'client-interview-1',
      name: 'Client Interview',
      category: 'client',
      order: 3,
      status: 'not-configured',
      interviewers: [],
      scheduling: {
        isScheduled: false,
      },
      config: createStageConfig('client-interview'),
    },
  ]);

  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<EnhancedStage | null>(null);

  const handleAddStage = useCallback((stageId: string) => {
    const stage = AVAILABLE_STAGES.find(s => s.id === stageId);
    if (!stage) return;

    const newStage: EnhancedStage = {
      ...stage,
      id: `${stageId}-${Date.now()}`,
      order: selectedStages.length + 1,
      status: 'not-configured',
      interviewers: [],
      scheduling: {
        isScheduled: false,
      },
      config: createStageConfig(stageId),
    };

    setSelectedStages(prev => [...prev, newStage]);
  }, [selectedStages.length]);

  const handleRemoveStage = useCallback((stageId: string) => {
    setSelectedStages(prev => prev.filter(stage => stage.id !== stageId));
  }, []);

  const handleReorderStages = useCallback((dragIndex: number, hoverIndex: number) => {
    setSelectedStages(prev => {
      const newStages = [...prev];
      const draggedStage = newStages[dragIndex];
      newStages.splice(dragIndex, 1);
      newStages.splice(hoverIndex, 0, draggedStage);
      
      return newStages.map((stage, index) => ({
        ...stage,
        order: index + 1,
      }));
    });
  }, []);

  const handleConfigureStage = useCallback((stage: EnhancedStage) => {
    setCurrentStage(stage);
    setConfigModalOpen(true);
  }, []);

  const handleSaveStageConfig = useCallback((config: StageConfigUnion) => {
    if (!currentStage) return;

    setSelectedStages(prev => prev.map(stage => {
      if (stage.id === currentStage.id) {
        const updatedStage: EnhancedStage = {
          ...stage,
          status: 'configured',
        };

        // Convert config to StageConfig format
        if ('interviewType' in config) {
          updatedStage.config = {
            interviewFormat: config.interviewType === 'one-on-one' ? 'one-to-one' : 
                           config.interviewType === 'panel' ? 'panel' : 'group',
            interviewMode: config.mode,
            interviewers: config.interviewers?.map((name: string): Interviewer => ({
              id: `interviewer-${Date.now()}-${Math.random()}`,
              name,
              email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
            })) || [],
            notes: config.notes || '',
          };
        } else {
          updatedStage.config = createStageConfig(stage.id, config);
        }

        return updatedStage;
      }
      return stage;
    }));

    setConfigModalOpen(false);
    setCurrentStage(null);
  }, [currentStage]);

  const handleCloseConfigModal = useCallback(() => {
    setConfigModalOpen(false);
    setCurrentStage(null);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Rubik, sans-serif' }}>
          Kanban Pipeline Configuration
        </Typography>

        <AvailableStagesSection
          availableStages={AVAILABLE_STAGES}
          onAddStage={handleAddStage}
        />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              mb: 2,
            }}
          >
            Hiring Pipeline ({selectedStages.length} stages)
          </Typography>
          <KanbanPipelineFlow
            stages={selectedStages}
            onRemoveStage={handleRemoveStage}
            onReorderStages={handleReorderStages}
            onConfigureStage={handleConfigureStage}
          />
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save Pipeline</Button>
        </Box>

        <StageConfigModal
          open={configModalOpen}
          stage={currentStage}
          onClose={handleCloseConfigModal}
          onSave={handleSaveStageConfig}
        />
      </Box>
    </DndProvider>
  );
};

export default KanbanHiringPipelineConfig;

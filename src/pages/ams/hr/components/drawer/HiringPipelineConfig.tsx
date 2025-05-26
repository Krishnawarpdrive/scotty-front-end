
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Divider, Button } from '@mui/material';
import { EnhancedStage } from './types/StageTypes';
import AvailableStagesSection from './components/AvailableStagesSection';
import PipelineFlowSection from './components/PipelineFlowSection';
import StageConfigModal from './components/StageConfigModal';
import { StageConfigUnion } from './types/StageConfigTypes';

// Predefined stages
const AVAILABLE_STAGES = [
  { id: 'phone-screening', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene-screening', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'technical-interview', name: 'Technical Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'background-verification', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude-test', name: 'Aptitude Test', category: 'external' as const },
  { id: 'vendor-interview', name: 'Vendor Interview', category: 'partner' as const },
];

const HiringPipelineConfig: React.FC = () => {
  const [selectedStages, setSelectedStages] = useState<EnhancedStage[]>([]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<EnhancedStage | null>(null);

  // Convert Stage to EnhancedStage when adding to pipeline
  const handleAddStage = useCallback((stageId: string) => {
    const stage = AVAILABLE_STAGES.find(s => s.id === stageId);
    if (!stage) return;

    const enhancedStage: EnhancedStage = {
      ...stage,
      order: selectedStages.length + 1,
      status: 'not-configured',
      interviewers: [],
      scheduling: {
        isScheduled: false,
      },
      config: undefined,
    };

    setSelectedStages(prev => [...prev, enhancedStage]);
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
      
      // Update order numbers
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
        return {
          ...stage,
          config,
          status: 'configured',
        };
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
        <Typography variant="h5" sx={{ mb: 3 }}>
          Hiring Pipeline Configuration
        </Typography>

        <AvailableStagesSection
          availableStages={AVAILABLE_STAGES}
          onAddStage={handleAddStage}
        />

        <Divider sx={{ my: 3 }} />

        <PipelineFlowSection
          stages={selectedStages}
          onRemoveStage={handleRemoveStage}
          onReorderStages={handleReorderStages}
          onConfigureStage={handleConfigureStage}
        />

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

export default HiringPipelineConfig;

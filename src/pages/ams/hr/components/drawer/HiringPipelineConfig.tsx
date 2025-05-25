
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StageScroller from './StageScroller';
import PipelineFlow from './PipelineFlow';
import StageConfigModal from './StageConfigModal';

interface Stage {
  id: string;
  name: string;
  type: 'internal' | 'external';
  order: number;
  config?: any;
}

interface HiringPipelineConfigProps {
  roleData: any;
}

const defaultAvailableStages = [
  { id: 'phone', name: 'Phone Screening', type: 'internal' as const },
  { id: 'hygiene', name: 'Hygiene Screening', type: 'internal' as const },
  { id: 'background', name: 'Background Verification', type: 'external' as const },
  { id: 'aptitude', name: 'Aptitude Test', type: 'internal' as const },
  { id: 'group', name: 'Group Discussion', type: 'internal' as const },
  { id: 'internal-interview', name: 'Internal Interview', type: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', type: 'external' as const },
  { id: 'partner-interview', name: 'Partner Interview', type: 'external' as const },
  { id: 'technical', name: 'Technical Round', type: 'internal' as const },
  { id: 'hr-round', name: 'HR Round', type: 'internal' as const },
];

const HiringPipelineConfig: React.FC<HiringPipelineConfigProps> = ({ roleData }) => {
  const [pipelineStages, setPipelineStages] = useState<Stage[]>([
    { id: 'phone', name: 'Phone Screening', type: 'internal', order: 1 },
    { id: 'technical', name: 'Technical Round', type: 'internal', order: 2 },
  ]);
  
  const [availableStages] = useState(defaultAvailableStages);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const addStageToPipeline = (stage: any) => {
    const newStage: Stage = {
      id: `${stage.id}-${Date.now()}`,
      name: stage.name,
      type: stage.type,
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
    
    // Update order numbers
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    
    setPipelineStages(reorderedStages);
  };

  const toggleStageType = (stageId: string) => {
    setPipelineStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? { ...stage, type: stage.type === 'internal' ? 'external' : 'internal' }
          : stage
      )
    );
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

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#262626',
            mb: 2,
          }}
        >
          Configure Hiring Pipeline for {roleData?.name}
        </Typography>

        {/* Available Stages Scroller */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              mb: 1,
            }}
          >
            Available Stages
          </Typography>
          <StageScroller
            stages={availableStages}
            onAddStage={addStageToPipeline}
          />
        </Box>

        {/* Pipeline Flow */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              mb: 1,
            }}
          >
            Current Pipeline ({pipelineStages.length} stages)
          </Typography>
          <PipelineFlow
            stages={pipelineStages}
            onRemoveStage={removeStageFromPipeline}
            onReorderStages={reorderStages}
            onToggleStageType={toggleStageType}
            onConfigureStage={openStageConfig}
          />
        </Box>

        {/* Stage Configuration Modal */}
        <StageConfigModal
          open={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          stage={selectedStage}
          onSave={updateStageConfig}
        />
      </Box>
    </DndProvider>
  );
};

export default HiringPipelineConfig;


import React from 'react';
import { Box, Typography } from '@mui/material';
import EnhancedPipelineFlow from '../EnhancedPipelineFlow';
import { EnhancedStage } from '../types/StageTypes';

interface PipelineFlowSectionProps {
  stages: EnhancedStage[];
  onRemoveStage: (stageId: string) => void;
  onReorderStages: (dragIndex: number, hoverIndex: number) => void;
  onConfigureStage: (stage: EnhancedStage) => void;
  onEditStage?: (stage: EnhancedStage) => void;
  onDuplicateStage?: (stage: EnhancedStage) => void;
  onViewStage?: (stage: EnhancedStage) => void;
}

const PipelineFlowSection: React.FC<PipelineFlowSectionProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onConfigureStage,
  onEditStage,
  onDuplicateStage,
  onViewStage,
}) => {
  return (
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
        Hiring Pipeline ({stages.length} stages)
      </Typography>
      <EnhancedPipelineFlow
        stages={stages}
        onRemoveStage={onRemoveStage}
        onReorderStages={onReorderStages}
        onConfigureStage={onConfigureStage}
        onEditStage={onEditStage}
        onDuplicateStage={onDuplicateStage}
        onViewStage={onViewStage}
      />
    </Box>
  );
};

export default PipelineFlowSection;

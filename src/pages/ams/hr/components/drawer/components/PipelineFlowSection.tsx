
import React from 'react';
import { Box, Typography } from '@mui/material';
import PipelineFlow from '../PipelineFlow';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface PipelineFlowSectionProps {
  stages: Stage[];
  onRemoveStage: (stageId: string) => void;
  onReorderStages: (dragIndex: number, hoverIndex: number) => void;
  onConfigureStage: (stage: Stage) => void;
}

const PipelineFlowSection: React.FC<PipelineFlowSectionProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onConfigureStage,
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
      <PipelineFlow
        stages={stages}
        onRemoveStage={onRemoveStage}
        onReorderStages={onReorderStages}
        onConfigureStage={onConfigureStage}
      />
    </Box>
  );
};

export default PipelineFlowSection;

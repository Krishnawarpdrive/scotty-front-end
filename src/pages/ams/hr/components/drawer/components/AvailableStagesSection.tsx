
import React from 'react';
import { Box, Typography } from '@mui/material';
import StageScroller from '../StageScroller';

interface AvailableStage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
}

interface AvailableStagesSectionProps {
  availableStages: AvailableStage[];
  onAddStage: (stageId: string) => void;
}

const AvailableStagesSection: React.FC<AvailableStagesSectionProps> = ({
  availableStages,
  onAddStage,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          color: '#666',
          mb: 2,
        }}
      >
        Available Stage Types
      </Typography>
      <StageScroller
        stages={availableStages}
        onAddStage={onAddStage}
      />
    </Box>
  );
};

export default AvailableStagesSection;

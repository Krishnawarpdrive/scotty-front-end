import React from 'react';
import { Box, Typography } from '@mui/material';
import StageScroller from '../StageScroller';
interface AvailableStage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
}
interface AvailableStagesSectionProps {
  stages: AvailableStage[];
  onAddStage: (stage: any) => void;
}
const AvailableStagesSection: React.FC<AvailableStagesSectionProps> = ({
  stages,
  onAddStage
}) => {
  return <Box sx={{
    mb: 4
  }}>
      <Typography variant="subtitle2" sx={{
      fontFamily: 'Rubik, sans-serif',
      fontSize: '13px',
      color: '#666',
      mb: 2
    }}>j</Typography>
      <StageScroller stages={stages} onAddStage={onAddStage} />
    </Box>;
};
export default AvailableStagesSection;
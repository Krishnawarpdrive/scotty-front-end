
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../../MyInterviewsPage';
import { PhoneScreeningStage } from './stages/PhoneScreeningStage';
import { TechnicalScreeningStage } from './stages/TechnicalScreeningStage';
import { ClientScreeningStage } from './stages/ClientScreeningStage';

interface InterviewerPipelineStageRendererProps {
  interview: Interview;
  activeStage: string;
}

export const InterviewerPipelineStageRenderer: React.FC<InterviewerPipelineStageRendererProps> = ({
  interview,
  activeStage
}) => {
  const renderStage = () => {
    switch (activeStage) {
      case 'phone-screening':
        return <PhoneScreeningStage interview={interview} />;
      case 'technical-screening':
        return <TechnicalScreeningStage interview={interview} />;
      case 'client-screening':
        return <ClientScreeningStage interview={interview} />;
      default:
        return <TechnicalScreeningStage interview={interview} />;
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', fontFamily: 'Rubik, sans-serif' }}>
      {renderStage()}
    </Box>
  );
};

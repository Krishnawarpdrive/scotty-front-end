
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../MyInterviewsPage';
import { InterviewDetailsForm } from './forms/InterviewDetailsForm';
import { CandidateProfileForm } from './forms/CandidateProfileForm';
import { InterviewFeedbackForm } from './forms/InterviewFeedbackForm';
import { InterviewNotesForm } from './forms/InterviewNotesForm';
import { InterviewHistoryForm } from './forms/InterviewHistoryForm';
import { DocumentsForm } from './forms/DocumentsForm';

interface InterviewerStageFormRendererProps {
  interview: Interview;
  stageId: string;
  stageName: string;
}

export const InterviewerStageFormRenderer: React.FC<InterviewerStageFormRendererProps> = ({
  interview,
  stageId,
  stageName
}) => {
  const renderForm = () => {
    switch (stageId) {
      case 'interview-details':
        return <InterviewDetailsForm interview={interview} />;
      case 'candidate-profile':
        return <CandidateProfileForm interview={interview} />;
      case 'interview-feedback':
        return <InterviewFeedbackForm interview={interview} />;
      case 'interview-notes':
        return <InterviewNotesForm interview={interview} />;
      case 'interview-history':
        return <InterviewHistoryForm interview={interview} />;
      case 'documents':
        return <DocumentsForm interview={interview} />;
      default:
        return <InterviewDetailsForm interview={interview} />;
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', fontFamily: 'Rubik, sans-serif' }}>
      {renderForm()}
    </Box>
  );
};

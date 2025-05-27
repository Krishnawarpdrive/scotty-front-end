
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Candidate } from '../../types/CandidateTypes';
import { OverallAssessmentSection } from './sections/OverallAssessmentSection';
import { OfferDetailsSection } from './sections/OfferDetailsSection';
import { ApprovalsSection } from './sections/ApprovalsSection';
import { FinalNotesSection } from './sections/FinalNotesSection';
import { FinalReviewActions } from './sections/FinalReviewActions';

interface FinalReviewFormProps {
  candidate: Candidate;
}

export const FinalReviewForm: React.FC<FinalReviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    overallRating: 0,
    finalDecision: 'pending',
    salaryOffered: '',
    joiningDate: '',
    offerSent: false,
    offerAccepted: false,
    finalNotes: '',
    hrApproval: false,
    clientApproval: false,
    contractSigned: false
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Final Review & Decision
      </Typography>

      <OverallAssessmentSection
        formData={{
          overallRating: formData.overallRating,
          finalDecision: formData.finalDecision
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3 }} />

      <OfferDetailsSection
        formData={{
          salaryOffered: formData.salaryOffered,
          joiningDate: formData.joiningDate,
          offerSent: formData.offerSent,
          offerAccepted: formData.offerAccepted
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3 }} />

      <ApprovalsSection
        formData={{
          hrApproval: formData.hrApproval,
          clientApproval: formData.clientApproval,
          contractSigned: formData.contractSigned
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3 }} />

      <FinalNotesSection
        formData={{
          finalNotes: formData.finalNotes
        }}
        onFieldChange={handleFieldChange}
      />

      <FinalReviewActions />
    </Box>
  );
};


import React from 'react';
import { EnhancedCandidateDetailDrawer as HRCandidateDetailDrawer } from '@/pages/ams/hr/components/candidate-pool/EnhancedCandidateDetailDrawer';

interface TAEnhancedCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidate: any;
}

export const EnhancedCandidateDetailDrawer: React.FC<TAEnhancedCandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidate
}) => {
  return (
    <HRCandidateDetailDrawer
      open={open}
      onClose={onClose}
      candidateId={candidate?.id || null}
      userRole="ta"
    />
  );
};


import React from 'react';
import { MultiPipelineCandidateDetailDrawer } from './MultiPipelineCandidateDetailDrawer';

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
    <MultiPipelineCandidateDetailDrawer
      open={open}
      onClose={onClose}
      candidateId={candidate?.id || null}
    />
  );
};

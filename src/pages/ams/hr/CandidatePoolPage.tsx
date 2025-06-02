
import React from 'react';
import { CandidatePoolContent } from './components/candidate-pool/CandidatePoolContent';
import { CandidateDetailDrawer } from './components/candidate-pool/CandidateDetailDrawer';
import { useCandidateDetailDrawer } from './components/candidate-pool/useCandidateDetailDrawer';

const CandidatePoolPage: React.FC = () => {
  const { isOpen, candidateId, selectedCandidate, openDrawer, closeDrawer } = useCandidateDetailDrawer();

  return (
    <>
      <CandidatePoolContent onCandidateClick={openDrawer} />
      <CandidateDetailDrawer
        open={isOpen}
        onClose={closeDrawer}
        candidateId={candidateId}
      />
    </>
  );
};

export default CandidatePoolPage;

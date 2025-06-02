
import { useState } from 'react';
import { Candidate } from './types';

export interface CandidateDetailDrawerState {
  isOpen: boolean;
  candidateId: string | null;
  selectedCandidate: Candidate | null;
}

export const useCandidateDetailDrawer = () => {
  const [state, setState] = useState<CandidateDetailDrawerState>({
    isOpen: false,
    candidateId: null,
    selectedCandidate: null
  });

  const openDrawer = (candidate: Candidate) => {
    console.log('Opening candidate detail drawer for:', candidate.id);
    setState({
      isOpen: true,
      candidateId: candidate.id,
      selectedCandidate: candidate
    });
  };

  const closeDrawer = () => {
    console.log('Closing candidate detail drawer');
    setState({
      isOpen: false,
      candidateId: null,
      selectedCandidate: null
    });
  };

  return {
    isOpen: state.isOpen,
    candidateId: state.candidateId,
    selectedCandidate: state.selectedCandidate,
    drawerOpen: state.isOpen,
    handleCandidateClick: openDrawer,
    handleCloseDrawer: closeDrawer,
    openDrawer,
    closeDrawer
  };
};


import { useState } from 'react';
import { Candidate } from './types';

export interface CandidateDetailDrawerState {
  isOpen: boolean;
  candidateId: string | null;
  selectedCandidate: Candidate | null;
  useEnhancedDrawer: boolean;
}

export const useCandidateDetailDrawer = () => {
  const [state, setState] = useState<CandidateDetailDrawerState>({
    isOpen: false,
    candidateId: null,
    selectedCandidate: null,
    useEnhancedDrawer: true // Enable the enhanced drawer by default
  });

  const openDrawer = (candidate: Candidate, useEnhanced = true) => {
    console.log('Opening enhanced candidate detail drawer for:', candidate.id);
    setState({
      isOpen: true,
      candidateId: candidate.id,
      selectedCandidate: candidate,
      useEnhancedDrawer: useEnhanced
    });
  };

  const closeDrawer = () => {
    console.log('Closing enhanced candidate detail drawer');
    setState({
      isOpen: false,
      candidateId: null,
      selectedCandidate: null,
      useEnhancedDrawer: true
    });
  };

  const openEnhancedDrawer = (candidate: Candidate) => {
    openDrawer(candidate, true);
  };

  const openLegacyDrawer = (candidate: Candidate) => {
    openDrawer(candidate, false);
  };

  return {
    isOpen: state.isOpen,
    candidateId: state.candidateId,
    selectedCandidate: state.selectedCandidate,
    useEnhancedDrawer: state.useEnhancedDrawer,
    drawerOpen: state.isOpen,
    handleCandidateClick: openEnhancedDrawer,
    handleCloseDrawer: closeDrawer,
    openDrawer: openEnhancedDrawer,
    openEnhancedDrawer,
    openLegacyDrawer,
    closeDrawer
  };
};

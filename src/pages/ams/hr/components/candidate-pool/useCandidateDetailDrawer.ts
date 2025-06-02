
import { useState } from 'react';

export interface CandidateDetailDrawerState {
  isOpen: boolean;
  candidateId: string | null;
}

export const useCandidateDetailDrawer = () => {
  const [state, setState] = useState<CandidateDetailDrawerState>({
    isOpen: false,
    candidateId: null
  });

  const openDrawer = (candidateId: string) => {
    console.log('Opening candidate detail drawer for:', candidateId);
    setState({
      isOpen: true,
      candidateId
    });
  };

  const closeDrawer = () => {
    console.log('Closing candidate detail drawer');
    setState({
      isOpen: false,
      candidateId: null
    });
  };

  return {
    isOpen: state.isOpen,
    candidateId: state.candidateId,
    openDrawer,
    closeDrawer
  };
};

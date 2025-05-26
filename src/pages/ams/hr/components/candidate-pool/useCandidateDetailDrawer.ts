
import { useState } from 'react';
import { Candidate } from './CandidateTable';

export const useCandidateDetailDrawer = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCandidate(null);
  };

  return {
    selectedCandidate,
    drawerOpen,
    handleCandidateClick,
    handleCloseDrawer,
  };
};

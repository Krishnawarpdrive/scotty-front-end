
import React, { useState } from 'react';
import { EnhancedTAMissionControl } from './enhanced/EnhancedTAMissionControl';
import { EnhancedCandidateDetailDrawer } from './candidate-detail/EnhancedCandidateDetailDrawer';

export const MissionControl: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCandidateSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <>
      <EnhancedTAMissionControl onCandidateSelect={handleCandidateSelect} />
      
      <EnhancedCandidateDetailDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        candidate={selectedCandidate}
      />
    </>
  );
};

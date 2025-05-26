
import React from 'react';

interface CandidatePoolActionsProps {
  onExport: () => void;
  onImport: () => void;
  onAddCandidate: () => void;
}

export const CandidatePoolActions: React.FC<CandidatePoolActionsProps> = ({
  onExport,
  onImport,
  onAddCandidate,
}) => {
  const handleExport = () => {
    console.log('Exporting candidates...');
    onExport();
  };

  const handleImport = () => {
    console.log('Importing candidates...');
    onImport();
  };

  const handleAddCandidate = () => {
    console.log('Adding new candidate...');
    onAddCandidate();
  };

  return {
    handleExport,
    handleImport,
    handleAddCandidate,
  };
};


import React from 'react';

interface CandidatePoolActionsProps {
  onExport: () => void;
  onImport: () => void;
  onAddCandidate: () => void;
}

export const useCandidatePoolActions = ({ onExport, onImport, onAddCandidate }: CandidatePoolActionsProps) => {
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

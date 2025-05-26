
import { useState } from 'react';
import { Candidate } from '../CandidateTable';

export const useCandidateSelection = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleCandidateSelect = (candidateId: string, selected: boolean) => {
    setSelectedCandidates(prev => 
      selected 
        ? [...prev, candidateId]
        : prev.filter(id => id !== candidateId)
    );
  };

  const handleSelectAll = (candidates: Candidate[], selected: boolean) => {
    setSelectedCandidates(selected ? candidates.map(c => c.id) : []);
  };

  const clearSelection = () => {
    setSelectedCandidates([]);
  };

  return {
    selectedCandidates,
    setSelectedCandidates,
    handleCandidateSelect,
    handleSelectAll,
    clearSelection
  };
};

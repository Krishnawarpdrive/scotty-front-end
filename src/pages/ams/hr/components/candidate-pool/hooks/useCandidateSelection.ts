
import { useState, useCallback } from 'react';
import { Candidate } from '../CandidateTable';

export const useCandidateSelection = (candidates: Candidate[] = []) => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleCandidateSelect = useCallback((candidateId: string, selected: boolean) => {
    setSelectedCandidates(prev => {
      if (selected) {
        return [...prev, candidateId];
      } else {
        return prev.filter(id => id !== candidateId);
      }
    });
  }, []);

  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      setSelectedCandidates(candidates.map(c => c.id));
    } else {
      setSelectedCandidates([]);
    }
  }, [candidates]);

  return {
    selectedCandidates,
    handleCandidateSelect,
    handleSelectAll,
    setSelectedCandidates
  };
};

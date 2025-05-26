
import { useState } from 'react';
import { useCandidateData } from './hooks/useCandidateData';
import { useCandidateSelection } from './hooks/useCandidateSelection';
import { useCandidateFilters } from './hooks/useCandidateFilters';
import { useCandidateMetrics } from './hooks/useCandidateMetrics';
import { useCandidateActions } from './hooks/useCandidateActions';

export const useCandidatePool = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize all sub-hooks
  const {
    showFilters,
    setShowFilters,
    filters,
    activeFilterCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  } = useCandidateFilters();

  const {
    allCandidates,
    filteredCandidates,
    totalCandidates
  } = useCandidateData(searchTerm, filters);

  const {
    selectedCandidates,
    setSelectedCandidates,
    handleCandidateSelect,
    handleSelectAll,
    clearSelection
  } = useCandidateSelection();

  const { metrics } = useCandidateMetrics(allCandidates);

  const { handleBulkAction, handleQuickAction } = useCandidateActions();

  // Wrapper for handleSelectAll to pass filtered candidates
  const handleSelectAllWrapper = (selected: boolean) => {
    handleSelectAll(filteredCandidates, selected);
  };

  return {
    // Data
    candidates: filteredCandidates,
    totalCandidates,
    metrics,
    
    // UI State
    searchTerm,
    selectedCandidates,
    showFilters,
    filters,
    activeFilterCount,
    
    // Handlers
    setSearchTerm,
    setShowFilters,
    handleCandidateSelect,
    handleSelectAll: handleSelectAllWrapper,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters,
    handleBulkAction,
    handleQuickAction,
    setSelectedCandidates
  };
};

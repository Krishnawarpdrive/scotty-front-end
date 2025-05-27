
import { useState } from 'react';
import { useCandidateData } from './hooks/useCandidateData';
import { useCandidateSelection } from './hooks/useCandidateSelection';
import { useCandidateFilters } from './hooks/useCandidateFilters';
import { useCandidateMetrics } from './hooks/useCandidateMetrics';
import { useCandidateActions } from './hooks/useCandidateActions';

export const useCandidatePool = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get candidate data first
  const {
    allCandidates,
    filteredCandidates: baseCandidates,
    totalCandidates
  } = useCandidateData();

  // Initialize filters with candidates and search term
  const {
    showFilters,
    setShowFilters,
    filters,
    filteredCandidates,
    activeFilterCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  } = useCandidateFilters(allCandidates, searchTerm);

  // Initialize selection with filtered candidates
  const {
    selectedCandidates,
    setSelectedCandidates,
    handleCandidateSelect,
    handleSelectAll
  } = useCandidateSelection(filteredCandidates);

  const { metrics } = useCandidateMetrics(allCandidates);

  const { handleBulkAction, handleQuickAction } = useCandidateActions();

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
    handleSelectAll,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters,
    handleBulkAction,
    handleQuickAction,
    setSelectedCandidates
  };
};

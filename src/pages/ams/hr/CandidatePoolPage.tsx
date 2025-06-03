
import React from 'react';
import { CandidatePoolContent } from './components/candidate-pool/CandidatePoolContent';
import { useCandidatePool } from './components/candidate-pool/useCandidatePool';

const CandidatePoolPage: React.FC = () => {
  const {
    candidates,
    metrics,
    searchTerm,
    selectedCandidates,
    showFilters,
    activeFilterCount,
    setSearchTerm,
    setShowFilters,
    handleCandidateSelect,
    handleSelectAll,
    handleQuickAction,
    setSelectedCandidates
  } = useCandidatePool();

  return (
    <CandidatePoolContent
      candidates={candidates}
      selectedCandidates={selectedCandidates}
      showFilters={showFilters}
      searchTerm={searchTerm}
      metrics={metrics}
      activeFilterCount={activeFilterCount}
      onCandidateSelect={handleCandidateSelect}
      onSelectAll={handleSelectAll}
      onQuickAction={handleQuickAction}
      setSearchTerm={setSearchTerm}
      setShowFilters={setShowFilters}
      setSelectedCandidates={setSelectedCandidates}
    />
  );
};

export default CandidatePoolPage;

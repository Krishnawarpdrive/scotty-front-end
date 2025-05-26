
import React from 'react';
import { CandidatePoolHeader } from './candidate-pool/CandidatePoolHeader';
import { CandidateMetrics } from './candidate-pool/CandidateMetrics';
import { CandidatePoolContent } from './candidate-pool/CandidatePoolContent';
import { useCandidatePool } from './candidate-pool/useCandidatePool';
import { useCandidateDetailDrawer } from './candidate-pool/useCandidateDetailDrawer';
import { useCandidatePoolHeaderActions } from './candidate-pool/CandidatePoolHeaderActions';
import CandidateDetailDrawer from './drawer/CandidateDetailDrawer';

export const CandidatePoolPage: React.FC = () => {
  const {
    selectedCandidate,
    drawerOpen,
    handleCandidateClick,
    handleCloseDrawer,
  } = useCandidateDetailDrawer();

  const {
    handleAdvancedFilters,
    handleExport,
    handleImport,
    handleAddCandidate,
  } = useCandidatePoolHeaderActions();

  const {
    candidates,
    totalCandidates,
    metrics,
    searchTerm,
    selectedCandidates,
    showFilters,
    filters,
    activeFilterCount,
    setSearchTerm,
    setShowFilters,
    handleCandidateSelect,
    handleSelectAll,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters,
    handleBulkAction,
    handleQuickAction,
    setSelectedCandidates,
  } = useCandidatePool();

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <CandidatePoolHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCandidates={totalCandidates}
        filteredCount={candidates.length}
        activeFilters={activeFilterCount}
        onAdvancedFilters={() => handleAdvancedFilters(showFilters, setShowFilters)}
        onExport={handleExport}
        onImport={handleImport}
        onAddCandidate={handleAddCandidate}
      />

      <CandidateMetrics metrics={metrics} />

      <CandidatePoolContent
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        showFilters={showFilters}
        filters={filters}
        onCandidateSelect={handleCandidateSelect}
        onSelectAll={handleSelectAll}
        onCandidateClick={handleCandidateClick}
        onQuickAction={handleQuickAction}
        onFilterChange={handleFilterChange}
        onClearFilter={handleClearFilter}
        onClearAllFilters={handleClearAllFilters}
        onBulkAction={handleBulkAction}
        setSelectedCandidates={setSelectedCandidates}
      />

      <CandidateDetailDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        candidateData={selectedCandidate}
      />
    </div>
  );
};

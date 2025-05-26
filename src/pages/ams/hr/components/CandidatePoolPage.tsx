
import React, { useState } from 'react';
import { CandidatePoolHeader } from './candidate-pool/CandidatePoolHeader';
import { CandidateMetrics } from './candidate-pool/CandidateMetrics';
import { CandidateFilters } from './candidate-pool/CandidateFilters';
import { BulkActions } from './candidate-pool/BulkActions';
import { CandidateTable, Candidate } from './candidate-pool/CandidateTable';
import { useCandidatePool } from './candidate-pool/useCandidatePool';
import CandidateDetailDrawer from './drawer/CandidateDetailDrawer';

export const CandidatePoolPage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCandidate(null);
  };

  const handleAdvancedFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleExport = () => {
    console.log('Exporting candidates...');
    // Implement export logic
  };

  const handleImport = () => {
    console.log('Importing candidates...');
    // Implement import logic
  };

  const handleAddCandidate = () => {
    console.log('Adding new candidate...');
    // Implement add candidate logic
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <CandidatePoolHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCandidates={totalCandidates}
        filteredCount={candidates.length}
        activeFilters={activeFilterCount}
        onAdvancedFilters={handleAdvancedFilters}
        onExport={handleExport}
        onImport={handleImport}
        onAddCandidate={handleAddCandidate}
      />

      <CandidateMetrics metrics={metrics} />

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {showFilters && (
            <CandidateFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
              onClearAll={handleClearAllFilters}
            />
          )}

          <BulkActions
            selectedCount={selectedCandidates.length}
            onAction={handleBulkAction}
            onClearSelection={() => setSelectedCandidates([])}
          />

          <CandidateTable
            candidates={candidates}
            selectedCandidates={selectedCandidates}
            onCandidateSelect={handleCandidateSelect}
            onSelectAll={handleSelectAll}
            onCandidateClick={handleCandidateClick}
            onQuickAction={handleQuickAction}
          />
        </div>
      </div>

      <CandidateDetailDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        candidateData={selectedCandidate}
      />
    </div>
  );
};

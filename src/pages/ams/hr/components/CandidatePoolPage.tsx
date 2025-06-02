
import React, { useState, useEffect } from 'react';
import { CandidateMetrics } from './candidate-pool/CandidateMetrics';
import { CandidatePoolHeader } from './candidate-pool/CandidatePoolHeader';
import { CandidatePoolContent } from './candidate-pool/CandidatePoolContent';
import CandidateDetailDrawer from './drawer/CandidateDetailDrawer';
import { useCandidateData } from './candidate-pool/hooks/useCandidateData';
import { useCandidateFilters } from './candidate-pool/hooks/useCandidateFilters';
import { useCandidateSelection } from './candidate-pool/hooks/useCandidateSelection';
import { useCandidateActions } from './candidate-pool/hooks/useCandidateActions';
import { useCandidateMetrics } from './candidate-pool/hooks/useCandidateMetrics';
import { useCandidateDetailDrawer } from './candidate-pool/useCandidateDetailDrawer';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useCandidatePoolShortcuts } from '@/hooks/useCandidatePoolShortcuts';
import { Candidate } from './candidate-pool/CandidateTable';

export const CandidatePoolPage: React.FC = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  
  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('candidate-pool');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { allCandidates, filteredCandidates, totalCandidates } = useCandidateData();
  const { 
    showFilters: filtersVisible,
    setShowFilters: setFiltersVisible,
    filters, 
    activeFilterCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters 
  } = useCandidateFilters();
  
  const {
    selectedCandidates,
    handleCandidateSelect,
    handleSelectAll,
    setSelectedCandidates
  } = useCandidateSelection();

  const { handleBulkAction, handleQuickAction } = useCandidateActions();
  const { metrics } = useCandidateMetrics(allCandidates);
  const {
    selectedCandidate,
    drawerOpen,
    handleCandidateClick,
    handleCloseDrawer
  } = useCandidateDetailDrawer();

  const handleAddCandidate = () => {
    console.log('Adding new candidate...');
    // Implementation for adding candidate
  };

  const handleAdvancedFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleExport = () => {
    console.log('Exporting candidates...');
    // Implementation for export
  };

  const handleImport = () => {
    console.log('Importing candidates...');
    // Implementation for import
  };

  // Create wrapper functions to match expected signatures
  const handleSelectAllWrapper = () => {
    handleSelectAll(true);
  };

  const handleQuickActionWrapper = (action: string, candidateIds: string[]) => {
    // Handle the array of candidateIds appropriately
    candidateIds.forEach(candidateId => {
      handleQuickAction(action, candidateId);
    });
  };

  // Register candidate pool specific shortcuts
  useCandidatePoolShortcuts({
    onAddCandidate: handleAddCandidate,
    onAdvancedFilters: handleAdvancedFilters,
    onExport: handleExport,
    onImport: handleImport
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <CandidateMetrics metrics={metrics} />

      <CandidatePoolHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCandidates={totalCandidates}
        filteredCount={filteredCandidates.length}
        activeFilters={activeFilterCount}
        onAdvancedFilters={handleAdvancedFilters}
        onExport={handleExport}
        onImport={handleImport}
        onAddCandidate={handleAddCandidate}
      />

      <CandidatePoolContent
        candidates={filteredCandidates}
        selectedCandidates={selectedCandidates}
        showFilters={showFilters}
        filters={filters}
        onCandidateSelect={handleCandidateSelect}
        onSelectAll={handleSelectAllWrapper}
        onCandidateClick={handleCandidateClick}
        onQuickAction={handleQuickActionWrapper}
        onFilterChange={handleFilterChange}
        onClearFilter={handleClearFilter}
        onClearAllFilters={handleClearAllFilters}
        onBulkAction={handleBulkAction}
        setSelectedCandidates={setSelectedCandidates}
      />

      <CandidateDetailDrawer
        candidateData={selectedCandidate}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

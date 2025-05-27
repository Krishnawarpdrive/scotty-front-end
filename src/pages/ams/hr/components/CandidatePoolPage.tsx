
import React, { useState, useEffect } from 'react';
import { CandidateMetrics } from './CandidateMetrics';
import { CandidatePoolHeader } from './CandidatePoolHeader';
import { CandidatePoolContent } from './CandidatePoolContent';
import { CandidateDetailDrawer } from './drawer/CandidateDetailDrawer';
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

  const { candidates, isLoading } = useCandidateData();
  const { 
    filters, 
    filteredCandidates, 
    activeFiltersCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters 
  } = useCandidateFilters(candidates, searchTerm);
  
  const {
    selectedCandidates,
    handleCandidateSelect,
    handleSelectAll,
    setSelectedCandidates
  } = useCandidateSelection(filteredCandidates);

  const { handleBulkAction, handleQuickAction } = useCandidateActions();
  const { metrics } = useCandidateMetrics(candidates);
  const {
    selectedCandidate,
    isDrawerOpen,
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

  // Register candidate pool specific shortcuts
  useCandidatePoolShortcuts({
    onAddCandidate: handleAddCandidate,
    onAdvancedFilters: handleAdvancedFilters,
    onExport: handleExport,
    onImport: handleImport
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <CandidateMetrics metrics={metrics} />

      <CandidatePoolHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCandidates={candidates.length}
        filteredCount={filteredCandidates.length}
        activeFilters={activeFiltersCount}
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
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

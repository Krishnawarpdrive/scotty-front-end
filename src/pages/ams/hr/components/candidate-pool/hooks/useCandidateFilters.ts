
import { useState, useMemo } from 'react';
import { FilterState } from '../CandidateFilters';
import { Candidate } from '../CandidateTable';

export const useCandidateFilters = (candidates: Candidate[] = [], searchTerm: string = '') => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    source: [],
    experience: [],
    stage: [],
    assignedTA: [],
    dateRange: '',
    roleType: []
  });

  // Filter candidates based on search term and filters
  const filteredCandidates = useMemo(() => {
    let filtered = candidates;

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (candidate.phone && candidate.phone.includes(searchTerm)) ||
        candidate.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(candidate => 
        filters.status.includes(candidate.status)
      );
    }

    // Apply source filter
    if (filters.source.length > 0) {
      filtered = filtered.filter(candidate => 
        filters.source.includes(candidate.source)
      );
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      filtered = filtered.filter(candidate => 
        candidate.type && filters.experience.includes(candidate.type)
      );
    }

    // Apply stage filter
    if (filters.stage.length > 0) {
      filtered = filtered.filter(candidate => 
        filters.stage.includes(candidate.currentStage)
      );
    }

    // Apply assigned TA filter
    if (filters.assignedTA.length > 0) {
      filtered = filtered.filter(candidate => 
        candidate.assignedTA && filters.assignedTA.includes(candidate.assignedTA.name)
      );
    }

    return filtered;
  }, [candidates, searchTerm, filters]);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return value ? count + 1 : count;
    }, 0);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string[] | string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: Array.isArray(prev[key]) ? [] : '' 
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      status: [],
      source: [],
      experience: [],
      stage: [],
      assignedTA: [],
      dateRange: '',
      roleType: []
    });
  };

  return {
    showFilters,
    setShowFilters,
    filters,
    filteredCandidates,
    activeFilterCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  };
};

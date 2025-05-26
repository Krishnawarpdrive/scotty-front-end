
import { useState, useMemo } from 'react';
import { FilterState } from '../CandidateFilters';

export const useCandidateFilters = () => {
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
    activeFilterCount,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters
  };
};


import { useState, useCallback, useMemo } from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'range';
  label: string;
  options?: FilterOption[];
  placeholder?: string;
}

export interface UseTableFiltersProps {
  data: any[];
  filterConfigs: FilterConfig[];
  searchFields?: string[];
}

export function useTableFilters({ data, filterConfigs, searchFields = [] }: UseTableFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery && searchFields.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => {
        return searchFields.some(field => {
          const value = String(item[field] || '').toLowerCase();
          return value.includes(query);
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== null && value !== undefined) {
        const config = filterConfigs.find(c => c.key === key);
        
        if (config?.type === 'multiselect' && Array.isArray(value) && value.length > 0) {
          result = result.filter(item => {
            const itemValue = String(item[key] || '').toLowerCase();
            return value.some(v => itemValue.includes(v.toLowerCase()));
          });
        } else if (config?.type === 'range' && typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
          result = result.filter(item => {
            const itemValue = Number(item[key]) || 0;
            return itemValue >= value.min && itemValue <= value.max;
          });
        } else {
          result = result.filter(item => {
            const itemValue = String(item[key] || '').toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      }
    });

    return result;
  }, [data, searchQuery, filters, searchFields, filterConfigs]);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== null && value !== undefined;
    }).length;
  }, [filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filteredData,
    activeFilterCount
  };
}

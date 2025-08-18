
import { useState, useMemo } from 'react';
import { DataTableColumn } from './types';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  column: string;
  values: string[];
}

export function useDataTableFilters<T>(
  data: T[],
  columns: DataTableColumn<T>[],
  initialFilters: FilterConfig[] = []
) {
  const [filters, setFilters] = useState<FilterConfig[]>(initialFilters);
  const [selectedFilterValues, setSelectedFilterValues] = useState<Record<string, string[]>>({});

  const filterableColumns = useMemo(() => {
    return columns.filter(col => col.filterable);
  }, [columns]);

  const uniqueValues = useMemo(() => {
    const values: Record<string, Set<string>> = {};
    
    filterableColumns.forEach(column => {
      values[column.id] = new Set();
      
      data.forEach(item => {
        let value: any;
        if (typeof column.accessorKey === 'function') {
          value = column.accessorKey(item);
        } else if (column.accessorKey) {
          value = (item as any)[column.accessorKey];
        }
        
        if (value != null) {
          values[column.id].add(String(value));
        }
      });
    });
    
    return Object.fromEntries(
      Object.entries(values).map(([key, valueSet]) => [
        key, 
        Array.from(valueSet).sort()
      ])
    );
  }, [data, filterableColumns]);

  const filteredData = useMemo(() => {
    if (filters.length === 0) return data;

    return data.filter(item => {
      return filters.every(filter => {
        if (filter.values.length === 0) return true;

        const column = columns.find(col => col.id === filter.column);
        if (!column) return true;

        let value: any;
        if (typeof column.accessorKey === 'function') {
          value = column.accessorKey(item);
        } else if (column.accessorKey) {
          value = (item as any)[column.accessorKey];
        }

        return filter.values.includes(String(value));
      });
    });
  }, [data, filters, columns]);

  const addFilter = (column: string, values: string[]) => {
    setFilters(prev => {
      const existing = prev.find(f => f.column === column);
      if (existing) {
        return prev.map(f => f.column === column ? { ...f, values } : f);
      }
      return [...prev, { column, values }];
    });
  };

  const removeFilter = (column: string) => {
    setFilters(prev => prev.filter(f => f.column !== column));
  };

  const clearAllFilters = () => {
    setFilters([]);
    setSelectedFilterValues({});
  };

  const getFilterOptions = (columnId: string): FilterOption[] => {
    return (uniqueValues[columnId] || []).map(value => ({
      label: value,
      value
    }));
  };

  const handleFilterChange = (columnId: string, values: string[]) => {
    addFilter(columnId, values);
    setSelectedFilterValues(prev => ({
      ...prev,
      [columnId]: values
    }));
  };

  return {
    filteredData,
    filters,
    selectedFilterValues,
    filterableColumns,
    uniqueValues,
    addFilter,
    removeFilter,
    clearAllFilters,
    getFilterOptions,
    handleFilterChange
  };
}

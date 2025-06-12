
import { useState, useMemo } from 'react';
import { DataTableColumn } from './types';
import { getColumnValue } from './utils';

export const useDataTableFilters = <T>(data: T[], columns: DataTableColumn<T>[]) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedFilterValues, setSelectedFilterValues] = useState<Record<string, string[]>>({});

  // Get unique values for each filterable column
  const columnValues = useMemo(() => {
    const values: Record<string, Set<string>> = {};
    
    columns.forEach(column => {
      if (column.enableFiltering && column.accessorKey) {
        values[column.id] = new Set();
        data.forEach(item => {
          const value = getColumnValue(item, String(column.accessorKey));
          if (value !== null && value !== undefined && value !== '') {
            values[column.id].add(String(value));
          }
        });
      }
    });
    
    return values;
  }, [data, columns]);

  // Filter data based on selected filter values
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(selectedFilterValues).every(([columnId, values]) => {
        if (values.length === 0) return true;
        
        const column = columns.find(col => col.id === columnId);
        if (!column || !column.accessorKey) return true;
        
        const itemValue = getColumnValue(item, String(column.accessorKey));
        return values.includes(String(itemValue));
      });
    });
  }, [data, columns, selectedFilterValues]);

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  const toggleFilterValue = (columnId: string, value: string) => {
    setSelectedFilterValues(prev => {
      const currentValues = prev[columnId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [columnId]: newValues
      };
    });
  };

  const clearFilter = (columnId: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[columnId];
      return newFilters;
    });
    
    setSelectedFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[columnId];
      return newValues;
    });
  };

  return {
    filters,
    setFilters,
    columnValues,
    selectedFilterValues,
    setSelectedFilterValues,
    filteredData,
    handleFilterChange,
    toggleFilterValue,
    clearFilter
  };
};

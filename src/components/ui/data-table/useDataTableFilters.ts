
import { useState, useEffect } from 'react';
import { DataTableColumn } from './types';
import { getColumnValue } from './utils';

export function useDataTableFilters<T extends Record<string, any>>(
  data: T[],
  columns: DataTableColumn<T>[]
) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [columnValues, setColumnValues] = useState<Record<string, Set<string>>>({});
  const [selectedFilterValues, setSelectedFilterValues] = useState<Record<string, string[]>>({});
  
  // Extract unique values for each column for filtering
  useEffect(() => {
    const values: Record<string, Set<string>> = {};
    
    columns.forEach(column => {
      if (column.enableFiltering) {
        const uniqueValues = new Set<string>();
        data.forEach(item => {
          const value = getColumnValue(item, column);
          if (value !== undefined && value !== null) {
            uniqueValues.add(String(value));
          }
        });
        values[column.id] = uniqueValues;
      }
    });
    
    setColumnValues(values);
  }, [data, columns]);
  
  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };
  
  const toggleFilterValue = (columnId: string, value: string) => {
    setSelectedFilterValues(prev => {
      const currentValues = prev[columnId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      // If no values are selected, remove the filter
      if (newValues.length === 0) {
        const newFilters = { ...filters };
        delete newFilters[columnId];
        setFilters(newFilters);
        return { ...prev, [columnId]: [] };
      }
      
      // Apply the filter
      setFilters(current => ({
        ...current,
        [columnId]: newValues.join('|')
      }));
      
      return { ...prev, [columnId]: newValues };
    });
  };
  
  const clearFilter = (columnId: string) => {
    const newFilters = { ...filters };
    delete newFilters[columnId];
    setFilters(newFilters);
    setSelectedFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[columnId];
      return newValues;
    });
  };
  
  const clearAllFilters = () => {
    setFilters({});
    setSelectedFilterValues({});
  };
  
  // Apply filters
  const filteredData = data.filter(item => {
    return Object.entries(filters).every(([columnId, filterValue]) => {
      if (!filterValue || filterValue.trim() === '') {
        return true;
      }
      
      const column = columns.find(col => col.id === columnId);
      if (!column) return true;
      
      // If the filter contains pipe characters, it's a multi-value filter
      if (filterValue.includes('|')) {
        const filterValues = filterValue.split('|');
        const value = String(getColumnValue(item, column));
        return filterValues.some(fv => value === fv);
      } else {
        // Text search filter
        const value = getColumnValue(item, column);
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      }
    });
  });
  
  return {
    filters,
    setFilters,
    columnValues,
    selectedFilterValues,
    setSelectedFilterValues,
    handleFilterChange,
    toggleFilterValue,
    clearFilter,
    clearAllFilters,
    filteredData
  };
}

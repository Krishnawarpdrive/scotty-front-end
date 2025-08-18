
import { useState } from 'react';
import { sortData } from './utils';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function useDataTableSort<T>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: string) => {
    if (!key) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = sortConfig 
    ? sortData(data, sortConfig.key, sortConfig.direction)
    : data;

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
}

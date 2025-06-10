
import { useState, useMemo } from 'react';

export function useDataTableSort<T extends Record<string, any>>(
  data: T[]
) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });
  
  const handleSort = (columnId: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === columnId && sortConfig.direction === 'desc') {
      return setSortConfig({ key: null, direction: 'asc' });
    }
    
    setSortConfig({ key: columnId, direction });
  };
  
  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const valueA = a[sortConfig.key as keyof T];
      const valueB = b[sortConfig.key as keyof T];
      
      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig.key, sortConfig.direction]);
  
  return {
    sortConfig,
    handleSort,
    sortedData
  };
}

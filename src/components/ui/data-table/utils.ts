
import { DataTableColumn } from './types';

export const filterData = <T>(
  data: T[],
  searchTerm: string,
  columns: DataTableColumn<T>[]
): T[] => {
  if (!searchTerm) return data;
  
  return data.filter((item) =>
    columns.some((column) => {
      if (!column.accessorKey) return false;
      const value = getColumnValue(item, String(column.accessorKey));
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );
};

export const getColumnValue = <T>(item: T, accessorKey: string): any => {
  if (!item || typeof item !== 'object') return '';
  
  const keys = accessorKey.split('.');
  let value: any = item;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, any>)[key];
    } else {
      return '';
    }
  }
  
  return value;
};

export const sortData = <T>(
  data: T[],
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null
): T[] => {
  if (!sortConfig) return data;
  
  return [...data].sort((a, b) => {
    const aValue = getColumnValue(a, sortConfig.key);
    const bValue = getColumnValue(b, sortConfig.key);
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

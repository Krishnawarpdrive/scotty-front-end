
export const getColumnValue = (row: Record<string, any>, accessor: string): any => {
  if (accessor.includes('.')) {
    const keys = accessor.split('.');
    let value = row;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  }
  return row[accessor];
};

export const sortData = (data: any[], sortKey: string, sortDirection: 'asc' | 'desc') => {
  return [...data].sort((a, b) => {
    const aValue = getColumnValue(a, sortKey);
    const bValue = getColumnValue(b, sortKey);
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

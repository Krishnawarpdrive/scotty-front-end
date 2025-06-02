
import { useState, useCallback, useMemo } from 'react';

export interface UseTableSelectionProps<T> {
  data: T[];
  keyField: keyof T;
  multiSelect?: boolean;
}

export function useTableSelection<T extends Record<string, any>>({ 
  data, 
  keyField, 
  multiSelect = true 
}: UseTableSelectionProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selectedItems = useMemo(() => {
    return data.filter(item => selectedIds.has(String(item[keyField])));
  }, [data, selectedIds, keyField]);

  const isSelected = useCallback((item: T) => {
    return selectedIds.has(String(item[keyField]));
  }, [selectedIds, keyField]);

  const isAllSelected = useMemo(() => {
    return data.length > 0 && selectedIds.size === data.length;
  }, [data.length, selectedIds.size]);

  const isPartiallySelected = useMemo(() => {
    return selectedIds.size > 0 && selectedIds.size < data.length;
  }, [data.length, selectedIds.size]);

  const toggleSelection = useCallback((item: T) => {
    const id = String(item[keyField]);
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!multiSelect) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  }, [keyField, multiSelect]);

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(item => String(item[keyField]))));
    }
  }, [data, keyField, isAllSelected]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectItems = useCallback((items: T[]) => {
    const ids = items.map(item => String(item[keyField]));
    setSelectedIds(new Set(ids));
  }, [keyField]);

  return {
    selectedIds,
    selectedItems,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    toggleSelection,
    selectAll,
    clearSelection,
    selectItems,
    selectionCount: selectedIds.size
  };
}

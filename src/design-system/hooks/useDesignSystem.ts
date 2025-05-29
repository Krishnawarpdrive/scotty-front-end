
import { useState, useCallback } from 'react';
import { SearchParams, FilterOption } from '@/data/unified-types';

// Custom hook for managing search and filter state
export const useSearchFilter = (initialParams: SearchParams = {}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);

  const updateSearch = useCallback((query: string) => {
    setSearchParams(prev => ({ ...prev, query }));
  }, []);

  const updateFilters = useCallback((filters: Record<string, any>) => {
    setSearchParams(prev => ({ ...prev, filters }));
  }, []);

  const updateSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSearchParams(prev => ({
      ...prev,
      sort: { field, direction }
    }));
  }, []);

  const updatePagination = useCallback((page: number, limit: number) => {
    setSearchParams(prev => ({
      ...prev,
      pagination: { page, limit }
    }));
  }, []);

  const resetParams = useCallback(() => {
    setSearchParams(initialParams);
  }, [initialParams]);

  return {
    searchParams,
    updateSearch,
    updateFilters,
    updateSort,
    updatePagination,
    resetParams,
  };
};

// Custom hook for managing table selection
export const useTableSelection = <T extends { id: string }>(data: T[]) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const selectAll = useCallback(() => {
    setSelectedItems(data);
  }, [data]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const toggleItem = useCallback((item: T) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(selected => selected.id === item.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedItems.length === data.length) {
      clearSelection();
    } else {
      selectAll();
    }
  }, [selectedItems.length, data.length, clearSelection, selectAll]);

  const isSelected = useCallback((item: T) => {
    return selectedItems.some(selected => selected.id === item.id);
  }, [selectedItems]);

  const isAllSelected = selectedItems.length === data.length && data.length > 0;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < data.length;

  return {
    selectedItems,
    selectAll,
    clearSelection,
    toggleItem,
    toggleAll,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    selectedCount: selectedItems.length,
  };
};

// Custom hook for managing async data operations
export const useAsyncOperation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(operation: () => Promise<T>): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
};

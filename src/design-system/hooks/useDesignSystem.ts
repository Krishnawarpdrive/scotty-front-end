
import { useState, useCallback } from 'react';

export interface SearchFilterState {
  query?: string;
  filters?: Record<string, any>;
}

export interface TableSelectionState<T> {
  selectedItems: T[];
  isSelected: (item: T) => boolean;
  toggleItem: (item: T) => void;
  toggleAll: () => void;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  selectedCount: number;
}

export const useSearchFilter = () => {
  const [searchParams, setSearchParams] = useState<SearchFilterState>({});

  const updateSearch = useCallback((query: string) => {
    setSearchParams(prev => ({ ...prev, query }));
  }, []);

  const updateFilters = useCallback((filters: Record<string, any>) => {
    setSearchParams(prev => ({ ...prev, filters }));
  }, []);

  return {
    searchParams,
    updateSearch,
    updateFilters,
    setSearchParams
  };
};

export const useTableSelection = <T extends { id: string }>(data: T[]): TableSelectionState<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const isSelected = useCallback((item: T) => {
    return selectedItems.some(selectedItem => selectedItem.id === item.id);
  }, [selectedItems]);

  const toggleItem = useCallback((item: T) => {
    if (isSelected(item)) {
      setSelectedItems(prev => prev.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  }, [isSelected]);

  const isAllSelected = data.length > 0 && selectedItems.length === data.length;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < data.length;
  const selectedCount = selectedItems.length;

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...data]);
    }
  }, [data, isAllSelected]);

  return {
    selectedItems,
    isSelected,
    toggleItem,
    toggleAll,
    isAllSelected,
    isPartiallySelected,
    selectedCount
  };
};

import { useState } from 'react';

interface SearchParams {
  query?: string;
  filters?: Record<string, string>;
}

interface UseSearchFilterReturn {
  searchParams: SearchParams;
  updateSearch: (query: string) => void;
  updateFilters: (filters: Record<string, string>) => void;
}

export const useSearchFilter = (): UseSearchFilterReturn => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    filters: {},
  });

  const updateSearch = (query: string) => {
    setSearchParams(prev => ({ ...prev, query }));
  };

  const updateFilters = (filters: Record<string, string>) => {
    setSearchParams(prev => ({ ...prev, filters }));
  };

  return {
    searchParams,
    updateSearch,
    updateFilters,
  };
};

interface UseTableSelectionReturn<T extends { id: string }> {
  selectedItems: T[];
  toggleItem: (item: T) => void;
  toggleAll: () => void;
  isSelected: (item: T) => boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  selectedCount: number;
}

export const useTableSelection = <T extends { id: string }>(data: T[]): UseTableSelectionReturn<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const toggleItem = (item: T) => {
    setSelectedItems(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const toggleAll = () => {
    setSelectedItems(prev => {
      if (prev.length === data.length) {
        return [];
      } else {
        return [...data];
      }
    });
  };

  const isSelected = (item: T) => selectedItems.find(i => i.id === item.id) !== undefined;
  const isAllSelected = selectedItems.length === data.length;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < data.length;
  const selectedCount = selectedItems.length;

  return {
    selectedItems,
    toggleItem,
    toggleAll,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    selectedCount,
  };
};

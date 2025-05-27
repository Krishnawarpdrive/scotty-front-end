
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui-mui/Button';
import { EnhancedSearchBar } from '@/components/ai/EnhancedSearchBar';

interface SearchFiltersBarProps {
  searchTerm: string;
  onSearchChange: (query: string) => void;
  toggleFilterPanel: () => void;
}

const SearchFiltersBar: React.FC<SearchFiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  toggleFilterPanel
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <EnhancedSearchBar
          placeholder="Search clients or ask AI for insights..."
          onTraditionalSearch={onSearchChange}
          defaultTables={['clients']}
          showTrending={true}
        />
      </div>
      <Button 
        variant="outlined"
        onClick={toggleFilterPanel}
        className="flex items-center gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
};

export default SearchFiltersBar;

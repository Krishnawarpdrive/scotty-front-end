
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui-mui/Input';
import { Button } from '@/components/ui-mui/Button';

interface SearchFiltersBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFilterPanel: () => void;
}

const SearchFiltersBar: React.FC<SearchFiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  toggleFilterPanel
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-10"
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

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface UnifiedSearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="pr-10"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={handleSearchSubmit}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={onFilter}>
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};



import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useSemanticSearch, SemanticSearchResult } from '@/hooks/useSemanticSearch';

interface SemanticSearchBarProps {
  onSearch?: (query: string) => void;
  onResults?: (results: SemanticSearchResult[]) => void;
  placeholder?: string;
  className?: string;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  onSearch,
  onResults,
  placeholder = "Search with natural language...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const { searchAsync } = useSemanticSearch();

  const handleSearch = async () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      
      if (onResults) {
        try {
          const results = await searchAsync(query.trim());
          onResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          onResults([]);
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
      <Button onClick={handleSearch} variant="default">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

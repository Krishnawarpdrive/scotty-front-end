
import React, { useState } from 'react';
import { UnifiedSearchBar } from '@/components/search/UnifiedSearchBar';

interface SearchFilterProps {
  placeholder?: string;
  onSemanticResults?: (results: any[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = "Search...",
  onSemanticResults,
}) => {
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    const mockResults: any[] = [];
    setResults(mockResults);
    if (onSemanticResults) {
      onSemanticResults(mockResults);
    }
  };

  return (
    <div className="space-y-4">
      <UnifiedSearchBar
        placeholder={placeholder}
        onSearch={handleSearch}
      />
      
      {results.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Search Results</h3>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                {JSON.stringify(result)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

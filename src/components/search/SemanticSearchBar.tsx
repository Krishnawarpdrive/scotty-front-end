
import React, { useState, useCallback, useMemo } from 'react';
import { Search, Loader2, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useSemanticSearch, SemanticSearchOptions } from '@/hooks/useSemanticSearch';
import { cn } from '@/lib/utils';

interface SemanticSearchBarProps {
  placeholder?: string;
  onResults?: (results: any[]) => void;
  className?: string;
  defaultTables?: string[];
}

const AVAILABLE_TABLES = [
  { id: 'roles', label: 'Roles', description: 'Job roles and positions' },
  { id: 'requirements', label: 'Requirements', description: 'Job requirements and postings' },
  { id: 'clients', label: 'Clients', description: 'Client organizations' },
  { id: 'skills', label: 'Skills', description: 'Technical and soft skills' },
  { id: 'global_roles', label: 'Global Roles', description: 'Global role templates' },
];

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  placeholder = 'Search with AI...',
  onResults,
  className,
  defaultTables = ['roles', 'requirements', 'clients', 'skills']
}) => {
  const [query, setQuery] = useState('');
  const [selectedTables, setSelectedTables] = useState<string[]>(defaultTables);
  const [showFilters, setShowFilters] = useState(false);
  
  const { search, isLoading, error, results } = useSemanticSearch();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    const options: SemanticSearchOptions = {
      tables: selectedTables,
      limit: 20,
      threshold: 0.3
    };

    await search(query, options);
  }, [query, selectedTables, search]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const toggleTable = useCallback((tableId: string) => {
    setSelectedTables(prev => 
      prev.includes(tableId) 
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  }, []);

  const selectedTableLabels = useMemo(() => 
    AVAILABLE_TABLES
      .filter(table => selectedTables.includes(table.id))
      .map(table => table.label),
    [selectedTables]
  );

  // Pass results to parent component
  React.useEffect(() => {
    if (onResults) {
      onResults(results);
    }
  }, [results, onResults]);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Search Input */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pl-10 pr-4"
          />
        </div>
        
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {selectedTables.length < AVAILABLE_TABLES.length && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {selectedTables.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Search in:</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTables(AVAILABLE_TABLES.map(t => t.id))}
                >
                  Select All
                </Button>
              </div>
              
              <div className="space-y-3">
                {AVAILABLE_TABLES.map((table) => (
                  <div key={table.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={table.id}
                      checked={selectedTables.includes(table.id)}
                      onCheckedChange={() => toggleTable(table.id)}
                    />
                    <div className="space-y-1 leading-none">
                      <label
                        htmlFor={table.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {table.label}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {table.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          onClick={handleSearch} 
          disabled={isLoading || !query.trim()}
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {selectedTables.length > 0 && selectedTables.length < AVAILABLE_TABLES.length && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Searching in:</span>
          {selectedTableLabels.map((label) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border">
          Search error: {error}
        </div>
      )}

      {/* Results Count */}
      {results.length > 0 && (
        <div className="text-sm text-gray-600">
          Found {results.length} results
        </div>
      )}
    </div>
  );
};

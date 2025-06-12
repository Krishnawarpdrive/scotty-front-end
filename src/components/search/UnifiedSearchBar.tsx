
import React, { useState, useCallback } from 'react';
import { Search, Brain, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useSemanticSearch, SemanticSearchOptions } from '@/hooks/useSemanticSearch';
import { cn } from '@/lib/utils';

interface UnifiedSearchBarProps {
  placeholder?: string;
  onTraditionalSearch?: (query: string) => void;
  onSemanticResults?: (results: any[]) => void;
  defaultTables?: string[];
  className?: string;
  searchMode?: 'traditional' | 'semantic' | 'both';
}

const AVAILABLE_TABLES = [
  { id: 'roles', label: 'Roles', description: 'Job roles and positions' },
  { id: 'requirements', label: 'Requirements', description: 'Job requirements and postings' },
  { id: 'clients', label: 'Clients', description: 'Client organizations' },
  { id: 'skills', label: 'Skills', description: 'Technical and soft skills' },
  { id: 'global_roles', label: 'Global Roles', description: 'Global role templates' },
];

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = ({
  placeholder = 'Search...',
  onTraditionalSearch,
  onSemanticResults,
  defaultTables = ['roles', 'requirements', 'clients', 'skills'],
  className,
  searchMode = 'both'
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'traditional' | 'semantic'>('traditional');
  const [selectedTables, setSelectedTables] = useState<string[]>(defaultTables);
  const [showFilters, setShowFilters] = useState(false);
  
  const { search, isLoading, error, results } = useSemanticSearch();

  const handleTraditionalSearch = useCallback(() => {
    if (onTraditionalSearch) {
      onTraditionalSearch(query);
    }
  }, [query, onTraditionalSearch]);

  const handleSemanticSearch = useCallback(async () => {
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
      if (activeTab === 'traditional') {
        handleTraditionalSearch();
      } else {
        handleSemanticSearch();
      }
    }
  }, [activeTab, handleTraditionalSearch, handleSemanticSearch]);

  const toggleTable = useCallback((tableId: string) => {
    setSelectedTables(prev => 
      prev.includes(tableId) 
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  }, []);

  // Pass semantic results to parent
  React.useEffect(() => {
    if (onSemanticResults && activeTab === 'semantic') {
      onSemanticResults(results);
    }
  }, [results, onSemanticResults, activeTab]);

  if (searchMode === 'traditional') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
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
        <Button onClick={handleTraditionalSearch} size="sm">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (searchMode === 'semantic') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="pl-10"
            />
          </div>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
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
            onClick={handleSemanticSearch} 
            disabled={isLoading || !query.trim()}
            size="sm"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            ) : (
              <Brain className="h-4 w-4" />
            )}
          </Button>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded border">
            Search error: {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="text-sm text-gray-600">
            Found {results.length} semantic results
          </div>
        )}
      </div>
    );
  }

  // Both modes
  return (
    <div className={cn('space-y-4', className)}>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="traditional" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Traditional
          </TabsTrigger>
          <TabsTrigger value="semantic" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traditional" className="space-y-3">
          <div className="relative flex items-center gap-2">
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
            <Button onClick={handleTraditionalSearch} size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="semantic" className="space-y-3">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you're looking for..."
                className="pl-10"
              />
            </div>
            
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
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
              onClick={handleSemanticSearch} 
              disabled={isLoading || !query.trim()}
              size="sm"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
            </Button>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded border">
              Search error: {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="text-sm text-gray-600">
              Found {results.length} semantic results
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

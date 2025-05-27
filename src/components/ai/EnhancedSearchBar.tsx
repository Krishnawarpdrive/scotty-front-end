
import React, { useState, useCallback } from 'react';
import { Search, Brain, Filter, Sparkles, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { UnifiedSearchBar } from '@/components/search/UnifiedSearchBar';
import { useAISearch } from '@/hooks/useAISearch';

interface EnhancedSearchBarProps {
  placeholder?: string;
  onTraditionalSearch?: (query: string) => void;
  onSemanticResults?: (results: any[]) => void;
  onSuggestionSelect?: (suggestion: string) => void;
  defaultTables?: string[];
  className?: string;
  showTrending?: boolean;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  placeholder = 'Search or ask AI...',
  onTraditionalSearch,
  onSemanticResults,
  onSuggestionSelect,
  defaultTables = ['clients', 'roles', 'requirements'],
  className,
  showTrending = true
}) => {
  const [activeMode, setActiveMode] = useState<'search' | 'ai'>('search');
  const [query, setQuery] = useState('');
  
  const { 
    suggestions, 
    trendingQueries, 
    generateSuggestions,
    isLoading 
  } = useAISearch();

  const handleQueryChange = useCallback(async (value: string) => {
    setQuery(value);
    if (value.length > 2 && activeMode === 'ai') {
      await generateSuggestions(value, defaultTables);
    }
  }, [activeMode, defaultTables, generateSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSuggestionSelect?.(suggestion);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <UnifiedSearchBar
            placeholder={placeholder}
            onTraditionalSearch={onTraditionalSearch}
            onSemanticResults={onSemanticResults}
            defaultTables={defaultTables}
            searchMode="both"
          />
        </TabsContent>

        <TabsContent value="ai" className="space-y-3">
          <div className="relative">
            <div className="relative flex items-center">
              <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4" />
              <Input
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Ask AI to find, analyze, or suggest..."
                className="pl-10 pr-4"
              />
              {isLoading && (
                <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-pulse text-blue-500" />
              )}
            </div>
          </div>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Card className="border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-left h-auto p-2 w-full"
                      onClick={() => handleSuggestionClick(suggestion.query)}
                    >
                      <div>
                        <p className="text-sm font-medium">{suggestion.query}</p>
                        <p className="text-xs text-gray-600">{suggestion.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {suggestion.type}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trending Queries */}
          {showTrending && trendingQueries.length > 0 && (
            <Card className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingQueries.map((trending, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => handleSuggestionClick(trending)}
                    >
                      {trending}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

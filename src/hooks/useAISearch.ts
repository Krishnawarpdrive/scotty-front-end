
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SearchSuggestion {
  query: string;
  description: string;
  type: string;
  confidence: number;
}

export const useAISearch = () => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [trendingQueries, setTrendingQueries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = useCallback(async (query: string, tables: string[]) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search-suggestions', {
        body: {
          query,
          tables,
          limit: 5
        }
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error generating AI search suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTrendingQueries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('search_analytics')
        .select('search_query')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('results_count', { ascending: false })
        .limit(10);

      if (!error && data) {
        const queries = data.map(item => item.search_query).filter(Boolean);
        setTrendingQueries([...new Set(queries)].slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading trending queries:', error);
    }
  }, []);

  return {
    suggestions,
    trendingQueries,
    isLoading,
    generateSuggestions,
    loadTrendingQueries
  };
};

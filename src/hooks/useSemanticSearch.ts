
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SemanticSearchResult {
  id: string;
  name?: string;
  title?: string;
  content?: string;
  table_name: string;
  similarity: number;
  [key: string]: any;
}

export interface SemanticSearchOptions {
  tables?: string[];
  limit?: number;
  threshold?: number;
}

export const useSemanticSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SemanticSearchResult[]>([]);

  const search = useCallback(async (
    query: string, 
    options: SemanticSearchOptions = {}
  ) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await supabase.functions.invoke('semantic-search', {
        body: {
          query: query.trim(),
          tables: options.tables,
          limit: options.limit || 10,
          threshold: options.threshold || 0.5
        }
      });

      if (searchError) {
        throw searchError;
      }

      setResults(data?.results || []);
      
      // Log successful search
      console.log(`Semantic search completed: ${data?.results?.length || 0} results in ${data?.search_time_ms || 0}ms`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Semantic search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchAsync = useCallback(async (
    query: string, 
    options: SemanticSearchOptions = {}
  ): Promise<SemanticSearchResult[]> => {
    if (!query.trim()) {
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await supabase.functions.invoke('semantic-search', {
        body: {
          query: query.trim(),
          tables: options.tables,
          limit: options.limit || 10,
          threshold: options.threshold || 0.5
        }
      });

      if (searchError) {
        throw searchError;
      }

      const searchResults = data?.results || [];
      setResults(searchResults);
      
      // Log successful search
      console.log(`Semantic search completed: ${searchResults.length} results in ${data?.search_time_ms || 0}ms`);

      return searchResults;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Semantic search error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateEmbedding = useCallback(async (
    text: string,
    table: string,
    id: string
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-embeddings', {
        body: { text, table, id }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error generating embedding:', err);
      throw err;
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    search,
    searchAsync,
    generateEmbedding,
    clearResults,
    isLoading,
    error,
    results
  };
};

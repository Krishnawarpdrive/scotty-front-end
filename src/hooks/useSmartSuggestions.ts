
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Suggestion {
  title: string;
  description: string;
  action: string;
  data: any;
  confidence: number;
}

export const useSmartSuggestions = (context: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSuggestions = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: response, error: functionError } = await supabase.functions.invoke('generate-suggestions', {
        body: {
          context,
          data
        }
      });

      if (functionError) {
        throw functionError;
      }

      setSuggestions(response.suggestions || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestions';
      setError(errorMessage);
      console.error('Smart suggestions error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  return {
    suggestions,
    isLoading,
    error,
    generateSuggestions
  };
};

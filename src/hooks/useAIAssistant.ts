
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIResponse {
  content: string;
  suggestions?: string[];
}

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export const useAIAssistant = (context?: string, contextData?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (
    message: string, 
    conversationHistory: Message[] = []
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message,
          context,
          contextData,
          conversationHistory: conversationHistory.slice(-5) // Keep last 5 messages for context
        }
      });

      if (functionError) {
        throw functionError;
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context, contextData]);

  return {
    sendMessage,
    isLoading,
    error
  };
};

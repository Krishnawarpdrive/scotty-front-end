
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GenerateContentParams {
  type: string;
  prompt: string;
  tone: string;
  length: string;
  context?: any;
}

export const useContentGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async (params: GenerateContentParams): Promise<string> => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: params
      });

      if (error) {
        throw error;
      }

      return data.content;
    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateContent,
    isLoading
  };
};

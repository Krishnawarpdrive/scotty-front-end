
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Panelist } from "../types/PanelistTypes";

export const usePanelistDetail = (panelistId: string | null) => {
  const [panelist, setPanelist] = useState<Panelist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPanelistDetail = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('interview_panelists')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setPanelist(data);
    } catch (err) {
      console.error('Error fetching panelist detail:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch panelist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (panelistId) {
      fetchPanelistDetail(panelistId);
    } else {
      setPanelist(null);
      setError(null);
    }
  }, [panelistId]);

  return {
    panelist,
    isLoading,
    error,
    refetch: () => panelistId ? fetchPanelistDetail(panelistId) : null
  };
};

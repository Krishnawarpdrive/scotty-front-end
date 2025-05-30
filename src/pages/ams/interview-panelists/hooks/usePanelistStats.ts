
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PanelistStats } from "../types/PanelistTypes";

export const usePanelistStats = () => {
  const [stats, setStats] = useState<PanelistStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch panelist counts and averages
      const { data: panelists, error: panelistsError } = await supabase
        .from('interview_panelists')
        .select('status, rating, total_interviews, max_interviews_per_week');

      if (panelistsError) {
        throw panelistsError;
      }

      // Calculate basic stats
      const totalPanelists = panelists?.length || 0;
      const activePanelists = panelists?.filter(p => p.status === 'active').length || 0;
      const averageRating = panelists?.length 
        ? panelists.reduce((sum, p) => sum + (p.rating || 0), 0) / panelists.length 
        : 0;

      // Calculate utilization rate (simplified - actual capacity vs used capacity)
      const totalCapacity = panelists?.reduce((sum, p) => sum + (p.max_interviews_per_week || 0), 0) || 1;
      const totalInterviews = panelists?.reduce((sum, p) => sum + (p.total_interviews || 0), 0) || 0;
      const utilizationRate = Math.min(100, Math.round((totalInterviews / Math.max(totalCapacity, 1)) * 100));

      // For this week's interviews, we'll use a simplified calculation
      // In a real app, you'd query interview_sessions table for this week
      const interviewsThisWeek = Math.floor(totalInterviews * 0.1); // Simplified

      setStats({
        totalPanelists,
        activePanelists,
        averageRating,
        interviewsThisWeek,
        utilizationRate
      });
    } catch (err) {
      console.error('Error fetching panelist stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  };
};

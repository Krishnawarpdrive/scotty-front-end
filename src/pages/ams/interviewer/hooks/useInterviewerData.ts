
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { 
  InterviewPanelist, 
  InterviewerMetric, 
  InterviewerAchievement,
  LeaderboardEntry 
} from '../types/InterviewerTypes';

export const useInterviewerData = () => {
  const { user } = useAuth();
  const [interviewer, setInterviewer] = useState<InterviewPanelist | null>(null);
  const [metrics, setMetrics] = useState<InterviewerMetric[]>([]);
  const [achievements, setAchievements] = useState<InterviewerAchievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchInterviewerData();
    }
  }, [user]);

  const fetchInterviewerData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch interviewer profile
      const { data: panelistData, error: panelistError } = await supabase
        .from('interview_panelists')
        .select('*')
        .eq('email', user?.email)
        .single();

      if (panelistError) {
        console.error('Error fetching panelist:', panelistError);
        return;
      }

      setInterviewer(panelistData);

      if (panelistData) {
        // Fetch metrics
        const { data: metricsData } = await supabase
          .from('interviewer_metrics')
          .select('*')
          .eq('panelist_id', panelistData.id)
          .order('created_at', { ascending: false });

        setMetrics(metricsData || []);

        // Fetch achievements
        const { data: achievementsData } = await supabase
          .from('interviewer_achievements')
          .select('*')
          .eq('panelist_id', panelistData.id)
          .order('unlocked_at', { ascending: false });

        setAchievements(achievementsData || []);

        // Fetch current leaderboard
        const { data: leaderboardData } = await supabase
          .from('interviewer_leaderboard')
          .select(`
            *,
            panelist:interview_panelists(*)
          `)
          .eq('period_type', 'monthly')
          .eq('category', 'overall')
          .order('rank_position', { ascending: true })
          .limit(10);

        setLeaderboard(leaderboardData || []);
      }
    } catch (error) {
      console.error('Error fetching interviewer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    interviewer,
    metrics,
    achievements,
    leaderboard,
    isLoading,
    refetch: fetchInterviewerData
  };
};

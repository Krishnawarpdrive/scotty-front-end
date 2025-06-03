
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

      if (panelistData) {
        // Transform the data to match the expected types
        const transformedPanelist: InterviewPanelist = {
          ...panelistData,
          skills: Array.isArray(panelistData.skills) ? panelistData.skills : 
                  typeof panelistData.skills === 'string' ? JSON.parse(panelistData.skills) : [],
          certifications: Array.isArray(panelistData.certifications) ? panelistData.certifications : 
                         typeof panelistData.certifications === 'string' ? JSON.parse(panelistData.certifications) : [],
          languages: Array.isArray(panelistData.languages) ? panelistData.languages : 
                    typeof panelistData.languages === 'string' ? JSON.parse(panelistData.languages) : [],
          interview_types: Array.isArray(panelistData.interview_types) ? panelistData.interview_types : 
                          typeof panelistData.interview_types === 'string' ? JSON.parse(panelistData.interview_types) : [],
          preferred_time_slots: typeof panelistData.preferred_time_slots === 'object' ? panelistData.preferred_time_slots : {},
          projects_worked_on: Array.isArray(panelistData.projects_worked_on) ? panelistData.projects_worked_on : 
                             typeof panelistData.projects_worked_on === 'string' ? JSON.parse(panelistData.projects_worked_on) : [],
          tools_used: Array.isArray(panelistData.tools_used) ? panelistData.tools_used : 
                     typeof panelistData.tools_used === 'string' ? JSON.parse(panelistData.tools_used) : []
        };
        
        setInterviewer(transformedPanelist);

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

        if (achievementsData) {
          // Transform achievements to ensure tier matches the expected union type
          const transformedAchievements: InterviewerAchievement[] = achievementsData.map(achievement => ({
            ...achievement,
            tier: ['bronze', 'silver', 'gold', 'platinum'].includes(achievement.tier) 
              ? achievement.tier as 'bronze' | 'silver' | 'gold' | 'platinum'
              : 'bronze'
          }));
          setAchievements(transformedAchievements);
        }

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

        if (leaderboardData) {
          // Transform leaderboard data to handle panelist skills
          const transformedLeaderboard: LeaderboardEntry[] = leaderboardData.map(entry => ({
            ...entry,
            panelist: entry.panelist ? {
              ...entry.panelist,
              skills: Array.isArray(entry.panelist.skills) ? entry.panelist.skills : 
                     typeof entry.panelist.skills === 'string' ? JSON.parse(entry.panelist.skills) : [],
              certifications: Array.isArray(entry.panelist.certifications) ? entry.panelist.certifications : 
                             typeof entry.panelist.certifications === 'string' ? JSON.parse(entry.panelist.certifications) : [],
              languages: Array.isArray(entry.panelist.languages) ? entry.panelist.languages : 
                        typeof entry.panelist.languages === 'string' ? JSON.parse(entry.panelist.languages) : [],
              interview_types: Array.isArray(entry.panelist.interview_types) ? entry.panelist.interview_types : 
                              typeof entry.panelist.interview_types === 'string' ? JSON.parse(entry.panelist.interview_types) : [],
              preferred_time_slots: typeof entry.panelist.preferred_time_slots === 'object' ? entry.panelist.preferred_time_slots : {},
              projects_worked_on: Array.isArray(entry.panelist.projects_worked_on) ? entry.panelist.projects_worked_on : 
                                 typeof entry.panelist.projects_worked_on === 'string' ? JSON.parse(entry.panelist.projects_worked_on) : [],
              tools_used: Array.isArray(entry.panelist.tools_used) ? entry.panelist.tools_used : 
                         typeof entry.panelist.tools_used === 'string' ? JSON.parse(entry.panelist.tools_used) : []
            } : undefined
          }));
          setLeaderboard(transformedLeaderboard);
        }
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

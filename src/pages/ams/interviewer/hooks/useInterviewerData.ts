
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { 
  InterviewPanelist, 
  InterviewerMetric, 
  InterviewerAchievement,
  LeaderboardEntry 
} from '../types/InterviewerTypes';

export const useInterviewerData = (forceDummy: boolean = false) => {
  const { user } = useAuth();
  const [interviewer, setInterviewer] = useState<InterviewPanelist | null>(null);
  const [metrics, setMetrics] = useState<InterviewerMetric[]>([]);
  const [achievements, setAchievements] = useState<InterviewerAchievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email || forceDummy) {
      fetchInterviewerData();
    }
  }, [user, forceDummy]);

  const fetchInterviewerData = async () => {
    if (forceDummy) {
      // Provide dummy data for development/demo
      const dummyPanelist = {
        id: 'dummy-id',
        panelist_id: 'dummy-panelist-id',
        name: 'Jane Doe',
        email: user?.email || 'jane.doe@example.com',
        phone: '123-456-7890',
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        bio: 'Experienced interviewer with a passion for mentoring.',
        avatar_url: '',
        seniority_level: 'Senior',
        status: 'active',
        availability_status: 'available',
        skills: ['React', 'Node.js', 'System Design'],
        certifications: ['AWS Certified Developer'],
        languages: ['English', 'Spanish'],
        interview_types: ['Technical', 'Behavioral'],
        preferred_time_slots: { Monday: ['10:00', '14:00'], Wednesday: ['11:00'] },
        max_interviews_per_week: 5,
        rating: 4.8,
        total_interviews: 120,
        feedback_score: 4.7,
        interviews_converted_to_offers: 35,
        interviews_allocated_per_day: 2,
        projects_worked_on: ['Project A', 'Project B'],
        tools_used: ['Zoom', 'CoderPad'],
        years_experience: 8,
        interview_authorization_level: 'full',
        timezone: 'UTC+5:30',
        total_points: 2450,
        current_level: 7,
        xp_to_next_level: 150,
        monthly_interview_goal: 10,
        weekly_feedback_goal: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setInterviewer(dummyPanelist);
      setMetrics([
        {
          id: 'metric-1',
          panelist_id: 'dummy-id',
          metric_type: 'interviews_conducted',
          metric_value: 12,
          period_start: '2025-06-01',
          period_end: '2025-06-07',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'metric-2',
          panelist_id: 'dummy-id',
          metric_type: 'feedback_score',
          metric_value: 4.9,
          period_start: '2025-06-01',
          period_end: '2025-06-07',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setAchievements([
        {
          id: 'ach-1',
          panelist_id: 'dummy-id',
          achievement_type: 'milestone',
          achievement_name: 'First 100 Interviews',
          description: 'Conducted 100 interviews!',
          icon: '',
          tier: 'gold',
          points_awarded: 500,
          unlocked_at: '2025-05-15T10:00:00Z',
          metadata: {},
          created_at: '2025-05-15T10:00:00Z',
        },
        {
          id: 'ach-2',
          panelist_id: 'dummy-id',
          achievement_type: 'feedback',
          achievement_name: 'Feedback Star',
          description: 'Maintained feedback score above 4.5 for 3 months.',
          icon: '',
          tier: 'silver',
          points_awarded: 200,
          unlocked_at: '2025-04-10T10:00:00Z',
          metadata: {},
          created_at: '2025-04-10T10:00:00Z',
        },
      ]);
      setLeaderboard([
        {
          id: 'leader-1',
          panelist_id: 'dummy-id',
          period_type: 'monthly',
          period_start: '2025-06-01',
          period_end: '2025-06-30',
          rank_position: 1,
          total_points: 2450,
          category: 'overall',
          metadata: {},
          created_at: new Date().toISOString(),
          panelist: dummyPanelist,
        },
        {
          id: 'leader-2',
          panelist_id: 'other-id',
          period_type: 'monthly',
          period_start: '2025-06-01',
          period_end: '2025-06-30',
          rank_position: 2,
          total_points: 2100,
          category: 'overall',
          metadata: {},
          created_at: new Date().toISOString(),
          panelist: {
            ...dummyPanelist,
            id: 'other-id',
            name: 'John Smith',
            email: 'john.smith@example.com',
            total_points: 2100,
          },
        },
      ]);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      
      // Fetch interviewer profile
      const { data: panelistData, error: panelistError } = await supabase
        .from('interview_panelists')
        .select('*')
        .eq('email', user?.email)
        .single();

      if (panelistError || !panelistData) {
        // Provide dummy data for development/demo
        const dummyPanelist = {
          id: 'dummy-id',
          panelist_id: 'dummy-panelist-id',
          name: 'Jane Doe',
          email: user?.email || 'jane.doe@example.com',
          phone: '123-456-7890',
          title: 'Senior Software Engineer',
          department: 'Engineering',
          location: 'Remote',
          bio: 'Experienced interviewer with a passion for mentoring.',
          avatar_url: '',
          seniority_level: 'Senior',
          status: 'active',
          availability_status: 'available',
          skills: ['React', 'Node.js', 'System Design'],
          certifications: ['AWS Certified Developer'],
          languages: ['English', 'Spanish'],
          interview_types: ['Technical', 'Behavioral'],
          preferred_time_slots: { Monday: ['10:00', '14:00'], Wednesday: ['11:00'] },
          max_interviews_per_week: 5,
          rating: 4.8,
          total_interviews: 120,
          feedback_score: 4.7,
          interviews_converted_to_offers: 35,
          interviews_allocated_per_day: 2,
          projects_worked_on: ['Project A', 'Project B'],
          tools_used: ['Zoom', 'CoderPad'],
          years_experience: 8,
          interview_authorization_level: 'full',
          timezone: 'UTC+5:30',
          total_points: 2450,
          current_level: 7,
          xp_to_next_level: 150,
          monthly_interview_goal: 10,
          weekly_feedback_goal: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setInterviewer(dummyPanelist);
        setMetrics([
          {
            id: 'metric-1',
            panelist_id: 'dummy-id',
            metric_type: 'interviews_conducted',
            metric_value: 12,
            period_start: '2025-06-01',
            period_end: '2025-06-07',
            metadata: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'metric-2',
            panelist_id: 'dummy-id',
            metric_type: 'feedback_score',
            metric_value: 4.9,
            period_start: '2025-06-01',
            period_end: '2025-06-07',
            metadata: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
        setAchievements([
          {
            id: 'ach-1',
            panelist_id: 'dummy-id',
            achievement_type: 'milestone',
            achievement_name: 'First 100 Interviews',
            description: 'Conducted 100 interviews!',
            icon: '',
            tier: 'gold',
            points_awarded: 500,
            unlocked_at: '2025-05-15T10:00:00Z',
            metadata: {},
            created_at: '2025-05-15T10:00:00Z',
          },
          {
            id: 'ach-2',
            panelist_id: 'dummy-id',
            achievement_type: 'feedback',
            achievement_name: 'Feedback Star',
            description: 'Maintained feedback score above 4.5 for 3 months.',
            icon: '',
            tier: 'silver',
            points_awarded: 200,
            unlocked_at: '2025-04-10T10:00:00Z',
            metadata: {},
            created_at: '2025-04-10T10:00:00Z',
          },
        ]);
        setLeaderboard([
          {
            id: 'leader-1',
            panelist_id: 'dummy-id',
            period_type: 'monthly',
            period_start: '2025-06-01',
            period_end: '2025-06-30',
            rank_position: 1,
            total_points: 2450,
            category: 'overall',
            metadata: {},
            created_at: new Date().toISOString(),
            panelist: dummyPanelist,
          },
          {
            id: 'leader-2',
            panelist_id: 'other-id',
            period_type: 'monthly',
            period_start: '2025-06-01',
            period_end: '2025-06-30',
            rank_position: 2,
            total_points: 2100,
            category: 'overall',
            metadata: {},
            created_at: new Date().toISOString(),
            panelist: {
              ...dummyPanelist,
              id: 'other-id',
              name: 'John Smith',
              email: 'john.smith@example.com',
              total_points: 2100,
            },
          },
        ]);
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

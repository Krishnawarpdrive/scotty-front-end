
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ScheduledInterview } from '../types/ScheduleTypes';

export const useInterviewSchedule = (panelistId?: string) => {
  const [interviews, setInterviews] = useState<ScheduledInterview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScheduledInterviews = async () => {
    if (!panelistId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('interview_schedules')
        .select(`
          *,
          candidate:candidates(name, email)
        `)
        .eq('panelist_id', panelistId)
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true });

      if (error) {
        console.error('Error fetching interviews:', error);
      } else if (data) {
        // Transform the data to match our interface
        const transformedInterviews: ScheduledInterview[] = data.map(interview => {
          // Handle candidate data with proper null checks
          let candidateData: { name: string; email: string } | null = null;
          
          // Extract candidate data safely
          const candidateInfo = interview.candidate;
          if (candidateInfo && 
              typeof candidateInfo === 'object' && 
              'name' in candidateInfo && 
              'email' in candidateInfo) {
            candidateData = {
              name: (candidateInfo as { name: string; email: string }).name || 'Unknown Candidate',
              email: (candidateInfo as { name: string; email: string }).email || ''
            };
          }

          return {
            id: interview.id,
            candidate_id: interview.candidate_id,
            scheduled_date: interview.scheduled_date,
            duration_minutes: interview.duration_minutes,
            interview_type: interview.interview_type,
            status: interview.status,
            meeting_link: interview.meeting_link || undefined,
            location: interview.location || undefined,
            notes: interview.notes || undefined,
            candidate: candidateData
          };
        });
        setInterviews(transformedInterviews);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledInterviews();
  }, [panelistId]);

  return {
    interviews,
    isLoading,
    refetch: fetchScheduledInterviews
  };
};


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
          
          // Check if candidate data exists and has the expected structure
          if (interview.candidate && 
              typeof interview.candidate === 'object' && 
              !Array.isArray(interview.candidate)) {
            
            // Type assertion after validation
            const candidate = interview.candidate as { name?: string; email?: string };
            
            if (candidate.name !== undefined && candidate.email !== undefined) {
              candidateData = {
                name: candidate.name || 'Unknown Candidate',
                email: candidate.email || ''
              };
            }
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

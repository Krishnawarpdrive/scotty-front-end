
import { supabase } from '@/integrations/supabase/client';
import { interviewScheduleService } from './InterviewScheduleService';
import { panelistAvailabilityService } from './PanelistAvailabilityService';

export const conflictDetectionService = {
  async detectConflicts(panelistId: string, scheduledDate: string, duration: number): Promise<any[]> {
    const endDate = new Date(new Date(scheduledDate).getTime() + duration * 60000).toISOString();
    
    const { data, error } = await supabase
      .from('interview_schedules')
      .select('*')
      .eq('panelist_id', panelistId)
      .eq('status', 'scheduled')
      .or(`and(scheduled_date.lte.${scheduledDate},scheduled_date.gte.${endDate})`);
    
    if (error) throw error;
    return data || [];
  },

  async suggestTimeSlots(panelistId: string, date: string, duration: number): Promise<Array<{ start: string; end: string }>> {
    const availability = await panelistAvailabilityService.getPanelistAvailability(panelistId);
    const existingInterviews = await interviewScheduleService.getInterviewSchedules({
      panelist_id: panelistId,
      date_from: date,
      date_to: date
    });

    const dayOfWeek = new Date(date).getDay();
    const dayAvailability = availability.filter(a => a.day_of_week === dayOfWeek);

    const suggestions: Array<{ start: string; end: string }> = [];
    
    for (const slot of dayAvailability) {
      const startTime = new Date(`${date}T${slot.start_time}`);
      const endTime = new Date(`${date}T${slot.end_time}`);
      
      let currentTime = new Date(startTime);
      while (currentTime.getTime() + duration * 60000 <= endTime.getTime()) {
        const slotEnd = new Date(currentTime.getTime() + duration * 60000);
        
        const hasConflict = existingInterviews.some(interview => {
          const interviewStart = new Date(interview.scheduled_date);
          const interviewEnd = new Date(interviewStart.getTime() + interview.duration_minutes * 60000);
          
          return (currentTime < interviewEnd && slotEnd > interviewStart);
        });
        
        if (!hasConflict) {
          suggestions.push({
            start: currentTime.toISOString(),
            end: slotEnd.toISOString()
          });
        }
        
        currentTime = new Date(currentTime.getTime() + 30 * 60000);
      }
    }
    
    return suggestions;
  }
};

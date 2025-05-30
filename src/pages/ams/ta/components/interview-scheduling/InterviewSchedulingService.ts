
import { supabase } from '@/integrations/supabase/client';

export interface InterviewSchedule {
  id: string;
  candidate_id: string;
  requirement_id?: string;
  panelist_id?: string;
  scheduled_date: string;
  duration_minutes: number;
  interview_type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  timezone: string;
  meeting_link?: string;
  location?: string;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata?: any;
}

export interface PanelistAvailability {
  id: string;
  panelist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
}

export interface InterviewTemplate {
  id: string;
  name: string;
  interview_type: string;
  duration_minutes: number;
  questions: string[];
  checklist_items: string[];
  required_skills: string[];
  is_active: boolean;
  created_by: string;
}

export interface CandidatePreferences {
  id: string;
  candidate_id: string;
  preferred_timezone: string;
  preferred_days: number[];
  preferred_time_slots: Array<{ start: string; end: string }>;
  blackout_dates: string[];
  communication_preferences: any;
}

export const interviewSchedulingService = {
  // Interview Schedules
  async getInterviewSchedules(filters?: any): Promise<InterviewSchedule[]> {
    let query = supabase
      .from('interview_schedules')
      .select('*')
      .order('scheduled_date', { ascending: true });

    if (filters?.panelist_id) {
      query = query.eq('panelist_id', filters.panelist_id);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.date_from) {
      query = query.gte('scheduled_date', filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte('scheduled_date', filters.date_to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createInterviewSchedule(schedule: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<InterviewSchedule> {
    const { data, error } = await supabase
      .from('interview_schedules')
      .insert([schedule])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateInterviewSchedule(id: string, updates: Partial<InterviewSchedule>): Promise<InterviewSchedule> {
    const { data, error } = await supabase
      .from('interview_schedules')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteInterviewSchedule(id: string): Promise<void> {
    const { error } = await supabase
      .from('interview_schedules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Panelist Availability
  async getPanelistAvailability(panelistId: string): Promise<PanelistAvailability[]> {
    const { data, error } = await supabase
      .from('panelist_availability')
      .select('*')
      .eq('panelist_id', panelistId)
      .eq('is_active', true)
      .order('day_of_week');
    
    if (error) throw error;
    return data || [];
  },

  async createPanelistAvailability(availability: Omit<PanelistAvailability, 'id' | 'created_at' | 'updated_at'>): Promise<PanelistAvailability> {
    const { data, error } = await supabase
      .from('panelist_availability')
      .insert([availability])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Interview Templates
  async getInterviewTemplates(): Promise<InterviewTemplate[]> {
    const { data, error } = await supabase
      .from('interview_templates')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async createInterviewTemplate(template: Omit<InterviewTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<InterviewTemplate> {
    const { data, error } = await supabase
      .from('interview_templates')
      .insert([template])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Candidate Preferences
  async getCandidatePreferences(candidateId: string): Promise<CandidatePreferences | null> {
    const { data, error } = await supabase
      .from('candidate_scheduling_preferences')
      .select('*')
      .eq('candidate_id', candidateId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async upsertCandidatePreferences(preferences: Omit<CandidatePreferences, 'id' | 'created_at' | 'updated_at'>): Promise<CandidatePreferences> {
    const { data, error } = await supabase
      .from('candidate_scheduling_preferences')
      .upsert([preferences], { onConflict: 'candidate_id' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Conflict Detection
  async detectConflicts(panelistId: string, scheduledDate: string, duration: number): Promise<any[]> {
    // Check for existing interviews at the same time
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

  // Time slot suggestions
  async suggestTimeSlots(panelistId: string, date: string, duration: number): Promise<Array<{ start: string; end: string }>> {
    const availability = await this.getPanelistAvailability(panelistId);
    const existingInterviews = await this.getInterviewSchedules({
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
      
      // Generate 30-minute intervals
      let currentTime = new Date(startTime);
      while (currentTime.getTime() + duration * 60000 <= endTime.getTime()) {
        const slotEnd = new Date(currentTime.getTime() + duration * 60000);
        
        // Check if this slot conflicts with existing interviews
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
        
        // Move to next 30-minute slot
        currentTime = new Date(currentTime.getTime() + 30 * 60000);
      }
    }
    
    return suggestions;
  }
};

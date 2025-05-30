
import { supabase } from '@/integrations/supabase/client';
import type { InterviewSchedule, InterviewTemplate, CandidatePreferences, PanelistAvailability } from './types/InterviewTypes';

export type { InterviewSchedule, InterviewTemplate, CandidatePreferences, PanelistAvailability };

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
    
    return (data || []).map(item => ({
      ...item,
      status: item.status as 'scheduled' | 'completed' | 'cancelled' | 'rescheduled',
      metadata: item.metadata as Record<string, any> || {}
    }));
  },

  async createInterviewSchedule(schedule: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<InterviewSchedule> {
    const { data, error } = await supabase
      .from('interview_schedules')
      .insert([schedule])
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      status: data.status as 'scheduled' | 'completed' | 'cancelled' | 'rescheduled',
      metadata: data.metadata as Record<string, any> || {}
    };
  },

  async updateInterviewSchedule(id: string, updates: Partial<InterviewSchedule>): Promise<InterviewSchedule> {
    const { data, error } = await supabase
      .from('interview_schedules')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      status: data.status as 'scheduled' | 'completed' | 'cancelled' | 'rescheduled',
      metadata: data.metadata as Record<string, any> || {}
    };
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
    return (data || []).map(item => ({
      ...item,
      questions: Array.isArray(item.questions) ? item.questions.map(q => String(q)) : [],
      checklist_items: Array.isArray(item.checklist_items) ? item.checklist_items.map(c => String(c)) : [],
      required_skills: Array.isArray(item.required_skills) ? item.required_skills.map(s => String(s)) : []
    }));
  },

  async createInterviewTemplate(template: Omit<InterviewTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<InterviewTemplate> {
    const { data, error } = await supabase
      .from('interview_templates')
      .insert([template])
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      questions: Array.isArray(data.questions) ? data.questions.map(q => String(q)) : [],
      checklist_items: Array.isArray(data.checklist_items) ? data.checklist_items.map(c => String(c)) : [],
      required_skills: Array.isArray(data.required_skills) ? data.required_skills.map(s => String(s)) : []
    };
  },

  // Candidate Preferences
  async getCandidatePreferences(candidateId: string): Promise<CandidatePreferences | null> {
    const { data, error } = await supabase
      .from('candidate_scheduling_preferences')
      .select('*')
      .eq('candidate_id', candidateId)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      ...data,
      preferred_days: Array.isArray(data.preferred_days) ? data.preferred_days.map(d => Number(d)) : [],
      preferred_time_slots: Array.isArray(data.preferred_time_slots) ? data.preferred_time_slots as Array<{ start: string; end: string }> : [],
      blackout_dates: Array.isArray(data.blackout_dates) ? data.blackout_dates.map(d => String(d)) : [],
      communication_preferences: data.communication_preferences as Record<string, any> || {}
    };
  },

  async upsertCandidatePreferences(preferences: Omit<CandidatePreferences, 'id' | 'created_at' | 'updated_at'>): Promise<CandidatePreferences> {
    const { data, error } = await supabase
      .from('candidate_scheduling_preferences')
      .upsert([preferences], { onConflict: 'candidate_id' })
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      preferred_days: Array.isArray(data.preferred_days) ? data.preferred_days.map(d => Number(d)) : [],
      preferred_time_slots: Array.isArray(data.preferred_time_slots) ? data.preferred_time_slots as Array<{ start: string; end: string }> : [],
      blackout_dates: Array.isArray(data.blackout_dates) ? data.blackout_dates.map(d => String(d)) : [],
      communication_preferences: data.communication_preferences as Record<string, any> || {}
    };
  },

  // Conflict Detection
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

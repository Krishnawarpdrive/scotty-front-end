
import { supabase } from '@/integrations/supabase/client';
import type { InterviewSchedule } from '../types/InterviewTypes';

export const interviewScheduleService = {
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
  }
};

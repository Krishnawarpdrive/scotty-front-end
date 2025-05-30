
import { supabase } from '@/integrations/supabase/client';
import type { CandidatePreferences } from '../types/InterviewTypes';

export const candidatePreferencesService = {
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
  }
};

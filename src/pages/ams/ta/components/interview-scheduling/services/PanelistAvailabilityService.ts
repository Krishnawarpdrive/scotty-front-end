
import { supabase } from '@/integrations/supabase/client';
import type { PanelistAvailability } from '../types/InterviewTypes';

export const panelistAvailabilityService = {
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
  }
};


import { supabase } from '@/integrations/supabase/client';
import type { InterviewTemplate } from '../types/InterviewTypes';

export const interviewTemplateService = {
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
  }
};

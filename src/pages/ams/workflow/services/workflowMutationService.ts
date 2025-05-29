
import { supabase } from '@/integrations/supabase/client';
import { QualityGateValidation, HandoffDocumentation, WorkflowTransition } from '@/types/WorkflowTypes';

export const workflowMutationService = {
  async createQualityGateValidation(validation: Omit<QualityGateValidation, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('quality_gate_validations')
      .insert([validation])
      .select()
      .single();
    
    if (error) throw error;
    return data as QualityGateValidation;
  },

  async createHandoffDocument(handoff: Omit<HandoffDocumentation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('handoff_documentation')
      .insert([handoff])
      .select()
      .single();
    
    if (error) throw error;
    return data as HandoffDocumentation;
  },

  async updateHandoffDocument(id: string, updates: Partial<HandoffDocumentation>) {
    const { data, error } = await supabase
      .from('handoff_documentation')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as HandoffDocumentation;
  },

  async createWorkflowTransition(transition: Omit<WorkflowTransition, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('workflow_transitions')
      .insert([transition])
      .select()
      .single();
    
    if (error) throw error;
    return data as WorkflowTransition;
  }
};

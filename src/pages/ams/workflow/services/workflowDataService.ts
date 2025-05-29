
import { supabase } from '@/integrations/supabase/client';
import { 
  WorkflowStage, 
  QualityGate, 
  HandoffDocumentation, 
  ExecutiveMetric,
  QualityGateValidation,
  WorkflowTransition 
} from '@/types/WorkflowTypes';

export const workflowDataService = {
  async fetchWorkflowStages(): Promise<WorkflowStage[]> {
    const { data, error } = await supabase
      .from('workflow_stages')
      .select('*')
      .order('stage_order');
    
    if (error) throw error;
    return (data || []) as WorkflowStage[];
  },

  async fetchQualityGates(): Promise<QualityGate[]> {
    const { data, error } = await supabase
      .from('quality_gates')
      .select(`
        *,
        workflow_stage:workflow_stages(*)
      `)
      .eq('is_active', true);
    
    if (error) throw error;
    return (data || []) as QualityGate[];
  },

  async fetchHandoffDocuments(): Promise<HandoffDocumentation[]> {
    const { data, error } = await supabase
      .from('handoff_documentation')
      .select(`
        *,
        from_stage:workflow_stages!handoff_documentation_from_stage_id_fkey(*),
        to_stage:workflow_stages!handoff_documentation_to_stage_id_fkey(*),
        requirement:requirements(*)
      `)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    return (data || []) as HandoffDocumentation[];
  },

  async fetchExecutiveMetrics(): Promise<ExecutiveMetric[]> {
    const { data, error } = await supabase
      .from('executive_metrics')
      .select(`
        *,
        client:clients(*),
        requirement:requirements(*)
      `)
      .gte('measurement_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('measurement_date', { ascending: false });
    
    if (error) throw error;
    return (data || []) as ExecutiveMetric[];
  },

  async fetchQualityGateValidations(): Promise<QualityGateValidation[]> {
    const { data, error } = await supabase
      .from('quality_gate_validations')
      .select(`
        *,
        quality_gate:quality_gates(*),
        requirement:requirements(*)
      `)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    return (data || []) as QualityGateValidation[];
  },

  async fetchWorkflowTransitions(): Promise<WorkflowTransition[]> {
    const { data, error } = await supabase
      .from('workflow_transitions')
      .select(`
        *,
        from_stage:workflow_stages!workflow_transitions_from_stage_id_fkey(*),
        to_stage:workflow_stages!workflow_transitions_to_stage_id_fkey(*),
        requirement:requirements(*)
      `)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    return (data || []) as WorkflowTransition[];
  }
};

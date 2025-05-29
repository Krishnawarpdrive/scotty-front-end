
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  WorkflowStage, 
  QualityGate, 
  HandoffDocumentation, 
  ExecutiveMetric,
  QualityGateValidation,
  WorkflowTransition 
} from '@/types/WorkflowTypes';

export const useWorkflowData = () => {
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>([]);
  const [qualityGates, setQualityGates] = useState<QualityGate[]>([]);
  const [handoffDocuments, setHandoffDocuments] = useState<HandoffDocumentation[]>([]);
  const [executiveMetrics, setExecutiveMetrics] = useState<ExecutiveMetric[]>([]);
  const [qualityGateValidations, setQualityGateValidations] = useState<QualityGateValidation[]>([]);
  const [workflowTransitions, setWorkflowTransitions] = useState<WorkflowTransition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflowStages = async () => {
    try {
      const { data, error } = await supabase
        .from('workflow_stages')
        .select('*')
        .order('stage_order');
      
      if (error) throw error;
      setWorkflowStages(data || []);
    } catch (err) {
      console.error('Error fetching workflow stages:', err);
      throw err;
    }
  };

  const fetchQualityGates = async () => {
    try {
      const { data, error } = await supabase
        .from('quality_gates')
        .select(`
          *,
          workflow_stage:workflow_stages(*)
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      setQualityGates(data || []);
    } catch (err) {
      console.error('Error fetching quality gates:', err);
      throw err;
    }
  };

  const fetchHandoffDocuments = async () => {
    try {
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
      setHandoffDocuments(data || []);
    } catch (err) {
      console.error('Error fetching handoff documents:', err);
      throw err;
    }
  };

  const fetchExecutiveMetrics = async () => {
    try {
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
      setExecutiveMetrics(data || []);
    } catch (err) {
      console.error('Error fetching executive metrics:', err);
      throw err;
    }
  };

  const fetchQualityGateValidations = async () => {
    try {
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
      setQualityGateValidations(data || []);
    } catch (err) {
      console.error('Error fetching quality gate validations:', err);
      throw err;
    }
  };

  const fetchWorkflowTransitions = async () => {
    try {
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
      setWorkflowTransitions(data || []);
    } catch (err) {
      console.error('Error fetching workflow transitions:', err);
      throw err;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchWorkflowStages(),
        fetchQualityGates(),
        fetchHandoffDocuments(),
        fetchExecutiveMetrics(),
        fetchQualityGateValidations(),
        fetchWorkflowTransitions()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflow data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const createQualityGateValidation = async (validation: Omit<QualityGateValidation, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('quality_gate_validations')
        .insert([validation])
        .select()
        .single();
      
      if (error) throw error;
      
      setQualityGateValidations(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating quality gate validation:', err);
      throw err;
    }
  };

  const createHandoffDocument = async (handoff: Omit<HandoffDocumentation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('handoff_documentation')
        .insert([handoff])
        .select()
        .single();
      
      if (error) throw error;
      
      setHandoffDocuments(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating handoff document:', err);
      throw err;
    }
  };

  const updateHandoffDocument = async (id: string, updates: Partial<HandoffDocumentation>) => {
    try {
      const { data, error } = await supabase
        .from('handoff_documentation')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setHandoffDocuments(prev => 
        prev.map(doc => doc.id === id ? { ...doc, ...data } : doc)
      );
      return data;
    } catch (err) {
      console.error('Error updating handoff document:', err);
      throw err;
    }
  };

  const createWorkflowTransition = async (transition: Omit<WorkflowTransition, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('workflow_transitions')
        .insert([transition])
        .select()
        .single();
      
      if (error) throw error;
      
      setWorkflowTransitions(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating workflow transition:', err);
      throw err;
    }
  };

  return {
    workflowStages,
    qualityGates,
    handoffDocuments,
    executiveMetrics,
    qualityGateValidations,
    workflowTransitions,
    loading,
    error,
    refetch: fetchAllData,
    createQualityGateValidation,
    createHandoffDocument,
    updateHandoffDocument,
    createWorkflowTransition
  };
};

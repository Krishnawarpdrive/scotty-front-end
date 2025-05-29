
export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  stage_order: number;
  stage_type: 'sourcing' | 'screening' | 'interview' | 'offer' | 'onboarding';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QualityGate {
  id: string;
  workflow_stage_id: string;
  name: string;
  description?: string;
  gate_type: 'mandatory' | 'optional' | 'conditional';
  criteria: Record<string, any>;
  automatable: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HandoffDocumentation {
  id: string;
  requirement_id: string;
  from_stage_id?: string;
  to_stage_id?: string;
  handoff_type: 'role_creation' | 'candidate_sourcing' | 'screening_complete' | 'interview_ready' | 'offer_approved';
  documentation: Record<string, any>;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  created_by: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface QualityGateValidation {
  id: string;
  quality_gate_id: string;
  requirement_id: string;
  validation_status: 'pending' | 'passed' | 'failed' | 'skipped';
  validation_data: Record<string, any>;
  validated_by?: string;
  validation_notes?: string;
  validated_at?: string;
  created_at: string;
}

export interface ExecutiveMetric {
  id: string;
  metric_type: 'time_to_fill' | 'quality_score' | 'cost_per_hire' | 'candidate_satisfaction' | 'client_satisfaction';
  requirement_id?: string;
  client_id?: string;
  metric_value: number;
  measurement_date: string;
  period_type: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  metadata: Record<string, any>;
  created_at: string;
}

export interface WorkflowTransition {
  id: string;
  requirement_id: string;
  from_stage_id?: string;
  to_stage_id?: string;
  transition_type: 'automatic' | 'manual' | 'quality_gate';
  transition_data: Record<string, any>;
  transitioned_by: string;
  transition_notes?: string;
  created_at: string;
}

export interface WorkflowProgress {
  requirement_id: string;
  current_stage: WorkflowStage;
  stages_completed: WorkflowStage[];
  quality_gates_status: QualityGateValidation[];
  handoff_documents: HandoffDocumentation[];
  progress_percentage: number;
  next_actions: string[];
  blockers: string[];
}

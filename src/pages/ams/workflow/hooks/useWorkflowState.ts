
import { useState } from 'react';
import { 
  WorkflowStage, 
  QualityGate, 
  HandoffDocumentation, 
  ExecutiveMetric,
  QualityGateValidation,
  WorkflowTransition 
} from '@/types/WorkflowTypes';

export const useWorkflowState = () => {
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>([]);
  const [qualityGates, setQualityGates] = useState<QualityGate[]>([]);
  const [handoffDocuments, setHandoffDocuments] = useState<HandoffDocumentation[]>([]);
  const [executiveMetrics, setExecutiveMetrics] = useState<ExecutiveMetric[]>([]);
  const [qualityGateValidations, setQualityGateValidations] = useState<QualityGateValidation[]>([]);
  const [workflowTransitions, setWorkflowTransitions] = useState<WorkflowTransition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return {
    // State
    workflowStages,
    qualityGates,
    handoffDocuments,
    executiveMetrics,
    qualityGateValidations,
    workflowTransitions,
    loading,
    error,
    // Setters
    setWorkflowStages,
    setQualityGates,
    setHandoffDocuments,
    setExecutiveMetrics,
    setQualityGateValidations,
    setWorkflowTransitions,
    setLoading,
    setError
  };
};

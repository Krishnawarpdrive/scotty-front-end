
import { useEffect } from 'react';
import { workflowDataService } from '../services/workflowDataService';
import { useWorkflowState } from './useWorkflowState';
import { useWorkflowActions } from './useWorkflowActions';

export const useWorkflowData = () => {
  const {
    workflowStages,
    qualityGates,
    handoffDocuments,
    executiveMetrics,
    qualityGateValidations,
    workflowTransitions,
    loading,
    error,
    setWorkflowStages,
    setQualityGates,
    setHandoffDocuments,
    setExecutiveMetrics,
    setQualityGateValidations,
    setWorkflowTransitions,
    setLoading,
    setError
  } = useWorkflowState();

  const actions = useWorkflowActions({
    setQualityGateValidations,
    setHandoffDocuments,
    setWorkflowTransitions
  });

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [
        stagesData,
        gatesData,
        handoffsData,
        metricsData,
        validationsData,
        transitionsData
      ] = await Promise.all([
        workflowDataService.fetchWorkflowStages(),
        workflowDataService.fetchQualityGates(),
        workflowDataService.fetchHandoffDocuments(),
        workflowDataService.fetchExecutiveMetrics(),
        workflowDataService.fetchQualityGateValidations(),
        workflowDataService.fetchWorkflowTransitions()
      ]);

      setWorkflowStages(stagesData);
      setQualityGates(gatesData);
      setHandoffDocuments(handoffsData);
      setExecutiveMetrics(metricsData);
      setQualityGateValidations(validationsData);
      setWorkflowTransitions(transitionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflow data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

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
    ...actions
  };
};

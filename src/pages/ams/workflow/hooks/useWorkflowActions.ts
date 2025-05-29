
import { QualityGateValidation, HandoffDocumentation, WorkflowTransition } from '@/types/WorkflowTypes';
import { workflowMutationService } from '../services/workflowMutationService';

interface UseWorkflowActionsProps {
  setQualityGateValidations: React.Dispatch<React.SetStateAction<QualityGateValidation[]>>;
  setHandoffDocuments: React.Dispatch<React.SetStateAction<HandoffDocumentation[]>>;
  setWorkflowTransitions: React.Dispatch<React.SetStateAction<WorkflowTransition[]>>;
}

export const useWorkflowActions = ({
  setQualityGateValidations,
  setHandoffDocuments,
  setWorkflowTransitions
}: UseWorkflowActionsProps) => {
  const createQualityGateValidation = async (validation: Omit<QualityGateValidation, 'id' | 'created_at'>) => {
    try {
      const data = await workflowMutationService.createQualityGateValidation(validation);
      setQualityGateValidations(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating quality gate validation:', err);
      throw err;
    }
  };

  const createHandoffDocument = async (handoff: Omit<HandoffDocumentation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const data = await workflowMutationService.createHandoffDocument(handoff);
      setHandoffDocuments(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating handoff document:', err);
      throw err;
    }
  };

  const updateHandoffDocument = async (id: string, updates: Partial<HandoffDocumentation>) => {
    try {
      const data = await workflowMutationService.updateHandoffDocument(id, updates);
      setHandoffDocuments(prev => 
        prev.map(doc => doc.id === id ? { ...doc, ...data } as HandoffDocumentation : doc)
      );
      return data;
    } catch (err) {
      console.error('Error updating handoff document:', err);
      throw err;
    }
  };

  const createWorkflowTransition = async (transition: Omit<WorkflowTransition, 'id' | 'created_at'>) => {
    try {
      const data = await workflowMutationService.createWorkflowTransition(transition);
      setWorkflowTransitions(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating workflow transition:', err);
      throw err;
    }
  };

  return {
    createQualityGateValidation,
    createHandoffDocument,
    updateHandoffDocument,
    createWorkflowTransition
  };
};

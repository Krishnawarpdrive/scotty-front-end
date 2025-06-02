
import { useState } from 'react';
import { PipelineService } from './services/pipelineService';
import { Stage } from './types/pipelineTypes';

export const usePipelineSaving = (
  roleId?: string,
  pipelineStages: Stage[] = [],
  pipelineId?: string | null,
  setPipelineId?: (id: string | null) => void,
  loadPipelineData?: () => void
) => {
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  const handleSavePipeline = async () => {
    if (!roleId) {
      console.error('No role ID provided for saving pipeline');
      return;
    }

    const { success, pipelineId: newPipelineId, error } = await PipelineService.savePipelineData(
      roleId,
      pipelineStages,
      pipelineId
    );

    if (success && newPipelineId && !pipelineId && setPipelineId) {
      setPipelineId(newPipelineId);
    }

    if (error) {
      console.error('Error saving pipeline:', error);
      return;
    }

    // Handle template saving
    if (saveAsTemplate) {
      const { success: templateSuccess, error: templateError } = await PipelineService.saveAsTemplate(
        roleId,
        pipelineStages
      );

      if (templateError) {
        console.error('Error saving template:', templateError);
      }
    }
  };

  const handleCancel = () => {
    // Reset to last saved state
    if (roleId && loadPipelineData) {
      loadPipelineData();
    }
    setSaveAsTemplate(false);
    setApplyToAll(false);
  };

  return {
    saveAsTemplate,
    setSaveAsTemplate,
    applyToAll,
    setApplyToAll,
    handleSavePipeline,
    handleCancel
  };
};

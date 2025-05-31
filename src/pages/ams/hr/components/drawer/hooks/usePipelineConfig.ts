
import { useState } from 'react';
import { defaultAvailableStages } from './types/pipelineTypes';
import { PipelineService } from './services/pipelineService';
import { usePipelineData } from './usePipelineData';
import { useStageManagement } from './useStageManagement';
import { useStageConfig } from './useStageConfig';

export const usePipelineConfig = (roleId?: string) => {
  const [availableStages] = useState(defaultAvailableStages);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  const {
    pipelineStages,
    setPipelineStages,
    loading,
    pipelineId,
    setPipelineId,
    loadPipelineData
  } = usePipelineData(roleId);

  const {
    addStageToPipeline,
    removeStageFromPipeline,
    reorderStages,
    updateStageConfig
  } = useStageManagement(pipelineStages, setPipelineStages);

  const {
    selectedStage,
    configModalOpen,
    openStageConfig,
    closeStageConfig,
    setConfigModalOpen,
    setSelectedStage
  } = useStageConfig();

  const handleUpdateStageConfig = (stageId: string, config: any) => {
    updateStageConfig(stageId, config);
    closeStageConfig();
  };

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

    if (success && newPipelineId && !pipelineId) {
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
    if (roleId) {
      loadPipelineData();
    }
    setSaveAsTemplate(false);
    setApplyToAll(false);
  };

  return {
    pipelineStages,
    availableStages,
    selectedStage,
    configModalOpen,
    saveAsTemplate,
    applyToAll,
    loading,
    addStageToPipeline,
    removeStageFromPipeline,
    reorderStages,
    openStageConfig,
    updateStageConfig: handleUpdateStageConfig,
    handleSavePipeline,
    handleCancel,
    setSaveAsTemplate,
    setApplyToAll,
    setConfigModalOpen,
    setSelectedStage,
    refreshPipeline: loadPipelineData,
  };
};

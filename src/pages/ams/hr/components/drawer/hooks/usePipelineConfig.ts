
import { useState } from 'react';
import { defaultAvailableStages } from './types/pipelineTypes';
import { usePipelineData } from './usePipelineData';
import { useStageManagement } from './useStageManagement';
import { useStageConfig } from './useStageConfig';
import { usePipelineSaving } from './usePipelineSaving';
import { usePipelineActions } from './usePipelineActions';

export const usePipelineConfig = (roleId?: string) => {
  const [availableStages] = useState(defaultAvailableStages);

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

  const { updateStageConfig: handleUpdateStageConfig } = usePipelineActions(
    updateStageConfig,
    closeStageConfig
  );

  const {
    saveAsTemplate,
    setSaveAsTemplate,
    applyToAll,
    setApplyToAll,
    handleSavePipeline,
    handleCancel
  } = usePipelineSaving(
    roleId,
    pipelineStages,
    pipelineId,
    setPipelineId,
    loadPipelineData
  );

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

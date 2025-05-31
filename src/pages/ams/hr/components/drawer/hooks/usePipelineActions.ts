
import { useCallback } from 'react';
import { Stage } from './types/pipelineTypes';

export const usePipelineActions = (
  updateStageConfig: (stageId: string, config: any) => void,
  closeStageConfig: () => void
) => {
  const handleUpdateStageConfig = useCallback((stageId: string, config: any) => {
    updateStageConfig(stageId, config);
    closeStageConfig();
  }, [updateStageConfig, closeStageConfig]);

  return {
    updateStageConfig: handleUpdateStageConfig
  };
};

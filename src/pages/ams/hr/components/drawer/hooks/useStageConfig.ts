
import { useState, useCallback } from 'react';
import { Stage } from './types/pipelineTypes';

export const useStageConfig = () => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const openStageConfig = useCallback((stage: Stage) => {
    setSelectedStage(stage);
    setConfigModalOpen(true);
  }, []);

  const closeStageConfig = useCallback(() => {
    setConfigModalOpen(false);
    setSelectedStage(null);
  }, []);

  return {
    selectedStage,
    configModalOpen,
    openStageConfig,
    closeStageConfig,
    setConfigModalOpen,
    setSelectedStage
  };
};

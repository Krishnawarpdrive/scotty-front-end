
import { useCallback } from 'react';
import { Stage } from './types/pipelineTypes';

export const useStageManagement = (
  pipelineStages: Stage[],
  setPipelineStages: (stages: Stage[]) => void
) => {
  const addStageToPipeline = useCallback((stage: any) => {
    const newStage: Stage = {
      id: `${stage.id}-${Date.now()}`,
      name: stage.name,
      category: stage.category,
      order: pipelineStages.length + 1,
    };
    setPipelineStages([...pipelineStages, newStage]);
  }, [pipelineStages, setPipelineStages]);

  const removeStageFromPipeline = useCallback((stageId: string) => {
    const filteredStages = pipelineStages.filter(stage => stage.id !== stageId);
    const reorderedStages = filteredStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    setPipelineStages(reorderedStages);
  }, [pipelineStages, setPipelineStages]);

  const reorderStages = useCallback((dragIndex: number, hoverIndex: number) => {
    const draggedStage = pipelineStages[dragIndex];
    const newStages = [...pipelineStages];
    newStages.splice(dragIndex, 1);
    newStages.splice(hoverIndex, 0, draggedStage);
    
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    
    setPipelineStages(reorderedStages);
  }, [pipelineStages, setPipelineStages]);

  const updateStageConfig = useCallback((stageId: string, config: any) => {
    setPipelineStages((stages: Stage[]) =>
      stages.map(stage =>
        stage.id === stageId ? { ...stage, config } : stage
      )
    );
  }, [setPipelineStages]);

  return {
    addStageToPipeline,
    removeStageFromPipeline,
    reorderStages,
    updateStageConfig
  };
};


import { useState, useEffect } from 'react';
import { Stage } from './types/pipelineTypes';
import { PipelineService } from './services/pipelineService';

export const usePipelineData = (roleId?: string) => {
  const [pipelineStages, setPipelineStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pipelineId, setPipelineId] = useState<string | null>(null);

  const setDefaultPipeline = () => {
    const defaultStages: Stage[] = [
      { id: 'phone-default', name: 'Phone Screening', category: 'internal', order: 1 },
      { id: 'internal-interview-default', name: 'Internal Interview', category: 'internal', order: 2 },
    ];
    setPipelineStages(defaultStages);
  };

  const loadPipelineData = async () => {
    if (!roleId) return;

    try {
      setLoading(true);
      const { pipeline, error } = await PipelineService.loadPipelineData(roleId);

      if (error || !pipeline) {
        console.log('No existing pipeline found, setting defaults');
        setDefaultPipeline();
        return;
      }

      setPipelineId(pipeline.id || null);
      setPipelineStages(pipeline.stages);
    } catch (error) {
      console.error('Error loading pipeline data:', error);
      setDefaultPipeline();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      loadPipelineData();
    }
  }, [roleId]);

  return {
    pipelineStages,
    setPipelineStages,
    loading,
    pipelineId,
    setPipelineId,
    loadPipelineData,
    setDefaultPipeline
  };
};

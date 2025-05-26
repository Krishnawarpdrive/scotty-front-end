
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContentItem, CandidateJourneyConfig, JourneyStage } from '../types/CandidateJourneyTypes';
import { EnhancedStage } from '../types/StageTypes';

export const useCandidateJourney = (roleId?: string, pipelineStages?: EnhancedStage[]) => {
  const [contentRepository, setContentRepository] = useState<ContentItem[]>([]);
  const [journeyConfigs, setJourneyConfigs] = useState<CandidateJourneyConfig[]>([]);
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPipeline, setHasPipeline] = useState(false);

  // Check if pipeline exists and has stages
  useEffect(() => {
    setHasPipeline(Boolean(pipelineStages && pipelineStages.length > 0));
  }, [pipelineStages]);

  // Fetch content repository
  const fetchContentRepository = async () => {
    try {
      const { data, error } = await supabase
        .from('content_repository')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContentRepository(data || []);
    } catch (error) {
      console.error('Error fetching content repository:', error);
    }
  };

  // Fetch journey configurations for the role
  const fetchJourneyConfigs = async () => {
    if (!roleId) return;

    try {
      const { data, error } = await supabase
        .from('candidate_journey_configs')
        .select('*')
        .eq('role_id', roleId)
        .order('stage_order');

      if (error) throw error;
      setJourneyConfigs(data || []);
    } catch (error) {
      console.error('Error fetching journey configs:', error);
    }
  };

  // Convert pipeline stages to journey stages
  useEffect(() => {
    if (!pipelineStages) {
      setJourneyStages([]);
      return;
    }

    const stages: JourneyStage[] = pipelineStages.map((stage) => {
      const config = journeyConfigs.find(c => c.stage_id === stage.id);
      const itemCount = config?.items?.length || 0;
      
      let status: 'configured' | 'partially-configured' | 'not-configured' = 'not-configured';
      if (itemCount > 0) {
        const mandatoryItems = config?.items?.filter(item => item.mandatory) || [];
        status = mandatoryItems.length > 0 ? 'configured' : 'partially-configured';
      }

      return {
        id: stage.id,
        name: stage.name,
        type: stage.category,
        order: stage.order,
        config,
        status
      };
    });

    setJourneyStages(stages);
  }, [pipelineStages, journeyConfigs]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchContentRepository(),
        fetchJourneyConfigs()
      ]);
      setLoading(false);
    };

    initializeData();
  }, [roleId]);

  // Add content item to stage
  const addItemToStage = async (stageId: string, contentItemId: string, mandatory: boolean = false) => {
    if (!roleId) return;

    try {
      const stage = journeyStages.find(s => s.id === stageId);
      if (!stage) return;

      const existingConfig = journeyConfigs.find(c => c.stage_id === stageId);
      const newItem = {
        id: `item_${Date.now()}`,
        content_item_id: contentItemId,
        mandatory,
        order: (existingConfig?.items?.length || 0) + 1
      };

      if (existingConfig) {
        // Update existing config
        const updatedItems = [...(existingConfig.items || []), newItem];
        const { error } = await supabase
          .from('candidate_journey_configs')
          .update({ items: updatedItems })
          .eq('id', existingConfig.id);

        if (error) throw error;
      } else {
        // Create new config
        const { error } = await supabase
          .from('candidate_journey_configs')
          .insert({
            role_id: roleId,
            stage_id: stageId,
            stage_order: stage.order,
            stage_type: stage.type,
            items: [newItem]
          });

        if (error) throw error;
      }

      await fetchJourneyConfigs();
    } catch (error) {
      console.error('Error adding item to stage:', error);
    }
  };

  // Remove item from stage
  const removeItemFromStage = async (stageId: string, itemId: string) => {
    try {
      const config = journeyConfigs.find(c => c.stage_id === stageId);
      if (!config) return;

      const updatedItems = config.items.filter(item => item.id !== itemId);
      const { error } = await supabase
        .from('candidate_journey_configs')
        .update({ items: updatedItems })
        .eq('id', config.id);

      if (error) throw error;
      await fetchJourneyConfigs();
    } catch (error) {
      console.error('Error removing item from stage:', error);
    }
  };

  // Toggle item mandatory status
  const toggleItemMandatory = async (stageId: string, itemId: string) => {
    try {
      const config = journeyConfigs.find(c => c.stage_id === stageId);
      if (!config) return;

      const updatedItems = config.items.map(item => 
        item.id === itemId ? { ...item, mandatory: !item.mandatory } : item
      );

      const { error } = await supabase
        .from('candidate_journey_configs')
        .update({ items: updatedItems })
        .eq('id', config.id);

      if (error) throw error;
      await fetchJourneyConfigs();
    } catch (error) {
      console.error('Error toggling item mandatory status:', error);
    }
  };

  return {
    contentRepository,
    journeyStages,
    loading,
    hasPipeline,
    addItemToStage,
    removeItemFromStage,
    toggleItemMandatory,
    refreshData: () => {
      fetchContentRepository();
      fetchJourneyConfigs();
    }
  };
};

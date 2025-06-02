
import { supabase } from '@/integrations/supabase/client';
import { Stage, PipelineData } from '../types/pipelineTypes';

export class PipelineService {
  static async loadPipelineData(roleId: string): Promise<{ pipeline: PipelineData | null; error?: string }> {
    try {
      console.log('Loading pipeline data for role:', roleId);

      const { data: existingPipeline, error } = await supabase
        .from('hiring_pipelines')
        .select('*')
        .eq('role_id', roleId)
        .maybeSingle();

      if (error) {
        console.error('Error loading pipeline:', error);
        return { pipeline: null, error: error.message };
      }

      if (existingPipeline) {
        console.log('Found existing pipeline:', existingPipeline);
        
        const stages = Array.isArray(existingPipeline.stages) 
          ? (existingPipeline.stages as any[]).map((stage: any) => ({
              id: stage.id || `stage-${Date.now()}`,
              name: stage.name || 'Unnamed Stage',
              category: stage.category || 'internal',
              order: stage.order || 1,
              config: stage.config || {}
            } as Stage))
          : [];

        return {
          pipeline: {
            ...existingPipeline,
            stages
          }
        };
      }

      return { pipeline: null };
    } catch (error) {
      console.error('Error in loadPipelineData:', error);
      return { pipeline: null, error: 'Failed to load pipeline data' };
    }
  }

  static async savePipelineData(
    roleId: string, 
    stages: Stage[], 
    pipelineId?: string | null
  ): Promise<{ success: boolean; pipelineId?: string; error?: string }> {
    try {
      console.log('Saving pipeline for role:', roleId);
      
      const stagesToSave = stages.map(stage => ({
        id: stage.id,
        name: stage.name,
        category: stage.category,
        order: stage.order,
        config: stage.config || {}
      }));
      
      if (pipelineId) {
        const { error } = await supabase
          .from('hiring_pipelines')
          .update({ 
            stages: stagesToSave as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', pipelineId);

        if (error) throw error;
        console.log('Pipeline updated successfully');
        return { success: true, pipelineId };
      } else {
        const { data, error } = await supabase
          .from('hiring_pipelines')
          .insert({ 
            role_id: roleId, 
            stages: stagesToSave as any
          })
          .select()
          .single();

        if (error) throw error;
        console.log('Pipeline created successfully');
        return { success: true, pipelineId: data.id };
      }
    } catch (error) {
      console.error('Error saving pipeline:', error);
      return { success: false, error: 'Failed to save pipeline' };
    }
  }

  static async saveAsTemplate(
    roleId: string, 
    stages: Stage[]
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const stagesToSave = stages.map(stage => ({
        id: stage.id,
        name: stage.name,
        category: stage.category,
        order: stage.order,
        config: stage.config || {}
      }));

      const { error } = await supabase
        .from('pipeline_templates')
        .insert({
          name: `${roleId}-pipeline-template`,
          stages: stagesToSave as any,
          created_from_role: roleId,
        });

      if (error) {
        console.error('Error saving template:', error);
        return { success: false, error: error.message };
      }

      console.log('Template saved successfully');
      return { success: true };
    } catch (error) {
      console.error('Error saving template:', error);
      return { success: false, error: 'Failed to save template' };
    }
  }
}

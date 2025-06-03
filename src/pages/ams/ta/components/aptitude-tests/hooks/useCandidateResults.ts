
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CandidateAptitudeResult } from '../types/AptitudeTestTypes';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';

export const useCandidateResults = () => {
  const [results, setResults] = useState<CandidateAptitudeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useEnhancedToast();

  const fetchResults = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('candidate_aptitude_results')
        .select(`
          *,
          candidate:candidates(name, email),
          aptitude_test:aptitude_tests(test_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our type definition
      const transformedData: CandidateAptitudeResult[] = (data || []).map(result => ({
        ...result,
        detailed_results: typeof result.detailed_results === 'object' && result.detailed_results !== null 
          ? result.detailed_results as Record<string, any>
          : {},
        status: result.status as 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
      }));
      
      setResults(transformedData);
    } catch (err: any) {
      toast.error({
        title: 'Error loading results',
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const scheduleTest = async (candidateId: string, testId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('candidate_aptitude_results')
        .insert({
          candidate_id: candidateId,
          aptitude_test_id: testId,
          score: 0,
          status: 'scheduled',
          administered_by: 'current_user'
        });

      if (error) throw error;

      toast.success({
        title: 'Test scheduled successfully',
        description: 'The candidate has been assigned the aptitude test'
      });

      await fetchResults();
      return true;
    } catch (err: any) {
      toast.error({
        title: 'Error scheduling test',
        description: err.message
      });
      return false;
    }
  };

  const updateResult = async (id: string, data: Partial<CandidateAptitudeResult>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('candidate_aptitude_results')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast.success({
        title: 'Result updated successfully',
        description: 'Changes have been saved'
      });

      await fetchResults();
      return true;
    } catch (err: any) {
      toast.error({
        title: 'Error updating result',
        description: err.message
      });
      return false;
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return {
    results,
    loading,
    fetchResults,
    scheduleTest,
    updateResult
  };
};

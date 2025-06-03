
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AptitudeTest, AptitudeTestWithSections, AptitudeTestFormData } from '../types/AptitudeTestTypes';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';

export const useAptitudeTests = () => {
  const [tests, setTests] = useState<AptitudeTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useEnhancedToast();

  const fetchTests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('aptitude_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our type definition
      const transformedData: AptitudeTest[] = (data || []).map(test => ({
        ...test,
        difficulty_level: test.difficulty_level as 'easy' | 'medium' | 'hard',
        skills_assessed: Array.isArray(test.skills_assessed) 
          ? (test.skills_assessed as any[]).map(skill => String(skill))
          : []
      }));
      
      setTests(transformedData);
    } catch (err: any) {
      setError(err.message);
      toast.error({
        title: 'Error loading tests',
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const createTest = async (testData: AptitudeTestFormData): Promise<boolean> => {
    try {
      // Create the main test
      const { data: testResult, error: testError } = await supabase
        .from('aptitude_tests')
        .insert({
          test_name: testData.test_name,
          description: testData.description,
          duration_minutes: testData.duration_minutes,
          total_questions: testData.total_questions,
          passing_score: testData.passing_score,
          category: testData.category,
          difficulty_level: testData.difficulty_level,
          skills_assessed: testData.skills_assessed,
          instructions: testData.instructions,
          is_active: testData.is_active,
          created_by: 'current_user' // In real app, get from auth
        })
        .select()
        .single();

      if (testError) throw testError;

      // Create sections if any
      if (testData.sections.length > 0) {
        const sectionsData = testData.sections.map(section => ({
          ...section,
          aptitude_test_id: testResult.id
        }));

        const { error: sectionsError } = await supabase
          .from('aptitude_test_sections')
          .insert(sectionsData);

        if (sectionsError) throw sectionsError;
      }

      toast.success({
        title: 'Test created successfully',
        description: `${testData.test_name} has been created`
      });

      await fetchTests();
      return true;
    } catch (err: any) {
      toast.error({
        title: 'Error creating test',
        description: err.message
      });
      return false;
    }
  };

  const updateTest = async (id: string, testData: Partial<AptitudeTestFormData>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('aptitude_tests')
        .update(testData)
        .eq('id', id);

      if (error) throw error;

      toast.success({
        title: 'Test updated successfully',
        description: 'Changes have been saved'
      });

      await fetchTests();
      return true;
    } catch (err: any) {
      toast.error({
        title: 'Error updating test',
        description: err.message
      });
      return false;
    }
  };

  const deleteTest = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('aptitude_tests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success({
        title: 'Test deleted successfully',
        description: 'The test has been removed'
      });

      await fetchTests();
      return true;
    } catch (err: any) {
      toast.error({
        title: 'Error deleting test',
        description: err.message
      });
      return false;
    }
  };

  const getTestWithSections = async (id: string): Promise<AptitudeTestWithSections | null> => {
    try {
      const { data: test, error: testError } = await supabase
        .from('aptitude_tests')
        .select('*')
        .eq('id', id)
        .single();

      if (testError) throw testError;

      const { data: sections, error: sectionsError } = await supabase
        .from('aptitude_test_sections')
        .select('*')
        .eq('aptitude_test_id', id)
        .order('section_name');

      if (sectionsError) throw sectionsError;

      // Transform the data to match our type definition
      const transformedTest: AptitudeTestWithSections = {
        ...test,
        difficulty_level: test.difficulty_level as 'easy' | 'medium' | 'hard',
        skills_assessed: Array.isArray(test.skills_assessed) 
          ? (test.skills_assessed as any[]).map(skill => String(skill))
          : [],
        sections: sections || []
      };

      return transformedTest;
    } catch (err: any) {
      toast.error({
        title: 'Error loading test details',
        description: err.message
      });
      return null;
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return {
    tests,
    loading,
    error,
    fetchTests,
    createTest,
    updateTest,
    deleteTest,
    getTestWithSections
  };
};

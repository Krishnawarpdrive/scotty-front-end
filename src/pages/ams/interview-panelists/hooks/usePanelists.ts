
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Panelist, PanelistFilters, CreatePanelistData } from "../types/PanelistTypes";
import { useToast } from "@/hooks/use-toast";

interface UsePanelistsParams extends PanelistFilters {}

export const usePanelists = (filters: UsePanelistsParams = {}) => {
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const transformPanelistData = (data: any): Panelist => ({
    ...data,
    skills: Array.isArray(data.skills) && data.skills.every((item: any) => typeof item === 'string') 
      ? data.skills as string[] 
      : [],
    certifications: Array.isArray(data.certifications) && data.certifications.every((item: any) => typeof item === 'string') 
      ? data.certifications as string[] 
      : [],
    languages: Array.isArray(data.languages) && data.languages.every((item: any) => typeof item === 'string') 
      ? data.languages as string[] 
      : [],
    interview_types: Array.isArray(data.interview_types) && data.interview_types.every((item: any) => typeof item === 'string') 
      ? data.interview_types as string[] 
      : [],
    projects_worked_on: Array.isArray(data.projects_worked_on) && data.projects_worked_on.every((item: any) => typeof item === 'string') 
      ? data.projects_worked_on as string[] 
      : [],
    tools_used: Array.isArray(data.tools_used) && data.tools_used.every((item: any) => typeof item === 'string') 
      ? data.tools_used as string[] 
      : [],
    preferred_time_slots: typeof data.preferred_time_slots === 'object' && data.preferred_time_slots !== null && !Array.isArray(data.preferred_time_slots)
      ? data.preferred_time_slots as Record<string, string[]>
      : {},
    seniority_level: data.seniority_level as Panelist['seniority_level'],
    status: data.status as Panelist['status'],
    availability_status: data.availability_status as Panelist['availability_status'],
    interview_authorization_level: data.interview_authorization_level as Panelist['interview_authorization_level'],
    interviews_allocated_per_day: data.interviews_allocated_per_day || 2,
    interviews_converted_to_offers: data.interviews_converted_to_offers || 0,
    feedback_score: data.feedback_score || 0,
    max_interviews_per_week: data.max_interviews_per_week || 5
  });

  const fetchPanelists = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from('interview_panelists')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.searchQuery) {
        query = query.or(`name.ilike.%${filters.searchQuery}%,title.ilike.%${filters.searchQuery}%,email.ilike.%${filters.searchQuery}%`);
      }

      if (filters.department && filters.department !== "all") {
        query = query.eq('department', filters.department);
      }

      if (filters.status && filters.status !== "all") {
        query = query.eq('status', filters.status);
      }

      if (filters.availability) {
        query = query.eq('availability_status', filters.availability);
      }

      if (filters.seniority && filters.seniority !== "all") {
        query = query.eq('seniority_level', filters.seniority);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      // Transform and filter by skills if provided
      let transformedData = (data || []).map(transformPanelistData);
      if (filters.skills && filters.skills.length > 0) {
        transformedData = transformedData.filter(panelist => {
          const panelistSkills = Array.isArray(panelist.skills) ? panelist.skills : [];
          return filters.skills!.some(skill => 
            panelistSkills.some((pSkill: string) => 
              pSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
        });
      }

      setPanelists(transformedData);
    } catch (err) {
      console.error('Error fetching panelists:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch panelists');
    } finally {
      setIsLoading(false);
    }
  };

  const createPanelist = async (panelistData: CreatePanelistData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('interview_panelists')
        .insert([{
          panelist_id: panelistData.panelist_id,
          name: panelistData.name,
          email: panelistData.email,
          phone: panelistData.phone,
          title: panelistData.title,
          department: panelistData.department,
          location: panelistData.location,
          bio: panelistData.bio,
          seniority_level: panelistData.seniority_level,
          skills: panelistData.skills,
          certifications: panelistData.certifications,
          languages: panelistData.languages,
          interview_types: panelistData.interview_types,
          preferred_time_slots: panelistData.preferred_time_slots,
          max_interviews_per_week: panelistData.max_interviews_per_week,
          interviews_allocated_per_day: panelistData.interviews_allocated_per_day,
          projects_worked_on: panelistData.projects_worked_on,
          tools_used: panelistData.tools_used,
          interview_authorization_level: panelistData.interview_authorization_level
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      await loadPanelists();
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create panelist');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePanelist = async (id: string, updates: Partial<Panelist>) => {
    try {
      const { data: updatedPanelist, error: updateError } = await supabase
        .from('interview_panelists')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const transformedPanelist = transformPanelistData(updatedPanelist);
      setPanelists(prev => 
        prev.map(panelist => 
          panelist.id === id ? transformedPanelist : panelist
        )
      );

      toast({
        title: "Success",
        description: "Panelist updated successfully",
      });
    } catch (err) {
      console.error('Error updating panelist:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update panelist';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const deletePanelist = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('interview_panelists')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setPanelists(prev => prev.filter(panelist => panelist.id !== id));

      toast({
        title: "Success",
        description: "Panelist deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting panelist:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete panelist';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const loadPanelists = async () => {
    await fetchPanelists();
  };

  useEffect(() => {
    loadPanelists();
  }, [filters.searchQuery, filters.department, filters.status, filters.availability, filters.seniority, JSON.stringify(filters.skills)]);

  return {
    panelists,
    isLoading,
    error,
    createPanelist,
    updatePanelist,
    deletePanelist,
    refetch: loadPanelists
  };
};

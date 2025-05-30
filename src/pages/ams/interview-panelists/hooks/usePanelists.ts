
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Panelist, PanelistFilters, CreatePanelistData } from "../types/PanelistTypes";
import { useToast } from "@/hooks/use-toast";

interface UsePanelistsParams extends PanelistFilters {}

export const usePanelists = (filters: UsePanelistsParams = {}) => {
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

      if (filters.department) {
        query = query.eq('department', filters.department);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.availability) {
        query = query.eq('availability_status', filters.availability);
      }

      if (filters.seniority) {
        query = query.eq('seniority_level', filters.seniority);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      // Filter by skills if provided
      let filteredData = data || [];
      if (filters.skills && filters.skills.length > 0) {
        filteredData = filteredData.filter(panelist => {
          const panelistSkills = Array.isArray(panelist.skills) ? panelist.skills : [];
          return filters.skills!.some(skill => 
            panelistSkills.some((pSkill: string) => 
              pSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
        });
      }

      setPanelists(filteredData);
    } catch (err) {
      console.error('Error fetching panelists:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch panelists');
    } finally {
      setIsLoading(false);
    }
  };

  const createPanelist = async (data: CreatePanelistData) => {
    try {
      const { data: newPanelist, error: createError } = await supabase
        .from('interview_panelists')
        .insert([data])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      setPanelists(prev => [newPanelist, ...prev]);
      
      toast({
        title: "Success",
        description: "Panelist created successfully",
      });

      return newPanelist;
    } catch (err) {
      console.error('Error creating panelist:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create panelist';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
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

      setPanelists(prev => 
        prev.map(panelist => 
          panelist.id === id ? updatedPanelist : panelist
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

  useEffect(() => {
    fetchPanelists();
  }, [filters.searchQuery, filters.department, filters.status, filters.availability, filters.seniority, JSON.stringify(filters.skills)]);

  return {
    panelists,
    isLoading,
    error,
    createPanelist,
    updatePanelist,
    deletePanelist,
    refetch: fetchPanelists
  };
};

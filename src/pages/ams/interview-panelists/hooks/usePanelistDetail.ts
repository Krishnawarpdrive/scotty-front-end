
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Panelist } from "../types/PanelistTypes";

export const usePanelistDetail = (panelistId: string | null) => {
  const [panelist, setPanelist] = useState<Panelist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPanelistDetail = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('interview_panelists')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our Panelist interface with proper type handling
      const transformedData: Panelist = {
        ...data,
        skills: Array.isArray(data.skills) && data.skills.every(item => typeof item === 'string') 
          ? data.skills as string[] 
          : [],
        certifications: Array.isArray(data.certifications) && data.certifications.every(item => typeof item === 'string') 
          ? data.certifications as string[] 
          : [],
        languages: Array.isArray(data.languages) && data.languages.every(item => typeof item === 'string') 
          ? data.languages as string[] 
          : [],
        interview_types: Array.isArray(data.interview_types) && data.interview_types.every(item => typeof item === 'string') 
          ? data.interview_types as string[] 
          : [],
        projects_worked_on: Array.isArray(data.projects_worked_on) && data.projects_worked_on.every(item => typeof item === 'string') 
          ? data.projects_worked_on as string[] 
          : [],
        tools_used: Array.isArray(data.tools_used) && data.tools_used.every(item => typeof item === 'string') 
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
        timezone: data.timezone || 'UTC',
        years_experience: data.years_experience || 0
      };

      setPanelist(transformedData);
    } catch (err) {
      console.error('Error fetching panelist detail:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch panelist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (panelistId) {
      fetchPanelistDetail(panelistId);
    } else {
      setPanelist(null);
      setError(null);
    }
  }, [panelistId]);

  return {
    panelist,
    isLoading,
    error,
    refetch: () => panelistId ? fetchPanelistDetail(panelistId) : null
  };
};

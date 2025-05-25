
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GlobalRole {
  id: string;
  name: string;
  employment_type: string;
  work_mode: string;
  experience_range: string;
  department: string;
  description?: string;
  recommended_skills?: string[];
  recommended_certifications?: string[];
}

export interface SkillLibrary {
  id: string;
  name: string;
  category: string;
  role_relevance?: string[];
}

export interface CertificationLibrary {
  id: string;
  title: string;
  domain: string;
  validity_period?: string;
  description?: string;
}

export interface ChecklistLibrary {
  id: string;
  title: string;
  type: 'general' | 'role_based' | 'client_specific';
  role_relevance?: string[];
  description?: string;
}

export const useRoleLibraries = () => {
  const [globalRoles, setGlobalRoles] = useState<GlobalRole[]>([]);
  const [skillsLibrary, setSkillsLibrary] = useState<SkillLibrary[]>([]);
  const [certificationsLibrary, setCertificationsLibrary] = useState<CertificationLibrary[]>([]);
  const [checklistsLibrary, setChecklistsLibrary] = useState<ChecklistLibrary[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch global roles with search
  const searchGlobalRoles = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setGlobalRoles([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('global_roles')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .limit(10);

      if (error) {
        console.error('Error fetching global roles:', error);
        setGlobalRoles([]);
      } else {
        setGlobalRoles(data || []);
      }
    } catch (error) {
      console.error('Error fetching global roles:', error);
      setGlobalRoles([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch skills library with real-time updates
  const fetchSkillsLibrary = async (roleId?: string) => {
    try {
      const { data, error } = await supabase
        .from('skills_library')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching skills library:', error);
      } else {
        setSkillsLibrary(data || []);
      }
    } catch (error) {
      console.error('Error fetching skills library:', error);
    }
  };

  // Fetch certifications library with real-time updates
  const fetchCertificationsLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('certification_library')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching certifications library:', error);
      } else {
        setCertificationsLibrary(data || []);
      }
    } catch (error) {
      console.error('Error fetching certifications library:', error);
    }
  };

  // Fetch checklists library with real-time updates
  const fetchChecklistsLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('checklist_library')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching checklists library:', error);
      } else {
        // Cast the data to match our interface type
        const typedData = (data || []).map(item => ({
          ...item,
          type: item.type as 'general' | 'role_based' | 'client_specific'
        }));
        setChecklistsLibrary(typedData);
      }
    } catch (error) {
      console.error('Error fetching checklists library:', error);
    }
  };

  // Set up real-time subscriptions for all libraries
  useEffect(() => {
    fetchSkillsLibrary();
    fetchCertificationsLibrary();
    fetchChecklistsLibrary();

    // Subscribe to skills_library changes
    const skillsChannel = supabase
      .channel('skills-library-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'skills_library'
      }, () => {
        fetchSkillsLibrary();
      })
      .subscribe();

    // Subscribe to certification_library changes
    const certificationsChannel = supabase
      .channel('certifications-library-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'certification_library'
      }, () => {
        fetchCertificationsLibrary();
      })
      .subscribe();

    // Subscribe to checklist_library changes
    const checklistsChannel = supabase
      .channel('checklists-library-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'checklist_library'
      }, () => {
        fetchChecklistsLibrary();
      })
      .subscribe();

    // Subscribe to global_roles changes
    const globalRolesChannel = supabase
      .channel('global-roles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'global_roles'
      }, () => {
        // Refetch if there's an active search
        // You might want to maintain search state here
      })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(skillsChannel);
      supabase.removeChannel(certificationsChannel);
      supabase.removeChannel(checklistsChannel);
      supabase.removeChannel(globalRolesChannel);
    };
  }, []);

  return {
    globalRoles,
    skillsLibrary,
    certificationsLibrary,
    checklistsLibrary,
    loading,
    searchGlobalRoles,
    fetchSkillsLibrary,
    refetchLibraries: () => {
      fetchSkillsLibrary();
      fetchCertificationsLibrary();
      fetchChecklistsLibrary();
    }
  };
};

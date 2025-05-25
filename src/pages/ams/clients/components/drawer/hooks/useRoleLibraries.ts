
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
      console.log('Fetching skills library...');
      const { data, error } = await supabase
        .from('skills_library')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching skills library:', error);
        setSkillsLibrary([]);
      } else {
        console.log('Skills library fetched:', data?.length || 0, 'items');
        setSkillsLibrary(data || []);
      }
    } catch (error) {
      console.error('Error fetching skills library:', error);
      setSkillsLibrary([]);
    }
  };

  // Fetch certifications library with real-time updates
  const fetchCertificationsLibrary = async () => {
    try {
      console.log('Fetching certifications library...');
      const { data, error } = await supabase
        .from('certification_library')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching certifications library:', error);
        setCertificationsLibrary([]);
      } else {
        console.log('Certifications library fetched:', data?.length || 0, 'items');
        setCertificationsLibrary(data || []);
      }
    } catch (error) {
      console.error('Error fetching certifications library:', error);
      setCertificationsLibrary([]);
    }
  };

  // Fetch checklists library with real-time updates
  const fetchChecklistsLibrary = async () => {
    try {
      console.log('Fetching checklists library...');
      const { data, error } = await supabase
        .from('checklist_library')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching checklists library:', error);
        setChecklistsLibrary([]);
      } else {
        console.log('Checklists library fetched:', data?.length || 0, 'items');
        // Cast the data to match our interface type
        const typedData = (data || []).map(item => ({
          ...item,
          type: item.type as 'general' | 'role_based' | 'client_specific'
        }));
        setChecklistsLibrary(typedData);
      }
    } catch (error) {
      console.error('Error fetching checklists library:', error);
      setChecklistsLibrary([]);
    }
  };

  // Set up real-time subscriptions for all libraries
  useEffect(() => {
    console.log('Setting up library subscriptions and initial fetch...');
    
    // Initial fetch of all libraries
    fetchSkillsLibrary();
    fetchCertificationsLibrary();
    fetchChecklistsLibrary();

    // Subscribe to skills_library changes
    const skillsChannel = supabase
      .channel('skills-library-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'skills_library'
      }, (payload) => {
        console.log('Skills library changed:', payload);
        fetchSkillsLibrary();
      })
      .subscribe();

    // Subscribe to certification_library changes
    const certificationsChannel = supabase
      .channel('certifications-library-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'certification_library'
      }, (payload) => {
        console.log('Certifications library changed:', payload);
        fetchCertificationsLibrary();
      })
      .subscribe();

    // Subscribe to checklist_library changes
    const checklistsChannel = supabase
      .channel('checklists-library-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'checklist_library'
      }, (payload) => {
        console.log('Checklists library changed:', payload);
        fetchChecklistsLibrary();
      })
      .subscribe();

    // Subscribe to global_roles changes
    const globalRolesChannel = supabase
      .channel('global-roles-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'global_roles'
      }, (payload) => {
        console.log('Global roles changed:', payload);
        // You might want to maintain search state here and refetch if needed
      })
      .subscribe();

    // Subscribe to roles table changes (for templates)
    const rolesChannel = supabase
      .channel('roles-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'roles'
      }, (payload) => {
        console.log('Roles table changed:', payload);
      })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      console.log('Cleaning up library subscriptions...');
      supabase.removeChannel(skillsChannel);
      supabase.removeChannel(certificationsChannel);
      supabase.removeChannel(checklistsChannel);
      supabase.removeChannel(globalRolesChannel);
      supabase.removeChannel(rolesChannel);
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
      console.log('Manually refetching all libraries...');
      fetchSkillsLibrary();
      fetchCertificationsLibrary();
      fetchChecklistsLibrary();
    }
  };
};

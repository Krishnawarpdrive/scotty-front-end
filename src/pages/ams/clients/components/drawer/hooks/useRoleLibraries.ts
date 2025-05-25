
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

  // Fetch skills library
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

  // Fetch certifications library
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

  // Fetch checklists library
  const fetchChecklistsLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('checklist_library')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching checklists library:', error);
      } else {
        setChecklistsLibrary(data || []);
      }
    } catch (error) {
      console.error('Error fetching checklists library:', error);
    }
  };

  useEffect(() => {
    fetchSkillsLibrary();
    fetchCertificationsLibrary();
    fetchChecklistsLibrary();
  }, []);

  return {
    globalRoles,
    skillsLibrary,
    certificationsLibrary,
    checklistsLibrary,
    loading,
    searchGlobalRoles,
    fetchSkillsLibrary
  };
};


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
      // For now, using mock data. In production, this would be:
      // const { data } = await supabase
      //   .from('global_roles')
      //   .select('*')
      //   .ilike('name', `%${searchTerm}%`)
      //   .limit(10);

      const mockRoles: GlobalRole[] = [
        {
          id: '1',
          name: 'Software Engineer',
          employment_type: 'Full-time',
          work_mode: 'Remote',
          experience_range: '2-5 years',
          department: 'Engineering',
          description: 'Develop and maintain software applications',
          recommended_skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
          recommended_certifications: ['AWS Certified Developer', 'React Certification']
        },
        {
          id: '2',
          name: 'Frontend Developer',
          employment_type: 'Full-time',
          work_mode: 'Hybrid',
          experience_range: '1-3 years',
          department: 'Engineering',
          description: 'Build user interfaces and experiences',
          recommended_skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js'],
          recommended_certifications: ['Frontend Masters Certificate', 'Google UX Design']
        },
        {
          id: '3',
          name: 'Product Manager',
          employment_type: 'Full-time',
          work_mode: 'Onsite',
          experience_range: '3-7 years',
          department: 'Product',
          description: 'Lead product strategy and development',
          recommended_skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
          recommended_certifications: ['Certified Scrum Product Owner', 'Google Analytics']
        }
      ];

      const filtered = mockRoles.filter(role => 
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setGlobalRoles(filtered);
    } catch (error) {
      console.error('Error fetching global roles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch skills library
  const fetchSkillsLibrary = async (roleId?: string) => {
    try {
      // Mock data for skills
      const mockSkills: SkillLibrary[] = [
        { id: '1', name: 'JavaScript', category: 'Programming', role_relevance: ['Software Engineer', 'Frontend Developer'] },
        { id: '2', name: 'React', category: 'Framework', role_relevance: ['Software Engineer', 'Frontend Developer'] },
        { id: '3', name: 'Node.js', category: 'Backend', role_relevance: ['Software Engineer'] },
        { id: '4', name: 'TypeScript', category: 'Programming', role_relevance: ['Software Engineer', 'Frontend Developer'] },
        { id: '5', name: 'Product Strategy', category: 'Management', role_relevance: ['Product Manager'] },
        { id: '6', name: 'Agile', category: 'Methodology', role_relevance: ['Product Manager'] },
        { id: '7', name: 'User Research', category: 'Research', role_relevance: ['Product Manager'] },
        { id: '8', name: 'HTML', category: 'Markup', role_relevance: ['Frontend Developer'] },
        { id: '9', name: 'CSS', category: 'Styling', role_relevance: ['Frontend Developer'] },
        { id: '10', name: 'Vue.js', category: 'Framework', role_relevance: ['Frontend Developer'] }
      ];

      setSkillsLibrary(mockSkills);
    } catch (error) {
      console.error('Error fetching skills library:', error);
    }
  };

  // Fetch certifications library
  const fetchCertificationsLibrary = async () => {
    try {
      // Mock data for certifications
      const mockCertifications: CertificationLibrary[] = [
        { id: '1', title: 'AWS Certified Developer', domain: 'Cloud Computing', validity_period: '3 years' },
        { id: '2', title: 'React Certification', domain: 'Frontend Development', validity_period: '2 years' },
        { id: '3', title: 'Frontend Masters Certificate', domain: 'Frontend Development', validity_period: 'Lifetime' },
        { id: '4', title: 'Google UX Design', domain: 'Design', validity_period: '1 year' },
        { id: '5', title: 'Certified Scrum Product Owner', domain: 'Agile', validity_period: '2 years' },
        { id: '6', title: 'Google Analytics', domain: 'Analytics', validity_period: '1 year' }
      ];

      setCertificationsLibrary(mockCertifications);
    } catch (error) {
      console.error('Error fetching certifications library:', error);
    }
  };

  // Fetch checklists library
  const fetchChecklistsLibrary = async () => {
    try {
      // Mock data for checklists
      const mockChecklists: ChecklistLibrary[] = [
        { id: '1', title: 'Resume Review', type: 'general', description: 'Review candidate resume' },
        { id: '2', title: 'Phone Screening', type: 'general', description: 'Initial phone interview' },
        { id: '3', title: 'Technical Assessment', type: 'general', description: 'Assess technical skills' },
        { id: '4', title: 'Cultural Fit Interview', type: 'general', description: 'Evaluate cultural alignment' },
        { id: '5', title: 'Coding Challenge', type: 'role_based', role_relevance: ['Software Engineer', 'Frontend Developer'] },
        { id: '6', title: 'System Design Interview', type: 'role_based', role_relevance: ['Software Engineer'] },
        { id: '7', title: 'Product Case Study', type: 'role_based', role_relevance: ['Product Manager'] },
        { id: '8', title: 'Company Culture Assessment', type: 'client_specific', description: 'Client-specific culture fit' },
        { id: '9', title: 'Remote Work Capability', type: 'client_specific', description: 'Assess remote work skills' }
      ];

      setChecklistsLibrary(mockChecklists);
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

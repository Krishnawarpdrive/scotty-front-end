
import { useState } from "react";
import { CreatePanelistData } from "../../types/PanelistTypes";

export const usePanelistForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePanelistData>({
    panelist_id: `panelist_${Date.now()}`,
    name: '',
    email: '',
    phone: '',
    title: '',
    department: '',
    location: '',
    bio: '',
    status: 'active',
    availability_status: 'available',
    seniority_level: 'mid',
    skills: [],
    certifications: [],
    languages: [],
    interview_types: [],
    preferred_time_slots: {},
    max_interviews_per_week: 5,
    interviews_allocated_per_day: 2,
    projects_worked_on: [],
    tools_used: [],
    interview_authorization_level: 'basic',
    timezone: 'UTC',
    years_experience: 0
  });

  const resetForm = () => {
    setFormData({
      panelist_id: `panelist_${Date.now()}`,
      name: '',
      email: '',
      phone: '',
      title: '',
      department: '',
      location: '',
      bio: '',
      status: 'active',
      availability_status: 'available',
      seniority_level: 'mid',
      skills: [],
      certifications: [],
      languages: [],
      interview_types: [],
      preferred_time_slots: {},
      max_interviews_per_week: 5,
      interviews_allocated_per_day: 2,
      projects_worked_on: [],
      tools_used: [],
      interview_authorization_level: 'basic',
      timezone: 'UTC',
      years_experience: 0
    });
  };

  const updateFormData = (field: keyof CreatePanelistData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    setLoading,
    resetForm,
    updateFormData
  };
};

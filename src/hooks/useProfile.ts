
import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/ProfileTypes';
import { PersonaType } from '@/utils/persona';

// Mock data for development - replace with actual API calls
const mockProfiles: Record<PersonaType, Partial<UserProfile>> = {
  ams: {
    professional_data: {
      department: 'Administration',
      access_level: 'full',
      managed_locations: ['all'],
      specializations: ['system_admin', 'compliance']
    }
  },
  hr: {
    professional_data: {
      department: 'Human Resources',
      team_size: 15,
      specializations: ['recruitment', 'employee_relations'],
      certifications: ['PHR', 'SHRM-CP']
    }
  },
  ta: {
    professional_data: {
      department: 'Talent Acquisition',
      hiring_goals: { monthly: 10, quarterly: 30 },
      specializations: ['technical_recruiting', 'executive_search'],
      performance_metrics: {
        placement_rate: 0.85,
        time_to_fill: 25,
        client_satisfaction: 4.7
      }
    }
  },
  candidate: {
    professional_data: {
      current_role: 'Software Engineer',
      experience_years: 5,
      skills: ['React', 'TypeScript', 'Node.js'],
      availability: 'actively_looking',
      preferred_locations: ['Remote', 'San Francisco']
    }
  },
  vendor: {
    professional_data: {
      company_name: 'TechStaff Solutions',
      partnership_tier: 'premium',
      specializations: ['IT', 'Engineering', 'Healthcare'],
      performance_rating: 4.5,
      active_contracts: 12
    }
  },
  interviewer: {
    professional_data: {
      expertise_areas: ['Technical', 'Behavioral'],
      interview_types: ['video', 'in_person', 'phone'],
      availability_hours: '9AM-6PM PST',
      rating: 4.8
    }
  },
  'client-hr': {
    professional_data: {
      company_name: 'TechCorp Inc',
      hiring_volume: 'high',
      preferred_vendors: ['vendor1', 'vendor2'],
      budget_range: '$50K-$150K'
    }
  },
  bo: {
    professional_data: {
      business_units: ['all'],
      focus_areas: ['growth', 'efficiency', 'compliance'],
      kpi_targets: {
        revenue_growth: 0.15,
        cost_reduction: 0.10,
        client_satisfaction: 0.95
      }
    }
  }
};

export const useProfile = (persona: PersonaType) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockProfile: UserProfile = {
          id: '1',
          user_id: 'user-1',
          persona,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1-555-0123',
          avatar_url: undefined,
          bio: 'Experienced professional in talent acquisition and human resources.',
          timezone: 'America/New_York',
          language: 'en',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: new Date().toISOString(),
          professional_data: mockProfiles[persona]?.professional_data || {},
          preferences: {
            theme: 'light',
            compact_mode: false,
            dashboard_layout: 'default',
            notification_preferences: {
              email_notifications: true,
              push_notifications: true,
              in_app_notifications: true,
              digest_frequency: 'daily',
              notification_types: {
                system_updates: true,
                task_reminders: true,
                collaboration: true,
                security: true
              }
            },
            accessibility_settings: {
              high_contrast: false,
              large_text: false,
              reduced_motion: false,
              screen_reader_mode: false,
              keyboard_navigation: false
            }
          },
          privacy_settings: {
            profile_visibility: 'team',
            activity_visibility: true,
            data_sharing_consent: true,
            marketing_consent: false
          }
        };
        
        setProfile(mockProfile);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [persona]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedProfile = {
        ...profile,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
};

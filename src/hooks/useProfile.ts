
import { useState } from 'react';
import { UserProfile } from '@/types/profile';

export const useProfile = (persona?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // Return a default profile with proper structure
    return {
      id: "demo-user",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Senior Developer",
      department: "Engineering",
      avatarUrl: undefined,
      bio: "Passionate developer with 5+ years of experience in full-stack development.",
      location: "San Francisco, CA",
      phone: "+1 (555) 123-4567",
      joinDate: "2020-01-15",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      achievements: ["Employee of the Month", "Technical Excellence Award"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
      },
      preferences: {
        theme: "light",
        notifications: true,
        emailUpdates: true,
        compact_mode: false,
        dashboard_layout: "default",
        notification_preferences: {
          email: true,
          push: true,
          inApp: true,
          email_notifications: true,
          push_notifications: true,
          in_app_notifications: true,
          digest_frequency: "daily"
        },
        accessibility_settings: {
          highContrast: false,
          fontSize: "medium",
          reduceMotion: false
        }
      },
      privacy_settings: {
        profile_visibility: "public",
        contact_visibility: "connections",
        activity_visibility: "private",
        data_sharing_consent: false
      },
      first_name: "John",
      last_name: "Doe",
      language: "en",
      timezone: "America/New_York"
    };
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (profile) {
        setProfile({ ...profile, ...updatedProfile });
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
};

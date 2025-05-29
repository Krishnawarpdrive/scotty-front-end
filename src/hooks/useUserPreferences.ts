
import { useState, useEffect } from 'react';
import { UserPreferences } from '@/types/ProfileTypes';
import { PersonaType } from '@/utils/persona';

const defaultPreferences: UserPreferences = {
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
};

export const useUserPreferences = (persona: PersonaType) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        
        // Try to load from localStorage first
        const storedPrefs = localStorage.getItem(`user-preferences-${persona}`);
        if (storedPrefs) {
          const parsed = JSON.parse(storedPrefs);
          setPreferences({ ...defaultPreferences, ...parsed });
        } else {
          // Simulate API call to load preferences
          await new Promise(resolve => setTimeout(resolve, 300));
          setPreferences(defaultPreferences);
        }
      } catch (err) {
        setError('Failed to load preferences');
        console.error('Preferences load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [persona]);

  const updatePreference = async (key: keyof UserPreferences, value: any) => {
    try {
      const updatedPreferences = {
        ...preferences,
        [key]: value
      };
      
      setPreferences(updatedPreferences);
      
      // Save to localStorage
      localStorage.setItem(`user-preferences-${persona}`, JSON.stringify(updatedPreferences));
      
      // Simulate API call to save preferences
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return updatedPreferences;
    } catch (err) {
      setError('Failed to update preference');
      throw err;
    }
  };

  const resetPreferences = async () => {
    try {
      setPreferences(defaultPreferences);
      localStorage.removeItem(`user-preferences-${persona}`);
      
      // Simulate API call to reset preferences
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (err) {
      setError('Failed to reset preferences');
      throw err;
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreference,
    resetPreferences
  };
};

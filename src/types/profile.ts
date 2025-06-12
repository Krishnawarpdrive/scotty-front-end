
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  phone?: string;
  joinDate: string;
  skills?: string[];
  achievements?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  preferences: UserPreferences;
  privacy_settings: PrivacySettings;
  // Additional fields for compatibility with SettingsPage
  first_name?: string;
  last_name?: string;
  language?: string;
  timezone?: string;
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  emailUpdates: boolean;
  compact_mode: boolean;
  dashboard_layout: string;
  notification_preferences: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    email_notifications: boolean;
    push_notifications: boolean;
    in_app_notifications: boolean;
    digest_frequency: string;
  };
  accessibility_settings: {
    highContrast: boolean;
    fontSize: string;
    reduceMotion: boolean;
  };
}

export interface PrivacySettings {
  profile_visibility: string;
  contact_visibility: string;
  activity_visibility: string;
  data_sharing_consent: boolean;
}

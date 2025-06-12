
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
  preferences?: UserPreferences;
  privacy_settings?: {
    profile_visibility: string;
    contact_visibility: string;
    activity_visibility: string;
  };
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  emailUpdates: boolean;
  compact_mode?: boolean;
  dashboard_layout?: string;
  notification_preferences?: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  accessibility_settings?: {
    highContrast: boolean;
    fontSize: string;
    reduceMotion: boolean;
  };
}

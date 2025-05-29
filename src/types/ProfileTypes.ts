
export interface UserProfile {
  id: string;
  user_id: string;
  persona: 'ams' | 'hr' | 'ta' | 'candidate' | 'vendor' | 'interviewer' | 'client-hr' | 'bo';
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  timezone: string;
  language: string;
  created_at: string;
  updated_at: string;
  
  // Role-specific data stored as JSON
  professional_data: Record<string, any>;
  preferences: UserPreferences;
  privacy_settings: PrivacySettings;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  compact_mode: boolean;
  dashboard_layout: string;
  notification_preferences: NotificationPreferences;
  accessibility_settings: AccessibilitySettings;
}

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;
  digest_frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  notification_types: {
    system_updates: boolean;
    task_reminders: boolean;
    collaboration: boolean;
    security: boolean;
  };
}

export interface AccessibilitySettings {
  high_contrast: boolean;
  large_text: boolean;
  reduced_motion: boolean;
  screen_reader_mode: boolean;
  keyboard_navigation: boolean;
}

export interface PrivacySettings {
  profile_visibility: 'public' | 'team' | 'private';
  activity_visibility: boolean;
  data_sharing_consent: boolean;
  marketing_consent: boolean;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  assigned_to?: string;
  context_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

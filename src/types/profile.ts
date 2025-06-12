
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
  preferences?: {
    theme: string;
    notifications: boolean;
    emailUpdates: boolean;
  };
  privacy_settings?: {
    profile_visibility: string;
    contact_visibility: string;
    activity_visibility: string;
  };
}


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export type AppRole = 'hr' | 'candidate' | 'interviewer' | 'vendor' | 'client-hr' | 'bo' | 'ams' | 'ta' | 'admin' | 'user' | 'manager' | 'executive';

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

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchUserProfile(user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setRoles([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileData) {
        setProfile({
          id: profileData.user_id,
          name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim(),
          email: profileData.email || '',
          role: 'user', // Default role
          department: profileData.department || '',
          avatarUrl: profileData.avatar_url || undefined,
          bio: undefined, // Not in current schema
          location: undefined, // Not in current schema
          phone: profileData.phone || undefined,
          joinDate: profileData.created_at || '',
          skills: [], // Not in current schema
          achievements: [], // Not in current schema
          socialLinks: {}, // Not in current schema
          preferences: {
            theme: 'light',
            notifications: true,
            emailUpdates: true
          },
          privacy_settings: {
            profile_visibility: 'public',
            contact_visibility: 'connections',
            activity_visibility: 'private'
          }
        });
      }

      // Fetch user roles
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (rolesData) {
        setRoles(rolesData.map(r => r.role as AppRole));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const hasRole = (role: AppRole): boolean => {
    return roles.includes(role);
  };

  const hasAnyRole = (requiredRoles: AppRole[]): boolean => {
    return requiredRoles.some(role => roles.includes(role));
  };

  const isAdmin = (): boolean => {
    return hasAnyRole(['admin', 'ams']);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refetch = () => {
    if (user) {
      fetchUserProfile(user.id);
    }
  };

  return {
    user,
    profile,
    roles,
    loading,
    hasRole,
    hasAnyRole,
    isAdmin,
    signOut,
    refetch
  };
};

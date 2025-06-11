import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'user' | 'manager' | 'hr' | 'candidate' | 'interviewer' | 'executive' | 'ta' | 'vendor' | 'client-hr' | 'bo' | 'ams';

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  department: string | null;
  timezone: string;
  preferences: any;
  created_at: string | null;
  updated_at: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
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
      const { data: profileData, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (profileData) {
        // Transform the data to match UserProfile interface
        const transformedProfile: UserProfile = {
          ...profileData,
          timezone: profileData.timezone || 'UTC'
        };
        setProfile(transformedProfile);
      }

      // Fetch user roles (mock for now)
      setRoles(['user']);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const hasRole = (role: AppRole): boolean => {
    return roles.includes(role);
  };

  const hasAnyRole = (checkRoles: AppRole[]): boolean => {
    return checkRoles.some(role => roles.includes(role));
  };

  const isAdmin = (): boolean => {
    return roles.includes('admin');
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
    refetch,
  };
};

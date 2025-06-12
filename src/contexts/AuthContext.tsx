
import React, { createContext, useContext } from 'react';
import { useAuth, UserProfile } from '@/hooks/useAuth';
import { User } from '@supabase/supabase-js';

// Define AppRole type consistently
export type AppRole = 'hr' | 'candidate' | 'interviewer' | 'vendor' | 'client-hr' | 'bo' | 'ams' | 'ta' | 'admin' | 'user' | 'manager' | 'executive';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  roles: AppRole[];
  loading: boolean;
  hasRole: (role: AppRole) => boolean;
  hasAnyRole: (roles: AppRole[]) => boolean;
  isAdmin: () => boolean;
  signOut: () => Promise<void>;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

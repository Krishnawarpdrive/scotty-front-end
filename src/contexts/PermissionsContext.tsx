
import React, { createContext, useContext } from 'react';
import { usePermissions, Permission } from '@/hooks/usePermissions';

interface PermissionsContextType {
  permissions: Permission[];
  loading: boolean;
  hasPermission: (resource: string, action: string) => boolean;
  canRead: (resource: string) => boolean;
  canWrite: (resource: string) => boolean;
  canDelete: (resource: string) => boolean;
  refetch: () => void;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const permissions = usePermissions();

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissionsContext() {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissionsContext must be used within a PermissionsProvider');
  }
  return context;
}


import React from 'react';
import { useAuthContext, AppRole } from '@/contexts/AuthContext';
import { usePermissionsContext } from '@/contexts/PermissionsContext';

interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requiredPermissions?: Array<{ resource: string; action: string }>;
  fallback?: React.ReactNode;
  hide?: boolean; // If true, renders nothing instead of fallback
}

export function RoleBasedComponent({
  children,
  allowedRoles,
  requiredPermissions,
  fallback = null,
  hide = false
}: RoleBasedComponentProps) {
  const { user, hasAnyRole } = useAuthContext();
  const { hasPermission } = usePermissionsContext();

  // Not authenticated
  if (!user) {
    return hide ? null : fallback;
  }

  // Check role requirements
  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasAnyRole(allowedRoles)) {
      return hide ? null : fallback;
    }
  }

  // Check permission requirements
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(({ resource, action }) =>
      hasPermission(resource, action)
    );

    if (!hasAllPermissions) {
      return hide ? null : fallback;
    }
  }

  return <>{children}</>;
}

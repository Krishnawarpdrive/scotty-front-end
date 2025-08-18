
import React from 'react';
import { useAuthContext, AppRole } from '@/contexts/AuthContext';
import { usePermissionsContext } from '@/contexts/PermissionsContext';

interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requiredPermissions?: Array<{ resource: string; action: string }>;
  fallback?: React.ReactNode;
  hide?: boolean;
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

  if (!user) {
    return hide ? null : fallback;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasAnyRole(allowedRoles)) {
      return hide ? null : fallback;
    }
  }

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

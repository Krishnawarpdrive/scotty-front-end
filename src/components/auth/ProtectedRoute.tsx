
import React from 'react';
import { useAuthContext, AppRole } from '@/contexts/AuthContext';
import { usePermissionsContext } from '@/contexts/PermissionsContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: AppRole[];
  requiredPermissions?: Array<{ resource: string; action: string }>;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles, 
  requiredPermissions,
  fallback 
}: ProtectedRouteProps) {
  const { user, loading: authLoading, hasAnyRole } = useAuthContext();
  const { hasPermission, loading: permissionsLoading } = usePermissionsContext();

  // Show loading state while checking auth
  if (authLoading || permissionsLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return fallback || (
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertDescription>
          You must be logged in to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  // Check role requirements
  if (requiredRoles && requiredRoles.length > 0) {
    if (!hasAnyRole(requiredRoles)) {
      return fallback || (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            You don't have the required role to access this page. Required roles: {requiredRoles.join(', ')}
          </AlertDescription>
        </Alert>
      );
    }
  }

  // Check permission requirements
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(({ resource, action }) =>
      hasPermission(resource, action)
    );

    if (!hasAllPermissions) {
      return fallback || (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            You don't have the required permissions to access this page.
          </AlertDescription>
        </Alert>
      );
    }
  }

  return <>{children}</>;
}

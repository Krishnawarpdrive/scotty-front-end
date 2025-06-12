
import React from 'react';
import { useAuthContext, AppRole } from '@/contexts/AuthContext';
import { PersonaType, personaConfigs } from '@/types/persona';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert } from 'lucide-react';

interface PersonaRouteProps {
  children: React.ReactNode;
  allowedPersonas: PersonaType[];
  fallback?: React.ReactNode;
}

export function PersonaRoute({ 
  children, 
  allowedPersonas,
  fallback 
}: PersonaRouteProps) {
  const { user, profile, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

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

  // Check if user has any of the allowed personas
  // For now, we'll use a simple role check - this can be enhanced with actual persona detection
  const userRoles = profile?.role ? [profile.role as AppRole] : [];
  const hasAccess = allowedPersonas.some(persona => 
    userRoles.includes(persona as AppRole)
  );

  if (!hasAccess) {
    return fallback || (
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertDescription>
          You don't have access to this page. Required personas: {allowedPersonas.map(p => personaConfigs[p].name).join(', ')}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}

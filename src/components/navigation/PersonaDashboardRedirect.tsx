
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonaDetection } from '@/hooks/usePersonaDetection';
import { personaConfigs } from '@/types/persona';
import { Skeleton } from '@/components/ui/skeleton';

export const PersonaDashboardRedirect: React.FC = () => {
  const { currentPersona, loading } = usePersonaDetection();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentPersona) {
      const config = personaConfigs[currentPersona];
      if (config && config.routes.length > 0) {
        // Navigate to the first route (usually dashboard) of the persona
        navigate(config.routes[0]);
      }
    }
  }, [currentPersona, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }

  if (!currentPersona) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Persona Assigned</h2>
          <p className="text-gray-600">Please contact your administrator to assign you a role.</p>
        </div>
      </div>
    );
  }

  return null;
};

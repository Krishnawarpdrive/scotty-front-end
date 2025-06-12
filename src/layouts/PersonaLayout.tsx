
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PersonaNavigation } from '@/components/navigation/PersonaNavigation';
import { usePersonaDetection } from '@/hooks/usePersonaDetection';
import { Skeleton } from '@/components/ui/skeleton';

export const PersonaLayout: React.FC = () => {
  const { currentPersona, loading } = usePersonaDetection();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b p-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PersonaNavigation currentPersona={currentPersona || undefined} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

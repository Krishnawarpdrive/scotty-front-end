
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PersonaType, personaConfigs } from '@/types/persona';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/contexts/AuthContext';

interface PersonaNavigationProps {
  currentPersona?: PersonaType;
}

export const PersonaNavigation: React.FC<PersonaNavigationProps> = ({ currentPersona }) => {
  const location = useLocation();
  const { profile } = useAuthContext();

  if (!currentPersona || !personaConfigs[currentPersona]) {
    return null;
  }

  const config = personaConfigs[currentPersona];
  const routes = config.routes;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-900">
            {config.name} Dashboard
          </div>
          <div className={cn("px-2 py-1 rounded text-xs font-medium", config.color)}>
            {profile?.name || 'User'}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {routes.map((route) => {
            const isActive = location.pathname === route;
            const routeName = route.split('/').pop()?.replace('-', ' ') || 'Dashboard';
            
            return (
              <Button
                key={route}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "capitalize",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <Link to={route}>
                  {routeName}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

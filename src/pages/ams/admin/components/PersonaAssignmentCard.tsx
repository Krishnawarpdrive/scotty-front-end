
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PersonaType, personaConfigs } from '@/types/persona';
import { Users, Shield } from 'lucide-react';

interface PersonaAssignmentCardProps {
  persona: PersonaType;
  userCount: number;
  onViewUsers: (persona: PersonaType) => void;
  onManagePermissions: (persona: PersonaType) => void;
}

export const PersonaAssignmentCard: React.FC<PersonaAssignmentCardProps> = ({
  persona,
  userCount,
  onViewUsers,
  onManagePermissions
}) => {
  const config = personaConfigs[persona];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{config.name}</CardTitle>
          <Badge className={config.color}>
            {userCount} users
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Permissions</h4>
          <div className="flex flex-wrap gap-1">
            {config.permissions.slice(0, 3).map((permission) => (
              <Badge key={permission} variant="outline" className="text-xs">
                {permission}
              </Badge>
            ))}
            {config.permissions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{config.permissions.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewUsers(persona)}
            className="flex items-center gap-1"
          >
            <Users className="h-3 w-3" />
            View Users
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManagePermissions(persona)}
            className="flex items-center gap-1"
          >
            <Shield className="h-3 w-3" />
            Permissions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

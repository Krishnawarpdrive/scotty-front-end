
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, Briefcase } from 'lucide-react';

interface PersonaProfileProps {
  name: string;
  role: string;
  department: string;
  experience: string;
  skills: string[];
  location: string;
  avatar?: string;
  isOnline?: boolean;
  lastActive?: string;
  completedProjects?: number;
  teamSize?: number;
}

export const PersonaProfileCard: React.FC<PersonaProfileProps> = ({
  name,
  role,
  department,
  experience,
  skills,
  location,
  avatar,
  isOnline = false,
  lastActive,
  completedProjects = 0,
  teamSize = 0
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="relative inline-block">
          <Avatar className="w-20 h-20 mx-auto">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-lg font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <p className="text-muted-foreground">{role}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>Team: {teamSize}</span>
          </div>
          <div className="text-muted-foreground">
            Projects: {completedProjects}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>📍 {location}</p>
          {lastActive && <p>Last active: {lastActive}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

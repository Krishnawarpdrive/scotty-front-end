
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/types/ProfileTypes';
import { PersonaType, personaConfigs } from '@/utils/persona';
import { User, MapPin, Clock, Globe } from 'lucide-react';

interface PersonaProfileCardProps {
  profile: UserProfile;
  className?: string;
}

export const PersonaProfileCard: React.FC<PersonaProfileCardProps> = ({
  profile,
  className = ''
}) => {
  const personaConfig = personaConfigs[profile.persona];
  
  const getPersonaSpecificInfo = () => {
    const data = profile.professional_data;
    
    switch (profile.persona) {
      case 'hr':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Team Size:</span> {data.team_size || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Department:</span> {data.department || 'N/A'}
            </div>
            {data.certifications && (
              <div className="col-span-2">
                <span className="font-medium">Certifications:</span>
                <div className="flex gap-1 mt-1">
                  {data.certifications.map((cert: string) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'ta':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Monthly Goal:</span> {data.hiring_goals?.monthly || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Placement Rate:</span> {((data.performance_metrics?.placement_rate || 0) * 100).toFixed(0)}%
            </div>
            <div>
              <span className="font-medium">Avg. Time to Fill:</span> {data.performance_metrics?.time_to_fill || 'N/A'} days
            </div>
            <div>
              <span className="font-medium">Client Rating:</span> ⭐ {data.performance_metrics?.client_satisfaction || 'N/A'}
            </div>
          </div>
        );
      
      case 'candidate':
        return (
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Current Role:</span> {data.current_role || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Experience:</span> {data.experience_years || 'N/A'} years
            </div>
            <div>
              <span className="font-medium">Status:</span> 
              <Badge variant="outline" className="ml-2">
                {data.availability?.replace('_', ' ') || 'Not specified'}
              </Badge>
            </div>
            {data.skills && (
              <div>
                <span className="font-medium">Top Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.skills.slice(0, 5).map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'vendor':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Company:</span> {data.company_name || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Tier:</span> 
              <Badge variant="outline" className="ml-2 capitalize">
                {data.partnership_tier || 'Standard'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Rating:</span> ⭐ {data.performance_rating || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Active Contracts:</span> {data.active_contracts || 'N/A'}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Department:</span> {data.department || personaConfig.name}
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url} alt={`${profile.first_name} ${profile.last_name}`} />
            <AvatarFallback className="text-lg">
              {profile.first_name[0]}{profile.last_name[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl">
              {profile.first_name} {profile.last_name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="capitalize">
                {personaConfig.name}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {profile.bio || 'No bio available'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {profile.email}
          </div>
          {profile.phone && (
            <div className="flex items-center gap-1">
              <span>📞</span>
              {profile.phone}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {profile.timezone}
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            {profile.language.toUpperCase()}
          </div>
        </div>
        
        <div className="border-t pt-4">
          {getPersonaSpecificInfo()}
        </div>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Award 
} from 'lucide-react';

interface PersonaProfileCardProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  avatarUrl?: string;
}

export const PersonaProfileCard: React.FC<PersonaProfileCardProps> = ({
  name,
  title,
  email,
  phone,
  location,
  experience,
  education,
  skills,
  avatarUrl
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : (
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${email}`} className="text-sm hover:underline">
              {email}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${phone}`} className="text-sm hover:underline">
              {phone}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{experience}</span>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{education}</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div> */}
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full justify-center">
            <Award className="h-4 w-4 mr-2" /> View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

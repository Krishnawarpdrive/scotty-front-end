import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CircleUserRound, Briefcase, GraduationCap, Lightbulb, MapPin, CheckCircle2, Clock4, Users2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { profile } = useAuth();

  // Mock profile data that matches the expected interface
  const mockProfile = {
    name: profile?.first_name && profile?.last_name 
      ? `${profile.first_name} ${profile.last_name}` 
      : 'Unknown User',
    role: 'Software Developer',
    department: profile?.department || 'Engineering',
    experience: '5+ years',
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    location: 'Remote',
    avatar: profile?.avatar || undefined,
    isOnline: true,
    lastActive: 'Now',
    completedProjects: 12,
    teamSize: 8
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          <Badge variant="secondary">
            <CircleUserRound className="mr-2 h-4 w-4" />
            {mockProfile.isOnline ? 'Online' : 'Offline'}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockProfile.avatar} alt={mockProfile.name} />
              <AvatarFallback>{mockProfile.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{mockProfile.name}</h2>
              <p className="text-gray-500">{mockProfile.role} - {mockProfile.department}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Experience: {mockProfile.experience}
                </p>
                <p className="flex items-center text-gray-600">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Education: Bachelor's in Computer Science
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location: {mockProfile.location}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {mockProfile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Activity</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Completed Projects: {mockProfile.completedProjects}
                </p>
                <p className="flex items-center text-gray-600">
                  <Users2 className="mr-2 h-4 w-4" />
                  Team Size: {mockProfile.teamSize}
                </p>
                <p className="flex items-center text-gray-600">
                  <Clock4 className="mr-2 h-4 w-4" />
                  Last Active: {mockProfile.lastActive}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Email: {profile?.email || 'N/A'}
                </p>
                <p className="flex items-center text-gray-600">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Phone: N/A
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <Button>Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

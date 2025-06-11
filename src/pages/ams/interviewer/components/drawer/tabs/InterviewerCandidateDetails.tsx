
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Clock
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerCandidateDetailsProps {
  interview: Interview;
}

export const InterviewerCandidateDetails: React.FC<InterviewerCandidateDetailsProps> = ({
  interview
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Mock candidate data - in real implementation, this would come from props
  const candidateDetails = {
    email: interview.candidateEmail,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    experience: '5+ years',
    education: 'BS Computer Science, Stanford University',
    currentRole: 'Senior Software Engineer at TechCorp',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    summary: 'Experienced full-stack developer with a passion for building scalable web applications. Strong background in modern JavaScript frameworks and cloud technologies.'
  };

  return (
    <div className="space-y-6">
      {/* Candidate Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={interview.candidateName} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                {getInitials(interview.candidateName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl">{interview.candidateName}</CardTitle>
              <p className="text-gray-600">{candidateDetails.currentRole}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{candidateDetails.experience}</Badge>
                <Badge variant="secondary">{interview.roleName}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{candidateDetails.summary}</p>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{candidateDetails.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{candidateDetails.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{candidateDetails.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Interview Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{interview.scheduledDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{interview.duration} minutes</span>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{interview.interviewType}</span>
          </div>
          {interview.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{interview.location}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education & Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Education</span>
            </div>
            <p className="text-sm text-gray-700 ml-6">{candidateDetails.education}</p>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-6">
              {candidateDetails.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

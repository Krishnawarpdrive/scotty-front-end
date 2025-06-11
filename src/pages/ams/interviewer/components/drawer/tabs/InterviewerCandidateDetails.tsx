
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Briefcase,
  Download,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewerCandidateDetailsProps {
  interview: Interview;
}

export const InterviewerCandidateDetails: React.FC<InterviewerCandidateDetailsProps> = ({
  interview
}) => {
  // Mock candidate data
  const candidateDetails = {
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    currentCompany: 'TechCorp Inc.',
    currentPosition: 'Senior Frontend Developer',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    education: 'B.S. Computer Science - Stanford University',
    resumeUrl: '#',
    linkedinUrl: '#'
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Mail className="h-5 w-5 mr-2 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-3 text-gray-400" />
            <span>{candidateDetails.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-3 text-gray-400" />
            <span>{candidateDetails.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-3 text-gray-400" />
            <span>{candidateDetails.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Professional Background */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-green-600" />
            Professional Background
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Current Position</h4>
            <div className="flex items-center text-sm text-gray-600">
              <Building className="h-4 w-4 mr-2" />
              <span>{candidateDetails.currentPosition} at {candidateDetails.currentCompany}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Experience</h4>
            <p className="text-sm text-gray-600">{candidateDetails.experience}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidateDetails.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Education</h4>
            <p className="text-sm text-gray-600">{candidateDetails.education}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents & Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Download className="h-5 w-5 mr-2 text-purple-600" />
            Documents & Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            View LinkedIn Profile
          </Button>
        </CardContent>
      </Card>

      {/* Interview Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
            Interview Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <p className="text-gray-600">{interview.date}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Time:</span>
              <p className="text-gray-600">{interview.time}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type:</span>
              <p className="text-gray-600">{interview.type}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <p className="text-gray-600">60 minutes</p>
            </div>
          </div>
          
          {interview.location && (
            <div className="pt-2 border-t">
              <span className="font-medium text-gray-700 text-sm">Location:</span>
              <p className="text-gray-600 text-sm">{interview.location}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Building,
  DollarSign,
  Users,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationDetailPageProps {
  applicationId: string;
  onBack: () => void;
}

interface FullApplicationDetails {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  location: string;
  employmentType: string;
  workMode: string;
  salaryRange: string;
  teamSize: string;
  reportingTo: string;
  jobDescription: string;
  requirements: string[];
  skillsRequired: string[];
  responsibilities: string[];
  benefits: string[];
  companyDescription: string;
  applicationStages: {
    name: string;
    status: 'completed' | 'current' | 'pending';
    completedDate?: string;
    description: string;
  }[];
}

export const CandidateApplicationDetailPage: React.FC<ApplicationDetailPageProps> = ({
  applicationId,
  onBack
}) => {
  // Mock data - in real implementation, this would be fetched based on applicationId
  const application: FullApplicationDetails = {
    id: applicationId,
    roleName: 'Senior Frontend Developer',
    companyName: 'TechCorp Inc',
    appliedDate: '2024-01-15',
    currentStage: 'Technical Interview',
    progress: 65,
    status: 'active',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    salaryRange: '$120,000 - $150,000',
    teamSize: '8-12 developers',
    reportingTo: 'Engineering Manager',
    companyDescription: 'TechCorp Inc is a leading technology company focused on building innovative solutions for the modern workplace. We value collaboration, creativity, and continuous learning.',
    jobDescription: `We are seeking a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, ensuring technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.

Key responsibilities include:
• Develop new user-facing features using modern JavaScript frameworks
• Build reusable code and libraries for future use
• Ensure technical feasibility of UI/UX designs
• Optimize application for maximum speed and scalability
• Collaborate with back-end developers and web designers
• Stay up-to-date on emerging technologies`,
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in frontend development',
      'Strong proficiency in JavaScript, HTML5, and CSS3',
      'Experience with React.js and its ecosystem',
      'Knowledge of state management (Redux, Context API)',
      'Experience with RESTful APIs and GraphQL',
      'Familiarity with version control systems (Git)',
      'Understanding of responsive design principles',
      'Experience with testing frameworks (Jest, Cypress)',
      'Strong problem-solving and communication skills'
    ],
    skillsRequired: [
      'JavaScript', 'React.js', 'TypeScript', 'HTML5', 'CSS3', 'Redux',
      'GraphQL', 'Node.js', 'Git', 'Jest', 'Webpack', 'Responsive Design'
    ],
    responsibilities: [
      'Develop and maintain user-facing web applications',
      'Collaborate with UI/UX designers to implement designs',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and provide constructive feedback',
      'Mentor junior developers and share knowledge',
      'Contribute to technical architecture decisions',
      'Ensure cross-browser compatibility and performance optimization',
      'Work closely with backend developers for API integration'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements (remote/hybrid options)',
      'Professional development budget ($2,000/year)',
      'Unlimited PTO policy',
      'Stock options',
      '401(k) with company matching',
      'Modern office with free meals and snacks',
      'Team building events and company retreats'
    ],
    applicationStages: [
      {
        name: 'Application Submitted',
        status: 'completed',
        completedDate: '2024-01-15',
        description: 'Your application has been received and is under review'
      },
      {
        name: 'Initial Screening',
        status: 'completed',
        completedDate: '2024-01-18',
        description: 'HR review of your application and basic qualifications'
      },
      {
        name: 'Phone Screening',
        status: 'completed',
        completedDate: '2024-01-22',
        description: 'Brief phone call with the hiring manager'
      },
      {
        name: 'Technical Interview',
        status: 'current',
        description: 'Technical assessment and coding interview'
      },
      {
        name: 'Team Interview',
        status: 'pending',
        description: 'Meet with your potential team members'
      },
      {
        name: 'Final Interview',
        status: 'pending',
        description: 'Final interview with senior leadership'
      },
      {
        name: 'Offer',
        status: 'pending',
        description: 'Offer discussion and negotiation'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Applications
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{application.roleName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Building className="h-4 w-4 text-gray-600" />
                <span className="text-lg text-gray-600">{application.companyName}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {application.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {application.employmentType} • {application.workMode}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {application.salaryRange}
                </div>
              </div>
            </div>
            <Badge className={cn(
              application.status === 'active' ? 'bg-blue-100 text-blue-700' :
              application.status === 'offer' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            )}>
              {application.status}
            </Badge>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Application Progress</span>
              <span>{application.progress}%</span>
            </div>
            <Progress value={application.progress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Application Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.applicationStages.map((stage, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center mt-1',
                    stage.status === 'completed' ? 'bg-green-100' :
                    stage.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                  )}>
                    {stage.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className={cn(
                        'w-3 h-3 rounded-full',
                        stage.status === 'current' ? 'bg-blue-600' : 'bg-gray-400'
                      )} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className={cn(
                        'font-medium',
                        stage.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                      )}>
                        {stage.name}
                      </h3>
                      {stage.completedDate && (
                        <span className="text-sm text-gray-500">{stage.completedDate}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              About {application.companyName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{application.companyDescription}</p>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Size</p>
                  <p className="text-sm text-gray-900">{application.teamSize}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reports To</p>
                  <p className="text-sm text-gray-900">{application.reportingTo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Work Mode</p>
                  <p className="text-sm text-gray-900">{application.workMode}</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{application.jobDescription}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>Key Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {application.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">{responsibility}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {application.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Required Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {application.skillsRequired.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <span className="font-medium text-blue-900">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {application.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

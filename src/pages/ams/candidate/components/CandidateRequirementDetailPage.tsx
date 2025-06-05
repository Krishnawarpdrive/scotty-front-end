
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Phone, Video } from 'lucide-react';
import { RequirementOverviewCard } from './requirement-detail/RequirementOverviewCard';
import { EnhancedStageProgressTracker } from './requirement-detail/EnhancedStageProgressTracker';
import { StageDetailsSection } from './requirement-detail/StageDetailsSection';
import { CandidateDocumentsManager } from './requirement-detail/CandidateDocumentsManager';

interface CandidateRequirementDetailPageProps {
  requirementId: string;
  onBack: () => void;
}

export const CandidateRequirementDetailPage: React.FC<CandidateRequirementDetailPageProps> = ({
  requirementId,
  onBack
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(2); // Current stage index
  const [requirement] = useState({
    id: requirementId,
    roleName: 'Senior Frontend Developer',
    companyName: 'TechCorp Inc',
    location: 'San Francisco, CA (Hybrid)',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    appliedDate: 'January 15, 2024',
    currentStage: 'Technical Interview',
    status: 'Active',
    priority: 'High',
    salaryRange: '$120,000 - $150,000',
    teamSize: '8-12 engineers',
    department: 'Engineering',
    hiringManager: 'Sarah Johnson',
    companyRating: 4.5,
    description: `We are seeking a Senior Frontend Developer to join our dynamic engineering team. You will be responsible for building user-facing features, ensuring technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability. This role offers the opportunity to work with cutting-edge technologies and collaborate with a talented team of engineers, designers, and product managers.`,
    keyRequirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency in React.js and TypeScript',
      'Experience with state management (Redux, Context API)',
      'Knowledge of modern build tools (Webpack, Vite)',
      'Understanding of responsive design principles',
      'Experience with testing frameworks (Jest, Cypress)',
      'Strong problem-solving and communication skills'
    ],
    benefits: [
      'Health Insurance',
      'Dental Coverage',
      'Stock Options',
      'Flexible PTO',
      'Remote Work',
      'Learning Budget',
      '401(k) Matching'
    ]
  });

  const [stages] = useState([
    {
      id: '1',
      name: 'Application Submitted',
      status: 'completed' as const,
      type: 'document' as const,
      completedDate: 'Jan 15, 2024',
      estimatedTime: '5 min'
    },
    {
      id: '2',
      name: 'Phone Screening',
      status: 'completed' as const,
      type: 'interview' as const,
      completedDate: 'Jan 18, 2024',
      estimatedTime: '30 min'
    },
    {
      id: '3',
      name: 'Technical Interview',
      status: 'current' as const,
      type: 'interview' as const,
      dueDate: 'Tomorrow 2:00 PM',
      estimatedTime: '1 hour',
      hasAction: true
    },
    {
      id: '4',
      name: 'Team Interview',
      status: 'pending' as const,
      type: 'interview' as const,
      estimatedTime: '45 min'
    },
    {
      id: '5',
      name: 'Final Review',
      status: 'pending' as const,
      type: 'assessment' as const,
      estimatedTime: '3-5 days'
    }
  ]);

  const [stageDetails] = useState({
    id: '3',
    name: 'Technical Interview',
    description: 'Technical assessment focusing on React, TypeScript, and system design. This interview will evaluate your coding skills, problem-solving approach, and technical communication.',
    status: 'current' as const,
    progress: 50,
    interviewer: 'Mike Johnson (Lead Developer)',
    location: 'Video Call (Google Meet)',
    duration: '60 minutes',
    content: [
      {
        id: '1',
        type: 'video' as const,
        title: 'Interview Preparation Video',
        description: 'Watch this 15-minute video to understand our interview process and expectations',
        isRequired: false,
        isCompleted: true,
        estimatedTime: '15 minutes',
        videoUrl: '#'
      },
      {
        id: '2',
        type: 'document' as const,
        title: 'Technical Guidelines',
        description: 'Download and review the technical interview guidelines and coding standards',
        isRequired: true,
        isCompleted: true,
        downloadUrl: '#',
        estimatedTime: '5 minutes'
      },
      {
        id: '3',
        type: 'interview' as const,
        title: 'Technical Interview Session',
        description: 'Live technical interview covering React, TypeScript, and system design concepts',
        isRequired: true,
        isCompleted: false,
        dueDate: 'Tomorrow 2:00 PM',
        estimatedTime: '60 minutes',
        instructions: 'Ensure you have a stable internet connection, quiet environment, and your preferred IDE ready'
      }
    ],
    nextSteps: [
      'Complete the technical interview session',
      'Wait for feedback from the interview panel (1-2 business days)',
      'If successful, proceed to team interview round'
    ],
    supportContact: 'sarah.recruiter@techcorp.com'
  });

  const [documents] = useState([
    {
      id: '1',
      name: 'Resume/CV',
      type: 'resume',
      status: 'approved' as const,
      uploadedDate: 'Jan 15, 2024',
      size: '2.4 MB',
      downloadUrl: '#',
      isRequired: true
    },
    {
      id: '2',
      name: 'Cover Letter',
      type: 'cover_letter',
      status: 'approved' as const,
      uploadedDate: 'Jan 15, 2024',
      size: '1.2 MB',
      downloadUrl: '#',
      isRequired: true
    },
    {
      id: '3',
      name: 'Portfolio/Work Samples',
      type: 'portfolio',
      status: 'uploaded' as const,
      uploadedDate: 'Jan 16, 2024',
      size: '15.8 MB',
      downloadUrl: '#',
      isRequired: true
    },
    {
      id: '4',
      name: 'References',
      type: 'references',
      status: 'pending' as const,
      isRequired: true
    },
    {
      id: '5',
      name: 'Certification Documents',
      type: 'certifications',
      status: 'pending' as const,
      isRequired: false
    }
  ]);

  const handleStageClick = (stageIndex: number) => {
    setSelectedStageIndex(stageIndex);
  };

  const handleContentAction = (contentId: string, action: string) => {
    console.log('Content action:', action, 'for content:', contentId);
    // Handle different actions like watch video, download document, join interview, etc.
  };

  const handleStageComplete = () => {
    console.log('Completing current stage');
    // Handle stage completion logic
  };

  const handleDocumentUpload = (documentType: string) => {
    console.log('Uploading document of type:', documentType);
    // Handle document upload logic
  };

  const handleDocumentDownload = (documentId: string) => {
    console.log('Downloading document:', documentId);
    // Handle document download logic
  };

  const handleDocumentView = (documentId: string) => {
    console.log('Viewing document:', documentId);
    // Handle document view logic
  };

  const handleContactRecruiter = () => {
    console.log('Contacting recruiter');
    // Handle contact recruiter logic
  };

  const handleViewJobDetails = () => {
    console.log('Viewing full job details');
    // Handle view job details logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
              <p className="text-gray-600">{requirement.roleName} at {requirement.companyName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Call
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Requirement Overview & Progress */}
          <div className="lg:col-span-2 space-y-6">
            <RequirementOverviewCard
              requirement={requirement}
              onContactRecruiter={handleContactRecruiter}
              onViewJobDetails={handleViewJobDetails}
            />
            
            <EnhancedStageProgressTracker
              stages={stages}
              currentStageIndex={selectedStageIndex}
              onStageClick={handleStageClick}
            />
            
            <StageDetailsSection
              stage={stageDetails}
              onContentAction={handleContentAction}
              onStageComplete={handleStageComplete}
            />
          </div>

          {/* Right Column - Documents */}
          <div className="lg:col-span-1">
            <CandidateDocumentsManager
              documents={documents}
              onUpload={handleDocumentUpload}
              onDownload={handleDocumentDownload}
              onView={handleDocumentView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

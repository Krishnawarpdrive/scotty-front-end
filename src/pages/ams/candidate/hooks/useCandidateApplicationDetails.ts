
import { useState } from 'react';

export interface ApplicationDetails {
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
  interviewHistory?: Array<{
    id: string;
    date: string;
    type: string;
    interviewer: string;
    feedback?: string;
    status: string;
  }>;
  applicationStages: Array<{
    name: string;
    status: 'completed' | 'current' | 'pending';
    completedDate?: string;
    description: string;
  }>;
}

export const useCandidateApplicationDetails = (applicationId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock application details
  const applicationDetails: ApplicationDetails | null = applicationId ? {
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
    companyDescription: 'TechCorp Inc is a leading technology company focused on building innovative solutions.',
    jobDescription: 'We are seeking a Senior Frontend Developer to join our dynamic team.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in frontend development',
      'Strong proficiency in JavaScript, HTML5, and CSS3'
    ],
    skillsRequired: ['JavaScript', 'React.js', 'TypeScript', 'HTML5', 'CSS3'],
    responsibilities: [
      'Develop and maintain user-facing web applications',
      'Collaborate with UI/UX designers to implement designs',
      'Write clean, maintainable, and efficient code'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements'
    ],
    interviewHistory: [
      {
        id: '1',
        date: '2024-01-18',
        type: 'Phone Screening',
        interviewer: 'Sarah Chen (HR Manager)',
        feedback: 'Positive feedback on communication skills and technical background.',
        status: 'completed'
      }
    ],
    applicationStages: [
      {
        name: 'Application Submitted',
        status: 'completed',
        completedDate: '2024-01-15',
        description: 'Your application has been received and is under review'
      },
      {
        name: 'Technical Interview',
        status: 'current',
        description: 'Technical assessment and coding interview'
      }
    ]
  } : null;

  const submitInterviewReview = async (reviewData: any) => {
    setIsLoading(true);
    try {
      // Mock API call
      console.log('Submitting review:', reviewData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    applicationDetails,
    submitInterviewReview,
    isLoading
  };
};

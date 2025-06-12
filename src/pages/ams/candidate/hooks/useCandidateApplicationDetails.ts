
import { useState, useEffect } from 'react';
import { CandidateApplication } from '../types/CandidateTypes';

export const useCandidateApplicationDetails = (applicationId: string | null) => {
  const [application, setApplication] = useState<CandidateApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!applicationId) {
      setApplication(null);
      return;
    }

    const fetchApplicationDetails = async () => {
      setIsLoading(true);
      
      // Mock API call - replace with actual API integration
      setTimeout(() => {
        const mockApplication: CandidateApplication = {
          id: applicationId,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc',
          location: 'San Francisco, CA',
          salary: '$120,000 - $150,000',
          appliedDate: '2024-01-15',
          status: 'active',
          roleName: 'Senior Frontend Developer',
          companyName: 'TechCorp Inc',
          currentStage: 'Technical Interview',
          progress: 65,
          priority: 'high',
          nextAction: 'Prepare for technical interview',
          daysInStage: 3,
          hasPendingActions: true,
          alertReason: 'Interview scheduled for tomorrow',
          nextDueDate: '2024-01-25',
          stages: [
            {
              id: '1',
              name: 'Application Review',
              status: 'completed',
              type: 'document',
              completedDate: '2024-01-16'
            },
            {
              id: '2',
              name: 'Phone Screening',
              status: 'completed',
              type: 'interview',
              completedDate: '2024-01-18'
            },
            {
              id: '3',
              name: 'Technical Interview',
              status: 'current',
              type: 'interview',
              dueDate: '2024-01-25'
            },
            {
              id: '4',
              name: 'Final Interview',
              status: 'pending',
              type: 'interview'
            }
          ]
        };
        
        setApplication(mockApplication);
        setIsLoading(false);
      }, 500);
    };

    fetchApplicationDetails();
  }, [applicationId]);

  return {
    application,
    isLoading
  };
};


import { useState, useEffect } from 'react';

interface CandidateDashboardData {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  completedInterviews: number;
  pendingAssessments: number;
  documentsUploaded: number;
  documentsVerified: number;
  profileCompletion: number;
  recentActivities: Activity[];
  upcomingInterviews: Interview[];
  applicationProgress: ApplicationProgress[];
  quickStats: QuickStats;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status?: string;
}

interface Interview {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface ApplicationProgress {
  id: string;
  roleName: string;
  companyName: string;
  progress: number;
  currentStage: string;
  nextAction?: string;
}

interface QuickStats {
  responseRate: number;
  averageProgressTime: string;
  interviewSuccessRate: number;
  activeApplications: number;
}

export const useCandidateDashboardData = (candidateId: string) => {
  const [dashboardData, setDashboardData] = useState<CandidateDashboardData | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Mock API call - replace with actual API integration
      setTimeout(() => {
        const mockData: CandidateDashboardData = {
          totalApplications: 12,
          activeApplications: 5,
          interviewsScheduled: 3,
          completedInterviews: 7,
          pendingAssessments: 2,
          documentsUploaded: 8,
          documentsVerified: 6,
          profileCompletion: 85,
          recentActivities: [
            {
              id: '1',
              type: 'interview',
              description: 'Technical interview scheduled with TechCorp',
              timestamp: '2024-01-24T10:00:00Z',
              status: 'scheduled'
            },
            {
              id: '2',
              type: 'application',
              description: 'Application submitted for Full Stack Engineer',
              timestamp: '2024-01-23T14:30:00Z',
              status: 'submitted'
            },
            {
              id: '3',
              type: 'document',
              description: 'Resume updated and verified',
              timestamp: '2024-01-22T09:15:00Z',
              status: 'completed'
            }
          ],
          upcomingInterviews: [
            {
              id: '1',
              title: 'Technical Interview',
              company: 'TechCorp Inc',
              date: '2024-01-25',
              time: '2:00 PM',
              type: 'Technical',
              status: 'scheduled'
            },
            {
              id: '2',
              title: 'HR Round',
              company: 'DataFlow Systems',
              date: '2024-01-26',
              time: '11:00 AM',
              type: 'HR',
              status: 'confirmed'
            }
          ],
          applicationProgress: [
            {
              id: '1',
              roleName: 'Senior Frontend Developer',
              companyName: 'TechCorp Inc',
              progress: 65,
              currentStage: 'Technical Interview',
              nextAction: 'Prepare for interview'
            },
            {
              id: '2',
              roleName: 'Full Stack Engineer',
              companyName: 'DataFlow Systems',
              progress: 30,
              currentStage: 'Document Verification'
            }
          ],
          quickStats: {
            responseRate: 85,
            averageProgressTime: '2.4d',
            interviewSuccessRate: 78,
            activeApplications: 5
          }
        };
        
        const mockNotifications = [
          {
            id: '1',
            title: 'Interview Reminder',
            message: 'Technical interview with TechCorp tomorrow at 2:00 PM',
            type: 'reminder',
            timestamp: '2024-01-24T08:00:00Z',
            read: false
          },
          {
            id: '2',
            title: 'Document Required',
            message: 'Please upload your updated portfolio for DataFlow Systems',
            type: 'action_required',
            timestamp: '2024-01-23T16:00:00Z',
            read: false
          }
        ];

        const mockMessages = [
          {
            id: '1',
            sender: 'Sarah Chen (HR Manager)',
            company: 'TechCorp Inc',
            subject: 'Interview Confirmation',
            preview: 'Your technical interview has been confirmed for tomorrow...',
            timestamp: '2024-01-24T09:30:00Z',
            read: false
          },
          {
            id: '2',
            sender: 'Mike Johnson (Recruiter)',
            company: 'DataFlow Systems',
            subject: 'Application Update',
            preview: 'We need additional documents to proceed with your application...',
            timestamp: '2024-01-23T15:45:00Z',
            read: true
          }
        ];
        
        setDashboardData(mockData);
        setNotifications(mockNotifications);
        setMessages(mockMessages);
        setIsLoading(false);
      }, 500);
    };

    if (candidateId) {
      fetchDashboardData();
    }
  }, [candidateId]);

  return {
    dashboardData,
    notifications,
    messages,
    isLoading
  };
};

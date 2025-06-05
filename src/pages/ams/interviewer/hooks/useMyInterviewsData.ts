
import { useState, useEffect } from 'react';
import { Interview } from '../MyInterviewsPage';

interface InterviewStats {
  todayCount: number;
  weekCount: number;
  totalCount: number;
  completionRate: number;
}

interface UseMyInterviewsDataReturn {
  interviews: Interview[];
  stats: InterviewStats;
  loading: boolean;
  error: string | null;
}

export const useMyInterviewsData = (filters: any): UseMyInterviewsDataReturn => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [stats, setStats] = useState<InterviewStats>({
    todayCount: 0,
    weekCount: 0,
    totalCount: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockInterviews: Interview[] = [
          {
            id: '1',
            candidateName: 'Sarah Johnson',
            candidateEmail: 'sarah.johnson@email.com',
            roleName: 'Senior Frontend Developer',
            clientName: 'TechCorp Inc.',
            scheduledDate: new Date().toISOString(),
            duration: 60,
            interviewType: 'technical',
            status: 'scheduled',
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            candidateId: 'candidate-1',
            requirementId: 'req-1',
            notes: 'Focus on React and TypeScript experience'
          },
          {
            id: '2',
            candidateName: 'Michael Chen',
            candidateEmail: 'michael.chen@email.com',
            roleName: 'Backend Engineer',
            clientName: 'StartupXYZ',
            scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            duration: 45,
            interviewType: 'screening',
            status: 'scheduled',
            location: 'Conference Room A',
            candidateId: 'candidate-2',
            requirementId: 'req-2'
          },
          {
            id: '3',
            candidateName: 'Emily Rodriguez',
            candidateEmail: 'emily.rodriguez@email.com',
            roleName: 'Product Manager',
            clientName: 'Enterprise Corp',
            scheduledDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            duration: 60,
            interviewType: 'behavioral',
            status: 'completed',
            meetingLink: 'https://zoom.us/j/123456789',
            candidateId: 'candidate-3',
            requirementId: 'req-3',
            feedback: 'Great communication skills, strong product sense',
            rating: 4
          }
        ];

        // Apply filters
        let filteredInterviews = mockInterviews;

        if (filters.status !== 'all') {
          filteredInterviews = filteredInterviews.filter(
            interview => interview.status === filters.status
          );
        }

        if (filters.interviewType !== 'all') {
          filteredInterviews = filteredInterviews.filter(
            interview => interview.interviewType === filters.interviewType
          );
        }

        // Calculate stats
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

        const todayCount = mockInterviews.filter(interview => {
          const interviewDate = new Date(interview.scheduledDate);
          return interviewDate >= startOfToday && interviewDate < new Date(startOfToday.getTime() + 86400000);
        }).length;

        const weekCount = mockInterviews.filter(interview => {
          const interviewDate = new Date(interview.scheduledDate);
          return interviewDate >= startOfWeek;
        }).length;

        const completedInterviews = mockInterviews.filter(i => i.status === 'completed').length;
        const completionRate = mockInterviews.length > 0 ? Math.round((completedInterviews / mockInterviews.length) * 100) : 0;

        setInterviews(filteredInterviews);
        setStats({
          todayCount,
          weekCount,
          totalCount: mockInterviews.length,
          completionRate
        });
      } catch (err) {
        setError('Failed to fetch interviews');
        console.error('Error fetching interviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [filters]);

  return { interviews, stats, loading, error };
};

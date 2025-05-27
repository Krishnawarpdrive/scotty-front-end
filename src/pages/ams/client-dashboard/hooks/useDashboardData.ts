
import { useState, useEffect } from 'react';

export const useDashboardData = (dateRange: string) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      
      // Mock data - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDashboardData({
        summaryCards: [
          {
            title: 'Open Roles',
            value: 12,
            change: 8,
            changeType: 'increase',
            icon: '💼',
            actions: [
              { label: 'View Roles', variant: 'default' },
              { label: 'Request New Role', variant: 'outline' }
            ]
          },
          {
            title: 'Candidates Shortlisted',
            value: 34,
            change: 15,
            changeType: 'increase',
            icon: '👥',
            actions: [
              { label: 'View Candidates', variant: 'default' },
              { label: 'Request Feedback', variant: 'outline' }
            ]
          },
          {
            title: 'Offers Extended',
            value: 8,
            change: 2,
            changeType: 'increase',
            icon: '📄',
            actions: [
              { label: 'View Offers', variant: 'default' },
              { label: 'Update Status', variant: 'outline' }
            ]
          },
          {
            title: 'Offers Accepted',
            value: 5,
            change: 25,
            changeType: 'increase',
            icon: '✅',
            actions: [
              { label: 'View Accepted', variant: 'default' },
              { label: 'Start Onboarding', variant: 'outline' }
            ]
          },
          {
            title: 'Time to Fill',
            value: 18,
            change: -12,
            changeType: 'decrease',
            icon: '⏱️',
            actions: [
              { label: 'View Reports', variant: 'default' },
              { label: 'Optimize Pipeline', variant: 'outline' }
            ]
          },
          {
            title: 'Pending Approvals',
            value: 6,
            change: 0,
            changeType: 'neutral',
            icon: '⚠️',
            urgent: true,
            actions: [
              { label: 'Approve Now', variant: 'default' },
              { label: 'Send Reminders', variant: 'outline' }
            ]
          }
        ],
        hiringProgress: {
          roleProgress: [
            {
              roleId: '1',
              roleName: 'Senior Software Engineer',
              progress: 75,
              stage: 'Client Interview',
              candidatesCount: 4,
              urgency: 'high'
            },
            {
              roleId: '2',
              roleName: 'Product Manager',
              progress: 45,
              stage: 'Technical Screening',
              candidatesCount: 8,
              urgency: 'medium'
            },
            {
              roleId: '3',
              roleName: 'UX Designer',
              progress: 90,
              stage: 'Offer Negotiation',
              candidatesCount: 2,
              urgency: 'high'
            }
          ],
          candidateFunnel: [
            { stage: 'Applied', count: 120, conversionRate: 100, color: '#3B82F6' },
            { stage: 'Screening', count: 45, conversionRate: 37.5, color: '#8B5CF6' },
            { stage: 'Interview', count: 24, conversionRate: 53.3, color: '#10B981' },
            { stage: 'Offer', count: 8, conversionRate: 33.3, color: '#F59E0B' },
            { stage: 'Hired', count: 5, conversionRate: 62.5, color: '#EF4444' }
          ],
          teamActivity: {
            calls: 156,
            interviews: 42,
            emails: 89
          }
        },
        candidatePool: [],
        offers: {},
        upcomingInterviews: [],
        alerts: [],
        documents: {},
        recentActivity: [],
        budget: {}
      });
      
      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return { dashboardData, isLoading };
};

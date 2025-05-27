
import { useState, useEffect } from 'react';
import { UsersIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

// Define the Activity interface locally to ensure type safety
interface Activity {
  id: string;
  type: 'placement' | 'interview' | 'application' | 'document';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock data - in a real app, this would come from APIs
export const useClientDashboardData = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock KPI data
  const kpis = [
    {
      id: '1',
      title: 'Active Roles',
      value: 24,
      change: 12,
      changeLabel: 'vs last month',
      icon: BriefcaseIcon,
      trend: 'up' as const,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Candidates in Pipeline',
      value: 156,
      change: 8,
      changeLabel: 'vs last month',
      icon: UsersIcon,
      trend: 'up' as const,
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Positions Filled',
      value: 18,
      change: -5,
      changeLabel: 'vs last month',
      icon: CheckCircleIcon,
      trend: 'down' as const,
      color: 'bg-purple-500'
    },
    {
      id: '4',
      title: 'Avg. Time to Fill',
      value: '28 days',
      change: -12,
      changeLabel: 'vs last month',
      icon: ClockIcon,
      trend: 'up' as const,
      color: 'bg-orange-500'
    }
  ];

  // Mock vendor scores
  const vendorScores = [
    {
      id: '1',
      vendorName: 'TechTalent Solutions',
      overallScore: 87,
      qualityScore: 92,
      speedScore: 85,
      costEfficiency: 78,
      communicationScore: 90,
      activeRoles: 8,
      completedPlacements: 12,
      rating: 4.5,
      trend: 'up' as const
    },
    {
      id: '2',
      vendorName: 'Global Recruiters Inc',
      overallScore: 73,
      qualityScore: 75,
      speedScore: 80,
      costEfficiency: 85,
      communicationScore: 70,
      activeRoles: 5,
      completedPlacements: 8,
      rating: 3.8,
      trend: 'stable' as const
    },
    {
      id: '3',
      vendorName: 'Executive Search Partners',
      overallScore: 91,
      qualityScore: 95,
      speedScore: 88,
      costEfficiency: 82,
      communicationScore: 94,
      activeRoles: 3,
      completedPlacements: 15,
      rating: 4.8,
      trend: 'up' as const
    }
  ];

  // Mock roles data
  const rolesData = [
    {
      id: '1',
      roleName: 'Senior Software Engineer',
      department: 'Engineering',
      priority: 'High' as const,
      status: 'In Progress' as const,
      candidatesInPipeline: 12,
      dueDate: '2024-02-15',
      assignedTA: 'Sarah Johnson',
      budgetRange: '$120K - $150K',
      progress: 65
    },
    {
      id: '2',
      roleName: 'Product Manager',
      department: 'Product',
      priority: 'High' as const,
      status: 'Open' as const,
      candidatesInPipeline: 8,
      dueDate: '2024-02-28',
      assignedTA: 'Mike Chen',
      budgetRange: '$110K - $140K',
      progress: 25
    },
    {
      id: '3',
      roleName: 'UX Designer',
      department: 'Design',
      priority: 'Medium' as const,
      status: 'In Progress' as const,
      candidatesInPipeline: 15,
      dueDate: '2024-03-10',
      assignedTA: 'Emily Davis',
      budgetRange: '$80K - $110K',
      progress: 80
    },
    {
      id: '4',
      roleName: 'Data Scientist',
      department: 'Analytics',
      priority: 'High' as const,
      status: 'Open' as const,
      candidatesInPipeline: 6,
      dueDate: '2024-02-20',
      assignedTA: 'John Smith',
      budgetRange: '$130K - $160K',
      progress: 15
    }
  ];

  // Mock pipeline data
  const pipelineData = {
    stages: [
      { name: 'Applied', count: 45, color: '#3B82F6' },
      { name: 'Screening', count: 28, color: '#10B981' },
      { name: 'Interview', count: 18, color: '#F59E0B' },
      { name: 'Final Review', count: 8, color: '#EF4444' },
      { name: 'Offer', count: 3, color: '#8B5CF6' }
    ],
    conversionRates: [
      { from: 'Applied', to: 'Screening', rate: 62 },
      { from: 'Screening', to: 'Interview', rate: 64 },
      { from: 'Interview', to: 'Final Review', rate: 44 },
      { from: 'Final Review', to: 'Offer', rate: 38 }
    ]
  };

  // Mock compliance data
  const complianceData = [
    {
      id: '1',
      documentType: 'Background Check',
      required: 24,
      completed: 22,
      pending: 2,
      overdue: 0,
      completionRate: 92
    },
    {
      id: '2',
      documentType: 'Reference Check',
      required: 18,
      completed: 15,
      pending: 2,
      overdue: 1,
      completionRate: 83
    },
    {
      id: '3',
      documentType: 'Drug Test',
      required: 12,
      completed: 11,
      pending: 1,
      overdue: 0,
      completionRate: 92
    }
  ];

  // Mock activity data with explicit typing
  const activities: Activity[] = [
    {
      id: '1',
      type: 'placement',
      title: 'Candidate placed for Senior Software Engineer',
      description: 'John Doe accepted the offer',
      timestamp: '2024-01-15T10:30:00Z',
      priority: 'high'
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview scheduled',
      description: 'Technical interview for Product Manager role',
      timestamp: '2024-01-15T09:15:00Z',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'application',
      title: 'New applications received',
      description: '5 new candidates applied for UX Designer',
      timestamp: '2024-01-15T08:45:00Z',
      priority: 'low'
    },
    {
      id: '4',
      type: 'document',
      title: 'Background check completed',
      description: 'Background verification for Data Scientist candidate',
      timestamp: '2024-01-14T16:20:00Z',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    kpis,
    vendorScores,
    rolesData,
    pipelineData,
    complianceData,
    activities,
    isLoading
  };
};

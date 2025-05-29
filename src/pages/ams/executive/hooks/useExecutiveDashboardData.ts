
import { useState, useEffect } from 'react';

interface ExecutiveDashboardFilters {
  dateRange: string;
  departmentFilter: string;
  regionFilter: string;
}

interface KPIData {
  totalHires: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  averageTimeToHire: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  costPerHire: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  hiringGoalProgress: {
    value: number;
    target: number;
    percentage: number;
  };
}

export const useExecutiveDashboardData = (filters: ExecutiveDashboardFilters) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [hiringTrends, setHiringTrends] = useState<any[]>([]);
  const [departmentData, setDepartmentData] = useState<any[]>([]);
  const [pentagonData, setPentagonData] = useState<any[]>([]);
  const [taPerformanceData, setTaPerformanceData] = useState<any[]>([]);
  const [clientHiringData, setClientHiringData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock KPI data
      setKpiData({
        totalHires: {
          value: 234,
          change: 12.5,
          trend: 'up'
        },
        averageTimeToHire: {
          value: 28,
          change: -8.2,
          trend: 'down'
        },
        costPerHire: {
          value: 4250,
          change: -5.1,
          trend: 'down'
        },
        hiringGoalProgress: {
          value: 234,
          target: 300,
          percentage: 78
        }
      });

      // Mock performance data
      setPerformanceData([
        { month: 'Jan', hires: 18, goal: 25 },
        { month: 'Feb', hires: 22, goal: 25 },
        { month: 'Mar', hires: 28, goal: 25 },
        { month: 'Apr', hires: 31, goal: 30 },
        { month: 'May', hires: 25, goal: 30 },
        { month: 'Jun', hires: 35, goal: 30 }
      ]);

      // Mock hiring trends
      setHiringTrends([
        { department: 'Engineering', hires: 45, openRoles: 12 },
        { department: 'Sales', hires: 32, openRoles: 8 },
        { department: 'Marketing', hires: 18, openRoles: 5 },
        { department: 'HR', hires: 12, openRoles: 3 }
      ]);

      // Mock department data
      setDepartmentData([
        {
          department: 'Engineering',
          totalHires: 45,
          averageTimeToHire: 32,
          costPerHire: 5200,
          efficiency: 85
        },
        {
          department: 'Sales',
          totalHires: 32,
          averageTimeToHire: 24,
          costPerHire: 3800,
          efficiency: 92
        },
        {
          department: 'Marketing',
          totalHires: 18,
          averageTimeToHire: 26,
          costPerHire: 4100,
          efficiency: 88
        },
        {
          department: 'HR',
          totalHires: 12,
          averageTimeToHire: 21,
          costPerHire: 3200,
          efficiency: 95
        }
      ]);

      // Mock pentagon data for hiring process
      setPentagonData([
        { name: 'Sourcing', value: 156, color: '#3b82f6', percentage: 85 },
        { name: 'Screening', value: 98, color: '#10b981', percentage: 63 },
        { name: 'Interview', value: 67, color: '#f59e0b', percentage: 68 },
        { name: 'Offer', value: 45, color: '#ef4444', percentage: 67 },
        { name: 'Onboard', value: 42, color: '#8b5cf6', percentage: 93 }
      ]);

      // Mock TA performance data
      setTaPerformanceData([
        {
          id: '1',
          name: 'Sarah Johnson',
          efficiency: 94,
          placementsThisMonth: 8,
          avgTimeToFill: 22,
          clientSatisfaction: 4.8,
          activeRoles: 12,
          trend: 'up',
          trendValue: 15
        },
        {
          id: '2',
          name: 'Mike Chen',
          efficiency: 87,
          placementsThisMonth: 6,
          avgTimeToFill: 28,
          clientSatisfaction: 4.5,
          activeRoles: 9,
          trend: 'up',
          trendValue: 8
        },
        {
          id: '3',
          name: 'Emma Davis',
          efficiency: 91,
          placementsThisMonth: 7,
          avgTimeToFill: 25,
          clientSatisfaction: 4.7,
          activeRoles: 11,
          trend: 'down',
          trendValue: 3
        },
        {
          id: '4',
          name: 'Alex Rodriguez',
          efficiency: 82,
          placementsThisMonth: 5,
          avgTimeToFill: 32,
          clientSatisfaction: 4.3,
          activeRoles: 8,
          trend: 'up',
          trendValue: 12
        },
        {
          id: '5',
          name: 'Lisa Wang',
          efficiency: 89,
          placementsThisMonth: 9,
          avgTimeToFill: 26,
          clientSatisfaction: 4.6,
          activeRoles: 14,
          trend: 'up',
          trendValue: 6
        }
      ]);

      // Mock client hiring data
      setClientHiringData([
        {
          id: '1',
          name: 'TechCorp Inc',
          totalHires: 45,
          targetHires: 60,
          completionRate: 75,
          averageTimeToHire: 28,
          activeDepartments: ['Engineering', 'Product', 'Design'],
          monthlyHires: [
            { month: 'Jan', hires: 5, target: 10 },
            { month: 'Feb', hires: 8, target: 10 },
            { month: 'Mar', hires: 12, target: 10 },
            { month: 'Apr', hires: 9, target: 10 },
            { month: 'May', hires: 7, target: 10 },
            { month: 'Jun', hires: 4, target: 10 }
          ],
          departmentBreakdown: [
            { department: 'Engineering', hires: 25, color: '#3b82f6' },
            { department: 'Product', hires: 12, color: '#10b981' },
            { department: 'Design', hires: 8, color: '#f59e0b' }
          ]
        },
        {
          id: '2',
          name: 'Global Finance Ltd',
          totalHires: 32,
          targetHires: 40,
          completionRate: 80,
          averageTimeToHire: 35,
          activeDepartments: ['Finance', 'Operations', 'Risk'],
          monthlyHires: [
            { month: 'Jan', hires: 6, target: 7 },
            { month: 'Feb', hires: 5, target: 7 },
            { month: 'Mar', hires: 8, target: 7 },
            { month: 'Apr', hires: 4, target: 7 },
            { month: 'May', hires: 6, target: 7 },
            { month: 'Jun', hires: 3, target: 5 }
          ],
          departmentBreakdown: [
            { department: 'Finance', hires: 18, color: '#3b82f6' },
            { department: 'Operations', hires: 9, color: '#10b981' },
            { department: 'Risk', hires: 5, color: '#f59e0b' }
          ]
        },
        {
          id: '3',
          name: 'Healthcare Solutions',
          totalHires: 28,
          targetHires: 35,
          completionRate: 80,
          averageTimeToHire: 42,
          activeDepartments: ['Clinical', 'Research', 'Admin'],
          monthlyHires: [
            { month: 'Jan', hires: 4, target: 6 },
            { month: 'Feb', hires: 5, target: 6 },
            { month: 'Mar', hires: 7, target: 6 },
            { month: 'Apr', hires: 3, target: 6 },
            { month: 'May', hires: 5, target: 6 },
            { month: 'Jun', hires: 4, target: 5 }
          ],
          departmentBreakdown: [
            { department: 'Clinical', hires: 15, color: '#3b82f6' },
            { department: 'Research', hires: 8, color: '#10b981' },
            { department: 'Admin', hires: 5, color: '#f59e0b' }
          ]
        }
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, [filters]);

  return {
    kpiData,
    performanceData,
    hiringTrends,
    departmentData,
    pentagonData,
    taPerformanceData,
    clientHiringData,
    isLoading
  };
};

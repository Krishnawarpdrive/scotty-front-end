
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

      setIsLoading(false);
    };

    fetchData();
  }, [filters]);

  return {
    kpiData,
    performanceData,
    hiringTrends,
    departmentData,
    isLoading
  };
};

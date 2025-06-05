
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface DashboardKPI {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  target?: number;
  unit?: string;
}

export interface ActivityItem {
  id: string;
  type: 'jd_submitted' | 'approval' | 'role_creation' | 'client_added' | 'assignment';
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  user: string;
  metadata?: Record<string, any>;
}

export interface ChartData {
  name: string;
  value: number;
  change?: number;
  target?: number;
  color?: string;
}

export interface DashboardData {
  kpis: DashboardKPI[];
  recentActivity: ActivityItem[];
  hiringTrends: ChartData[];
  departmentMetrics: ChartData[];
  workloadDistribution: ChartData[];
  performanceMetrics: ChartData[];
  upcomingTasks: any[];
  notifications: any[];
}

export interface DashboardFilters {
  dateRange: '7d' | '30d' | '90d' | '1y';
  department?: string;
  priority?: string;
  status?: string;
}

export const useEnhancedAMSDashboard = (filters: DashboardFilters = { dateRange: '30d' }) => {
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchDashboardData = useCallback(async (): Promise<DashboardData> => {
    // Simulate API call with enhanced mock data
    await new Promise(resolve => setTimeout(resolve, 800));

    const kpis: DashboardKPI[] = [
      {
        id: 'total-clients',
        title: 'Total Clients',
        value: 42,
        change: 12.5,
        trend: 'up',
        icon: 'Users',
        color: 'blue',
        target: 50,
        unit: 'clients'
      },
      {
        id: 'active-roles',
        title: 'Active Roles',
        value: 87,
        change: 8.3,
        trend: 'up',
        icon: 'Briefcase',
        color: 'green',
        target: 100,
        unit: 'roles'
      },
      {
        id: 'pending-approvals',
        title: 'Pending Approvals',
        value: 15,
        change: -23.1,
        trend: 'down',
        icon: 'ClipboardList',
        color: 'orange',
        target: 10,
        unit: 'approvals'
      },
      {
        id: 'success-rate',
        title: 'Success Rate',
        value: 94.2,
        change: 2.8,
        trend: 'up',
        icon: 'Target',
        color: 'purple',
        target: 95,
        unit: '%'
      }
    ];

    const recentActivity: ActivityItem[] = [
      {
        id: '1',
        type: 'jd_submitted',
        description: 'Senior Developer role for Acme Inc',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        user: 'John Doe'
      },
      {
        id: '2',
        type: 'approval',
        description: 'Project Manager role approved',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        user: 'Jane Smith'
      },
      {
        id: '3',
        type: 'role_creation',
        description: 'UX Designer role created',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        priority: 'low',
        user: 'Mike Johnson'
      },
      {
        id: '4',
        type: 'client_added',
        description: 'XYZ Corporation onboarded',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        user: 'Sarah Wilson'
      }
    ];

    const hiringTrends: ChartData[] = [
      { name: 'Jan', value: 25, target: 30, color: '#3b82f6' },
      { name: 'Feb', value: 32, target: 30, color: '#10b981' },
      { name: 'Mar', value: 28, target: 35, color: '#f59e0b' },
      { name: 'Apr', value: 45, target: 35, color: '#ef4444' },
      { name: 'May', value: 38, target: 40, color: '#8b5cf6' },
      { name: 'Jun', value: 52, target: 40, color: '#06b6d4' }
    ];

    const departmentMetrics: ChartData[] = [
      { name: 'Engineering', value: 35, color: '#3b82f6' },
      { name: 'Sales', value: 28, color: '#10b981' },
      { name: 'Marketing', value: 18, color: '#f59e0b' },
      { name: 'HR', value: 12, color: '#ef4444' },
      { name: 'Finance', value: 8, color: '#8b5cf6' }
    ];

    const workloadDistribution: ChartData[] = [
      { name: 'Overloaded', value: 15, color: '#ef4444' },
      { name: 'Optimal', value: 65, color: '#10b981' },
      { name: 'Underutilized', value: 20, color: '#f59e0b' }
    ];

    const performanceMetrics: ChartData[] = [
      { name: 'Efficiency', value: 87, color: '#3b82f6' },
      { name: 'Quality', value: 92, color: '#10b981' },
      { name: 'Speed', value: 79, color: '#f59e0b' },
      { name: 'Satisfaction', value: 94, color: '#8b5cf6' }
    ];

    return {
      kpis,
      recentActivity,
      hiringTrends,
      departmentMetrics,
      workloadDistribution,
      performanceMetrics,
      upcomingTasks: [],
      notifications: []
    };
  }, [filters]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-data', filters],
    queryFn: fetchDashboardData,
    refetchInterval: realTimeEnabled ? 30000 : false,
    staleTime: 10000
  });

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeEnabled) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [realTimeEnabled]);

  const toggleRealTime = () => {
    setRealTimeEnabled(!realTimeEnabled);
  };

  const refreshData = () => {
    refetch();
    setLastUpdated(new Date());
  };

  return {
    data,
    isLoading,
    error,
    realTimeEnabled,
    lastUpdated,
    toggleRealTime,
    refreshData
  };
};

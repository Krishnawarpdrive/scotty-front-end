
import { useState, useEffect } from 'react';
import { mockTimeToHireData, mockTAProgressData, mockRoleSuccessData, 
  mockInterviewerLoadData, mockRoleEfficiencyData } from '../mock-dashboard-data';

export type MetricStatus = 'good' | 'warning' | 'critical';

export interface MetricData {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  data: any[];
  trend: number;
  trendLabel: string;
  status: MetricStatus;
  insight: string;
  recommendation: string;
}

export const getMetricStatus = (value: number, thresholds: {good: number, warning: number}): MetricStatus => {
  if (value >= thresholds.good) return 'good';
  if (value >= thresholds.warning) return 'warning';
  return 'critical';
};

export const useDashboardData = (dateRange: string, taFilter: string, roleFilter: string, clientFilter: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch data based on the filters
    // For now, simulate a loading state and then return mock data
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const timeToHireStatus = getMetricStatus(28.3, {good: 25, warning: 30});
      const taProgressStatus = getMetricStatus(76.2, {good: 80, warning: 70});
      const roleSuccessStatus = getMetricStatus(68.5, {good: 72, warning: 65});
      const interviewerLoadStatus = getMetricStatus(62, {good: 70, warning: 60});
      const roleEfficiencyStatus = getMetricStatus(83.5, {good: 80, warning: 70});
      
      setMetrics([
        {
          title: 'Time to Hire',
          value: 28.3,
          unit: 'days',
          description: 'Average across all roles',
          data: mockTimeToHireData,
          trend: -8,
          trendLabel: '8% better than last month',
          status: timeToHireStatus,
          insight: 'The average time to hire has decreased by 8% compared to the previous period. Software Engineering roles have the longest time to hire at 32 days.',
          recommendation: 'Focus on optimizing the technical interview phase, which is the longest stage at an average of 7.3 days.'
        },
        {
          title: 'TA Work Progress',
          value: 76.2,
          unit: '%',
          description: 'Average completion rate',
          data: mockTAProgressData,
          trend: 4,
          trendLabel: '4 TAs above 80% completion',
          status: taProgressStatus,
          insight: 'John has the highest completion rate at 92%, while Sarah is behind schedule at 61%. The team average is 76.2%.',
          recommendation: 'Schedule a check-in with Sarah to understand her blockers and provide additional support.'
        },
        {
          title: 'TA Success Rate',
          value: 68.5,
          unit: '%',
          description: 'Roles filled across all TAs',
          data: mockRoleSuccessData,
          trend: -3,
          trendLabel: '3% below target (72%)',
          status: roleSuccessStatus,
          insight: '3 TAs are performing above the target success rate of 72%. The team average is 68.5%.',
          recommendation: 'Arrange peer learning sessions between top and underperforming TAs to share best practices.'
        },
        {
          title: 'Interviewer Load',
          value: 62,
          unit: '%',
          description: 'Of available slots',
          data: mockInterviewerLoadData,
          trend: 28,
          trendLabel: '28 open slots this week',
          status: interviewerLoadStatus,
          insight: 'There are 28 open interview slots available this week. The utilization rate is 62%.',
          recommendation: 'Request additional interview slots from the Engineering team to improve pipeline flow.'
        },
        {
          title: 'Role Assignment Efficiency',
          value: 83.5,
          unit: '%',
          description: 'Based on TA performance match',
          data: mockRoleEfficiencyData,
          trend: 7,
          trendLabel: '7% above target (78%)',
          status: roleEfficiencyStatus,
          insight: 'Role-to-TA matching has improved by 7% since implementing the new assignment algorithm.',
          recommendation: 'Continue monitoring the new algorithm performance and adjust parameters if needed.'
        }
      ]);
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, taFilter, roleFilter, clientFilter]);
  
  return { metrics, isLoading };
};


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle
}) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-xs font-medium">{change > 0 ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

interface CandidateMetricsProps {
  metrics: {
    totalCandidates: number;
    activeCandidates: number;
    newThisWeek: number;
    interviewsScheduled: number;
    callsToday: number;
    avgResponseTime: string;
  };
}

export const CandidateMetrics: React.FC<CandidateMetricsProps> = ({
  metrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <MetricCard 
        title="Total Candidates" 
        value={metrics.totalCandidates} 
        change={12} 
        changeType="increase" 
      />
      <MetricCard 
        title="Active Candidates" 
        value={metrics.activeCandidates} 
        change={8} 
        changeType="increase" 
      />
      <MetricCard 
        title="New This Week" 
        value={metrics.newThisWeek} 
        change={15} 
        changeType="increase" 
      />
      <MetricCard 
        title="Interviews Scheduled" 
        value={metrics.interviewsScheduled} 
        change={5} 
        changeType="decrease" 
      />
      <MetricCard 
        title="Calls Today" 
        value={metrics.callsToday} 
        change={3} 
        changeType="increase" 
      />
      <MetricCard 
        title="Avg Response Time" 
        value={parseFloat(metrics.avgResponseTime)} 
        subtitle="hours" 
        changeType="neutral" 
      />
    </div>
  );
};

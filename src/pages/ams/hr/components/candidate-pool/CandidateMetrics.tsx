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
  return <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {change !== undefined && <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-xs ${getTrendColor()}`}>
              {Math.abs(change)}%
            </span>
          </div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
    </div>;
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
  return;
};
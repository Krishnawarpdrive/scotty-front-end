
import { ExecutiveMetric } from '@/types/WorkflowTypes';

export const getMetricsByType = (metrics: ExecutiveMetric[], selectedPeriod: string) => {
  const filteredMetrics = metrics.filter(metric => metric.period_type === selectedPeriod);
  
  return filteredMetrics.reduce((acc, metric) => {
    if (!acc[metric.metric_type]) {
      acc[metric.metric_type] = [];
    }
    acc[metric.metric_type].push(metric);
    return acc;
  }, {} as Record<string, ExecutiveMetric[]>);
};

export const getAverageMetric = (metricsByType: Record<string, ExecutiveMetric[]>, type: string) => {
  const typeMetrics = metricsByType[type] || [];
  if (typeMetrics.length === 0) return 0;
  return typeMetrics.reduce((sum, m) => sum + m.metric_value, 0) / typeMetrics.length;
};

export const getTrend = (metricsByType: Record<string, ExecutiveMetric[]>, type: string) => {
  const typeMetrics = metricsByType[type] || [];
  if (typeMetrics.length < 2) return 'stable';
  const recent = typeMetrics.slice(-2);
  return recent[1].metric_value > recent[0].metric_value ? 'up' : 'down';
};

export const formatMetricValue = (type: string, value: number) => {
  if (type === 'time_to_fill') return `${Math.round(value)}d`;
  if (type.includes('satisfaction') || type === 'quality_score') return `${Math.round(value)}%`;
  return `$${Math.round(value).toLocaleString()}`;
};

export const getMetricColor = (type: string) => {
  switch (type) {
    case 'time_to_fill': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'quality_score': return 'text-green-600 bg-green-50 border-green-200';
    case 'cost_per_hire': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'candidate_satisfaction': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'client_satisfaction': return 'text-pink-600 bg-pink-50 border-pink-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

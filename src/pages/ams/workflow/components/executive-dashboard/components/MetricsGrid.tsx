
import React from 'react';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { MetricCard } from './MetricCard';
import { getMetricsByType, getAverageMetric, getTrend } from '../utils/metricUtils';

interface MetricsGridProps {
  metrics: ExecutiveMetric[];
  selectedPeriod: string;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  selectedPeriod
}) => {
  const metricsByType = getMetricsByType(metrics, selectedPeriod);
  const metricTypes = ['time_to_fill', 'quality_score', 'cost_per_hire', 'candidate_satisfaction', 'client_satisfaction'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metricTypes.map((type) => {
        const average = getAverageMetric(metricsByType, type);
        const trend = getTrend(metricsByType, type);
        const dataPointsCount = metricsByType[type]?.length || 0;
        
        return (
          <MetricCard
            key={type}
            type={type}
            average={average}
            trend={trend}
            dataPointsCount={dataPointsCount}
          />
        );
      })}
    </div>
  );
};

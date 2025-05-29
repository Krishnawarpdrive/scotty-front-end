
import React from 'react';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { PerformanceSummary } from '../components/PerformanceSummary';
import { RecentActivity } from '../components/RecentActivity';

interface OverviewTabProps {
  metricsByType: Record<string, ExecutiveMetric[]>;
  metrics: ExecutiveMetric[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  metricsByType,
  metrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceSummary metricsByType={metricsByType} />
      <RecentActivity metrics={metrics} />
    </div>
  );
};

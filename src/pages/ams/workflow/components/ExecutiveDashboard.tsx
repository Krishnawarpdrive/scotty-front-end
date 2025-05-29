
import React, { useState } from 'react';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { ExecutiveDashboardHeader } from './executive-dashboard/components/ExecutiveDashboardHeader';
import { MetricsGrid } from './executive-dashboard/components/MetricsGrid';
import { ExecutiveDashboardTabs } from './executive-dashboard/components/ExecutiveDashboardTabs';
import { getMetricsByType } from './executive-dashboard/utils/metricUtils';

interface ExecutiveDashboardProps {
  metrics: ExecutiveMetric[];
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ metrics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');

  const metricsByType = getMetricsByType(metrics, selectedPeriod);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ExecutiveDashboardHeader 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      {/* Key Metrics Cards */}
      <MetricsGrid 
        metrics={metrics}
        selectedPeriod={selectedPeriod}
      />

      {/* Detailed Metrics */}
      <ExecutiveDashboardTabs 
        metricsByType={metricsByType}
        metrics={metrics}
      />
    </div>
  );
};

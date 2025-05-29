
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { PeriodSelector } from './executive-dashboard/components/PeriodSelector';
import { MetricsGrid } from './executive-dashboard/components/MetricsGrid';
import { OverviewTab } from './executive-dashboard/tabs/OverviewTab';
import { TrendsTab } from './executive-dashboard/tabs/TrendsTab';
import { BreakdownTab } from './executive-dashboard/tabs/BreakdownTab';
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Executive Dashboard</h2>
          <p className="text-muted-foreground">
            Key performance indicators and metrics overview
          </p>
        </div>
        <PeriodSelector 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* Key Metrics Cards */}
      <MetricsGrid 
        metrics={metrics}
        selectedPeriod={selectedPeriod}
      />

      {/* Detailed Metrics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewTab 
            metricsByType={metricsByType}
            metrics={metrics}
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <TrendsTab />
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <BreakdownTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

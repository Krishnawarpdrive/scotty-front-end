
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { OverviewTab } from '../tabs/OverviewTab';
import { TrendsTab } from '../tabs/TrendsTab';
import { BreakdownTab } from '../tabs/BreakdownTab';

interface ExecutiveDashboardTabsProps {
  metricsByType: Record<string, ExecutiveMetric[]>;
  metrics: ExecutiveMetric[];
}

export const ExecutiveDashboardTabs: React.FC<ExecutiveDashboardTabsProps> = ({
  metricsByType,
  metrics
}) => {
  return (
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
  );
};

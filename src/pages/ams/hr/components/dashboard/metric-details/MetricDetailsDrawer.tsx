
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricData } from '../../../hooks/useDashboardData';
import { MetricChartView } from './MetricChartView';
import { MetricTableView } from './MetricTableView';
import { MetricInsightsView } from './MetricInsightsView';
import { MetricActionsView } from './MetricActionsView';

interface MetricDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metric: MetricData | null;
}

export const MetricDetailsDrawer: React.FC<MetricDetailsDrawerProps> = ({ 
  open, 
  onOpenChange, 
  metric 
}) => {
  if (!metric) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={metric.title}
      subtitle="Detailed analytics view"
      size="lg"
    >
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
          <p className="text-gray-600">
            {metric.description}
          </p>
        </div>
        
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="h-80">
            <MetricChartView metric={metric} />
          </TabsContent>
          
          <TabsContent value="table">
            <MetricTableView metric={metric} />
          </TabsContent>
          
          <TabsContent value="insights">
            <MetricInsightsView metric={metric} />
          </TabsContent>
          
          <TabsContent value="actions">
            <MetricActionsView metric={metric} />
          </TabsContent>
        </Tabs>
      </div>
    </SideDrawer>
  );
};

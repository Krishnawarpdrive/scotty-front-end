
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowStage, QualityGate, HandoffDocumentation, ExecutiveMetric } from '@/types/WorkflowTypes';
import { WorkflowOverview } from './WorkflowOverview';
import { QualityGatesManager } from './QualityGatesManager';
import { HandoffDocumentationManager } from './HandoffDocumentationManager';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { WorkflowConfiguration } from './WorkflowConfiguration';
import { Activity, CheckSquare, FileText, BarChart3, Settings } from 'lucide-react';

interface WorkflowManagementTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  workflowStages: WorkflowStage[];
  qualityGates: QualityGate[];
  handoffDocuments: HandoffDocumentation[];
  executiveMetrics: ExecutiveMetric[];
}

export const WorkflowManagementTabs: React.FC<WorkflowManagementTabsProps> = ({
  activeTab,
  onTabChange,
  workflowStages,
  qualityGates,
  handoffDocuments,
  executiveMetrics
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="quality-gates" className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4" />
          Quality Gates
        </TabsTrigger>
        <TabsTrigger value="handoffs" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Handoffs
        </TabsTrigger>
        <TabsTrigger value="executive" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Executive Dashboard
        </TabsTrigger>
        <TabsTrigger value="configuration" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Configuration
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <WorkflowOverview 
          stages={workflowStages} 
          qualityGates={qualityGates}
          handoffDocuments={handoffDocuments}
        />
      </TabsContent>

      <TabsContent value="quality-gates" className="space-y-4">
        <QualityGatesManager 
          qualityGates={qualityGates}
          workflowStages={workflowStages}
        />
      </TabsContent>

      <TabsContent value="handoffs" className="space-y-4">
        <HandoffDocumentationManager 
          handoffDocuments={handoffDocuments}
          workflowStages={workflowStages}
        />
      </TabsContent>

      <TabsContent value="executive" className="space-y-4">
        <ExecutiveDashboard 
          metrics={executiveMetrics}
        />
      </TabsContent>

      <TabsContent value="configuration" className="space-y-4">
        <WorkflowConfiguration 
          stages={workflowStages}
          qualityGates={qualityGates}
        />
      </TabsContent>
    </Tabs>
  );
};

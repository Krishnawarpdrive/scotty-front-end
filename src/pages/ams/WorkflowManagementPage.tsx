
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkflowOverview } from './workflow/components/WorkflowOverview';
import { QualityGatesManager } from './workflow/components/QualityGatesManager';
import { HandoffDocumentationManager } from './workflow/components/HandoffDocumentationManager';
import { ExecutiveDashboard } from './workflow/components/ExecutiveDashboard';
import { WorkflowConfiguration } from './workflow/components/WorkflowConfiguration';
import { useWorkflowData } from './workflow/hooks/useWorkflowData';
import { Activity, CheckSquare, FileText, BarChart3, Settings, AlertTriangle } from 'lucide-react';

const WorkflowManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    workflowStages, 
    qualityGates, 
    handoffDocuments, 
    executiveMetrics,
    loading,
    error 
  } = useWorkflowData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading workflow data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Management</h1>
          <p className="text-muted-foreground">
            Manage quality gates, handoff documentation, and workflow processes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure Workflow
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            View Active Workflows
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quality Gates Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Handoffs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Fill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18d</div>
            <p className="text-xs text-muted-foreground">-2d from target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
    </div>
  );
};

export default WorkflowManagementPage;

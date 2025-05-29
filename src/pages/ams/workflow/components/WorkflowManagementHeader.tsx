
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Settings } from 'lucide-react';

export const WorkflowManagementHeader: React.FC = () => {
  return (
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
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Save } from 'lucide-react';

export const WorkflowConfigurationHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Workflow Configuration</h2>
        <p className="text-muted-foreground">
          Configure workflow stages, quality gates, and process automation
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Changes
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

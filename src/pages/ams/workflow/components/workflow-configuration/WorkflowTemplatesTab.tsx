
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const WorkflowTemplatesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Templates</CardTitle>
        <CardDescription>
          Manage and create reusable workflow templates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Workflow templates coming soon</p>
          <p className="text-sm">Create and manage templates for different types of workflows</p>
        </div>
      </CardContent>
    </Card>
  );
};

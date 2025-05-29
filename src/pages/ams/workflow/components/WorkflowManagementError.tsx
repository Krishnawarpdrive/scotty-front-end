
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface WorkflowManagementErrorProps {
  error: string;
}

export const WorkflowManagementError: React.FC<WorkflowManagementErrorProps> = ({ error }) => {
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
};

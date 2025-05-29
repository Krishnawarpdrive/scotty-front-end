
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WorkflowKPICards: React.FC = () => {
  return (
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
  );
};

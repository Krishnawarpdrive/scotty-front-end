
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const AutomationRulesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Rules</CardTitle>
        <CardDescription>
          Configure automated transitions and quality gate validations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Automation rules configuration coming soon</p>
          <p className="text-sm">Set up automated workflows, triggers, and conditions</p>
        </div>
      </CardContent>
    </Card>
  );
};

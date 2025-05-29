
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const BreakdownTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
        <CardDescription>
          Client and requirement-specific metric analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Detailed breakdowns coming soon</p>
          <p className="text-sm">Client-wise and requirement-wise metric analysis will be available here</p>
        </div>
      </CardContent>
    </Card>
  );
};

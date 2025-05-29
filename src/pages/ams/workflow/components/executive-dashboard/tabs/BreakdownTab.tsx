
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const BreakdownTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
        <CardDescription>
          Comprehensive breakdown of performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Detailed breakdown coming soon</p>
          <p className="text-sm">Drill down into specific metrics and categories</p>
        </div>
      </CardContent>
    </Card>
  );
};

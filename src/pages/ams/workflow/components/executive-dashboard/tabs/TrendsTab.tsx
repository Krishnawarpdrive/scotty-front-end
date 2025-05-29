
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const TrendsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trends Analysis</CardTitle>
        <CardDescription>
          Historical trends and patterns in executive metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Trends analysis coming soon</p>
          <p className="text-sm">Track performance trends over time</p>
        </div>
      </CardContent>
    </Card>
  );
};

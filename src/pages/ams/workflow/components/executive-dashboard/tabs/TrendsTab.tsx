
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const TrendsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Analysis</CardTitle>
        <CardDescription>
          Metric trends and performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Trend analysis charts coming soon</p>
          <p className="text-sm">Interactive charts and trend visualizations will be available here</p>
        </div>
      </CardContent>
    </Card>
  );
};

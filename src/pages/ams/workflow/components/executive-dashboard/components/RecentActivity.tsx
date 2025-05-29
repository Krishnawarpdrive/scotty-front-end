
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { getMetricIcon } from '../utils/metricIcons';
import { getMetricColor, formatMetricValue } from '../utils/metricUtils';

interface RecentActivityProps {
  metrics: ExecutiveMetric[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  metrics
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest metric updates and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.slice(0, 5).map((metric) => (
            <div key={metric.id} className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded border ${getMetricColor(metric.metric_type)}`}>
                  {getMetricIcon(metric.metric_type)}
                </div>
                <div>
                  <div className="font-medium text-sm capitalize">
                    {metric.metric_type.replace(/_/g, ' ')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(metric.measurement_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Badge variant="outline">
                {formatMetricValue(metric.metric_type, metric.metric_value)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

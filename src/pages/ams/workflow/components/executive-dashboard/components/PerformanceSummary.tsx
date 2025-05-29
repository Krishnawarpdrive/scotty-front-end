
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { getMetricIcon } from '../utils/metricIcons';
import { getMetricColor, getMetricsByType, getAverageMetric, formatMetricValue } from '../utils/metricUtils';

interface PerformanceSummaryProps {
  metricsByType: Record<string, ExecutiveMetric[]>;
}

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  metricsByType
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>
          Overview of key metrics for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(metricsByType).map(([type, typeMetrics]) => (
            <div key={type} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded border ${getMetricColor(type)}`}>
                  {getMetricIcon(type)}
                </div>
                <span className="capitalize font-medium">
                  {type.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {formatMetricValue(type, getAverageMetric({ [type]: typeMetrics }, type))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {typeMetrics.length} records
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

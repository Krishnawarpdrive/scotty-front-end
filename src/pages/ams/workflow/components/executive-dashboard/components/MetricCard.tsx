
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getMetricIcon } from '../utils/metricIcons';
import { getMetricColor, formatMetricValue } from '../utils/metricUtils';

interface MetricCardProps {
  type: string;
  average: number;
  trend: 'up' | 'down' | 'stable';
  dataPointsCount: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  type,
  average,
  trend,
  dataPointsCount
}) => {
  const color = getMetricColor(type);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded border ${color}`}>
            {getMetricIcon(type)}
          </div>
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : trend === 'down' ? (
            <TrendingDown className="h-4 w-4 text-red-600" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <h3 className="font-medium text-sm capitalize">
            {type.replace(/_/g, ' ')}
          </h3>
          <div className="text-2xl font-bold">
            {formatMetricValue(type, average)}
          </div>
          <p className="text-xs text-muted-foreground">
            {dataPointsCount} data points
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

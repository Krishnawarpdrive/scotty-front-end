
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AssignmentMapping, DAProfile } from './DAMappingInterface';

interface PerformanceMetric {
  da_id: string;
  metric_type: string;
  value: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

interface PerformanceMetricsPanelProps {
  performanceMetrics: PerformanceMetric[];
  assignments: AssignmentMapping[];
  daProfiles: DAProfile[];
}

export const PerformanceMetricsPanel: React.FC<PerformanceMetricsPanelProps> = ({
  performanceMetrics,
  assignments,
  daProfiles
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getDAName = (daId: string) => {
    const da = daProfiles.find(d => d.id === daId);
    return da ? da.name : 'Unknown DA';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {performanceMetrics.length > 0 ? (
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {getDAName(metric.da_id)}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 capitalize">
                          {metric.metric_type.replace('_', ' ')}
                        </span>
                        <span className="font-medium">
                          {metric.metric_type.includes('rate') ? `${metric.value}%` : metric.value}
                        </span>
                      </div>
                      
                      {metric.metric_type.includes('rate') && (
                        <Progress value={metric.value} className="h-2" />
                      )}
                      
                      <p className="text-xs text-gray-500">
                        Period: {metric.period.replace('_', ' ')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No performance metrics available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

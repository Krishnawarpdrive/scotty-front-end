
import React from 'react';
import { Card } from '@/components/ui/card';
import { MetricData } from '../../../hooks/useDashboardData';

interface MetricInsightsViewProps {
  metric: MetricData;
}

export const MetricInsightsView: React.FC<MetricInsightsViewProps> = ({ metric }) => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h4 className="font-medium mb-2">Key Insight</h4>
        <p className="text-sm text-gray-600">
          {metric.insight}
        </p>
      </Card>
      <Card className="p-4">
        <h4 className="font-medium mb-2">Recommended Action</h4>
        <p className="text-sm text-gray-600">
          {metric.recommendation}
        </p>
      </Card>
      <Card className="p-4">
        <h4 className="font-medium mb-2">Trends</h4>
        <div className="text-sm text-gray-600 flex items-center">
          <span 
            className={`inline-block w-2 h-2 rounded-full mr-2 
              ${metric.trend > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}
          ></span>
          <span>
            {metric.trendLabel}
          </span>
        </div>
      </Card>
    </div>
  );
};

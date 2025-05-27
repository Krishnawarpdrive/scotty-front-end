
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUpIcon } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface VendorPerformanceMetricsProps {
  vendor: Vendor;
}

export const VendorPerformanceMetrics: React.FC<VendorPerformanceMetricsProps> = ({ vendor }) => {
  const metrics = [
    { label: 'Quality Score', value: vendor.performanceMetrics.qualityScore, color: 'bg-blue-600' },
    { label: 'Timeliness Score', value: vendor.performanceMetrics.timelinessScore, color: 'bg-green-600' },
    { label: 'Compliance Score', value: vendor.performanceMetrics.complianceScore, color: 'bg-purple-600' },
    { label: 'Submission Rate', value: vendor.performanceMetrics.submissionRate, color: 'bg-orange-600' },
    { label: 'Interview Rate', value: vendor.performanceMetrics.interviewRate, color: 'bg-indigo-600' },
    { label: 'Offer Rate', value: vendor.performanceMetrics.offerRate, color: 'bg-red-600' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">{metric.label}</label>
              <span className="text-sm font-bold">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

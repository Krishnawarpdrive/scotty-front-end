
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, Clock, Award } from 'lucide-react';

interface TAMetric {
  id: string;
  name: string;
  efficiency: number;
  placementsThisMonth: number;
  avgTimeToFill: number;
  clientSatisfaction: number;
  activeRoles: number;
  trend: 'up' | 'down';
  trendValue: number;
}

interface TAPerformanceMetricsProps {
  data: TAMetric[];
  isLoading: boolean;
}

export const TAPerformanceMetrics: React.FC<TAPerformanceMetricsProps> = ({
  data,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>TA Performance Metrics</CardTitle>
          <CardDescription>Top 5 performance parameters for Talent Acquisition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-50';
    if (efficiency >= 75) return 'text-blue-600 bg-blue-50';
    if (efficiency >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>TA Performance Metrics</CardTitle>
        <CardDescription>Top 5 performance parameters for Talent Acquisition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-80 overflow-y-auto">
        {data.map((ta, index) => (
          <motion.div
            key={ta.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getPerformanceColor(ta.efficiency)}`}>
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{ta.name}</h4>
                  <p className="text-sm text-gray-500">{ta.activeRoles} active roles</p>
                </div>
              </div>
              <Badge variant={ta.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1">
                {ta.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {ta.trendValue}%
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{ta.efficiency}%</div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{ta.placementsThisMonth}</div>
                <div className="text-xs text-gray-500">Placements</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{ta.avgTimeToFill}d</div>
                <div className="text-xs text-gray-500">Avg Fill Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{ta.clientSatisfaction}/5</div>
                <div className="text-xs text-gray-500">Satisfaction</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Performance</span>
                <span>{ta.efficiency}%</span>
              </div>
              <Progress value={ta.efficiency} className="h-2" />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

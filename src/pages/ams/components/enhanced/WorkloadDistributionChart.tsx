
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartData } from '@/hooks/useEnhancedAMSDashboard';

interface WorkloadDistributionChartProps {
  data: ChartData[];
  isLoading: boolean;
}

export const WorkloadDistributionChart: React.FC<WorkloadDistributionChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

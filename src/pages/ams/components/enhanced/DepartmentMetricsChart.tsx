
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ChartData } from '@/hooks/useEnhancedAMSDashboard';

interface DepartmentMetricsChartProps {
  data: ChartData[];
  isLoading: boolean;
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const DepartmentMetricsChart: React.FC<DepartmentMetricsChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}`, 'Hires']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

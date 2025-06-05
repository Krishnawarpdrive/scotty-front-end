
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { ChartData } from '@/hooks/useEnhancedAMSDashboard';

interface HiringTrendsChartProps {
  data: ChartData[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const HiringTrendsChart: React.FC<HiringTrendsChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hiring Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Hiring Trends
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorHires)"
                  name="Actual Hires"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorTarget)"
                  name="Target"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

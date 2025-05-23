
import React from 'react';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { MetricData } from '../../../hooks/useDashboardData';

interface MetricChartViewProps {
  metric: MetricData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const MetricChartView: React.FC<MetricChartViewProps> = ({ metric }) => {
  if (metric.title === 'Time to Hire' || metric.title === 'TA Work Progress') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={metric.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Bar dataKey="value" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={metric.data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {metric.data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
};

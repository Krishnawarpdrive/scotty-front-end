
import React from 'react';
import { Card } from "@/components/ui/card";
import { MetricData } from '../../hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { motion } from 'framer-motion';

// Define color schemes for status
const STATUS_COLORS = {
  good: '#10b981', // Green
  warning: '#f59e0b', // Yellow/Amber
  critical: '#ef4444' // Red
};

const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface MetricCardProps {
  metric: MetricData;
  onClick: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onClick }) => {
  const { title, value, unit, description, data, trend, trendLabel, status } = metric;
  
  // Determine which chart type to render based on the metric title
  const renderChart = () => {
    if (title === 'Time to Hire' || title === 'TA Work Progress') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 10}} />
            <YAxis tick={{fontSize: 10}} />
            <RechartsTooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={STATUS_COLORS[status]} 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (title === 'Interviewer Load') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 10}} />
            <YAxis tick={{fontSize: 10}} />
            <RechartsTooltip />
            <Bar dataKey="assigned" fill={STATUS_COLORS[status]} />
            <Bar dataKey="available" fill="#EEEEEE" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        className="p-5 flex flex-col h-[280px] hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 bg-${status === 'good' ? 'emerald' : status === 'warning' ? 'amber' : 'red'}-500`}></div>
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Details
          </Button>
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: STATUS_COLORS[status] }}>
          {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
        </div>
        <div className="text-sm text-gray-500 mb-4">{description}</div>
        <div className="flex-1 min-h-0">
          {renderChart()}
        </div>
        <div className="flex items-center text-xs mt-2">
          <span 
            className={`inline-block w-2 h-2 rounded-full mr-1
              ${trend > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}
          ></span>
          <span className={`
            ${trend > 0 ? 'text-emerald-600' : 'text-amber-600'}
          `}>
            {trendLabel}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

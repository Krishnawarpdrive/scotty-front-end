
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const MetricWidget: React.FC<{
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {change > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {Math.abs(change)}% from last month
        </span>
      </motion.div>
    </div>
  );
};

export const ProgressWidget: React.FC<{
  title: string;
  items: Array<{ label: string; value: number; max: number; color: string }>;
}> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span>{item.value}/{item.max}</span>
          </div>
          <Progress 
            value={(item.value / item.max) * 100} 
            className="h-2"
          />
        </motion.div>
      ))}
    </div>
  );
};

export const ActivityWidget: React.FC = () => {
  const activities = [
    { action: 'New candidate applied', time: '2 min ago', type: 'application' },
    { action: 'Interview scheduled', time: '15 min ago', type: 'interview' },
    { action: 'Offer sent to candidate', time: '1 hour ago', type: 'offer' },
    { action: 'Role requirements updated', time: '2 hours ago', type: 'update' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return <Users className="h-4 w-4" />;
      case 'interview': return <Clock className="h-4 w-4" />;
      case 'offer': return <DollarSign className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-1 rounded bg-blue-100 text-blue-600">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ChartWidget: React.FC<{
  title: string;
  data: Array<{ name: string; value: number; color: string }>;
}> = ({ title, data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Clock, DollarSign, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPIData {
  totalHires: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  averageTimeToHire: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  costPerHire: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  hiringGoalProgress: {
    value: number;
    target: number;
    percentage: number;
  };
}

interface ExecutiveKPICardsProps {
  data: KPIData;
  isLoading: boolean;
}

export const ExecutiveKPICards: React.FC<ExecutiveKPICardsProps> = ({
  data,
  isLoading
}) => {
  const kpis = [
    {
      title: 'Total Hires',
      value: data?.totalHires?.value || 0,
      change: data?.totalHires?.change || 0,
      trend: data?.totalHires?.trend || 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      suffix: ''
    },
    {
      title: 'Avg. Time to Hire',
      value: data?.averageTimeToHire?.value || 0,
      change: data?.averageTimeToHire?.change || 0,
      trend: data?.averageTimeToHire?.trend || 'down',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      suffix: ' days'
    },
    {
      title: 'Cost per Hire',
      value: data?.costPerHire?.value || 0,
      change: data?.costPerHire?.change || 0,
      trend: data?.costPerHire?.trend || 'down',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      suffix: '',
      prefix: '$'
    },
    {
      title: 'Hiring Goal Progress',
      value: data?.hiringGoalProgress?.percentage || 0,
      change: 0,
      trend: 'up' as const,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      suffix: '%',
      isProgress: true
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(null).map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-24 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              {!kpi.isProgress && (
                <Badge variant={kpi.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1">
                  {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(kpi.change)}%
                </Badge>
              )}
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">
                  {kpi.prefix}{kpi.value.toLocaleString()}{kpi.suffix}
                </p>
              </div>
              
              {kpi.isProgress && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(kpi.value, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {data?.hiringGoalProgress?.value || 0} / {data?.hiringGoalProgress?.target || 0} hires
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon, TrendingDownIcon, UsersIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

interface KPI {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ClientKPICardsProps {
  kpis: KPI[];
}

export const ClientKPICards: React.FC<ClientKPICardsProps> = ({ kpis }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return TrendingUpIcon;
    if (trend === 'down') return TrendingDownIcon;
    return null;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const IconComponent = kpi.icon;
        const TrendIcon = getTrendIcon(kpi.trend);
        
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {kpi.value}
                    </div>
                    <div className="flex items-center mt-1">
                      {TrendIcon && (
                        <TrendIcon className={`h-3 w-3 mr-1 ${getTrendColor(kpi.trend)}`} />
                      )}
                      <span className={`text-xs font-medium ${getTrendColor(kpi.trend)}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        {kpi.changeLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

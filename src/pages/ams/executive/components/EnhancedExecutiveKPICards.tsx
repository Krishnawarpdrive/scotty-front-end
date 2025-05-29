
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  DollarSign, 
  Target,
  Building2,
  UserCheck,
  Star,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

interface KPICardData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
  description: string;
  target?: number;
  progress?: number;
  color: string;
  actionable?: boolean;
}

interface EnhancedExecutiveKPICardsProps {
  data: any;
  isLoading: boolean;
  onCardClick: (cardType: string, data: any) => void;
}

export const EnhancedExecutiveKPICards: React.FC<EnhancedExecutiveKPICardsProps> = ({
  data,
  isLoading,
  onCardClick
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {Array(6).fill(null).map((_, i) => (
          <Card key={i} className="h-40">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpiCards: KPICardData[] = [
    {
      id: 'total-hires',
      title: 'Total Hires',
      value: data?.totalHires?.value || 0,
      change: data?.totalHires?.change || 0,
      trend: data?.totalHires?.trend || 'up',
      icon: Users,
      description: 'Successful placements this period',
      color: 'text-blue-600',
      actionable: true
    },
    {
      id: 'avg-time-to-hire',
      title: 'Avg Time to Hire',
      value: `${data?.averageTimeToHire?.value || 0} days`,
      change: data?.averageTimeToHire?.change || 0,
      trend: data?.averageTimeToHire?.trend || 'down',
      icon: Clock,
      description: 'Average hiring cycle duration',
      color: 'text-orange-600',
      actionable: true
    },
    {
      id: 'cost-per-hire',
      title: 'Cost per Hire',
      value: `$${data?.costPerHire?.value?.toLocaleString() || 0}`,
      change: data?.costPerHire?.change || 0,
      trend: data?.costPerHire?.trend || 'down',
      icon: DollarSign,
      description: 'Average recruitment cost',
      color: 'text-green-600',
      actionable: true
    },
    {
      id: 'hiring-goal',
      title: 'Hiring Goal Progress',
      value: `${data?.hiringGoalProgress?.value || 0}/${data?.hiringGoalProgress?.target || 0}`,
      change: data?.hiringGoalProgress?.percentage || 0,
      trend: 'up',
      icon: Target,
      description: 'Progress towards quarterly goals',
      target: data?.hiringGoalProgress?.target || 100,
      progress: data?.hiringGoalProgress?.percentage || 0,
      color: 'text-purple-600',
      actionable: true
    },
    {
      id: 'client-portfolio',
      title: 'Client Portfolio',
      value: '24 Active',
      change: 8.5,
      trend: 'up',
      icon: Building2,
      description: 'Active client relationships',
      color: 'text-indigo-600',
      actionable: true
    },
    {
      id: 'candidate-quality',
      title: 'Candidate Quality',
      value: '4.7/5.0',
      change: 12.3,
      trend: 'up',
      icon: Star,
      description: 'Average candidate rating',
      progress: 94,
      color: 'text-yellow-600',
      actionable: true
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: 'up' | 'down', change: number) => {
    if (change === 0) return 'text-gray-500';
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpiCards.map((card, index) => {
        const TrendIcon = getTrendIcon(card.trend);
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card 
              className="h-40 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500"
              onClick={() => onCardClick(card.id, card)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full bg-gray-50 ${card.color} group-hover:bg-blue-50`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </h3>
                    {card.actionable && (
                      <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${getTrendColor(card.trend, card.change)}`}>
                      <TrendIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {Math.abs(card.change)}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">vs last period</span>
                  </div>
                  
                  {card.progress !== undefined && (
                    <div className="space-y-1">
                      <Progress value={card.progress} className="h-1" />
                      <p className="text-xs text-gray-500">{card.progress}% of target</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowUpRight,
  Sparkles,
  TrendingUp as TrendingUpIcon
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
  isHighlight?: boolean;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {Array(6).fill(null).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-40 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                    <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  const kpiCards: KPICardData[] = [
    {
      id: 'total-hires',
      title: 'Total Hires',
      value: data?.totalHires?.value || 234,
      change: data?.totalHires?.change || 12.5,
      trend: data?.totalHires?.trend || 'up',
      icon: Users,
      description: 'Successful placements this period',
      color: 'text-blue-600',
      actionable: true,
      isHighlight: true
    },
    {
      id: 'avg-time-to-hire',
      title: 'Avg Time to Hire',
      value: `${data?.averageTimeToHire?.value || 28} days`,
      change: data?.averageTimeToHire?.change || -8.2,
      trend: data?.averageTimeToHire?.trend || 'down',
      icon: Clock,
      description: 'Average hiring cycle duration',
      color: 'text-orange-600',
      actionable: true
    },
    {
      id: 'cost-per-hire',
      title: 'Cost per Hire',
      value: `$${(data?.costPerHire?.value || 4250).toLocaleString()}`,
      change: data?.costPerHire?.change || -5.1,
      trend: data?.costPerHire?.trend || 'down',
      icon: DollarSign,
      description: 'Average recruitment cost',
      color: 'text-green-600',
      actionable: true
    },
    {
      id: 'hiring-goal',
      title: 'Hiring Goal Progress',
      value: `${data?.hiringGoalProgress?.value || 234}/${data?.hiringGoalProgress?.target || 300}`,
      change: data?.hiringGoalProgress?.percentage || 78,
      trend: 'up',
      icon: Target,
      description: 'Progress towards quarterly goals',
      target: data?.hiringGoalProgress?.target || 300,
      progress: data?.hiringGoalProgress?.percentage || 78,
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
      actionable: true,
      isHighlight: true
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: 'up' | 'down', change: number) => {
    if (change === 0) return 'text-gray-500';
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const getCardVariants = (index: number) => ({
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <AnimatePresence mode="wait">
        {kpiCards.map((card, index) => {
          const TrendIcon = getTrendIcon(card.trend);
          const Icon = card.icon;
          
          return (
            <motion.div
              key={card.id}
              variants={getCardVariants(index)}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="group relative"
            >
              <Card 
                className={`h-40 cursor-pointer transition-all duration-300 overflow-hidden relative
                  ${card.isHighlight 
                    ? 'border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl' 
                    : 'border-l-4 border-l-transparent hover:border-l-blue-500 hover:shadow-lg'
                  }
                  bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-blue-50/30
                `}
                onClick={() => onCardClick(card.id, card)}
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Highlight indicator for top performers */}
                {card.isHighlight && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="h-2 w-2 text-yellow-800" />
                  </motion.div>
                )}

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                      {card.title}
                    </CardTitle>
                    <motion.div 
                      className={`p-2 rounded-full transition-all duration-300 ${card.color} 
                        ${card.isHighlight 
                          ? 'bg-blue-100 group-hover:bg-blue-200' 
                          : 'bg-gray-50 group-hover:bg-blue-50'
                        }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {card.value}
                      </motion.h3>
                      {card.actionable && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={`flex items-center gap-1 ${getTrendColor(card.trend, card.change)}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <TrendIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {Math.abs(card.change)}%
                        </span>
                      </motion.div>
                      <span className="text-xs text-gray-500">vs last period</span>
                    </div>
                    
                    {card.progress !== undefined && (
                      <motion.div 
                        className="space-y-1"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      >
                        <Progress value={card.progress} className="h-1.5" />
                        <p className="text-xs text-gray-500">{card.progress}% of target</p>
                      </motion.div>
                    )}
                    
                    <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {card.description}
                    </p>
                  </div>
                </CardContent>

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

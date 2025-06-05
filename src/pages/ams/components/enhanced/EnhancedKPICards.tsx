
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Users, Briefcase, ClipboardList, Target } from 'lucide-react';
import { DashboardKPI } from '@/hooks/useEnhancedAMSDashboard';

interface EnhancedKPICardsProps {
  kpis: DashboardKPI[];
  isLoading: boolean;
}

const iconMap = {
  Users,
  Briefcase,
  ClipboardList,
  Target
};

const colorMap = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600'
};

const trendColorMap = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-600'
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4" />;
    case 'down':
      return <TrendingDown className="h-4 w-4" />;
    default:
      return <Minus className="h-4 w-4" />;
  }
};

export const EnhancedKPICards: React.FC<EnhancedKPICardsProps> = ({ kpis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon as keyof typeof iconMap] || Users;
        const progressPercentage = kpi.target ? (kpi.value / kpi.target) * 100 : 0;
        
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className={`h-5 w-5 ${colorMap[kpi.color as keyof typeof colorMap]}`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className="text-2xl font-bold"
                    >
                      {kpi.value}{kpi.unit}
                    </motion.div>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${trendColorMap[kpi.trend]}`}
                    >
                      <TrendIcon trend={kpi.trend} />
                      {Math.abs(kpi.change)}%
                    </Badge>
                  </div>
                  
                  {kpi.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress to target</span>
                        <span>{kpi.target}{kpi.unit}</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                      >
                        <Progress 
                          value={progressPercentage} 
                          className="h-2"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 opacity-5 bg-gradient-to-br from-${kpi.color}-500 to-${kpi.color}-700`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

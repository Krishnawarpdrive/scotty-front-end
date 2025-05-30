
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Award, 
  Users,
  Star,
  BarChart3,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';

interface TAMetric {
  id: string;
  name: string;
  efficiency: number;
  placementsThisMonth: number;
  avgTimeToFill: number;
  clientSatisfaction: number;
  activeRoles: number;
  trend: 'up' | 'down';
  trendValue: number;
}

interface TAPerformanceMetricsProps {
  data: TAMetric[];
  isLoading: boolean;
}

export const TAPerformanceMetrics: React.FC<TAPerformanceMetricsProps> = ({
  data,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="h-96 overflow-hidden">
        <CardHeader>
          <CardTitle>TA Performance Metrics</CardTitle>
          <CardDescription>Top 5 performance parameters for Talent Acquisition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (efficiency >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (efficiency >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPerformanceIcon = (efficiency: number) => {
    if (efficiency >= 90) return Award;
    if (efficiency >= 75) return Target;
    if (efficiency >= 60) return BarChart3;
    return Clock;
  };

  return (
    <Card className="h-96 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              TA Performance Metrics
            </CardTitle>
            <CardDescription>Top performing Talent Acquisition specialists</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {data.map((ta, index) => {
          const PerformanceIcon = getPerformanceIcon(ta.efficiency);
          
          return (
            <motion.div
              key={ta.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group p-4 rounded-lg border-2 hover:shadow-md transition-all duration-300 cursor-pointer ${getPerformanceColor(ta.efficiency)}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`p-2 rounded-full ${getPerformanceColor(ta.efficiency).replace('border-', 'bg-').replace('-200', '-100')}`}>
                      <PerformanceIcon className="h-4 w-4" />
                    </div>
                    {ta.efficiency >= 90 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="h-2 w-2 text-yellow-800" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ta.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{ta.activeRoles} active roles</span>
                      <span>•</span>
                      <Star className="h-3 w-3" />
                      <span>{ta.clientSatisfaction}/5</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={ta.trend === 'up' ? 'default' : 'secondary'} 
                    className="flex items-center gap-1"
                  >
                    {ta.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {ta.trendValue}%
                  </Badge>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center p-2 bg-white/50 rounded">
                  <div className="text-lg font-bold text-blue-600">{ta.efficiency}%</div>
                  <div className="text-xs text-gray-600">Efficiency</div>
                </div>
                <div className="text-center p-2 bg-white/50 rounded">
                  <div className="text-lg font-bold text-green-600">{ta.placementsThisMonth}</div>
                  <div className="text-xs text-gray-600">Placements</div>
                </div>
                <div className="text-center p-2 bg-white/50 rounded">
                  <div className="text-lg font-bold text-orange-600">{ta.avgTimeToFill}d</div>
                  <div className="text-xs text-gray-600">Avg Fill</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Performance Score</span>
                  <span>{ta.efficiency}%</span>
                </div>
                <Progress value={ta.efficiency} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: 2h ago</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-xs"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Message
                </Button>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

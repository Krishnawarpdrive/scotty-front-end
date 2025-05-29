
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SideDrawer } from '@/components/ui/side-drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Users,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { EnhancedClientData } from '../hooks/useExecutiveClientInsights';

interface ExecutiveClientInsightsDrawerProps {
  open: boolean;
  onClose: () => void;
  clientData: EnhancedClientData | null;
}

export const ExecutiveClientInsightsDrawer: React.FC<ExecutiveClientInsightsDrawerProps> = ({
  open,
  onClose,
  clientData
}) => {
  if (!clientData) return null;

  const getRiskColor = (hasRisk: boolean) => {
    return hasRisk ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance': return TrendingUp;
      case 'risk': return AlertTriangle;
      case 'opportunity': return Target;
      case 'alert': return Clock;
      default: return Zap;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'risk': return 'bg-red-50 text-red-700 border-red-200';
      case 'opportunity': return 'bg-green-50 text-green-700 border-green-200';
      case 'alert': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      title={`${clientData.name} - Executive Insights`}
      description="Comprehensive client analysis and performance insights"
      size="xl"
    >
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          {/* Client Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Client Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Health Score</span>
                    <span className="font-medium">{clientData.health_score}/100</span>
                  </div>
                  <Progress value={clientData.health_score} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget Utilized</span>
                    <span className="font-medium">{clientData.budget_utilized}%</span>
                  </div>
                  <Progress value={clientData.budget_utilized} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {clientData.total_requirements}
                  </div>
                  <div className="text-sm text-gray-600">Total Requirements</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {clientData.status}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {clientData.insights.length}
                  </div>
                  <div className="text-sm text-gray-600">Active Insights</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fulfillment Rate</span>
                      <span className="text-sm text-gray-600">
                        {clientData.performance_metrics.fulfillment_rate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={clientData.performance_metrics.fulfillment_rate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className="text-sm text-gray-600">
                        {clientData.performance_metrics.quality_score.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={clientData.performance_metrics.quality_score} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Avg Time to Fill</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      {clientData.performance_metrics.avg_time_to_fill.toFixed(0)} days
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Cost Efficiency</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {clientData.performance_metrics.cost_efficiency.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(clientData.risk_indicators).map(([key, hasRisk]) => (
                  <motion.div
                    key={key}
                    className={`p-3 rounded-lg border ${getRiskColor(hasRisk)}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      {hasRisk ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {key.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </div>
                    <Badge 
                      variant={hasRisk ? "destructive" : "secondary"} 
                      className="mt-1 text-xs"
                    >
                      {hasRisk ? 'At Risk' : 'Healthy'}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Executive Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientData.insights.length > 0 ? (
                  clientData.insights.map((insight, index) => {
                    const Icon = getInsightIcon(insight.insight_type);
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${getInsightColor(insight.insight_type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <Badge variant="outline" className="text-xs">
                                {insight.insight_type}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Priority: {insight.priority_score}
                              </span>
                            </div>
                            <p className="text-sm">
                              {insight.insight_data.message || 
                               `${insight.insight_type} insight for ${clientData.name}`}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(insight.generated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No insights available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </SideDrawer>
  );
};

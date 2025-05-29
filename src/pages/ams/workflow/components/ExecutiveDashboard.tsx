
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExecutiveMetric } from '@/types/WorkflowTypes';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Users, Clock, DollarSign, Star } from 'lucide-react';

interface ExecutiveDashboardProps {
  metrics: ExecutiveMetric[];
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ metrics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'time_to_fill': return <Clock className="h-5 w-5" />;
      case 'quality_score': return <Star className="h-5 w-5" />;
      case 'cost_per_hire': return <DollarSign className="h-5 w-5" />;
      case 'candidate_satisfaction': return <Users className="h-5 w-5" />;
      case 'client_satisfaction': return <TrendingUp className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'time_to_fill': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'quality_score': return 'text-green-600 bg-green-50 border-green-200';
      case 'cost_per_hire': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'candidate_satisfaction': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'client_satisfaction': return 'text-pink-600 bg-pink-50 border-pink-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredMetrics = metrics.filter(metric => metric.period_type === selectedPeriod);
  
  const metricsByType = filteredMetrics.reduce((acc, metric) => {
    if (!acc[metric.metric_type]) {
      acc[metric.metric_type] = [];
    }
    acc[metric.metric_type].push(metric);
    return acc;
  }, {} as Record<string, ExecutiveMetric[]>);

  const getAverageMetric = (type: string) => {
    const typeMetrics = metricsByType[type] || [];
    if (typeMetrics.length === 0) return 0;
    return typeMetrics.reduce((sum, m) => sum + m.metric_value, 0) / typeMetrics.length;
  };

  const getTrend = (type: string) => {
    const typeMetrics = metricsByType[type] || [];
    if (typeMetrics.length < 2) return 'stable';
    const recent = typeMetrics.slice(-2);
    return recent[1].metric_value > recent[0].metric_value ? 'up' : 'down';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Executive Dashboard</h2>
          <p className="text-muted-foreground">
            Key performance indicators and metrics overview
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('weekly')}
          >
            Weekly
          </Button>
          <Button 
            variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('monthly')}
          >
            Monthly
          </Button>
          <Button 
            variant={selectedPeriod === 'quarterly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('quarterly')}
          >
            Quarterly
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {['time_to_fill', 'quality_score', 'cost_per_hire', 'candidate_satisfaction', 'client_satisfaction'].map((type) => {
          const average = getAverageMetric(type);
          const trend = getTrend(type);
          const color = getMetricColor(type);
          
          return (
            <Card key={type}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded border ${color}`}>
                    {getMetricIcon(type)}
                  </div>
                  {trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm capitalize">
                    {type.replace(/_/g, ' ')}
                  </h3>
                  <div className="text-2xl font-bold">
                    {type === 'time_to_fill' ? `${Math.round(average)}d` :
                     type.includes('satisfaction') || type === 'quality_score' ? `${Math.round(average)}%` :
                     `$${Math.round(average).toLocaleString()}`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metricsByType[type]?.length || 0} data points
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>
                  Overview of key metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(metricsByType).map(([type, typeMetrics]) => (
                    <div key={type} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded border ${getMetricColor(type)}`}>
                          {getMetricIcon(type)}
                        </div>
                        <span className="capitalize font-medium">
                          {type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {type === 'time_to_fill' ? `${Math.round(getAverageMetric(type))}d` :
                           type.includes('satisfaction') || type === 'quality_score' ? `${Math.round(getAverageMetric(type))}%` :
                           `$${Math.round(getAverageMetric(type)).toLocaleString()}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {typeMetrics.length} records
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest metric updates and changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.slice(0, 5).map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded border ${getMetricColor(metric.metric_type)}`}>
                          {getMetricIcon(metric.metric_type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm capitalize">
                            {metric.metric_type.replace(/_/g, ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(metric.measurement_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {metric.metric_type === 'time_to_fill' ? `${metric.metric_value}d` :
                         metric.metric_type.includes('satisfaction') || metric.metric_type === 'quality_score' ? `${metric.metric_value}%` :
                         `$${metric.metric_value.toLocaleString()}`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
              <CardDescription>
                Metric trends and performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Trend analysis charts coming soon</p>
                <p className="text-sm">Interactive charts and trend visualizations will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>
                Client and requirement-specific metric analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Detailed breakdowns coming soon</p>
                <p className="text-sm">Client-wise and requirement-wise metric analysis will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

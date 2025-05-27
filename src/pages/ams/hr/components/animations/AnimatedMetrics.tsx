
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedProgressBar } from './AnimatedProgressBar';
import { triggerMilestoneToast } from '@/components/GoalCompletionToast';

interface MetricData {
  id: string;
  title: string;
  value: number;
  target: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

interface AnimatedMetricsProps {
  metrics: MetricData[];
  title?: string;
  animationStagger?: number;
}

export const AnimatedMetrics: React.FC<AnimatedMetricsProps> = ({
  metrics,
  title = "Key Metrics",
  animationStagger = 100
}) => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    metrics.forEach((metric, index) => {
      setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [metric.id]: metric.value
        }));
      }, index * animationStagger);
    });
  }, [metrics, animationStagger]);

  const formatValue = (value: number, unit?: string) => {
    if (unit === '%') return `${Math.round(value)}${unit}`;
    if (unit === 'hrs') return `${value.toFixed(1)}${unit}`;
    return `${Math.round(value)}${unit || ''}`;
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleMilestone = (milestone: number, metricTitle: string) => {
    triggerMilestoneToast(milestone, metricTitle);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * (animationStagger / 1000),
                duration: 0.4
              }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">{metric.title}</h4>
                {metric.trend && (
                  <div className={`text-xs flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    {metric.trendValue && `${metric.trendValue > 0 ? '+' : ''}${metric.trendValue}%`}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <motion.div
                  className="text-2xl font-bold text-gray-900"
                  key={animatedValues[metric.id] || 0}
                  initial={{ scale: 1.1, color: '#059669' }}
                  animate={{ scale: 1, color: '#111827' }}
                  transition={{ duration: 0.3 }}
                >
                  {formatValue(animatedValues[metric.id] || 0, metric.unit)}
                </motion.div>
                
                <AnimatedProgressBar
                  value={animatedValues[metric.id] || 0}
                  max={metric.target}
                  animationDelay={index * animationStagger}
                  onMilestone={(milestone) => handleMilestone(milestone, metric.title)}
                  showValue={false}
                />
                
                <div className="text-xs text-gray-500">
                  Target: {formatValue(metric.target, metric.unit)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { MetricCard } from './MetricCard';
import { MetricData } from '../../hooks/useDashboardData';
import { motion } from 'framer-motion';

interface PrimaryMetricsSectionProps {
  metrics: MetricData[];
  isLoading: boolean;
  onMetricClick: (metric: MetricData) => void;
}

export const PrimaryMetricsSection: React.FC<PrimaryMetricsSectionProps> = ({
  metrics,
  isLoading,
  onMetricClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <h2 className="font-bold text-xl mb-4">Primary Hiring Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {isLoading ? (
          Array(5).fill(null).map((_, i) => (
            <div 
              key={i} 
              className="h-[280px] bg-white animate-pulse rounded-xl border"
            ></div>
          ))
        ) : (
          metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              onClick={() => onMetricClick(metric)} 
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

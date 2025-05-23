
import React from 'react';
import { CandidatePipelineChart } from './CandidatePipelineChart';
import { WeeklyGoalsSection } from './WeeklyGoalsSection';
import { PrimaryMetricsSection } from './PrimaryMetricsSection';
import { SecondaryMetricsSection } from './SecondaryMetricsSection';
import { MetricData } from '../../hooks/useDashboardData';
import { motion } from 'framer-motion';

interface DashboardContentProps {
  metrics: MetricData[];
  isLoading: boolean;
  onMetricClick: (metric: MetricData) => void;
  onPipelineStageClick: (stage: string, data: any) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  metrics,
  isLoading,
  onMetricClick,
  onPipelineStageClick
}) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Candidate Pipeline Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CandidatePipelineChart onStageClick={onPipelineStageClick} />
      </motion.div>
      
      {/* Weekly Goals Progress */}
      <WeeklyGoalsSection />
      
      {/* Primary Metrics */}
      <PrimaryMetricsSection 
        metrics={metrics}
        isLoading={isLoading}
        onMetricClick={onMetricClick}
      />
      
      {/* Secondary Metrics */}
      <SecondaryMetricsSection />
    </div>
  );
};

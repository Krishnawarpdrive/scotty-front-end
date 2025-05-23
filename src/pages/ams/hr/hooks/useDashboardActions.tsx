
import { MetricData } from './useDashboardData';

interface UseDashboardActionsProps {
  setCurrentMetric: (metric: MetricData | null) => void;
  setDetailsDrawerOpen: (open: boolean) => void;
  setSelectedPipelineStage: (stage: { stage: string; data: any } | null) => void;
  setPipelineDrawerOpen: (open: boolean) => void;
  setSelectedActivity: (activity: any) => void;
  setActivityDetailOpen: (open: boolean) => void;
}

export const useDashboardActions = ({
  setCurrentMetric,
  setDetailsDrawerOpen,
  setSelectedPipelineStage,
  setPipelineDrawerOpen,
  setSelectedActivity,
  setActivityDetailOpen
}: UseDashboardActionsProps) => {
  const handleShowDetails = (metric: MetricData) => {
    setCurrentMetric(metric);
    setDetailsDrawerOpen(true);
  };

  const handlePipelineStageClick = (stage: string, data: any) => {
    setSelectedPipelineStage({ stage, data });
    setPipelineDrawerOpen(true);
  };
  
  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    setActivityDetailOpen(true);
  };

  return {
    handleShowDetails,
    handlePipelineStageClick,
    handleActivityClick
  };
};


import React from 'react';
import { WorkflowStage, QualityGate, HandoffDocumentation, ExecutiveMetric } from '@/types/WorkflowTypes';
import { WorkflowManagementHeader } from './WorkflowManagementHeader';
import { WorkflowKPICards } from './WorkflowKPICards';
import { WorkflowManagementTabs } from './WorkflowManagementTabs';

interface WorkflowManagementContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  workflowStages: WorkflowStage[];
  qualityGates: QualityGate[];
  handoffDocuments: HandoffDocumentation[];
  executiveMetrics: ExecutiveMetric[];
}

export const WorkflowManagementContent: React.FC<WorkflowManagementContentProps> = ({
  activeTab,
  onTabChange,
  workflowStages,
  qualityGates,
  handoffDocuments,
  executiveMetrics
}) => {
  return (
    <div className="space-y-6">
      <WorkflowManagementHeader />
      <WorkflowKPICards />
      <WorkflowManagementTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        workflowStages={workflowStages}
        qualityGates={qualityGates}
        handoffDocuments={handoffDocuments}
        executiveMetrics={executiveMetrics}
      />
    </div>
  );
};

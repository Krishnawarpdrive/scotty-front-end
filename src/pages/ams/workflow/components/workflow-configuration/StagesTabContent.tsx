
import React from 'react';
import { WorkflowStage, QualityGate } from '@/types/WorkflowTypes';
import { StagesListCard } from './StagesListCard';
import { StageDetailsCard } from './StageDetailsCard';

interface StagesTabContentProps {
  stages: WorkflowStage[];
  qualityGates: QualityGate[];
  selectedStage: string | null;
  onStageSelect: (stageId: string) => void;
}

export const StagesTabContent: React.FC<StagesTabContentProps> = ({
  stages,
  qualityGates,
  selectedStage,
  onStageSelect
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stage List */}
      <div className="lg:col-span-2">
        <StagesListCard
          stages={stages}
          qualityGates={qualityGates}
          selectedStage={selectedStage}
          onStageSelect={onStageSelect}
        />
      </div>

      {/* Stage Details */}
      <div>
        <StageDetailsCard
          selectedStage={selectedStage}
          stages={stages}
        />
      </div>
    </div>
  );
};

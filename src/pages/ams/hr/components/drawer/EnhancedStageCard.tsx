
import React from 'react';
import { EnhancedStage } from './types/StageTypes';
import InterviewStageCard from './components/InterviewStageCard';

interface EnhancedStageCardProps {
  stage: EnhancedStage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
}

const EnhancedStageCard: React.FC<EnhancedStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
}) => {
  return (
    <InterviewStageCard
      stage={stage}
      index={index}
      onRemove={onRemove}
      onReorder={onReorder}
      onConfigure={onConfigure}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
      onView={onView}
    />
  );
};

export default EnhancedStageCard;

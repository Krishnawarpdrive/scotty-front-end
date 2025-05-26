
import React from 'react';
import { EnhancedStage } from './types/StageTypes';
import EnhancedStageCard from './components/EnhancedStageCard';

interface EnhancedStageCardProps {
  stage: EnhancedStage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
  viewMode?: 'detailed' | 'compact';
}

const EnhancedStageCardWrapper: React.FC<EnhancedStageCardProps> = (props) => {
  return <EnhancedStageCard {...props} />;
};

export default EnhancedStageCardWrapper;

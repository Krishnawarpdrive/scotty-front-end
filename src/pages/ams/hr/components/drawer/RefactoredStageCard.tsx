
import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import StageHeader from './components/StageHeader';
import StageStatus from './components/StageStatus';
import StageActions from './components/StageActions';
import { useStageDragDrop } from './hooks/useStageDragDrop';
import { getCategoryColor } from './utils/stageUtils';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface RefactoredStageCardProps {
  stage: Stage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
}

const RefactoredStageCard: React.FC<RefactoredStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, handlerId, isDragging, drag } = useStageDragDrop({
    id: stage.id,
    index,
    onReorder,
  });

  const categoryColor = getCategoryColor(stage.category);

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        minWidth: '220px',
        maxWidth: '220px',
        height: '160px',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        borderLeft: `4px solid ${categoryColor}`,
        position: 'relative',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StageHeader
          stage={stage}
          isHovered={isHovered}
          onRemove={onRemove}
          dragRef={drag}
        />

        <StageStatus stage={stage} />

        <StageActions onConfigure={onConfigure} />
      </CardContent>
    </Card>
  );
};

export default RefactoredStageCard;

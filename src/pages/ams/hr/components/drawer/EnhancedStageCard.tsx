
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent } from '@mui/material';
import { EnhancedStage } from './types/StageTypes';
import StageCardHeader from './components/StageCardHeader';
import StageCardContent from './components/StageCardContent';
import StageCardFooter from './components/StageCardFooter';
import StageCardMenu from './components/StageCardMenu';
import StageCardDragHandle from './components/StageCardDragHandle';

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

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal':
      return '#009933';
    case 'external':
      return '#f57c00';
    case 'partner':
      return '#7b1fa2';
    case 'client':
      return '#fbc02d';
    case 'verification':
      return '#616161';
    default:
      return '#e5e7eb';
  }
};

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
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'stage',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'stage',
    item: () => {
      return { id: stage.id, index, type: 'stage' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));

  const categoryColor = getCategoryColor(stage.category);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        minWidth: '280px',
        maxWidth: '280px',
        height: '240px',
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
        <StageCardHeader 
          stage={stage}
          categoryColor={categoryColor}
          onMenuClick={handleMenuClick}
        />

        <StageCardDragHandle dragRef={drag} />

        <StageCardContent 
          stage={stage}
          categoryColor={categoryColor}
        />

        <StageCardFooter stage={stage} />

        <StageCardMenu
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          onConfigure={onConfigure}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onView={onView}
          onDelete={onRemove}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedStageCard;

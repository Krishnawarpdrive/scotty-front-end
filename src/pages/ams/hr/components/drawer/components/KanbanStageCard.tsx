
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box, Card, Avatar, Typography, IconButton } from '@mui/material';
import { 
  Check as CheckIcon, 
  Warning as WarningIcon, 
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon 
} from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';

interface KanbanStageCardProps {
  stage: EnhancedStage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'configured':
      return <CheckIcon sx={{ width: 16, height: 16, color: '#009933' }} />;
    case 'partially-configured':
      return <WarningIcon sx={{ width: 16, height: 16, color: '#f59e0b' }} />;
    default:
      return <ScheduleIcon sx={{ width: 16, height: 16, color: '#dc2626' }} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal': return '#009933';
    case 'external': return '#f57c00';
    case 'partner': return '#7b1fa2';
    case 'client': return '#fbc02d';
    case 'verification': return '#616161';
    default: return '#e5e7eb';
  }
};

const KanbanStageCard: React.FC<KanbanStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [{ handlerId }, drop] = useDrop({
    accept: 'kanban-stage',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'kanban-stage',
    item: () => ({ id: stage.id, index, type: 'kanban-stage' }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const categoryColor = getCategoryColor(stage.category);

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      onClick={onConfigure}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: '280px',
        height: '140px',
        borderRadius: '16px',
        position: 'relative',
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
        border: `1px solid #e5e7eb`,
        borderLeft: `4px solid ${categoryColor}`,
        transition: 'all 0.2s ease',
        fontFamily: 'Rubik, sans-serif',
        '&:hover': {
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Stage Number - Top Left */}
      <Typography
        sx={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
        }}
      >
        #{stage.order}
      </Typography>

      {/* Status Icon - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: '12px',
          right: '16px',
        }}
      >
        {getStatusIcon(stage.status)}
      </Box>

      {/* Stage Name - Center */}
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '16px',
          fontWeight: 600,
          color: '#374151',
          textAlign: 'center',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {stage.name}
      </Typography>

      {/* TA Avatar - Bottom Left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
        }}
      >
        {stage.taAssigned ? (
          <Avatar
            src={stage.taAssigned.avatar}
            sx={{
              width: 24,
              height: 24,
              fontSize: '12px',
              bgcolor: '#009933',
            }}
          >
            {stage.taAssigned.name.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: '#f3f4f6',
              color: '#9ca3af',
              fontSize: '12px',
            }}
          >
            <PersonIcon sx={{ width: 14, height: 14 }} />
          </Avatar>
        )}
      </Box>

      {/* Calendar/Date - Bottom Right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {stage.scheduling.isScheduled ? (
          <>
            <CalendarIcon sx={{ width: 16, height: 16, color: '#009933' }} />
            <Typography sx={{ fontSize: '10px', color: '#009933' }}>
              {stage.scheduling.date || 'Scheduled'}
            </Typography>
          </>
        ) : (
          <CalendarIcon sx={{ width: 16, height: 16, color: '#dc2626' }} />
        )}
      </Box>
    </Card>
  );
};

export default KanbanStageCard;

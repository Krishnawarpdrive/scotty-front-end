
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Check as CheckIcon,
  MoreHoriz as MoreHorizIcon,
  ArrowUpward as ArrowUpwardIcon,
  LocalOffer as LocalOfferIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { EnhancedStage } from './types/StageTypes';
import StageCardMenu from './components/StageCardMenu';

interface RefactoredStageCardProps {
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

const RefactoredStageCard: React.FC<RefactoredStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        minWidth: '240px',
        maxWidth: '240px',
        height: 'auto',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        borderLeft: `4px solid ${categoryColor}`,
        position: 'relative',
        boxShadow: 'none',
        backgroundColor: '#fff',
        p: 1.5,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {/* Stage Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
            #{stage.order}
          </Typography>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreHorizIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>

        {/* Stage Name */}
        <Typography variant="subtitle2" sx={{ fontWeight: 500, fontSize: '14px' }}>
          {stage.name}
        </Typography>

        {/* Category Chip */}
        <Chip
          label={stage.category}
          size="small"
          sx={{
            backgroundColor: categoryColor + '20',
            color: categoryColor,
            fontSize: '11px',
            height: '24px',
            alignSelf: 'flex-start',
          }}
        />

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <IconButton size="small" onClick={onConfigure}>
            <ArrowUpwardIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
      </CardContent>

      {/* Menu */}
      <StageCardMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onConfigure={onConfigure}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onView={onView}
        onDelete={onRemove}
      />
    </Card>
  );
};

export default RefactoredStageCard;

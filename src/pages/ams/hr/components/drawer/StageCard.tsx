
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  DragIndicator as DragIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface StageCardProps {
  stage: Stage;
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

const StageCard: React.FC<StageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
  const isConfigured = stage.config && Object.keys(stage.config).length > 0;

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
        {/* Header with drag handle and delete (on hover) */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            ref={drag}
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              '&:active': { cursor: 'grabbing' },
            }}
          >
            <DragIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
          </Box>
          
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#262626',
              flexGrow: 1,
              lineHeight: 1.3,
            }}
          >
            {stage.name}
          </Typography>

          {/* Delete icon - only visible on hover */}
          {isHovered && (
            <IconButton 
              size="small" 
              onClick={onRemove} 
              sx={{ 
                p: 0.5,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              <DeleteIcon sx={{ fontSize: '16px', color: '#dc2626' }} />
            </IconButton>
          )}
        </Box>

        {/* Configuration Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {isConfigured ? (
            <CheckIcon sx={{ fontSize: '16px', color: '#009933', mr: 1 }} />
          ) : (
            <WarningIcon sx={{ fontSize: '16px', color: '#f59e0b', mr: 1 }} />
          )}
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '12px',
              color: isConfigured ? '#009933' : '#f59e0b',
              fontWeight: 500,
            }}
          >
            {isConfigured ? 'Configured' : 'Not configured'}
          </Typography>
        </Box>

        {/* Stage order indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: categoryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '11px',
              color: 'white',
              fontWeight: 600,
            }}
          >
            {stage.order}
          </Typography>
        </Box>

        {/* Configuration button - bottom right */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            size="small" 
            onClick={onConfigure} 
            sx={{ 
              p: 1,
              backgroundColor: '#f3f4f6',
              '&:hover': {
                backgroundColor: '#e5e7eb',
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: '16px', color: '#6b7280' }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StageCard;

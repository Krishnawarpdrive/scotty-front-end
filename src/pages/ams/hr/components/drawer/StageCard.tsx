
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  type: 'internal' | 'external';
  order: number;
  config?: any;
}

interface StageCardProps {
  stage: Stage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onToggleType: () => void;
  onConfigure: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const StageCard: React.FC<StageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onToggleType,
  onConfigure,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        minWidth: '200px',
        maxWidth: '200px',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: '1px solid #e5e7eb',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header with drag handle */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
            <DragIcon sx={{ fontSize: '16px', color: '#666' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: '#262626',
              flexGrow: 1,
            }}
          >
            {stage.name}
          </Typography>
          <IconButton size="small" onClick={onRemove} sx={{ p: 0.5 }}>
            <DeleteIcon sx={{ fontSize: '16px', color: '#dc2626' }} />
          </IconButton>
        </Box>

        {/* Stage Type Toggle */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={stage.type === 'external'}
                onChange={onToggleType}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#009933',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#009933',
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '12px',
                    color: '#666',
                    mr: 1,
                  }}
                >
                  Type:
                </Typography>
                <Chip
                  label={stage.type}
                  size="small"
                  sx={{
                    height: '20px',
                    fontSize: '10px',
                    backgroundColor: stage.type === 'internal' ? '#e3f2fd' : '#fff3e0',
                    color: stage.type === 'internal' ? '#1976d2' : '#f57c00',
                  }}
                />
              </Box>
            }
            sx={{ m: 0 }}
          />
        </Box>

        {/* Configuration Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '11px',
              color: stage.config ? '#009933' : '#dc2626',
            }}
          >
            {stage.config ? 'Configured' : 'Not configured'}
          </Typography>
          <IconButton size="small" onClick={onConfigure} sx={{ p: 0.5 }}>
            <SettingsIcon sx={{ fontSize: '16px', color: '#666' }} />
          </IconButton>
        </Box>

        {/* Order indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#009933',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '10px',
              color: 'white',
              fontWeight: 500,
            }}
          >
            {stage.order}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StageCard;

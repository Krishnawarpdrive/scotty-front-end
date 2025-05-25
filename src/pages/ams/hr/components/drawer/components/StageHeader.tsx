
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { DragIndicator as DragIcon, Close as CloseIcon } from '@mui/icons-material';
import { ConnectDragSource } from 'react-dnd';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface StageHeaderProps {
  stage: Stage;
  isHovered: boolean;
  onRemove: () => void;
  dragRef: ConnectDragSource;
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

const StageHeader: React.FC<StageHeaderProps> = ({
  stage,
  isHovered,
  onRemove,
  dragRef,
}) => {
  const categoryColor = getCategoryColor(stage.category);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Stage Number */}
        <Box
          sx={{
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

        {/* Stage Name */}
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#374151',
          }}
        >
          {stage.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {/* Drag Handle */}
        <Box
          ref={dragRef}
          sx={{
            cursor: 'grab',
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.2s',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <DragIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
        </Box>

        {/* Remove Button */}
        {isHovered && (
          <IconButton size="small" onClick={onRemove} sx={{ p: 0.5 }}>
            <CloseIcon sx={{ fontSize: '16px', color: '#dc2626' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default StageHeader;

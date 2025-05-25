
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { ConnectDragSource } from 'react-dnd';
import { getCategoryColor } from '../utils/stageUtils';

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

const StageHeader: React.FC<StageHeaderProps> = ({
  stage,
  isHovered,
  onRemove,
  dragRef,
}) => {
  const categoryColor = getCategoryColor(stage.category);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Box
        ref={dragRef}
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
    </Box>
  );
};

export default StageHeader;

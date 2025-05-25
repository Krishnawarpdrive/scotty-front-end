
import React from 'react';
import { Box } from '@mui/material';
import { DragIndicator as DragIcon } from '@mui/icons-material';
import { ConnectDragSource } from 'react-dnd';

interface StageCardDragHandleProps {
  dragRef: ConnectDragSource;
}

const StageCardDragHandle: React.FC<StageCardDragHandleProps> = ({ dragRef }) => {
  return (
    <Box
      ref={dragRef}
      sx={{
        position: 'absolute',
        left: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
      }}
    >
      <DragIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
    </Box>
  );
};

export default StageCardDragHandle;

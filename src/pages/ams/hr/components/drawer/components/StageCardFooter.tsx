
import React from 'react';
import { Box, Typography, Avatar, Tooltip } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';

interface StageCardFooterProps {
  stage: EnhancedStage;
}

const StageCardFooter: React.FC<StageCardFooterProps> = ({ stage }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
      {/* TA Assignment */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {stage.taAssigned ? (
          <Tooltip title={`TA: ${stage.taAssigned.name}`}>
            <Avatar
              src={stage.taAssigned.avatar}
              sx={{ width: 20, height: 20, fontSize: '10px', bgcolor: '#009933' }}
            >
              {stage.taAssigned.name.charAt(0)}
            </Avatar>
          </Tooltip>
        ) : (
          <Box
            sx={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px dashed #d1d5db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '8px', color: '#9ca3af' }}>?</Typography>
          </Box>
        )}
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '10px',
            color: '#6b7280',
          }}
        >
          TA
        </Typography>
      </Box>

      {/* Due Date */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CalendarIcon sx={{ fontSize: '12px', color: '#6b7280' }} />
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '10px',
            color: '#6b7280',
          }}
        >
          {stage.dueDate || 'No due date'}
        </Typography>
      </Box>
    </Box>
  );
};

export default StageCardFooter;

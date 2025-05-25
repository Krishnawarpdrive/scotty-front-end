
import React from 'react';
import { Box, Typography, Chip, Tooltip, IconButton } from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';

interface StageCardHeaderProps {
  stage: EnhancedStage;
  categoryColor: string;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'configured':
      return { color: '#009933', icon: CheckIcon, label: 'Configured' };
    case 'partially-configured':
      return { color: '#f59e0b', icon: WarningIcon, label: 'Partially Configured' };
    case 'not-configured':
      return { color: '#dc2626', icon: ErrorIcon, label: 'Not Configured' };
    default:
      return { color: '#9ca3af', icon: ErrorIcon, label: 'Unknown' };
  }
};

const StageCardHeader: React.FC<StageCardHeaderProps> = ({
  stage,
  categoryColor,
  onMenuClick,
}) => {
  const statusConfig = getStatusConfig(stage.status);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
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
          mr: 1,
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

      {/* Stage Type */}
      <Box sx={{ flexGrow: 1, mr: 1 }}>
        <Chip
          label={stage.name}
          size="small"
          sx={{
            backgroundColor: `${categoryColor}15`,
            color: categoryColor,
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            height: '24px',
          }}
        />
      </Box>

      {/* Status & Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip 
          title={stage.missingItems?.length ? 
            `Missing: ${stage.missingItems.join(', ')}` : 
            statusConfig.label
          }
        >
          <Box
            sx={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: `${statusConfig.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <statusConfig.icon sx={{ fontSize: '12px', color: statusConfig.color }} />
          </Box>
        </Tooltip>

        <IconButton size="small" onClick={onMenuClick} sx={{ p: 0.5 }}>
          <MoreVertIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default StageCardHeader;


import React from 'react';
import { Box, Typography, IconButton, Chip, LinearProgress } from '@mui/material';
import { PlayArrow, Pause, Stop, Add, Remove } from '@mui/icons-material';
import { useSmartTimer, UseSmartTimerProps } from '../hooks/useSmartTimer';

interface SmartTimerWidgetProps extends UseSmartTimerProps {
  interview: any;
  compact?: boolean;
}

export const SmartTimerWidget: React.FC<SmartTimerWidgetProps> = ({
  duration,
  onComplete,
  onWarning,
  warningThresholds,
  interview,
  compact = false
}) => {
  const { timerState, startTimer, pauseTimer, resetTimer, addTime, formatTime } = useSmartTimer({
    duration,
    onComplete,
    onWarning,
    warningThresholds
  });

  const getStageColor = () => {
    switch (timerState.stage) {
      case 'not-started':
        return '#666';
      case 'running':
        return timerState.remainingTime <= 300 ? '#f57c00' : '#2e7d32'; // warning at 5 min
      case 'paused':
        return '#1976d2';
      case 'overtime':
        return '#d32f2f';
      default:
        return '#666';
    }
  };

  const getProgressValue = () => {
    return (timerState.elapsedTime / timerState.totalDuration) * 100;
  };

  if (compact) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        p: 1,
        bgcolor: 'white',
        borderRadius: 1,
        border: '1px solid #e0e0e0'
      }}>
        <IconButton 
          size="small" 
          onClick={timerState.isRunning ? pauseTimer : startTimer}
          sx={{ color: getStageColor() }}
        >
          {timerState.isRunning ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'monospace', 
            fontWeight: 'bold',
            color: getStageColor(),
            minWidth: '60px'
          }}
        >
          {formatTime(timerState.remainingTime)}
        </Typography>
        <Chip 
          label={timerState.stage} 
          size="small"
          sx={{ 
            bgcolor: getStageColor(), 
            color: 'white',
            fontSize: '0.7rem',
            height: '20px'
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'white',
      borderRadius: 2,
      border: '1px solid #e0e0e0',
      fontFamily: 'Rubik, sans-serif'
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Interview Timer
      </Typography>

      {/* Timer Display */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: 'monospace', 
            fontWeight: 'bold',
            color: getStageColor(),
            mb: 1
          }}
        >
          {formatTime(timerState.remainingTime)}
        </Typography>
        
        <LinearProgress 
          variant="determinate" 
          value={Math.min(getProgressValue(), 100)}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: '#f5f5f5',
            '& .MuiLinearProgress-bar': {
              bgcolor: getStageColor(),
              borderRadius: 4
            }
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Elapsed: {formatTime(timerState.elapsedTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total: {formatTime(timerState.totalDuration)}
          </Typography>
        </Box>
      </Box>

      {/* Status */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Chip 
          label={timerState.stage.replace('-', ' ').toUpperCase()} 
          sx={{ 
            bgcolor: getStageColor(), 
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
        <IconButton 
          onClick={timerState.isRunning ? pauseTimer : startTimer}
          sx={{ 
            bgcolor: getStageColor(), 
            color: 'white',
            '&:hover': { bgcolor: getStageColor(), opacity: 0.8 }
          }}
        >
          {timerState.isRunning ? <Pause /> : <PlayArrow />}
        </IconButton>
        
        <IconButton 
          onClick={resetTimer}
          sx={{ 
            bgcolor: '#666', 
            color: 'white',
            '&:hover': { bgcolor: '#666', opacity: 0.8 }
          }}
        >
          <Stop />
        </IconButton>
      </Box>

      {/* Time Adjustment */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton 
          size="small"
          onClick={() => addTime(-5)}
          disabled={timerState.isRunning}
        >
          <Remove />
        </IconButton>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
          ±5 min
        </Typography>
        <IconButton 
          size="small"
          onClick={() => addTime(5)}
          disabled={timerState.isRunning}
        >
          <Add />
        </IconButton>
      </Box>

      {/* Interview Info */}
      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="caption" color="text.secondary">
          {interview.candidateName} • {interview.roleName}
        </Typography>
      </Box>
    </Box>
  );
};


import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Circle } from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  order: number;
}

interface CompactPipelineVisualizationProps {
  stages: Stage[];
  selectedStage: Stage | null;
  onStageSelect: (stage: Stage) => void;
  roleName: string;
}

export const CompactPipelineVisualization: React.FC<CompactPipelineVisualizationProps> = ({
  stages,
  selectedStage,
  onStageSelect,
  roleName
}) => {
  const getStageIcon = (status: string, isSelected: boolean) => {
    const iconProps = {
      sx: { 
        fontSize: isSelected ? 24 : 20,
        transition: 'all 0.2s ease'
      }
    };

    switch (status) {
      case 'completed':
        return <CheckCircle {...iconProps} sx={{ ...iconProps.sx, color: '#009933' }} />;
      case 'current':
        return <RadioButtonUnchecked {...iconProps} sx={{ ...iconProps.sx, color: '#2196F3' }} />;
      default:
        return <Circle {...iconProps} sx={{ ...iconProps.sx, color: '#e0e0e0' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#009933';
      case 'current': return '#2196F3';
      default: return '#e0e0e0';
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Role Header */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 600,
            color: '#262626',
            mb: 0.5
          }}
        >
          Interview Pipeline
        </Typography>
        <Chip 
          label={roleName}
          size="small"
          sx={{
            backgroundColor: '#e8f5e8',
            color: '#009933',
            fontSize: '11px',
            height: '20px',
            fontFamily: 'Rubik, sans-serif'
          }}
        />
      </Box>

      {/* Pipeline Stages */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        overflowX: 'auto',
        pb: 1
      }}>
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <Box
              onClick={() => onStageSelect(stage)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                borderRadius: '8px',
                minWidth: '80px',
                backgroundColor: selectedStage?.id === stage.id ? 'rgba(0, 153, 51, 0.05)' : 'transparent',
                border: selectedStage?.id === stage.id ? '1px solid rgba(0, 153, 51, 0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 153, 51, 0.02)',
                }
              }}
            >
              {getStageIcon(stage.status, selectedStage?.id === stage.id)}
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '10px',
                  fontWeight: selectedStage?.id === stage.id ? 600 : 400,
                  color: selectedStage?.id === stage.id ? '#009933' : '#666',
                  textAlign: 'center',
                  mt: 0.5,
                  lineHeight: 1.2
                }}
              >
                {stage.name}
              </Typography>
            </Box>
            
            {/* Connection Line */}
            {index < stages.length - 1 && (
              <Box
                sx={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: getStatusColor(stage.status),
                  mx: 0.5
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Progress Indicator */}
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            color: '#666'
          }}
        >
          Stage {stages.findIndex(s => s.status === 'current') + 1 || 1} of {stages.length}
        </Typography>
      </Box>
    </Box>
  );
};

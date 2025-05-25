
import React from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface StageScrollerProps {
  stages: Array<{
    id: string;
    name: string;
    category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  }>;
  onAddStage: (stage: any) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal':
      return { border: '#009933', bg: 'rgba(0, 153, 51, 0.04)' };
    case 'external':
      return { border: '#f57c00', bg: 'rgba(245, 124, 0, 0.04)' };
    case 'partner':
      return { border: '#7b1fa2', bg: 'rgba(123, 31, 162, 0.04)' };
    case 'client':
      return { border: '#fbc02d', bg: 'rgba(251, 192, 45, 0.04)' };
    case 'verification':
      return { border: '#616161', bg: 'rgba(97, 97, 97, 0.04)' };
    default:
      return { border: '#e5e7eb', bg: '#f9fafb' };
  }
};

const StageScroller: React.FC<StageScrollerProps> = ({ stages, onAddStage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#ccc',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#999',
        },
      }}
    >
      {stages.map((stage) => {
        const colors = getCategoryColor(stage.category);
        return (
          <Button
            key={stage.id}
            variant="outlined"
            onClick={() => onAddStage(stage)}
            sx={{
              minWidth: '160px',
              height: '60px',
              whiteSpace: 'nowrap',
              fontFamily: 'Rubik, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'none',
              borderColor: colors.border,
              backgroundColor: colors.bg,
              color: '#262626',
              borderWidth: '2px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: colors.border,
                backgroundColor: colors.bg,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${colors.border}20`,
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <AddIcon sx={{ fontSize: '16px', color: colors.border }} />
              {stage.name}
            </Box>
          </Button>
        );
      })}
      
      {/* Add Custom Stage Button */}
      <Button
        variant="outlined"
        sx={{
          minWidth: '160px',
          height: '60px',
          whiteSpace: 'nowrap',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          textTransform: 'none',
          borderColor: '#d1d5db',
          backgroundColor: '#f9fafb',
          color: '#666',
          borderWidth: '2px',
          borderRadius: '12px',
          borderStyle: 'dashed',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#009933',
            backgroundColor: 'rgba(0, 153, 51, 0.04)',
            color: '#009933',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 153, 51, 0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <AddIcon sx={{ fontSize: '16px' }} />
          Add Custom Stage
        </Box>
      </Button>
    </Box>
  );
};

export default StageScroller;

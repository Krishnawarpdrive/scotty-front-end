
import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface StageScrollerProps {
  stages: Array<{
    id: string;
    name: string;
    type: 'internal' | 'external';
  }>;
  onAddStage: (stage: any) => void;
}

const StageScroller: React.FC<StageScrollerProps> = ({ stages, onAddStage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        pb: 1,
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
      {stages.map((stage) => (
        <Button
          key={stage.id}
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => onAddStage(stage)}
          sx={{
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            textTransform: 'none',
            borderColor: '#e5e7eb',
            color: '#666',
            '&:hover': {
              borderColor: '#009933',
              color: '#009933',
              backgroundColor: 'rgba(0, 153, 51, 0.04)',
            },
          }}
        >
          {stage.name}
          <Chip
            label={stage.type}
            size="small"
            sx={{
              ml: 1,
              height: '16px',
              fontSize: '10px',
              backgroundColor: stage.type === 'internal' ? '#e3f2fd' : '#fff3e0',
              color: stage.type === 'internal' ? '#1976d2' : '#f57c00',
            }}
          />
        </Button>
      ))}
    </Box>
  );
};

export default StageScroller;


import React from 'react';
import { Box, Typography } from '@mui/material';
import KanbanStageCard from './components/KanbanStageCard';
import { EnhancedStage } from './types/StageTypes';

interface KanbanPipelineFlowProps {
  stages: EnhancedStage[];
  onRemoveStage: (stageId: string) => void;
  onReorderStages: (dragIndex: number, hoverIndex: number) => void;
  onConfigureStage: (stage: EnhancedStage) => void;
}

const KanbanPipelineFlow: React.FC<KanbanPipelineFlowProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onConfigureStage,
}) => {
  if (stages.length === 0) {
    return (
      <Box
        sx={{
          height: '200px',
          border: '2px dashed #e5e7eb',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '14px',
            color: '#9ca3af',
            textAlign: 'center',
          }}
        >
          Drag stages from above to build your hiring pipeline
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        overflowX: 'auto',
        pb: 2,
        minHeight: '200px',
        alignItems: 'flex-start',
        scrollSnapType: 'x mandatory',
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
      }}
    >
      {stages.map((stage, index) => (
        <React.Fragment key={stage.id}>
          <Box sx={{ scrollSnapAlign: 'start' }}>
            <KanbanStageCard
              stage={stage}
              index={index}
              onRemove={() => onRemoveStage(stage.id)}
              onReorder={onReorderStages}
              onConfigure={() => onConfigureStage(stage)}
            />
          </Box>
          {index < stages.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '140px',
                minWidth: '32px',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '32px',
                  height: '3px',
                  backgroundColor: '#009933',
                  position: 'relative',
                  borderRadius: '2px',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: '-6px',
                    top: '-4px',
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid #009933',
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                  },
                }}
              />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default KanbanPipelineFlow;

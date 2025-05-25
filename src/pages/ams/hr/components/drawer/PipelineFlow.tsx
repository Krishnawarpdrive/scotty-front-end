
import React from 'react';
import { Box, Typography } from '@mui/material';
import StageCard from './StageCard';

interface Stage {
  id: string;
  name: string;
  type: 'internal' | 'external';
  order: number;
  config?: any;
}

interface PipelineFlowProps {
  stages: Stage[];
  onRemoveStage: (stageId: string) => void;
  onReorderStages: (dragIndex: number, hoverIndex: number) => void;
  onToggleStageType: (stageId: string) => void;
  onConfigureStage: (stage: Stage) => void;
}

const PipelineFlow: React.FC<PipelineFlowProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onToggleStageType,
  onConfigureStage,
}) => {
  if (stages.length === 0) {
    return (
      <Box
        sx={{
          height: '200px',
          border: '2px dashed #e5e7eb',
          borderRadius: '8px',
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
          Drop stages here to build your hiring pipeline
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        minHeight: '200px',
        alignItems: 'flex-start',
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
          <StageCard
            stage={stage}
            index={index}
            onRemove={() => onRemoveStage(stage.id)}
            onReorder={onReorderStages}
            onToggleType={() => onToggleStageType(stage.id)}
            onConfigure={() => onConfigureStage(stage)}
          />
          {index < stages.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '140px',
                minWidth: '24px',
              }}
            >
              <Box
                sx={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#009933',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: '-4px',
                    top: '-3px',
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid #009933',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
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

export default PipelineFlow;

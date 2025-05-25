
import React from 'react';
import { Box, Typography } from '@mui/material';
import EnhancedStageCard from './EnhancedStageCard';
import { EnhancedStage } from './types/StageTypes';

interface EnhancedPipelineFlowProps {
  stages: EnhancedStage[];
  onRemoveStage: (stageId: string) => void;
  onReorderStages: (dragIndex: number, hoverIndex: number) => void;
  onConfigureStage: (stage: EnhancedStage) => void;
  onEditStage?: (stage: EnhancedStage) => void;
  onDuplicateStage?: (stage: EnhancedStage) => void;
  onViewStage?: (stage: EnhancedStage) => void;
}

const EnhancedPipelineFlow: React.FC<EnhancedPipelineFlowProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onConfigureStage,
  onEditStage,
  onDuplicateStage,
  onViewStage,
}) => {
  if (stages.length === 0) {
    return (
      <Box
        sx={{
          height: '280px',
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
        minHeight: '280px',
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
            <EnhancedStageCard
              stage={stage}
              index={index}
              onRemove={() => onRemoveStage(stage.id)}
              onReorder={onReorderStages}
              onConfigure={() => onConfigureStage(stage)}
              onEdit={onEditStage ? () => onEditStage(stage) : undefined}
              onDuplicate={onDuplicateStage ? () => onDuplicateStage(stage) : undefined}
              onView={onViewStage ? () => onViewStage(stage) : undefined}
            />
          </Box>
          {index < stages.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '240px',
                minWidth: '48px',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '40px',
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
          {/* Final Stage Indicator */}
          {index === stages.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '240px',
                minWidth: '60px',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  padding: '8px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '11px',
                    color: '#6b7280',
                    fontWeight: 500,
                  }}
                >
                  Final Stage
                </Typography>
              </Box>
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default EnhancedPipelineFlow;

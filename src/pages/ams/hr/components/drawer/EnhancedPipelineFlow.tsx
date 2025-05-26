
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
  viewMode?: 'detailed' | 'compact';
}

const EnhancedPipelineFlow: React.FC<EnhancedPipelineFlowProps> = ({
  stages,
  onRemoveStage,
  onReorderStages,
  onConfigureStage,
  onEditStage,
  onDuplicateStage,
  onViewStage,
  viewMode = 'detailed'
}) => {
  if (stages.length === 0) {
    return (
      <Box sx={{
        height: viewMode === 'compact' ? '180px' : '320px',
        border: '2px dashed #e5e7eb',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <Typography sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px',
          color: '#9ca3af',
          textAlign: 'center'
        }}>
          Drag stages from above to build your hiring pipeline
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      gap: viewMode === 'compact' ? 2 : 3,
      overflowX: 'auto',
      pb: 2,
      minHeight: viewMode === 'compact' ? '180px' : '320px',
      alignItems: 'flex-start',
      scrollSnapType: 'x mandatory',
      '&::-webkit-scrollbar': {
        height: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '4px',
        '&:hover': {
          background: '#a8a8a8'
        }
      }
    }}>
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
              viewMode={viewMode}
            />
          </Box>
          
          {index < stages.length - 1 && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              height: viewMode === 'compact' ? '120px' : '240px',
              minWidth: viewMode === 'compact' ? '40px' : '56px',
              justifyContent: 'center'
            }}>
              <Box sx={{
                width: viewMode === 'compact' ? '32px' : '48px',
                height: '4px',
                backgroundColor: '#009933',
                position: 'relative',
                borderRadius: '2px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: viewMode === 'compact' ? '-5px' : '-7px',
                  top: viewMode === 'compact' ? '-3px' : '-4px',
                  width: 0,
                  height: 0,
                  borderLeft: viewMode === 'compact' ? '8px solid #009933' : '12px solid #009933',
                  borderTop: viewMode === 'compact' ? '4px solid transparent' : '6px solid transparent',
                  borderBottom: viewMode === 'compact' ? '4px solid transparent' : '6px solid transparent'
                }
              }} />
            </Box>
          )}
          
          {/* Final Stage Indicator */}
          {index === stages.length - 1 && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              height: viewMode === 'compact' ? '120px' : '240px',
              minWidth: viewMode === 'compact' ? '50px' : '70px',
              justifyContent: 'center'
            }}>
              <Box sx={{
                padding: viewMode === 'compact' ? '6px 10px' : '8px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <Typography sx={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: viewMode === 'compact' ? '10px' : '11px',
                  color: '#6b7280',
                  fontWeight: 500
                }}>
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

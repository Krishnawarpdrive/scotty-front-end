
import React, { useState } from 'react';
import { Box, Typography, Button, FormControlLabel, Switch } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StageScroller from './StageScroller';
import EnhancedPipelineFlow from './EnhancedPipelineFlow';
import StageConfigModal from './StageConfigModal';
import { EnhancedStage, Interviewer, TAAssignment } from './types/StageTypes';

interface EnhancedHiringPipelineConfigProps {
  roleData: any;
}

const defaultAvailableStages = [
  { id: 'phone', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'background', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude', name: 'Aptitude Test', category: 'internal' as const },
  { id: 'group', name: 'Group Discussion', category: 'internal' as const },
  { id: 'internal-interview', name: 'Internal Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'partner-interview', name: 'Partner Interview', category: 'partner' as const },
  { id: 'external-interview', name: 'External Interview', category: 'external' as const },
];

// Mock data for demonstration
const mockInterviewers: Interviewer[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Senior Developer' },
  { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'Tech Lead' },
  { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'HR Manager' },
];

const mockTAs: TAAssignment[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@company.com' },
  { id: '2', name: 'Bob Wilson', email: 'bob@company.com' },
];

const calculateStageStatus = (stage: EnhancedStage): { status: EnhancedStage['status'], missingItems: string[] } => {
  const missingItems: string[] = [];
  
  if (!stage.interviewers || stage.interviewers.length === 0) {
    missingItems.push('Interviewers');
  }
  
  if (!stage.config?.interviewFormat) {
    missingItems.push('Interview Format');
  }
  
  if (!stage.taAssigned) {
    missingItems.push('TA Assignment');
  }
  
  if (!stage.scheduling.isScheduled) {
    missingItems.push('Scheduling');
  }

  if (missingItems.length === 0) {
    return { status: 'configured', missingItems: [] };
  } else if (missingItems.length <= 2) {
    return { status: 'partially-configured', missingItems };
  } else {
    return { status: 'not-configured', missingItems };
  }
};

const EnhancedHiringPipelineConfig: React.FC<EnhancedHiringPipelineConfigProps> = ({ roleData }) => {
  const [pipelineStages, setPipelineStages] = useState<EnhancedStage[]>([
    {
      id: 'phone-1',
      name: 'Phone Screening',
      category: 'internal',
      order: 1,
      config: {
        interviewFormat: 'one-to-one',
        interviewMode: 'virtual',
      },
      interviewers: [mockInterviewers[0]],
      taAssigned: mockTAs[0],
      scheduling: {
        isScheduled: true,
        duration: 30,
        timeSlot: '10:00 AM',
      },
      dueDate: '2024-01-15',
      status: 'configured',
      missingItems: [],
    },
    {
      id: 'internal-interview-1',
      name: 'Internal Interview',
      category: 'internal',
      order: 2,
      config: {
        interviewFormat: 'panel',
        interviewMode: 'in-person',
      },
      interviewers: [mockInterviewers[1], mockInterviewers[2]],
      scheduling: {
        isScheduled: false,
      },
      dueDate: '2024-01-20',
      status: 'partially-configured',
      missingItems: ['TA Assignment', 'Scheduling'],
    },
  ]);
  
  const [availableStages] = useState(defaultAvailableStages);
  const [selectedStage, setSelectedStage] = useState<EnhancedStage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  const addStageToPipeline = (stage: any) => {
    const newStage: EnhancedStage = {
      id: `${stage.id}-${Date.now()}`,
      name: stage.name,
      category: stage.category,
      order: pipelineStages.length + 1,
      interviewers: [],
      scheduling: {
        isScheduled: false,
      },
      status: 'not-configured',
      missingItems: ['Interviewers', 'Interview Format', 'TA Assignment', 'Scheduling'],
    };
    setPipelineStages([...pipelineStages, newStage]);
  };

  const removeStageFromPipeline = (stageId: string) => {
    setPipelineStages(pipelineStages.filter(stage => stage.id !== stageId));
  };

  const reorderStages = (dragIndex: number, hoverIndex: number) => {
    const draggedStage = pipelineStages[dragIndex];
    const newStages = [...pipelineStages];
    newStages.splice(dragIndex, 1);
    newStages.splice(hoverIndex, 0, draggedStage);
    
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    
    setPipelineStages(reorderedStages);
  };

  const openStageConfig = (stage: EnhancedStage) => {
    setSelectedStage(stage);
    setConfigModalOpen(true);
  };

  const updateStageConfig = (stageId: string, config: any) => {
    setPipelineStages(stages =>
      stages.map(stage => {
        if (stage.id === stageId) {
          const updatedStage = { ...stage, config };
          const { status, missingItems } = calculateStageStatus(updatedStage);
          return { ...updatedStage, status, missingItems };
        }
        return stage;
      })
    );
    setConfigModalOpen(false);
    setSelectedStage(null);
  };

  const handleEditStage = (stage: EnhancedStage) => {
    console.log('Edit stage:', stage);
    // TODO: Implement edit functionality
  };

  const handleDuplicateStage = (stage: EnhancedStage) => {
    const duplicatedStage: EnhancedStage = {
      ...stage,
      id: `${stage.id}-copy-${Date.now()}`,
      order: pipelineStages.length + 1,
    };
    setPipelineStages([...pipelineStages, duplicatedStage]);
  };

  const handleViewStage = (stage: EnhancedStage) => {
    console.log('View stage:', stage);
    // TODO: Implement view functionality
  };

  const handleSavePipeline = () => {
    console.log('Saving pipeline:', { pipelineStages, saveAsTemplate, applyToAll });
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log('Cancelling pipeline configuration');
    // TODO: Implement cancel functionality
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#262626',
            mb: 3,
          }}
        >
          Configure Hiring Pipeline for {roleData?.name}
        </Typography>

        {/* Top Panel - Available Stages Scroller */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              mb: 2,
            }}
          >
            Available Stage Types
          </Typography>
          <StageScroller
            stages={availableStages}
            onAddStage={addStageToPipeline}
          />
        </Box>

        {/* Bottom Panel - Enhanced Pipeline Flow */}
        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              mb: 2,
            }}
          >
            Hiring Pipeline ({pipelineStages.length} stages)
          </Typography>
          <EnhancedPipelineFlow
            stages={pipelineStages}
            onRemoveStage={removeStageFromPipeline}
            onReorderStages={reorderStages}
            onConfigureStage={openStageConfig}
            onEditStage={handleEditStage}
            onDuplicateStage={handleDuplicateStage}
            onViewStage={handleViewStage}
          />
        </Box>

        {/* Final Controls */}
        <Box
          sx={{
            borderTop: '1px solid #e5e7eb',
            pt: 3,
            mt: 'auto',
          }}
        >
          {/* Toggle Options */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={saveAsTemplate}
                  onChange={(e) => setSaveAsTemplate(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#009933',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#009933',
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '13px',
                    color: '#262626',
                  }}
                >
                  Save as Template
                </Typography>
              }
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={applyToAll}
                  onChange={(e) => setApplyToAll(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#009933',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#009933',
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '13px',
                    color: '#262626',
                  }}
                >
                  Apply this pipeline to all requirements under the same role
                </Typography>
              }
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                textTransform: 'none',
                borderColor: '#e5e7eb',
                color: '#666',
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSavePipeline}
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                textTransform: 'none',
                backgroundColor: '#009933',
                '&:hover': {
                  backgroundColor: '#007a2b',
                },
              }}
            >
              Save Pipeline
            </Button>
          </Box>
        </Box>

        {/* Stage Configuration Modal */}
        <StageConfigModal
          open={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          stage={selectedStage}
          onSave={updateStageConfig}
        />
      </Box>
    </DndProvider>
  );
};

export default EnhancedHiringPipelineConfig;


import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EnhancedPipelineFlow from './EnhancedPipelineFlow';
import StageScroller from './StageScroller';
import StageConfigModal from './StageConfigModal';
import { EnhancedStage, STAGE_CATEGORIES } from './types/StageTypes';

interface EnhancedHiringPipelineConfigProps {
  onClose?: () => void;
}

// Mock data for demonstration
const mockAvailableStages = [
  { id: 'internal-1', name: 'Technical Interview', category: 'internal' as const },
  { id: 'client-1', name: 'Client Interview', category: 'client' as const },
  { id: 'partner-1', name: 'Partner Discussion', category: 'partner' as const },
  { id: 'external-1', name: 'External Assessment', category: 'external' as const },
  { id: 'verification-1', name: 'Background Check', category: 'verification' as const },
  { id: 'internal-2', name: 'Group Discussion', category: 'internal' as const },
];

const mockEnhancedStages: EnhancedStage[] = [
  {
    id: '1',
    name: 'Technical Interview',
    category: 'internal',
    order: 1,
    status: 'configured',
    interviewers: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: '' },
      { id: '2', name: 'Mike Chen', email: 'mike@company.com', avatar: '' },
    ],
    taAssigned: { id: 'ta1', name: 'Alex Kumar', avatar: '' },
    scheduling: {
      isScheduled: true,
      duration: 60,
      timeSlot: '10:00 AM',
      date: '2024-01-15',
    },
    dueDate: 'Jan 15',
    config: {
      interviewFormat: 'panel',
      interviewMode: 'virtual',
      interviewers: [
        { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com' },
        { id: '2', name: 'Mike Chen', email: 'mike@company.com' },
      ],
    },
  },
  {
    id: '2',
    name: 'Client Interview',
    category: 'client',
    order: 2,
    status: 'partially-configured',
    interviewers: [
      { id: '3', name: 'Emily Davis', email: 'emily@company.com', avatar: '' },
    ],
    scheduling: {
      isScheduled: false,
    },
    dueDate: 'Jan 20',
    missingItems: ['TA Assignment', 'Interview Time'],
    config: {
      interviewFormat: 'one-to-one',
      interviewMode: 'in-person',
    },
  },
  {
    id: '3',
    name: 'Background Verification',
    category: 'verification',
    order: 3,
    status: 'not-configured',
    interviewers: [],
    scheduling: {
      isScheduled: false,
    },
    missingItems: ['Verifiers', 'Documents List', 'Timeline'],
  },
];

const EnhancedHiringPipelineConfig: React.FC<EnhancedHiringPipelineConfigProps> = ({
  onClose,
}) => {
  const [pipelineStages, setPipelineStages] = useState<EnhancedStage[]>(mockEnhancedStages);
  const [selectedStage, setSelectedStage] = useState<EnhancedStage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const handleAddStage = (stageTemplate: any) => {
    const newStage: EnhancedStage = {
      id: `${Date.now()}`,
      name: stageTemplate.name,
      category: stageTemplate.category,
      order: pipelineStages.length + 1,
      status: 'not-configured' as const,
      interviewers: [],
      scheduling: { isScheduled: false },
      missingItems: ['Interviewers', 'Format', 'Timeline'],
    };
    
    setPipelineStages([...pipelineStages, newStage]);
  };

  const handleRemoveStage = (stageId: string) => {
    const updatedStages = pipelineStages
      .filter(stage => stage.id !== stageId)
      .map((stage, index) => ({ ...stage, order: index + 1 }));
    setPipelineStages(updatedStages);
  };

  const handleReorderStages = (dragIndex: number, hoverIndex: number) => {
    const updatedStages = [...pipelineStages];
    const draggedStage = updatedStages[dragIndex];
    updatedStages.splice(dragIndex, 1);
    updatedStages.splice(hoverIndex, 0, draggedStage);
    
    const reorderedStages = updatedStages.map((stage, index) => ({
      ...stage,
      order: index + 1,
    }));
    
    setPipelineStages(reorderedStages);
  };

  const handleConfigureStage = (stage: EnhancedStage) => {
    setSelectedStage(stage);
    setConfigModalOpen(true);
  };

  const handleSaveStageConfig = (stageId: string, config: any) => {
    const updatedStages = pipelineStages.map(stage => {
      if (stage.id === stageId) {
        const hasInterviewers = config.interviewers?.length > 0;
        const hasFormat = config.interviewFormat;
        const isFullyConfigured = hasInterviewers && hasFormat;
        
        const updatedStage: EnhancedStage = {
          ...stage,
          config,
          status: isFullyConfigured ? 'configured' as const : 'partially-configured' as const,
          interviewers: config.interviewers || [],
          missingItems: isFullyConfigured ? [] : [
            ...(hasInterviewers ? [] : ['Interviewers']),
            ...(hasFormat ? [] : ['Interview Format']),
          ],
        };
        
        return updatedStage;
      }
      return stage;
    });
    
    setPipelineStages(updatedStages);
    setConfigModalOpen(false);
  };

  const handleEditStage = (stage: EnhancedStage) => {
    console.log('Edit stage:', stage);
    // Implement edit functionality
  };

  const handleDuplicateStage = (stage: EnhancedStage) => {
    const duplicatedStage: EnhancedStage = {
      ...stage,
      id: `${Date.now()}`,
      name: `${stage.name} (Copy)`,
      order: pipelineStages.length + 1,
    };
    setPipelineStages([...pipelineStages, duplicatedStage]);
  };

  const handleViewStage = (stage: EnhancedStage) => {
    console.log('View stage:', stage);
    // Implement view functionality
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 600,
              color: '#262626',
              mb: 1,
            }}
          >
            Configure Hiring Pipeline
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Drag and drop stages to build your interview pipeline. Configure each stage for optimal candidate experience.
          </Typography>
        </Box>

        {/* Available Stages */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: '#262626',
              mb: 2,
            }}
          >
            Available Stages
          </Typography>
          <StageScroller stages={mockAvailableStages} onAddStage={handleAddStage} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Pipeline Flow */}
        <Box sx={{ mb: 4, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: '#262626',
              }}
            >
              Current Pipeline ({pipelineStages.length} stages)
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                textTransform: 'none',
                borderColor: '#e5e7eb',
                color: '#666',
              }}
            >
              Add Custom Stage
            </Button>
          </Box>

          <EnhancedPipelineFlow
            stages={pipelineStages}
            onRemoveStage={handleRemoveStage}
            onReorderStages={handleReorderStages}
            onConfigureStage={handleConfigureStage}
            onEditStage={handleEditStage}
            onDuplicateStage={handleDuplicateStage}
            onViewStage={handleViewStage}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              fontFamily: 'Rubik, sans-serif',
              textTransform: 'none',
              borderColor: '#e5e7eb',
              color: '#666',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              textTransform: 'none',
              backgroundColor: '#009933',
              '&:hover': { backgroundColor: '#007a2b' },
            }}
          >
            Save Pipeline
          </Button>
        </Box>

        {/* Stage Configuration Modal */}
        <StageConfigModal
          open={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          stage={selectedStage}
          onSave={handleSaveStageConfig}
        />
      </Box>
    </DndProvider>
  );
};

export default EnhancedHiringPipelineConfig;

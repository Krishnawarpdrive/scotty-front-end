
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PipelineConfigHeader from './components/PipelineConfigHeader';
import AvailableStagesSection from './components/AvailableStagesSection';
import PipelineConfigControls from './components/PipelineConfigControls';
import KanbanPipelineFlow from './KanbanPipelineFlow';
import StageConfigModal from './components/StageConfigModal';
import { EnhancedStage, Interviewer } from './types/StageTypes';
import { StageConfigUnion } from './types/StageConfigTypes';

interface KanbanHiringPipelineConfigProps {
  roleData: any;
}

// Mock enhanced stages data with all required fields
const mockEnhancedStages: EnhancedStage[] = [
  {
    id: '1',
    name: 'Phone Screening',
    category: 'internal',
    order: 1,
    status: 'not-configured',
    interviewers: [],
    scheduling: { isScheduled: false },
    config: {
      interviewFormat: 'one-to-one',
      interviewMode: 'virtual',
      notes: '',
    },
  },
  {
    id: '2',
    name: 'Technical Interview',
    category: 'internal',
    order: 2,
    status: 'partially-configured',
    interviewers: [{ id: '1', name: 'John Doe', email: 'john@company.com' }],
    scheduling: { isScheduled: true, date: '2024-01-15' },
    config: {
      interviewFormat: 'one-to-one',
      interviewMode: 'virtual',
      interviewers: [{ id: '1', name: 'John Doe', email: 'john@company.com' }],
      notes: 'Technical assessment',
    },
  },
  {
    id: '3',
    name: 'Client Interview',
    category: 'client',
    order: 3,
    status: 'configured',
    interviewers: [{ id: '2', name: 'Client Rep', email: 'client@client.com' }],
    scheduling: { isScheduled: true, date: '2024-01-20' },
    taAssigned: { id: '1', name: 'TA Manager' },
    config: {
      interviewFormat: 'panel',
      interviewMode: 'in-person',
      interviewers: [{ id: '2', name: 'Client Rep', email: 'client@client.com' }],
      notes: 'Final client interview',
    },
  },
];

const availableStages = [
  { id: 'phone-screening', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene-screening', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'technical-interview', name: 'Technical Interview', category: 'internal' as const },
  { id: 'hr-interview', name: 'HR Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'vendor-interview', name: 'Vendor Interview', category: 'partner' as const },
  { id: 'background-verification', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude-test', name: 'Aptitude Test', category: 'external' as const },
];

const KanbanHiringPipelineConfig: React.FC<KanbanHiringPipelineConfigProps> = ({ roleData }) => {
  const [pipelineStages, setPipelineStages] = useState<EnhancedStage[]>(mockEnhancedStages);
  const [selectedStage, setSelectedStage] = useState<EnhancedStage | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  const addStageToPipeline = (stage: any) => {
    const newStage: EnhancedStage = {
      id: `stage-${Date.now()}`,
      name: stage.name,
      category: stage.category,
      order: pipelineStages.length + 1,
      status: 'not-configured',
      interviewers: [],
      scheduling: { isScheduled: false },
      config: {
        interviewFormat: 'one-to-one',
        interviewMode: 'virtual',
        notes: '',
      },
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
    
    // Update order numbers
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

  const updateStageConfig = (stageId: string, config: StageConfigUnion) => {
    setPipelineStages(stages =>
      stages.map(stage => {
        if (stage.id === stageId) {
          // Convert StageConfigUnion to compatible format
          const stageConfig = {
            interviewFormat: (config as any).interviewType || 'one-to-one',
            interviewMode: (config as any).mode || 'virtual',
            interviewers: Array.isArray((config as any).interviewers) 
              ? (config as any).interviewers.map((interviewer: string | Interviewer) => 
                  typeof interviewer === 'string' 
                    ? { id: interviewer, name: interviewer, email: '' }
                    : interviewer
                )
              : [],
            notes: config.notes || '',
          };

          // Determine configuration status based on filled fields
          const isPartiallyConfigured = Object.values(config).some(value => 
            value !== '' && value !== false && value !== null && value !== undefined
          );
          const isFullyConfigured = config.isConfigured || isPartiallyConfigured;
          
          return {
            ...stage,
            config: stageConfig,
            status: isFullyConfigured ? 'configured' as const : (isPartiallyConfigured ? 'partially-configured' as const : 'not-configured' as const),
            interviewers: stageConfig.interviewers,
            scheduling: {
              ...stage.scheduling,
              isScheduled: !!(config as any).dateTime,
              date: (config as any).dateTime ? new Date((config as any).dateTime).toLocaleDateString() : undefined,
            },
          };
        }
        return stage;
      })
    );
  };

  const handleSavePipeline = () => {
    console.log('Saving pipeline:', { pipelineStages, saveAsTemplate, applyToAll });
    // Implement save logic
  };

  const handleCancel = () => {
    console.log('Cancelling pipeline configuration');
    // Implement cancel logic
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PipelineConfigHeader roleName={roleData?.name || 'Software Engineer'} />

        <AvailableStagesSection
          stages={availableStages}
          onAddStage={addStageToPipeline}
        />

        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Box sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontSize: '13px', color: '#666' }}>
            Hiring Pipeline ({pipelineStages.length} stages)
          </Box>
          <KanbanPipelineFlow
            stages={pipelineStages}
            onRemoveStage={removeStageFromPipeline}
            onReorderStages={reorderStages}
            onConfigureStage={openStageConfig}
          />
        </Box>

        <PipelineConfigControls
          saveAsTemplate={saveAsTemplate}
          setSaveAsTemplate={setSaveAsTemplate}
          applyToAll={applyToAll}
          setApplyToAll={setApplyToAll}
          onSave={handleSavePipeline}
          onCancel={handleCancel}
        />

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

export default KanbanHiringPipelineConfig;

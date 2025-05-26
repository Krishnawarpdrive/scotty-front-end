
import React from 'react';
import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PipelineConfigHeader from './components/PipelineConfigHeader';
import AvailableStagesSection from './components/AvailableStagesSection';
import PipelineFlowSection from './components/PipelineFlowSection';
import PipelineConfigControls from './components/PipelineConfigControls';
import StageConfigModal from './components/StageConfigModal';
import { usePipelineConfig } from './hooks/usePipelineConfig';
import { EnhancedStage } from './types/StageTypes';

interface HiringPipelineConfigProps {
  roleData: any;
}

const HiringPipelineConfig: React.FC<HiringPipelineConfigProps> = ({ roleData }) => {
  const {
    pipelineStages,
    availableStages,
    selectedStage,
    configModalOpen,
    saveAsTemplate,
    applyToAll,
    loading,
    addStageToPipeline,
    removeStageFromPipeline,
    reorderStages,
    openStageConfig,
    updateStageConfig,
    handleSavePipeline,
    handleCancel,
    setSaveAsTemplate,
    setApplyToAll,
    setConfigModalOpen,
  } = usePipelineConfig(roleData?.id);

  // Convert pipelineStages to EnhancedStage[] with proper defaults
  const enhancedPipelineStages: EnhancedStage[] = pipelineStages.map(stage => ({
    ...stage,
    status: (stage as any).status || 'not-configured',
    interviewers: (stage as any).interviewers || [],
    scheduling: (stage as any).scheduling || { isScheduled: false },
    config: stage.config || {
      interviewFormat: 'one-to-one',
      interviewMode: 'virtual',
      notes: '',
    },
  }));

  if (loading) {
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px',
          color: '#666'
        }}>
          Loading pipeline configuration...
        </Typography>
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PipelineConfigHeader roleName={roleData?.name} />

        <AvailableStagesSection
          stages={availableStages}
          onAddStage={addStageToPipeline}
        />

        <PipelineFlowSection
          stages={enhancedPipelineStages}
          onRemoveStage={removeStageFromPipeline}
          onReorderStages={reorderStages}
          onConfigureStage={openStageConfig}
        />

        <PipelineConfigControls
          saveAsTemplate={saveAsTemplate}
          setSaveAsTemplate={setSaveAsTemplate}
          applyToAll={applyToAll}
          setApplyToAll={setApplyToAll}
          onSave={handleSavePipeline}
          onCancel={handleCancel}
        />

        {selectedStage && (
          <StageConfigModal
            open={configModalOpen}
            onClose={() => setConfigModalOpen(false)}
            stage={selectedStage}
            onSave={updateStageConfig}
          />
        )}
      </Box>
    </DndProvider>
  );
};

export default HiringPipelineConfig;

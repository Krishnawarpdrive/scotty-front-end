
import React from 'react';
import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PipelineConfigHeader from './components/PipelineConfigHeader';
import AvailableStagesSection from './components/AvailableStagesSection';
import PipelineFlowSection from './components/PipelineFlowSection';
import PipelineConfigControls from './components/PipelineConfigControls';
import StageConfigModal from './StageConfigModal';
import { usePipelineConfig } from './hooks/usePipelineConfig';

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
  } = usePipelineConfig();

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PipelineConfigHeader roleName={roleData?.name} />

        <AvailableStagesSection
          stages={availableStages}
          onAddStage={addStageToPipeline}
        />

        <PipelineFlowSection
          stages={pipelineStages}
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

export default HiringPipelineConfig;

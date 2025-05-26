
import React from 'react';
import { Box, Typography } from '@mui/material';
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
  const enhancedPipelineStages: EnhancedStage[] = pipelineStages.map(stage => {
    const hasConfig = stage.config && Object.keys(stage.config).length > 0;
    const hasInterviewers = stage.config?.interviewers && stage.config.interviewers.length > 0;
    
    let status: 'configured' | 'partially-configured' | 'not-configured' = 'not-configured';
    if (hasConfig && hasInterviewers) {
      status = 'configured';
    } else if (hasConfig || hasInterviewers) {
      status = 'partially-configured';
    }

    return {
      id: stage.id,
      name: stage.name,
      category: stage.category,
      order: stage.order,
      config: stage.config || {
        interviewFormat: 'one-to-one',
        interviewMode: 'virtual',
        notes: '',
        interviewers: [],
      },
      status,
      interviewers: stage.config?.interviewers || [],
      scheduling: { isScheduled: false },
      missingItems: !hasConfig ? ['Configuration'] : !hasInterviewers ? ['Interviewers'] : undefined,
    };
  });

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

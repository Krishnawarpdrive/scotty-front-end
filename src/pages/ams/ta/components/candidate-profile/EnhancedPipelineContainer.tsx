
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CompactPipelineVisualization } from './CompactPipelineVisualization';
import { EnhancedBottomPanel } from './EnhancedBottomPanel';
import { Candidate } from '../types/CandidateTypes';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  order: number;
}

interface Role {
  id: string;
  name: string;
  stages: Stage[];
}

interface EnhancedPipelineContainerProps {
  candidate: Candidate;
  role: Role;
}

export const EnhancedPipelineContainer: React.FC<EnhancedPipelineContainerProps> = ({
  candidate,
  role
}) => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(
    role.stages.find(stage => stage.status === 'current') || role.stages[0]
  );

  const handleStageSelect = (stage: Stage) => {
    setSelectedStage(stage);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Compact Pipeline Visualization */}
      <Box sx={{ 
        height: '140px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
        overflow: 'hidden'
      }}>
        <CompactPipelineVisualization
          stages={role.stages}
          selectedStage={selectedStage}
          onStageSelect={handleStageSelect}
          roleName={role.name}
        />
      </Box>

      {/* Enhanced Bottom Panel */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <EnhancedBottomPanel
          candidate={candidate}
          stage={selectedStage}
          role={role}
        />
      </Box>
    </Box>
  );
};

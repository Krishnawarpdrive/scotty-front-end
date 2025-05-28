
import React, { useState } from 'react';
import { Box, Tabs, Tab, Badge } from '@mui/material';
import { StageFormRenderer } from './forms/StageFormRenderer';
import { InterviewNotesTab } from './tabs/InterviewNotesTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { ActivityTimelineTab } from './tabs/ActivityTimelineTab';
import { Candidate } from '../types/CandidateTypes';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  order: number;
}

interface Role {
  id: string;
  name: string;
  stages: Stage[];
}

interface EnhancedBottomPanelProps {
  candidate: Candidate;
  stage: Stage | null;
  role: Role;
}

export const EnhancedBottomPanel: React.FC<EnhancedBottomPanelProps> = ({
  candidate,
  stage,
  role
}) => {
  const [activeTab, setActiveTab] = useState('stage-form');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  if (!stage) return null;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Bottom Panel Tabs */}
      <Box sx={{ 
        borderBottom: '1px solid #e0e0e0', 
        px: 2, 
        backgroundColor: 'white',
        minHeight: '42px'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: '42px',
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '12px',
              textTransform: 'none',
              minHeight: '42px',
              fontWeight: 500,
              color: '#666',
              padding: '8px 12px',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: '#009933',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#009933',
              height: '2px'
            }
          }}
        >
          <Tab 
            value="stage-form"
            label={stage.name}
          />
          <Tab 
            value="notes"
            label={
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '9px', minWidth: '14px', height: '14px' } }}>
                Notes
              </Badge>
            }
          />
          <Tab 
            value="documents"
            label={
              <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '9px', minWidth: '14px', height: '14px' } }}>
                Documents
              </Badge>
            }
          />
          <Tab 
            value="timeline"
            label="Activity"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'stage-form' && (
          <StageFormRenderer 
            candidate={candidate}
            stageId={stage.id}
            stageName={stage.name}
          />
        )}
        
        {activeTab === 'notes' && (
          <InterviewNotesTab 
            candidate={candidate}
            stage={stage}
          />
        )}
        
        {activeTab === 'documents' && (
          <DocumentsTab 
            candidate={candidate}
            stage={stage}
          />
        )}
        
        {activeTab === 'timeline' && (
          <ActivityTimelineTab 
            candidate={candidate}
            role={role.name}
          />
        )}
      </Box>
    </Box>
  );
};

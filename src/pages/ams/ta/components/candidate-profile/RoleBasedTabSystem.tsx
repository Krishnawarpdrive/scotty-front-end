
import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import { EnhancedPipelineContainer } from './EnhancedPipelineContainer';
import { Candidate } from '../types/CandidateTypes';

interface RoleBasedTabSystemProps {
  candidate: Candidate;
}

// Mock role data - in a real app, this would come from your database
const mockRoles = [
  { 
    id: 'network-admin', 
    name: 'Network Administrator',
    stages: [
      { id: 'phone-screening', name: 'Phone Screening', status: 'completed', order: 1 },
      { id: 'technical', name: 'Technical Interview', status: 'current', order: 2 },
      { id: 'client-interview', name: 'Client Interview', status: 'pending', order: 3 },
      { id: 'background-verification', name: 'Background Check', status: 'pending', order: 4 },
      { id: 'final-review', name: 'Final Review', status: 'pending', order: 5 }
    ]
  },
  { 
    id: 'devops-eng', 
    name: 'DevOps Engineer',
    stages: [
      { id: 'phone-screening', name: 'Phone Screening', status: 'pending', order: 1 },
      { id: 'technical', name: 'Technical Assessment', status: 'pending', order: 2 },
      { id: 'system-design', name: 'System Design', status: 'pending', order: 3 },
      { id: 'client-interview', name: 'Client Interview', status: 'pending', order: 4 },
      { id: 'final-review', name: 'Final Review', status: 'pending', order: 5 }
    ]
  },
  { 
    id: 'data-analyst', 
    name: 'Data Analyst',
    stages: [
      { id: 'phone-screening', name: 'Phone Screening', status: 'pending', order: 1 },
      { id: 'case-study', name: 'Case Study', status: 'pending', order: 2 },
      { id: 'presentation', name: 'Presentation', status: 'pending', order: 3 },
      { id: 'final-review', name: 'Final Review', status: 'pending', order: 4 }
    ]
  }
];

export const RoleBasedTabSystem: React.FC<RoleBasedTabSystemProps> = ({
  candidate
}) => {
  const theme = useTheme();
  const [activeRole, setActiveRole] = useState('network-admin');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveRole(newValue);
  };

  const currentRole = mockRoles.find(role => role.id === activeRole);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Role Tabs Header */}
      <Box sx={{ 
        borderBottom: '1px solid #e0e0e0', 
        px: 2, 
        backgroundColor: 'white',
        minHeight: '48px'
      }}>
        <Tabs 
          value={activeRole} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: '48px',
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              textTransform: 'none',
              minHeight: '48px',
              fontWeight: 500,
              color: '#666',
              padding: '12px 16px',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: '#009933',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#009933',
              height: '3px'
            }
          }}
        >
          {mockRoles.map((role) => (
            <Tab 
              key={role.id} 
              value={role.id}
              label={role.name}
            />
          ))}
        </Tabs>
      </Box>

      {/* Enhanced Pipeline Container */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {currentRole && (
          <EnhancedPipelineContainer
            candidate={candidate}
            role={currentRole}
          />
        )}
      </Box>
    </Box>
  );
};

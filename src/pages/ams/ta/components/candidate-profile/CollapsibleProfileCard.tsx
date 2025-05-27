
import React from 'react';
import { Box, Typography, IconButton, Avatar, Chip, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Phone, Mail, LocationOn } from '@mui/icons-material';
import { Candidate } from '../types/CandidateTypes';

interface CollapsibleProfileCardProps {
  candidate: Candidate;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const CollapsibleProfileCard: React.FC<CollapsibleProfileCardProps> = ({
  candidate,
  collapsed,
  onToggleCollapse
}) => {
  return (
    <Box sx={{ 
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: 'white',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Header - Always Visible */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: '#009933', fontSize: '16px' }}>
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '16px' }}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '13px' }}>
              {candidate.role}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onToggleCollapse} size="small">
          {collapsed ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={!collapsed}>
        <Box sx={{ px: 2.5, pb: 2.5 }}>
          {/* Contact Information */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px' }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}>
                  {candidate.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}>
                  Mumbai, India
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Current Status */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px' }}>
              Current Status
            </Typography>
            <Chip 
              label={candidate.status.text}
              size="small"
              sx={{ 
                bgcolor: '#fff3cd', 
                color: '#856404',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                height: '24px'
              }}
            />
          </Box>

          {/* Experience & Skills */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px' }}>
              Experience & Skills
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}>
              5+ years in Network Administration
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {['Network Admin', 'Cisco', 'Linux', 'TCP/IP'].map((skill) => (
                <Chip 
                  key={skill}
                  label={skill} 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '10px',
                    height: '22px'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};


import React from 'react';
import { Box, Typography, IconButton, Avatar, Chip, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Phone, Mail, MapPin } from '@mui/icons-material';
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
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: '#009933' }}>
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
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
        <Box sx={{ px: 3, pb: 3 }}>
          {/* Contact Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                  {candidate.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                  Mumbai, India
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Current Status */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              Current Status
            </Typography>
            <Chip 
              label={candidate.status.text}
              size="small"
              sx={{ 
                bgcolor: '#fff3cd', 
                color: '#856404',
                fontFamily: 'Rubik, sans-serif'
              }}
            />
          </Box>

          {/* Experience & Skills */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              Experience & Skills
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif' }}>
              5+ years in Network Administration
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {['Network Admin', 'Cisco', 'Linux', 'TCP/IP'].map((skill) => (
                <Chip 
                  key={skill}
                  label={skill} 
                  variant="outlined" 
                  size="small"
                  sx={{ fontFamily: 'Rubik, sans-serif' }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};


import React from 'react';
import { Box, Typography, Avatar, Chip, IconButton, Collapse } from '@mui/material';
import { 
  Person, 
  Phone, 
  Email, 
  ExpandMore, 
  ExpandLess,
  Video,
  MessageSquare,
  Calendar
} from '@mui/icons-material';
import { Interview } from '../MyInterviewsPage';
import { format } from 'date-fns';

interface InterviewerCollapsibleProfileCardProps {
  interview: Interview;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const InterviewerCollapsibleProfileCard: React.FC<InterviewerCollapsibleProfileCardProps> = ({
  interview,
  collapsed,
  onToggleCollapse
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      case 'completed':
        return { bgcolor: '#e8f5e8', color: '#2e7d32' };
      case 'cancelled':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      case 'in-progress':
        return { bgcolor: '#fff3e0', color: '#f57c00' };
      default:
        return { bgcolor: '#f5f5f5', color: '#666' };
    }
  };

  const interviewDate = new Date(interview.scheduledDate);

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Collapsed Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        cursor: 'pointer'
      }} onClick={onToggleCollapse}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#1976d2' }}>
            {getInitials(interview.candidateName)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: 'Rubik, sans-serif' }}>
              {interview.candidateName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
              {interview.roleName} • {interview.clientName}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={interview.status}
            size="small"
            sx={getStatusColor(interview.status)}
          />
          <IconButton size="small">
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Box>
      </Box>

      {/* Expanded Content */}
      <Collapse in={!collapsed}>
        <Box sx={{ p: 3, pt: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2' }}>
              {getInitials(interview.candidateName)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                {interview.candidateName}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                    {interview.candidateEmail}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                    {format(interviewDate, 'MMM dd, yyyy')} at {format(interviewDate, 'hh:mm a')}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Role: ${interview.roleName}`}
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  label={`Client: ${interview.clientName}`}
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  label={`${interview.duration} minutes`}
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  label={interview.interviewType}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  icon={<MessageSquare />}
                  label="Message"
                  variant="outlined"
                  clickable
                  size="small"
                />
                {interview.meetingLink && (
                  <Chip
                    icon={<Video />}
                    label="Join Interview"
                    clickable
                    size="small"
                    sx={{ bgcolor: '#1976d2', color: 'white' }}
                    onClick={() => window.open(interview.meetingLink, '_blank')}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

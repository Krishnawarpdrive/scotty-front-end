
import React from 'react';
import { Box, Typography, Avatar, AvatarGroup, Tooltip } from '@mui/material';
import {
  Person as PersonIcon,
  Groups as GroupsIcon,
  VideoCall as VideoIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';

interface StageCardContentProps {
  stage: EnhancedStage;
  categoryColor: string;
}

const getInterviewFormatIcon = (format?: string) => {
  switch (format) {
    case 'one-to-one':
      return PersonIcon;
    case 'panel':
      return GroupsIcon;
    case 'group':
      return GroupsIcon;
    default:
      return PersonIcon;
  }
};

const StageCardContent: React.FC<StageCardContentProps> = ({
  stage,
  categoryColor,
}) => {
  const InterviewFormatIcon = getInterviewFormatIcon(stage.config?.interviewFormat);

  return (
    <Box sx={{ flexGrow: 1, ml: 2 }}>
      {/* Interviewers */}
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            color: '#6b7280',
            mb: 1,
            fontWeight: 500,
          }}
        >
          Interviewers
        </Typography>
        {stage.interviewers.length > 0 ? (
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '10px' } }}>
            {stage.interviewers.map((interviewer) => (
              <Tooltip key={interviewer.id} title={interviewer.name}>
                <Avatar
                  src={interviewer.avatar}
                  sx={{ bgcolor: categoryColor }}
                >
                  {interviewer.name.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        ) : (
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '11px',
              color: '#9ca3af',
              fontStyle: 'italic',
            }}
          >
            Not assigned
          </Typography>
        )}
      </Box>

      {/* Interview Format & Mode */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <InterviewFormatIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '11px',
              color: '#6b7280',
            }}
          >
            {stage.config?.interviewFormat || 'Not set'}
          </Typography>
        </Box>
        {stage.config?.interviewMode && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {stage.config.interviewMode === 'virtual' ? (
              <VideoIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
            ) : (
              <PersonIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
            )}
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                color: '#6b7280',
              }}
            >
              {stage.config.interviewMode}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Scheduling Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
        <ScheduleIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            color: stage.scheduling.isScheduled ? '#009933' : '#f59e0b',
            fontWeight: 500,
          }}
        >
          {stage.scheduling.isScheduled ? 
            `${stage.scheduling.duration || 30}m | ${stage.scheduling.timeSlot || 'Scheduled'}` :
            'Not Scheduled'
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default StageCardContent;

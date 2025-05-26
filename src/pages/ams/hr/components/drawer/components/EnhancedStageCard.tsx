
import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Chip, IconButton, Avatar, AvatarGroup, Tooltip, Menu, MenuItem } from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  DragIndicator as DragIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  VideoCall as VideoIcon,
  Edit as EditIcon,
  ContentCopy as DuplicateIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useStageDragDrop } from '../hooks/useStageDragDrop';
import { EnhancedStage } from '../types/StageTypes';

interface EnhancedStageCardProps {
  stage: EnhancedStage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
  viewMode?: 'detailed' | 'compact';
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal': return '#009933';
    case 'external': return '#f57c00';
    case 'partner': return '#7b1fa2';
    case 'client': return '#fbc02d';
    case 'verification': return '#616161';
    default: return '#e5e7eb';
  }
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'configured':
      return { color: '#009933', icon: CheckIcon, label: 'Configured' };
    case 'partially-configured':
      return { color: '#f59e0b', icon: WarningIcon, label: 'Partially Configured' };
    case 'not-configured':
      return { color: '#dc2626', icon: ErrorIcon, label: 'Not Configured' };
    default:
      return { color: '#9ca3af', icon: ErrorIcon, label: 'Unknown' };
  }
};

const getInterviewFormatIcon = (format?: string) => {
  switch (format) {
    case 'one-to-one': return PersonIcon;
    case 'panel': return GroupsIcon;
    case 'group': return GroupsIcon;
    default: return PersonIcon;
  }
};

const EnhancedStageCard: React.FC<EnhancedStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
  viewMode = 'detailed'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  
  const { ref, handlerId, isDragging, drag } = useStageDragDrop({
    id: stage.id,
    index,
    onReorder,
  });

  const categoryColor = getCategoryColor(stage.category);
  const statusConfig = getStatusConfig(stage.status);
  const InterviewFormatIcon = getInterviewFormatIcon(stage.config?.interviewFormat);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuAction = (action: () => void) => {
    handleMenuClose();
    action();
  };

  if (viewMode === 'compact') {
    return (
      <Card
        ref={ref}
        data-handler-id={handlerId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          minWidth: '180px',
          maxWidth: '180px',
          height: '120px',
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? 'grabbing' : 'default',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          borderLeft: `4px solid ${categoryColor}`,
          position: 'relative',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <CardContent sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Compact Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: categoryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
              }}
            >
              <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', color: 'white', fontWeight: 600 }}>
                {stage.order}
              </Typography>
            </Box>
            
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#262626',
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {stage.name}
            </Typography>

            <IconButton size="small" onClick={handleMenuClick} sx={{ p: 0.5 }}>
              <MoreVertIcon sx={{ fontSize: '14px', color: '#9ca3af' }} />
            </IconButton>
          </Box>

          {/* Status Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <statusConfig.icon sx={{ fontSize: '12px', color: statusConfig.color }} />
            <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', color: statusConfig.color, fontWeight: 500 }}>
              {statusConfig.label}
            </Typography>
          </Box>

          {/* Compact Info */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '9px', color: '#666' }}>
              {stage.interviewers.length} interviewer{stage.interviewers.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        minWidth: '280px',
        maxWidth: '280px',
        height: '240px',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        borderLeft: `4px solid ${categoryColor}`,
        position: 'relative',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      {/* Drag Handle */}
      {isHovered && (
        <Box
          ref={drag}
          sx={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            cursor: 'grab',
            opacity: 0.6,
            '&:hover': { opacity: 1 },
          }}
        >
          <DragIcon sx={{ fontSize: '18px', color: '#9ca3af' }} />
        </Box>
      )}

      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: categoryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '14px', color: 'white', fontWeight: 600 }}>
              {stage.order}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#262626',
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {stage.name}
            </Typography>
            <Chip
              label={stage.category.replace('-', ' ')}
              size="small"
              sx={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                height: '22px',
                textTransform: 'capitalize',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={stage.missingItems?.length ? `Missing: ${stage.missingItems.join(', ')}` : statusConfig.label}>
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: `${statusConfig.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <statusConfig.icon sx={{ fontSize: '14px', color: statusConfig.color }} />
              </Box>
            </Tooltip>

            <IconButton size="small" onClick={handleMenuClick} sx={{ p: 0.5 }}>
              <MoreVertIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Interviewers */}
          <Box>
            <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#6b7280', mb: 1, fontWeight: 500 }}>
              Interviewers
            </Typography>
            {stage.interviewers.length > 0 ? (
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '11px' } }}>
                {stage.interviewers.map((interviewer) => (
                  <Tooltip key={interviewer.id} title={interviewer.name}>
                    <Avatar src={interviewer.avatar} sx={{ bgcolor: categoryColor }}>
                      {interviewer.name.charAt(0)}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            ) : (
              <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>
                Not assigned
              </Typography>
            )}
          </Box>

          {/* Configuration Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InterviewFormatIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
              <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#6b7280' }}>
                {stage.config?.interviewFormat ? stage.config.interviewFormat.replace('-', ' ') : 'Not set'}
              </Typography>
              {stage.config?.interviewMode && (
                <>
                  <Box sx={{ width: '2px', height: '2px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                  {stage.config.interviewMode === 'virtual' ? (
                    <VideoIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
                  ) : (
                    <PersonIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
                  )}
                  <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#6b7280' }}>
                    {stage.config.interviewMode}
                  </Typography>
                </>
              )}
            </Box>

            {/* Scheduling */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ScheduleIcon sx={{ fontSize: '14px', color: '#6b7280' }} />
              <Typography
                sx={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '11px',
                  color: stage.scheduling.isScheduled ? '#009933' : '#f59e0b',
                  fontWeight: 500,
                }}
              >
                {stage.scheduling.isScheduled 
                  ? `${stage.scheduling.duration || 30}m | ${stage.scheduling.timeSlot || 'Scheduled'}` 
                  : 'Not Scheduled'
                }
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #f3f4f6' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {stage.taAssigned ? (
              <Tooltip title={`TA: ${stage.taAssigned.name}`}>
                <Avatar src={stage.taAssigned.avatar} sx={{ width: 20, height: 20, fontSize: '10px', bgcolor: '#009933' }}>
                  {stage.taAssigned.name.charAt(0)}
                </Avatar>
              </Tooltip>
            ) : (
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '1px dashed #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '8px', color: '#9ca3af' }}>?</Typography>
              </Box>
            )}
            <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', color: '#6b7280' }}>TA</Typography>
          </Box>

          <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', color: '#6b7280' }}>
            {stage.dueDate || 'No due date'}
          </Typography>
        </Box>
      </CardContent>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { mt: 1, minWidth: 150 } }}
      >
        <MenuItem onClick={() => handleMenuAction(onConfigure)}>
          <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
          Configure
        </MenuItem>
        {onEdit && (
          <MenuItem onClick={() => handleMenuAction(onEdit)}>
            <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {onDuplicate && (
          <MenuItem onClick={() => handleMenuAction(onDuplicate)}>
            <DuplicateIcon sx={{ fontSize: '16px', mr: 1 }} />
            Duplicate
          </MenuItem>
        )}
        {onView && (
          <MenuItem onClick={() => handleMenuAction(onView)}>
            <ViewIcon sx={{ fontSize: '16px', mr: 1 }} />
            View
          </MenuItem>
        )}
        <MenuItem onClick={() => handleMenuAction(onRemove)} sx={{ color: '#dc2626' }}>
          <DeleteIcon sx={{ fontSize: '16px', mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default EnhancedStageCard;

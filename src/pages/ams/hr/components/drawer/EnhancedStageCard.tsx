
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Avatar,
  AvatarGroup,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  ContentCopy as DuplicateIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  CalendarToday as CalendarIcon,
  VideoCall as VideoIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { EnhancedStage } from './types/StageTypes';

interface EnhancedStageCardProps {
  stage: EnhancedStage;
  index: number;
  onRemove: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onConfigure: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal':
      return '#009933';
    case 'external':
      return '#f57c00';
    case 'partner':
      return '#7b1fa2';
    case 'client':
      return '#fbc02d';
    case 'verification':
      return '#616161';
    default:
      return '#e5e7eb';
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

const EnhancedStageCard: React.FC<EnhancedStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'stage',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'stage',
    item: () => {
      return { id: stage.id, index, type: 'stage' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));

  const categoryColor = getCategoryColor(stage.category);
  const statusConfig = getStatusConfig(stage.status);
  const InterviewFormatIcon = getInterviewFormatIcon(stage.config?.interviewFormat);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: string) => {
    handleMenuClose();
    switch (action) {
      case 'edit':
        onEdit?.();
        break;
      case 'duplicate':
        onDuplicate?.();
        break;
      case 'view':
        onView?.();
        break;
      case 'delete':
        onRemove();
        break;
      case 'configure':
        onConfigure();
        break;
    }
  };

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
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
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          {/* Top Left - Stage Number */}
          <Box
            sx={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: categoryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                color: 'white',
                fontWeight: 600,
              }}
            >
              {stage.order}
            </Typography>
          </Box>

          {/* Top Center - Stage Type */}
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <Chip
              label={stage.name}
              size="small"
              sx={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
                fontFamily: 'Rubik, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                height: '24px',
              }}
            />
          </Box>

          {/* Top Right - Status & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip 
              title={stage.missingItems?.length ? 
                `Missing: ${stage.missingItems.join(', ')}` : 
                statusConfig.label
              }
            >
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: `${statusConfig.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <statusConfig.icon sx={{ fontSize: '12px', color: statusConfig.color }} />
              </Box>
            </Tooltip>

            <IconButton size="small" onClick={handleMenuClick} sx={{ p: 0.5 }}>
              <MoreVertIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Drag Handle */}
        <Box
          ref={drag}
          sx={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <DragIcon sx={{ fontSize: '16px', color: '#9ca3af' }} />
        </Box>

        {/* Middle Section - Primary Content */}
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

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          {/* TA Assignment */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {stage.taAssigned ? (
              <Tooltip title={`TA: ${stage.taAssigned.name}`}>
                <Avatar
                  src={stage.taAssigned.avatar}
                  sx={{ width: 20, height: 20, fontSize: '10px', bgcolor: '#009933' }}
                >
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
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '10px',
                color: '#6b7280',
              }}
            >
              TA
            </Typography>
          </Box>

          {/* Due Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarIcon sx={{ fontSize: '12px', color: '#6b7280' }} />
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '10px',
                color: '#6b7280',
              }}
            >
              {stage.dueDate || 'No due date'}
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { mt: 1, minWidth: 150 }
          }}
        >
          <MenuItem onClick={() => handleMenuAction('configure')}>
            <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
            Configure
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('edit')}>
            <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('duplicate')}>
            <DuplicateIcon sx={{ fontSize: '16px', mr: 1 }} />
            Duplicate
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('view')}>
            <ViewIcon sx={{ fontSize: '16px', mr: 1 }} />
            View
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('delete')} sx={{ color: '#dc2626' }}>
            <DeleteIcon sx={{ fontSize: '16px', mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default EnhancedStageCard;

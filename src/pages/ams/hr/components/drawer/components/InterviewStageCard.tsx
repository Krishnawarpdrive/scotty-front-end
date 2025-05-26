
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Check as CheckIcon,
  MoreHoriz as MoreHorizIcon,
  ArrowUpward as ArrowUpwardIcon,
  LocalOffer as LocalOfferIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';
import StageCardMenu from './StageCardMenu';

interface InterviewStageCardProps {
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

const getPriorityColor = (status: string) => {
  switch (status) {
    case 'configured':
      return '#009933';
    case 'partially-configured':
      return '#f59e0b';
    case 'not-configured':
      return '#e70000b2';
    default:
      return '#a2a4b2';
  }
};

const InterviewStageCard: React.FC<InterviewStageCardProps> = ({
  stage,
  index,
  onRemove,
  onReorder,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
  const priorityColor = getPriorityColor(stage.status);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const statusText = stage.status === 'configured' ? 'Configured' : 
                   stage.status === 'partially-configured' ? 'Partial' : 'Not Set';

  // Safely access interviewers array with fallback
  const interviewers = stage.interviewers || [];
  const interviewerCount = interviewers.length;

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        width: '280px',
        height: '180px',
        borderRadius: '16px',
        position: 'relative',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {/* Header section with stage info */}
      <Box
        sx={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            color: '#a2a4b2',
            fontSize: '12px',
            fontWeight: 'normal',
          }}
        >
          #{stage.order}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            color: priorityColor,
            fontSize: '12px',
            fontWeight: 'normal',
          }}
        >
          {statusText}
        </Typography>

        <Avatar
          sx={{
            width: '18px',
            height: '18px',
            fontSize: '9px',
            bgcolor: categoryColor,
          }}
        >
          {stage.name.charAt(0)}
        </Avatar>

        <Typography
          sx={{
            fontFamily: 'Roboto, sans-serif',
            color: '#a2a4b2',
            fontSize: '12px',
            lineHeight: '18px',
          }}
        >
          {stage.dueDate || '2 days ago'}
        </Typography>
      </Box>

      {/* Action buttons in top right */}
      <Box
        sx={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <CheckIcon sx={{ width: '14px', height: '14px', color: '#000' }} />
        <IconButton size="small" sx={{ padding: 0 }} onClick={handleMenuClick}>
          <MoreHorizIcon sx={{ width: '18px', height: '18px' }} />
        </IconButton>
      </Box>

      {/* Description text - more compact */}
      <Typography
        sx={{
          position: 'absolute',
          top: '40px',
          left: '16px',
          width: '248px',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          lineHeight: '18px',
          color: '#656566',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {stage.name} - {stage.config?.interviewFormat || 'Format not set'}. 
        Interview mode: {stage.config?.interviewMode || 'Not specified'}.
        {interviewerCount > 0 ? ` Assigned to ${interviewerCount} interviewer(s).` : ' No interviewers assigned.'}
      </Typography>

      {/* Tags section - more compact */}
      <Box
        sx={{
          position: 'absolute',
          top: '84px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Chip
          label={stage.category}
          sx={{
            backgroundColor: '#f2f2f2d1',
            borderRadius: '4px',
            height: 'auto',
            '& .MuiChip-label': {
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'normal',
              fontSize: '11px',
              color: '#898989',
              padding: '1px 4px',
            },
          }}
        />
        
        <Chip
          label={stage.config?.interviewFormat || 'No format'}
          sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '4px',
            height: 'auto',
            '& .MuiChip-label': {
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'normal',
              fontSize: '11px',
              color: '#898989',
              padding: '1px 4px',
            },
          }}
        />

        <LocalOfferIcon
          sx={{ 
            width: '14px', 
            height: '14px', 
            color: '#898989',
            margin: '1px',
          }}
        />
      </Box>

      {/* Divider line */}
      <Divider
        sx={{
          position: 'absolute',
          top: '108px',
          left: '16px',
          width: '248px',
        }}
      />

      {/* Bottom section with avatars - more compact */}
      <Box
        sx={{
          position: 'absolute',
          top: '120px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* TA Assignment */}
        {stage.taAssigned ? (
          <Avatar
            src={stage.taAssigned.avatar}
            sx={{
              width: '18px',
              height: '18px',
              border: 'none',
              fontSize: '9px',
              bgcolor: '#009933',
            }}
          >
            {stage.taAssigned.name.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: '18px',
              height: '18px',
              border: 'none',
              bgcolor: '#f2f2f2',
              color: '#898989',
              fontSize: '9px',
            }}
          >
            ?
          </Avatar>
        )}

        {/* Calendar/Scheduling */}
        <Avatar
          sx={{
            width: '20px',
            height: '20px',
            border: '1px dashed #d2ccccb2',
            backgroundColor: 'transparent',
          }}
        >
          <CalendarIcon sx={{ width: '14px', height: '14px', color: '#898989' }} />
        </Avatar>

        {/* Time/Schedule */}
        <Avatar
          sx={{
            width: '20px',
            height: '20px',
            border: '1px dashed #d2ccccb2',
            backgroundColor: 'transparent',
          }}
        >
          <ScheduleIcon sx={{ width: '14px', height: '14px', color: '#898989' }} />
        </Avatar>
      </Box>

      {/* Arrow button in bottom right - more compact */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          width: '48px',
          height: '28px',
          backgroundColor: 'white',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <IconButton size="small" onClick={onConfigure} sx={{ padding: '2px' }}>
          <ArrowUpwardIcon sx={{ width: '18px', height: '18px' }} />
        </IconButton>
      </Box>

      {/* Menu */}
      <StageCardMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onConfigure={onConfigure}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onView={onView}
        onDelete={onRemove}
      />
    </Card>
  );
};

export default InterviewStageCard;

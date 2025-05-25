
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

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        width: '344px',
        height: '214px',
        borderRadius: '12px',
        position: 'relative',
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.09)',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'default',
        border: 'none',
        '&:hover': {
          boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {/* Header section with stage info */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            color: '#a2a4b2',
            fontSize: '14px',
            fontWeight: 'normal',
          }}
        >
          #{stage.order}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            color: priorityColor,
            fontSize: '14px',
            fontWeight: 'normal',
          }}
        >
          {statusText}
        </Typography>

        <Avatar
          sx={{
            width: '20px',
            height: '20px',
            fontSize: '10px',
            bgcolor: categoryColor,
          }}
        >
          {stage.name.charAt(0)}
        </Avatar>

        <Typography
          sx={{
            fontFamily: 'Roboto, sans-serif',
            color: '#a2a4b2',
            fontSize: '14px',
            lineHeight: '24px',
          }}
        >
          {stage.dueDate || '2 days ago'}
        </Typography>
      </Box>

      {/* Action buttons in top right */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <CheckIcon sx={{ width: '16px', height: '16px', color: '#000' }} />
        <IconButton size="small" sx={{ padding: 0 }} onClick={handleMenuClick}>
          <MoreHorizIcon sx={{ width: '20px', height: '20px' }} />
        </IconButton>
      </Box>

      {/* Description text */}
      <Typography
        sx={{
          position: 'absolute',
          top: '51px',
          left: '18px',
          width: '308px',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '15px',
          lineHeight: '22.5px',
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
        {stage.interviewers.length > 0 ? ` Assigned to ${stage.interviewers.length} interviewer(s).` : ' No interviewers assigned.'}
      </Typography>

      {/* Tags section */}
      <Box
        sx={{
          position: 'absolute',
          top: '109px',
          left: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
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
              fontSize: '12px',
              color: '#898989',
              padding: '2px 6px',
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
              fontSize: '12px',
              color: '#898989',
              padding: '2px 6px',
            },
          }}
        />

        <LocalOfferIcon
          sx={{ 
            width: '16px', 
            height: '16px', 
            color: '#898989',
            margin: '2px',
          }}
        />
      </Box>

      {/* Divider line */}
      <Divider
        sx={{
          position: 'absolute',
          top: '141px',
          left: '18px',
          width: '312px',
        }}
      />

      {/* Bottom section with avatars */}
      <Box
        sx={{
          position: 'absolute',
          top: '154px',
          left: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* TA Assignment */}
        {stage.taAssigned ? (
          <Avatar
            src={stage.taAssigned.avatar}
            sx={{
              width: '20px',
              height: '20px',
              border: 'none',
              fontSize: '10px',
              bgcolor: '#009933',
            }}
          >
            {stage.taAssigned.name.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: '20px',
              height: '20px',
              border: 'none',
              bgcolor: '#f2f2f2',
              color: '#898989',
              fontSize: '10px',
            }}
          >
            ?
          </Avatar>
        )}

        {/* Calendar/Scheduling */}
        <Avatar
          sx={{
            width: '24px',
            height: '24px',
            border: '1px dashed #d2ccccb2',
            backgroundColor: 'transparent',
          }}
        >
          <CalendarIcon sx={{ width: '16px', height: '16px', color: '#898989' }} />
        </Avatar>

        {/* Time/Schedule */}
        <Avatar
          sx={{
            width: '24px',
            height: '24px',
            border: '1px dashed #d2ccccb2',
            backgroundColor: 'transparent',
          }}
        >
          <ScheduleIcon sx={{ width: '16px', height: '16px', color: '#898989' }} />
        </Avatar>
      </Box>

      {/* Arrow button in bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2px',
          right: '6px',
          width: '73px',
          height: '38px',
          backgroundColor: 'white',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <IconButton size="small" onClick={onConfigure}>
          <ArrowUpwardIcon sx={{ width: '24px', height: '24px' }} />
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

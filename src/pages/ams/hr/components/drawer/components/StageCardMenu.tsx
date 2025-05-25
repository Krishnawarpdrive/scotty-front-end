
import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import {
  Edit as EditIcon,
  ContentCopy as DuplicateIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface StageCardMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onConfigure: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onView?: () => void;
  onDelete: () => void;
}

const StageCardMenu: React.FC<StageCardMenuProps> = ({
  anchorEl,
  onClose,
  onConfigure,
  onEdit,
  onDuplicate,
  onView,
  onDelete,
}) => {
  const handleMenuAction = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: { mt: 1, minWidth: 150 }
      }}
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
      <MenuItem onClick={() => handleMenuAction(onDelete)} sx={{ color: '#dc2626' }}>
        <DeleteIcon sx={{ fontSize: '16px', mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default StageCardMenu;


import React from 'react';
import { DialogActions, Button } from '@mui/material';

interface StageConfigModalActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const StageConfigModalActions: React.FC<StageConfigModalActionsProps> = ({
  onCancel,
  onSave,
}) => {
  return (
    <DialogActions sx={{ p: 3, pt: 2 }}>
      <Button
        onClick={onCancel}
        variant="outlined"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          textTransform: 'none',
          borderColor: '#e5e7eb',
          color: '#666',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        variant="contained"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          textTransform: 'none',
          backgroundColor: '#009933',
          '&:hover': { backgroundColor: '#007a2b' },
        }}
      >
        Save Configuration
      </Button>
    </DialogActions>
  );
};

export default StageConfigModalActions;

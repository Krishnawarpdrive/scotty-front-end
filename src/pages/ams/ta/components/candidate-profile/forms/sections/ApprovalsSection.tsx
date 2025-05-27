
import React from 'react';
import { 
  Box, 
  Typography, 
  FormControlLabel, 
  Switch
} from '@mui/material';

interface ApprovalsData {
  hrApproval: boolean;
  clientApproval: boolean;
  contractSigned: boolean;
}

interface ApprovalsSectionProps {
  formData: ApprovalsData;
  onFieldChange: (field: string, value: any) => void;
}

export const ApprovalsSection: React.FC<ApprovalsSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Required Approvals
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.hrApproval}
              onChange={(e) => onFieldChange('hrApproval', e.target.checked)}
            />
          }
          label="HR Approval"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.clientApproval}
              onChange={(e) => onFieldChange('clientApproval', e.target.checked)}
            />
          }
          label="Client Approval"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.contractSigned}
              onChange={(e) => onFieldChange('contractSigned', e.target.checked)}
            />
          }
          label="Contract Signed"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>
    </Box>
  );
};

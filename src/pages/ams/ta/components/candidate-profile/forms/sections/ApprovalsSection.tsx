
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
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#374151'
      }}>
        Required Approvals
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.hrApproval}
              onChange={(e) => onFieldChange('hrApproval', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#009933',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#009933',
                },
              }}
            />
          }
          label="HR Approval"
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            '& .MuiFormControlLabel-label': {
              fontSize: '13px',
              fontFamily: 'Rubik, sans-serif',
            }
          }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.clientApproval}
              onChange={(e) => onFieldChange('clientApproval', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#009933',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#009933',
                },
              }}
            />
          }
          label="Client Approval"
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            '& .MuiFormControlLabel-label': {
              fontSize: '13px',
              fontFamily: 'Rubik, sans-serif',
            }
          }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.contractSigned}
              onChange={(e) => onFieldChange('contractSigned', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#009933',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#009933',
                },
              }}
            />
          }
          label="Contract Signed"
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            '& .MuiFormControlLabel-label': {
              fontSize: '13px',
              fontFamily: 'Rubik, sans-serif',
            }
          }}
        />
      </Box>
    </Box>
  );
};

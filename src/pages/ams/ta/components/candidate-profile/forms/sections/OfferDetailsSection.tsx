
import React from 'react';
import { 
  Box, 
  Typography, 
  FormControlLabel, 
  Switch
} from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';

interface OfferDetailsData {
  salaryOffered: string;
  joiningDate: string;
  offerSent: boolean;
  offerAccepted: boolean;
}

interface OfferDetailsSectionProps {
  formData: OfferDetailsData;
  onFieldChange: (field: string, value: any) => void;
}

export const OfferDetailsSection: React.FC<OfferDetailsSectionProps> = ({
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
        Offer Details
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          label="Salary Offered"
          value={formData.salaryOffered}
          onChange={(e) => onFieldChange('salaryOffered', e.target.value)}
          placeholder="e.g., 8,00,000 INR"
        />
        
        <DesignSystemTextField
          label="Expected Joining Date"
          value={formData.joiningDate}
          onChange={(e) => onFieldChange('joiningDate', e.target.value)}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.offerSent}
              onChange={(e) => onFieldChange('offerSent', e.target.checked)}
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
          label="Offer Letter Sent"
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
              checked={formData.offerAccepted}
              onChange={(e) => onFieldChange('offerAccepted', e.target.checked)}
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
          label="Offer Accepted"
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

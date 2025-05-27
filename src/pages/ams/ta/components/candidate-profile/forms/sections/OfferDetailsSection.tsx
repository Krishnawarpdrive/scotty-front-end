
import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControlLabel, 
  Switch
} from '@mui/material';

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
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Offer Details
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <TextField
          label="Salary Offered"
          value={formData.salaryOffered}
          onChange={(e) => onFieldChange('salaryOffered', e.target.value)}
          placeholder="e.g., 8,00,000 INR"
        />
        
        <TextField
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
            />
          }
          label="Offer Letter Sent"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.offerAccepted}
              onChange={(e) => onFieldChange('offerAccepted', e.target.checked)}
            />
          }
          label="Offer Accepted"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>
    </Box>
  );
};

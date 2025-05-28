
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';

interface AddressSectionProps {
  formData: {
    currentAddress: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    preferredLocation: string;
    willingToRelocate: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

const countries = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' }
];

const states = [
  { value: 'MH', label: 'Maharashtra' },
  { value: 'DL', label: 'Delhi' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'GJ', label: 'Gujarat' }
];

const relocateOptions = [
  { value: 'yes', label: 'Yes, willing to relocate' },
  { value: 'no', label: 'No, prefer current location' },
  { value: 'depends', label: 'Depends on opportunity' }
];

export const AddressSection: React.FC<AddressSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#111827'
      }}>
        Address & Location Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Current Address"
            value={formData.currentAddress}
            onChange={(e) => onFieldChange('currentAddress', e.target.value)}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DesignSystemSelect
            fullWidth
            label="State"
            value={formData.state}
            onChange={(value) => onFieldChange('state', value)}
            options={states}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DesignSystemTextField
            fullWidth
            label="ZIP Code"
            value={formData.zipCode}
            onChange={(e) => onFieldChange('zipCode', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemSelect
            fullWidth
            label="Country"
            value={formData.country}
            onChange={(value) => onFieldChange('country', value)}
            options={countries}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Preferred Work Location"
            value={formData.preferredLocation}
            onChange={(e) => onFieldChange('preferredLocation', e.target.value)}
            placeholder="e.g., Mumbai, Bangalore, Remote"
          />
        </Grid>

        <Grid item xs={12}>
          <DesignSystemSelect
            fullWidth
            label="Willing to Relocate"
            value={formData.willingToRelocate}
            onChange={(value) => onFieldChange('willingToRelocate', value)}
            options={relocateOptions}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

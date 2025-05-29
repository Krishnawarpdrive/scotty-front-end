
import React from 'react';
import { Box, Typography } from '@mui/material';
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

const countryOptions = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' }
];

const relocationOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' }
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
        Address & Location
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Current Address"
          value={formData.currentAddress}
          onChange={(e) => onFieldChange('currentAddress', e.target.value)}
          multiline
          rows={2}
          placeholder="Enter your current address"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="City"
          value={formData.city}
          onChange={(e) => onFieldChange('city', e.target.value)}
          placeholder="Enter city"
        />
        <DesignSystemTextField
          fullWidth
          label="State/Province"
          value={formData.state}
          onChange={(e) => onFieldChange('state', e.target.value)}
          placeholder="Enter state or province"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemSelect
          fullWidth
          label="Country"
          value={formData.country}
          onChange={(value) => onFieldChange('country', value)}
          options={countryOptions}
        />
        <DesignSystemTextField
          fullWidth
          label="ZIP/Postal Code"
          value={formData.zipCode}
          onChange={(e) => onFieldChange('zipCode', e.target.value)}
          placeholder="Enter ZIP or postal code"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Preferred Work Location"
          value={formData.preferredLocation}
          onChange={(e) => onFieldChange('preferredLocation', e.target.value)}
          placeholder="Enter preferred work location"
        />
        <DesignSystemSelect
          fullWidth
          label="Willing to Relocate"
          value={formData.willingToRelocate}
          onChange={(value) => onFieldChange('willingToRelocate', value)}
          options={relocationOptions}
        />
      </Box>
    </Box>
  );
};

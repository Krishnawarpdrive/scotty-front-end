
import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';

interface PhoneScreeningBasicInfoData {
  phoneNumber: string;
  callScheduled: boolean;
  experienceYears: string;
  currentLocation: string;
  currentRole: string;
  currentCompany: string;
  availabilityWeeks: string;
}

interface PhoneScreeningBasicInfoProps {
  formData: PhoneScreeningBasicInfoData;
  onFieldChange: (field: string, value: any) => void;
}

export const PhoneScreeningBasicInfo: React.FC<PhoneScreeningBasicInfoProps> = ({
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
        Contact & Basic Information
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => onFieldChange('phoneNumber', e.target.value)}
        />
        <DesignSystemTextField
          label="Years of Experience"
          value={formData.experienceYears}
          onChange={(e) => onFieldChange('experienceYears', e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          label="Current Location"
          value={formData.currentLocation}
          onChange={(e) => onFieldChange('currentLocation', e.target.value)}
        />
        <DesignSystemTextField
          label="Availability (weeks)"
          value={formData.availabilityWeeks}
          onChange={(e) => onFieldChange('availabilityWeeks', e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          label="Current Role"
          value={formData.currentRole}
          onChange={(e) => onFieldChange('currentRole', e.target.value)}
        />
        <DesignSystemTextField
          label="Current Company"
          value={formData.currentCompany}
          onChange={(e) => onFieldChange('currentCompany', e.target.value)}
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={formData.callScheduled}
            onChange={(e) => onFieldChange('callScheduled', e.target.checked)}
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
        label="Call Scheduled"
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          '& .MuiFormControlLabel-label': {
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
          }
        }}
      />
    </Box>
  );
};


import React from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';

interface RoleInformationSectionProps {
  formData: {
    appliedRole: string;
    currentRole: string;
    currentCompany: string;
    experienceYears: string;
    relevantExperience: string;
    currentSalary: string;
    expectedSalary: string;
    noticePeriod: string;
    availability: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

const experienceOptions = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-8', label: '5-8 years' },
  { value: '8-12', label: '8-12 years' },
  { value: '12+', label: '12+ years' }
];

const noticePeriodOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: '15-days', label: '15 days' },
  { value: '30-days', label: '30 days' },
  { value: '60-days', label: '60 days' },
  { value: '90-days', label: '90 days' }
];

export const RoleInformationSection: React.FC<RoleInformationSectionProps> = ({
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
        Role & Employment Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Applied Role"
            value={formData.appliedRole}
            onChange={(e) => onFieldChange('appliedRole', e.target.value)}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f9fafb',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Current Role/Position"
            value={formData.currentRole}
            onChange={(e) => onFieldChange('currentRole', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Current Company"
            value={formData.currentCompany}
            onChange={(e) => onFieldChange('currentCompany', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemSelect
            fullWidth
            label="Total Experience"
            value={formData.experienceYears}
            onChange={(value) => onFieldChange('experienceYears', value)}
            options={experienceOptions}
          />
        </Grid>

        <Grid item xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Relevant Experience Description"
            value={formData.relevantExperience}
            onChange={(e) => onFieldChange('relevantExperience', e.target.value)}
            multiline
            rows={3}
            placeholder="Describe relevant experience, key projects, and achievements..."
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DesignSystemTextField
            fullWidth
            label="Current Salary (₹ LPA)"
            value={formData.currentSalary}
            onChange={(e) => onFieldChange('currentSalary', e.target.value)}
            placeholder="e.g., 12.5"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DesignSystemTextField
            fullWidth
            label="Expected Salary (₹ LPA)"
            value={formData.expectedSalary}
            onChange={(e) => onFieldChange('expectedSalary', e.target.value)}
            placeholder="e.g., 15.0"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DesignSystemSelect
            fullWidth
            label="Notice Period"
            value={formData.noticePeriod}
            onChange={(value) => onFieldChange('noticePeriod', value)}
            options={noticePeriodOptions}
          />
        </Grid>

        <Grid item xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Availability & Constraints"
            value={formData.availability}
            onChange={(e) => onFieldChange('availability', e.target.value)}
            multiline
            rows={2}
            placeholder="Any specific availability constraints, preferred interview times, etc."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

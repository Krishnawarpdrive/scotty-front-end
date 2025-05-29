
import React from 'react';
import { Box, Typography } from '@mui/material';
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
  { value: '1-month', label: '1 month' },
  { value: '2-months', label: '2 months' },
  { value: '3-months', label: '3 months' }
];

const availabilityOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'within-week', label: 'Within a week' },
  { value: 'within-month', label: 'Within a month' },
  { value: 'flexible', label: 'Flexible' }
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
        Role Information
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Applied Role"
          value={formData.appliedRole}
          onChange={(e) => onFieldChange('appliedRole', e.target.value)}
        />

        <DesignSystemTextField
          fullWidth
          label="Current Role"
          value={formData.currentRole}
          onChange={(e) => onFieldChange('currentRole', e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Current Company"
          value={formData.currentCompany}
          onChange={(e) => onFieldChange('currentCompany', e.target.value)}
        />

        <DesignSystemSelect
          fullWidth
          label="Total Experience"
          value={formData.experienceYears}
          onChange={(value) => onFieldChange('experienceYears', value)}
          options={experienceOptions}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Relevant Experience"
          value={formData.relevantExperience}
          onChange={(e) => onFieldChange('relevantExperience', e.target.value)}
          multiline
          rows={3}
          placeholder="Describe relevant experience for this role..."
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Current Salary (LPA)"
          value={formData.currentSalary}
          onChange={(e) => onFieldChange('currentSalary', e.target.value)}
          placeholder="e.g., 12 LPA"
        />

        <DesignSystemTextField
          fullWidth
          label="Expected Salary (LPA)"
          value={formData.expectedSalary}
          onChange={(e) => onFieldChange('expectedSalary', e.target.value)}
          placeholder="e.g., 15 LPA"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <DesignSystemSelect
          fullWidth
          label="Notice Period"
          value={formData.noticePeriod}
          onChange={(value) => onFieldChange('noticePeriod', value)}
          options={noticePeriodOptions}
        />

        <DesignSystemSelect
          fullWidth
          label="Availability"
          value={formData.availability}
          onChange={(value) => onFieldChange('availability', value)}
          options={availabilityOptions}
        />
      </Box>
    </Box>
  );
};

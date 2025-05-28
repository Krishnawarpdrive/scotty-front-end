
import React from 'react';
import { Box } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';

interface EducationFieldsProps {
  formData: {
    highestEducation: string;
    university: string;
    graduationYear: string;
    specialization: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

const educationLevels = [
  { value: 'bachelors', label: 'Bachelor\'s Degree' },
  { value: 'masters', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certificate', label: 'Professional Certificate' },
  { value: 'other', label: 'Other' }
];

export const EducationFields: React.FC<EducationFieldsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemSelect
          fullWidth
          label="Highest Education"
          value={formData.highestEducation}
          onChange={(value) => onFieldChange('highestEducation', value)}
          options={educationLevels}
        />

        <DesignSystemTextField
          fullWidth
          label="University/Institution"
          value={formData.university}
          onChange={(e) => onFieldChange('university', e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Graduation Year"
          value={formData.graduationYear}
          onChange={(e) => onFieldChange('graduationYear', e.target.value)}
          placeholder="e.g., 2020"
        />

        <DesignSystemTextField
          fullWidth
          label="Specialization/Major"
          value={formData.specialization}
          onChange={(e) => onFieldChange('specialization', e.target.value)}
          placeholder="e.g., Computer Science, Electronics"
        />
      </Box>
    </>
  );
};

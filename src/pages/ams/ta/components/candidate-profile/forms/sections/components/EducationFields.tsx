
import React from 'react';
import { FormGrid, FormInput, FormSelect } from '../../shared/FormComponents';

interface EducationFieldsProps {
  formData: {
    highestEducation: string;
    university: string;
    graduationYear: string;
    specialization: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

export const EducationFields: React.FC<EducationFieldsProps> = ({
  formData,
  onFieldChange
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <FormGrid columns={2} gap={3}>
      <FormSelect
        label="Highest Education"
        value={formData.highestEducation || ''}
        onChange={(value) => onFieldChange('highestEducation', value)}
        options={[
          { value: 'high_school', label: 'High School' },
          { value: 'diploma', label: 'Diploma' },
          { value: 'bachelors', label: "Bachelor's Degree" },
          { value: 'masters', label: "Master's Degree" },
          { value: 'phd', label: 'PhD' },
          { value: 'other', label: 'Other' }
        ]}
        placeholder="Select education level"
      />

      <FormInput
        label="University/Institution"
        value={formData.university || ''}
        onChange={(value) => onFieldChange('university', value)}
        placeholder="Name of educational institution"
      />

      <FormSelect
        label="Graduation Year"
        value={formData.graduationYear || ''}
        onChange={(value) => onFieldChange('graduationYear', value)}
        options={yearOptions}
        placeholder="Select graduation year"
      />

      <FormInput
        label="Specialization/Major"
        value={formData.specialization || ''}
        onChange={(value) => onFieldChange('specialization', value)}
        placeholder="Field of study or specialization"
      />
    </FormGrid>
  );
};

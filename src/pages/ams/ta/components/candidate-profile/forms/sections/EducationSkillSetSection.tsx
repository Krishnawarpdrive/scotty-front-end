
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { EducationFields } from './components/EducationFields';
import { AdditionalCoursesInput } from './components/AdditionalCoursesInput';
import { LanguagesInput } from './components/LanguagesInput';
import { useEducationManagement } from './hooks/useEducationManagement';

interface EducationSkillSetSectionProps {
  formData: {
    highestEducation: string;
    university: string;
    graduationYear: string;
    specialization: string;
    additionalCourses: string[];
    languages: string[];
    hobbies: string;
    careerGoals: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

export const EducationSkillSetSection: React.FC<EducationSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const { addCourse, removeCourse, addLanguage, removeLanguage } = useEducationManagement(
    formData,
    onFieldChange
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#111827'
      }}>
        Education & Additional Skills
      </Typography>

      <EducationFields
        formData={formData}
        onFieldChange={onFieldChange}
      />

      <AdditionalCoursesInput
        courses={formData.additionalCourses || []}
        onAddCourse={addCourse}
        onRemoveCourse={removeCourse}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <LanguagesInput
          languages={formData.languages || []}
          onAddLanguage={addLanguage}
          onRemoveLanguage={removeLanguage}
        />

        <DesignSystemTextField
          fullWidth
          label="Hobbies & Interests"
          value={formData.hobbies}
          onChange={(e) => onFieldChange('hobbies', e.target.value)}
          multiline
          rows={3}
          placeholder="Personal interests, hobbies, volunteer work..."
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          label="Career Goals & Aspirations"
          value={formData.careerGoals}
          onChange={(e) => onFieldChange('careerGoals', e.target.value)}
          multiline
          rows={3}
          placeholder="Short-term and long-term career goals, areas of interest for growth..."
        />
      </Box>
    </Box>
  );
};

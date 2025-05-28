
import React from 'react';
import { Box } from '@mui/material';
import { FormSection, FormGrid, FormInput, TagInput } from '../shared/FormComponents';
import { EducationFields } from './components/EducationFields';
import { useEducationManagement } from './hooks/useEducationManagement';

interface EnhancedEducationSkillSetSectionProps {
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

export const EnhancedEducationSkillSetSection: React.FC<EnhancedEducationSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const { addCourse, removeCourse, addLanguage, removeLanguage } = useEducationManagement(
    formData,
    onFieldChange
  );

  return (
    <Box>
      {/* Education Background */}
      <FormSection title="Education Background" defaultExpanded>
        <EducationFields
          formData={formData}
          onFieldChange={onFieldChange}
        />
      </FormSection>

      {/* Additional Learning */}
      <FormSection title="Additional Learning & Development" defaultExpanded>
        <Box sx={{ mb: 3 }}>
          <TagInput
            title="Additional Courses & Training"
            tags={formData.additionalCourses || []}
            placeholder="Add course or training program"
            chipColor={{ bgcolor: '#e1f5fe', color: '#0277bd' }}
            onAddTag={addCourse}
            onRemoveTag={removeCourse}
          />
        </Box>

        <TagInput
          title="Languages Known"
          tags={formData.languages || []}
          placeholder="Add language"
          chipColor={{ bgcolor: '#f0fdf4', color: '#16a34a' }}
          onAddTag={addLanguage}
          onRemoveTag={removeLanguage}
        />
      </FormSection>

      {/* Personal Interests & Goals */}
      <FormSection title="Personal Interests & Career Goals" defaultExpanded>
        <FormGrid columns={1} gap={3}>
          <FormInput
            label="Hobbies & Interests"
            value={formData.hobbies || ''}
            onChange={(value) => onFieldChange('hobbies', value)}
            placeholder="Personal interests, hobbies, volunteer work..."
            multiline
            rows={3}
          />

          <FormInput
            label="Career Goals & Aspirations"
            value={formData.careerGoals || ''}
            onChange={(value) => onFieldChange('careerGoals', value)}
            placeholder="Short-term and long-term career goals, areas of interest for growth..."
            multiline
            rows={4}
          />
        </FormGrid>
      </FormSection>
    </Box>
  );
};


import React, { useState } from 'react';
import { Box, Typography, Grid, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';
import { Plus, X } from 'lucide-react';

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

const educationLevels = [
  { value: 'bachelors', label: 'Bachelor\'s Degree' },
  { value: 'masters', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certificate', label: 'Professional Certificate' },
  { value: 'other', label: 'Other' }
];

export const EducationSkillSetSection: React.FC<EducationSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const [newCourse, setNewCourse] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addCourse = () => {
    if (newCourse.trim()) {
      const currentCourses = formData.additionalCourses || [];
      onFieldChange('additionalCourses', [...currentCourses, newCourse.trim()]);
      setNewCourse('');
    }
  };

  const removeCourse = (index: number) => {
    const currentCourses = formData.additionalCourses || [];
    const updatedCourses = currentCourses.filter((_, i) => i !== index);
    onFieldChange('additionalCourses', updatedCourses);
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const currentLanguages = formData.languages || [];
      onFieldChange('languages', [...currentLanguages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = formData.languages || [];
    const updatedLanguages = currentLanguages.filter((_, i) => i !== index);
    onFieldChange('languages', updatedLanguages);
  };

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

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DesignSystemSelect
            fullWidth
            label="Highest Education"
            value={formData.highestEducation}
            onChange={(value) => onFieldChange('highestEducation', value)}
            options={educationLevels}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="University/Institution"
            value={formData.university}
            onChange={(e) => onFieldChange('university', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Graduation Year"
            value={formData.graduationYear}
            onChange={(e) => onFieldChange('graduationYear', e.target.value)}
            placeholder="e.g., 2020"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Specialization/Major"
            value={formData.specialization}
            onChange={(e) => onFieldChange('specialization', e.target.value)}
            placeholder="e.g., Computer Science, Electronics"
          />
        </Grid>

        {/* Additional Courses */}
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
            Additional Courses & Training
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <DesignSystemTextField
              fullWidth
              size="small"
              placeholder="Add course or training"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCourse()}
            />
            <IconButton 
              onClick={addCourse}
              size="small"
              sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {(formData.additionalCourses || []).map((course, index) => (
              <Chip
                key={index}
                label={course}
                onDelete={() => removeCourse(index)}
                deleteIcon={<X className="h-3 w-3" />}
                sx={{ bgcolor: '#e1f5fe', color: '#0277bd' }}
              />
            ))}
          </Box>
        </Grid>

        {/* Languages */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
            Languages Known
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <DesignSystemTextField
              fullWidth
              size="small"
              placeholder="Add language"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
            />
            <IconButton 
              onClick={addLanguage}
              size="small"
              sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {(formData.languages || []).map((language, index) => (
              <Chip
                key={index}
                label={language}
                onDelete={() => removeLanguage(index)}
                deleteIcon={<X className="h-3 w-3" />}
                sx={{ bgcolor: '#f0fdf4', color: '#16a34a' }}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Hobbies & Interests"
            value={formData.hobbies}
            onChange={(e) => onFieldChange('hobbies', e.target.value)}
            multiline
            rows={3}
            placeholder="Personal interests, hobbies, volunteer work..."
          />
        </Grid>

        <Grid item xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Career Goals & Aspirations"
            value={formData.careerGoals}
            onChange={(e) => onFieldChange('careerGoals', e.target.value)}
            multiline
            rows={3}
            placeholder="Short-term and long-term career goals, areas of interest for growth..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

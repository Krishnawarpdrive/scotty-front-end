
import React from 'react';
import { Box } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';

interface ProjectsAchievementsFieldsProps {
  keyProjects: string;
  achievements: string;
  onFieldChange: (field: string, value: string) => void;
}

export const ProjectsAchievementsFields: React.FC<ProjectsAchievementsFieldsProps> = ({
  keyProjects,
  achievements,
  onFieldChange
}) => {
  return (
    <>
      <Box>
        <DesignSystemTextField
          fullWidth
          label="Key Projects & Accomplishments"
          value={keyProjects}
          onChange={(e) => onFieldChange('keyProjects', e.target.value)}
          multiline
          rows={4}
          placeholder="Describe your most significant projects, technologies used, and your role..."
        />
      </Box>

      <Box>
        <DesignSystemTextField
          fullWidth
          label="Professional Achievements"
          value={achievements}
          onChange={(e) => onFieldChange('achievements', e.target.value)}
          multiline
          rows={3}
          placeholder="Awards, recognitions, performance improvements, team leadership examples..."
        />
      </Box>
    </>
  );
};

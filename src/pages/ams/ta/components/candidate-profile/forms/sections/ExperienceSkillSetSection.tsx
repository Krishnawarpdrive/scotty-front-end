
import React from 'react';
import { Box, Typography } from '@mui/material';
import { SkillsInput } from './components/SkillsInput';
import { CertificationsInput } from './components/CertificationsInput';
import { ProjectsAchievementsFields } from './components/ProjectsAchievementsFields';

interface ExperienceSkillSetSectionProps {
  formData: {
    technicalSkills: string[];
    softSkills: string[];
    certifications: string[];
    keyProjects: string;
    achievements: string;
    toolsFrameworks: string[];
  };
  onFieldChange: (field: string, value: any) => void;
}

export const ExperienceSkillSetSection: React.FC<ExperienceSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const addSkill = (type: 'technicalSkills' | 'softSkills' | 'toolsFrameworks', skill: string) => {
    const currentSkills = formData[type] || [];
    onFieldChange(type, [...currentSkills, skill]);
  };

  const removeSkill = (type: 'technicalSkills' | 'softSkills' | 'toolsFrameworks', index: number) => {
    const currentSkills = formData[type] || [];
    const updatedSkills = currentSkills.filter((_, i) => i !== index);
    onFieldChange(type, updatedSkills);
  };

  const addCertification = (certification: string) => {
    const currentCerts = formData.certifications || [];
    onFieldChange('certifications', [...currentCerts, certification]);
  };

  const removeCertification = (index: number) => {
    const currentCerts = formData.certifications || [];
    const updatedCerts = currentCerts.filter((_, i) => i !== index);
    onFieldChange('certifications', updatedCerts);
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
        Experience & Skill Set
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {/* Technical Skills and Soft Skills */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <SkillsInput
            title="Technical Skills"
            skills={formData.technicalSkills || []}
            placeholder="Add technical skill"
            chipColor={{ bgcolor: '#e0f2fe', color: '#0277bd' }}
            onAddSkill={(skill) => addSkill('technicalSkills', skill)}
            onRemoveSkill={(index) => removeSkill('technicalSkills', index)}
          />

          <SkillsInput
            title="Soft Skills"
            skills={formData.softSkills || []}
            placeholder="Add soft skill"
            chipColor={{ bgcolor: '#f3e8ff', color: '#7c3aed' }}
            onAddSkill={(skill) => addSkill('softSkills', skill)}
            onRemoveSkill={(index) => removeSkill('softSkills', index)}
          />
        </Box>

        {/* Tools & Frameworks */}
        <SkillsInput
          title="Tools & Frameworks"
          skills={formData.toolsFrameworks || []}
          placeholder="Add tool or framework"
          chipColor={{ bgcolor: '#fef3c7', color: '#d97706' }}
          onAddSkill={(skill) => addSkill('toolsFrameworks', skill)}
          onRemoveSkill={(index) => removeSkill('toolsFrameworks', index)}
        />

        {/* Certifications */}
        <CertificationsInput
          certifications={formData.certifications || []}
          onAddCertification={addCertification}
          onRemoveCertification={removeCertification}
        />

        {/* Key Projects and Achievements */}
        <ProjectsAchievementsFields
          keyProjects={formData.keyProjects}
          achievements={formData.achievements}
          onFieldChange={onFieldChange}
        />
      </Box>
    </Box>
  );
};

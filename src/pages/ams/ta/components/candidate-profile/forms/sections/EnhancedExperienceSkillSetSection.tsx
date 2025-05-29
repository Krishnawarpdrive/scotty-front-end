
import React from 'react';
import { Box } from '@mui/material';
import { FormSection, FormGrid, FormInput, TagInput } from '../shared/FormComponents';
import { useSkillsManagement } from './hooks/useSkillsManagement';

interface EnhancedExperienceSkillSetSectionProps {
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

export const EnhancedExperienceSkillSetSection: React.FC<EnhancedExperienceSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const { addSkill, removeSkill, addCertification, removeCertification } = useSkillsManagement(
    formData,
    onFieldChange
  );

  return (
    <Box>
      {/* Technical Competencies */}
      <FormSection title="Technical Competencies" defaultExpanded>
        <FormGrid columns={1} gap={3}>
          <TagInput
            title="Technical Skills"
            tags={formData.technicalSkills || []}
            placeholder="Add technical skill"
            chipColor={{ bgcolor: '#e0f2fe', color: '#0277bd' }}
            onAddTag={(skill) => addSkill('technicalSkills', skill)}
            onRemoveTag={(index) => removeSkill('technicalSkills', index)}
          />

          <TagInput
            title="Tools & Frameworks"
            tags={formData.toolsFrameworks || []}
            placeholder="Add tool or framework"
            chipColor={{ bgcolor: '#fef3c7', color: '#d97706' }}
            onAddTag={(skill) => addSkill('toolsFrameworks', skill)}
            onRemoveTag={(index) => removeSkill('toolsFrameworks', index)}
          />
        </FormGrid>
      </FormSection>

      {/* Professional Skills */}
      <FormSection title="Professional Skills & Soft Skills" defaultExpanded>
        <FormGrid columns={1} gap={3}>
          <TagInput
            title="Soft Skills & Interpersonal Abilities"
            tags={formData.softSkills || []}
            placeholder="Add soft skill"
            chipColor={{ bgcolor: '#f3e8ff', color: '#7c3aed' }}
            onAddTag={(skill) => addSkill('softSkills', skill)}
            onRemoveTag={(index) => removeSkill('softSkills', index)}
          />

          <TagInput
            title="Certifications & Credentials"
            tags={formData.certifications || []}
            placeholder="Add certification"
            chipColor={{ bgcolor: '#ecfdf5', color: '#10b981' }}
            onAddTag={addCertification}
            onRemoveTag={removeCertification}
          />
        </FormGrid>
      </FormSection>

      {/* Projects & Achievements */}
      <FormSection title="Key Projects & Achievements" defaultExpanded>
        <FormGrid columns={1} gap={3}>
          <FormInput
            label="Key Projects & Contributions"
            value={formData.keyProjects || ''}
            onChange={(value) => onFieldChange('keyProjects', value)}
            placeholder="Describe significant projects, responsibilities, and contributions..."
            multiline
            rows={4}
          />

          <FormInput
            label="Notable Achievements & Recognition"
            value={formData.achievements || ''}
            onChange={(value) => onFieldChange('achievements', value)}
            placeholder="Awards, recognitions, measurable accomplishments..."
            multiline
            rows={4}
          />
        </FormGrid>
      </FormSection>
    </Box>
  );
};

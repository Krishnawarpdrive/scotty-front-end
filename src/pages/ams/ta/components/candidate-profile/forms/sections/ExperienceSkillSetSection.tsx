
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';
import { Plus, X } from 'lucide-react';

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

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

export const ExperienceSkillSetSection: React.FC<ExperienceSkillSetSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newTool, setNewTool] = useState('');

  const addSkill = (type: 'technicalSkills' | 'softSkills') => {
    if (newSkill.trim()) {
      const currentSkills = formData[type] || [];
      onFieldChange(type, [...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (type: 'technicalSkills' | 'softSkills', index: number) => {
    const currentSkills = formData[type] || [];
    const updatedSkills = currentSkills.filter((_, i) => i !== index);
    onFieldChange(type, updatedSkills);
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      const currentCerts = formData.certifications || [];
      onFieldChange('certifications', [...currentCerts, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    const currentCerts = formData.certifications || [];
    const updatedCerts = currentCerts.filter((_, i) => i !== index);
    onFieldChange('certifications', updatedCerts);
  };

  const addTool = () => {
    if (newTool.trim()) {
      const currentTools = formData.toolsFrameworks || [];
      onFieldChange('toolsFrameworks', [...currentTools, newTool.trim()]);
      setNewTool('');
    }
  };

  const removeTool = (index: number) => {
    const currentTools = formData.toolsFrameworks || [];
    const updatedTools = currentTools.filter((_, i) => i !== index);
    onFieldChange('toolsFrameworks', updatedTools);
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
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
              Technical Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <DesignSystemTextField
                fullWidth
                size="small"
                placeholder="Add technical skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill('technicalSkills')}
              />
              <IconButton 
                onClick={() => addSkill('technicalSkills')}
                size="small"
                sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
              >
                <Plus className="h-4 w-4" />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(formData.technicalSkills || []).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill('technicalSkills', index)}
                  deleteIcon={<X className="h-3 w-3" />}
                  sx={{ bgcolor: '#e0f2fe', color: '#0277bd' }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
              Soft Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <DesignSystemTextField
                fullWidth
                size="small"
                placeholder="Add soft skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill('softSkills')}
              />
              <IconButton 
                onClick={() => addSkill('softSkills')}
                size="small"
                sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
              >
                <Plus className="h-4 w-4" />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(formData.softSkills || []).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill('softSkills', index)}
                  deleteIcon={<X className="h-3 w-3" />}
                  sx={{ bgcolor: '#f3e8ff', color: '#7c3aed' }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Tools & Frameworks */}
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
            Tools & Frameworks
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <DesignSystemTextField
              fullWidth
              size="small"
              placeholder="Add tool or framework"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTool()}
            />
            <IconButton 
              onClick={addTool}
              size="small"
              sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {(formData.toolsFrameworks || []).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                onDelete={() => removeTool(index)}
                deleteIcon={<X className="h-3 w-3" />}
                sx={{ bgcolor: '#fef3c7', color: '#d97706' }}
              />
            ))}
          </Box>
        </Box>

        {/* Certifications */}
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
            Certifications
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <DesignSystemTextField
              fullWidth
              size="small"
              placeholder="Add certification"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCertification()}
            />
            <IconButton 
              onClick={addCertification}
              size="small"
              sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {(formData.certifications || []).map((cert, index) => (
              <Chip
                key={index}
                label={cert}
                onDelete={() => removeCertification(index)}
                deleteIcon={<X className="h-3 w-3" />}
                sx={{ bgcolor: '#dcfce7', color: '#16a34a' }}
              />
            ))}
          </Box>
        </Box>

        {/* Key Projects */}
        <Box>
          <DesignSystemTextField
            fullWidth
            label="Key Projects & Accomplishments"
            value={formData.keyProjects}
            onChange={(e) => onFieldChange('keyProjects', e.target.value)}
            multiline
            rows={4}
            placeholder="Describe your most significant projects, technologies used, and your role..."
          />
        </Box>

        {/* Achievements */}
        <Box>
          <DesignSystemTextField
            fullWidth
            label="Professional Achievements"
            value={formData.achievements}
            onChange={(e) => onFieldChange('achievements', e.target.value)}
            multiline
            rows={3}
            placeholder="Awards, recognitions, performance improvements, team leadership examples..."
          />
        </Box>
      </Box>
    </Box>
  );
};


import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Chip, LinearProgress } from '@mui/material';
import { CheckCircle, Circle, AlertTriangle } from 'lucide-react';

interface SkillChecklistItem {
  id: string;
  skill: string;
  required: boolean;
  checked: boolean;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  notes?: string;
}

interface SkillsBasedChecklistProps {
  title: string;
  roleSkills: string[];
  candidateSkills: string[];
  onSkillAssessment: (skillId: string, checked: boolean, proficiency?: string) => void;
}

export const SkillsBasedChecklist: React.FC<SkillsBasedChecklistProps> = ({
  title,
  roleSkills,
  candidateSkills,
  onSkillAssessment
}) => {
  const [skillItems, setSkillItems] = useState<SkillChecklistItem[]>(() => {
    return roleSkills.map(skill => ({
      id: skill.toLowerCase().replace(/\s+/g, '-'),
      skill,
      required: true,
      checked: candidateSkills.includes(skill),
      proficiency: candidateSkills.includes(skill) ? 'intermediate' : undefined
    }));
  });

  const handleSkillToggle = (skillId: string) => {
    setSkillItems(prev => prev.map(item => {
      if (item.id === skillId) {
        const newChecked = !item.checked;
        onSkillAssessment(skillId, newChecked, item.proficiency);
        return { ...item, checked: newChecked };
      }
      return item;
    }));
  };

  const completedSkills = skillItems.filter(item => item.checked).length;
  const totalSkills = skillItems.length;
  const completionPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;

  const getProficiencyColor = (proficiency?: string) => {
    switch (proficiency) {
      case 'beginner': return { bgcolor: '#fef3c7', color: '#d97706' };
      case 'intermediate': return { bgcolor: '#e0f2fe', color: '#0277bd' };
      case 'advanced': return { bgcolor: '#e1f5fe', color: '#0277bd' };
      case 'expert': return { bgcolor: '#ecfdf5', color: '#10b981' };
      default: return { bgcolor: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px',
      bgcolor: '#fafbfc'
    }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ 
          fontFamily: 'Rubik, sans-serif', 
          fontWeight: 600,
          fontSize: '16px',
          color: '#111827',
          mb: 1
        }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {completedSkills} of {totalSkills} skills assessed
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {Math.round(completionPercentage)}% complete
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={completionPercentage}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#e5e7eb',
            '& .MuiLinearProgress-bar': {
              backgroundColor: completionPercentage > 70 ? '#10b981' : completionPercentage > 40 ? '#f59e0b' : '#ef4444',
              borderRadius: 3,
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {skillItems.map((item) => (
          <Box 
            key={item.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'white',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleSkillToggle(item.id)}
                    sx={{
                      '&.Mui-checked': {
                        color: '#009933',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ 
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: item.required ? 500 : 400,
                    color: item.checked ? '#10b981' : '#374151'
                  }}>
                    {item.skill}
                  </Typography>
                }
              />
              
              {item.required && (
                <Chip
                  label="Required"
                  size="small"
                  sx={{ 
                    bgcolor: '#fef2f2', 
                    color: '#dc2626',
                    fontSize: '10px',
                    height: '20px'
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.checked && item.proficiency && (
                <Chip
                  label={item.proficiency.charAt(0).toUpperCase() + item.proficiency.slice(1)}
                  size="small"
                  sx={{
                    ...getProficiencyColor(item.proficiency),
                    fontSize: '11px',
                    height: '24px'
                  }}
                />
              )}
              
              {item.checked ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : item.required ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

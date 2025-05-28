
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { Plus, X } from 'lucide-react';

interface SkillsInputProps {
  title: string;
  skills: string[];
  placeholder: string;
  chipColor: { bgcolor: string; color: string };
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (index: number) => void;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  title,
  skills,
  placeholder,
  chipColor,
  onAddSkill,
  onRemoveSkill
}) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <DesignSystemTextField
          fullWidth
          size="small"
          placeholder={placeholder}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddSkill}
          size="small"
          sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => onRemoveSkill(index)}
            deleteIcon={<X className="h-3 w-3" />}
            sx={chipColor}
          />
        ))}
      </Box>
    </Box>
  );
};

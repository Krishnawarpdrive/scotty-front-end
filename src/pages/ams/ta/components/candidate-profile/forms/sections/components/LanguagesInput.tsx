
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { Plus, X } from 'lucide-react';

interface LanguagesInputProps {
  languages: string[];
  onAddLanguage: (language: string) => void;
  onRemoveLanguage: (index: number) => void;
}

export const LanguagesInput: React.FC<LanguagesInputProps> = ({
  languages,
  onAddLanguage,
  onRemoveLanguage
}) => {
  const [newLanguage, setNewLanguage] = useState('');

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      onAddLanguage(newLanguage.trim());
      setNewLanguage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddLanguage();
    }
  };

  return (
    <Box>
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
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddLanguage}
          size="small"
          sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {languages.map((language, index) => (
          <Chip
            key={index}
            label={language}
            onDelete={() => onRemoveLanguage(index)}
            deleteIcon={<X className="h-3 w-3" />}
            sx={{ bgcolor: '#f0fdf4', color: '#16a34a' }}
          />
        ))}
      </Box>
    </Box>
  );
};

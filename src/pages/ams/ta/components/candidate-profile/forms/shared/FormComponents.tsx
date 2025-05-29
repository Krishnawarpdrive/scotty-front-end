import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton
} from '@mui/material';
import { ExpandMore, Add, Close } from '@mui/icons-material';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  defaultExpanded = false
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

interface FormGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
}

export const FormGrid: React.FC<FormGridProps> = ({
  children,
  columns = 1,
  gap = 2
}) => {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap
    }}>
      {children}
    </Box>
  );
};

export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  gridColumn?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 1,
  disabled = false,
  gridColumn
}) => {
  return (
    <Box sx={{ gridColumn }}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        disabled={disabled}
        fullWidth
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export interface TagInputProps {
  title: string;
  tags: string[];
  placeholder: string;
  chipColor?: {
    bgcolor: string;
    color: string;
  };
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  title,
  tags,
  placeholder,
  chipColor = { bgcolor: '#e3f2fd', color: '#1976d2' },
  onAddTag,
  onRemoveTag
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          size="small"
          fullWidth
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddTag}
          color="primary"
          size="small"
          disabled={!inputValue.trim()}
        >
          <Add />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => onRemoveTag(index)}
            deleteIcon={<Close />}
            sx={{
              bgcolor: chipColor.bgcolor,
              color: chipColor.color,
              '& .MuiChip-deleteIcon': {
                color: chipColor.color
              }
            }}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

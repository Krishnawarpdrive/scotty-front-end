
import React from 'react';
import { Box, Typography, Chip, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';
import { Plus, X, ChevronDown } from 'lucide-react';

// Shared Input Components
export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 1,
  fullWidth = true
}) => (
  <DesignSystemTextField
    fullWidth={fullWidth}
    label={label}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    multiline={multiline}
    rows={multiline ? rows : undefined}
  />
);

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  fullWidth = true
}) => (
  <DesignSystemSelect
    fullWidth={fullWidth}
    label={label}
    value={value}
    onChange={onChange}
    options={options}
  />
);

// Tag Input Component
export interface TagInputProps {
  title: string;
  tags: string[];
  placeholder: string;
  chipColor: { bgcolor: string; color: string };
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  title,
  tags,
  placeholder,
  chipColor,
  onAddTag,
  onRemoveTag
}) => {
  const [newTag, setNewTag] = React.useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
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
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddTag}
          size="small"
          sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => onRemoveTag(index)}
            deleteIcon={<X className="h-3 w-3" />}
            sx={chipColor}
          />
        ))}
      </Box>
    </Box>
  );
};

// Form Section Component
export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  defaultExpanded = true
}) => (
  <Accordion 
    defaultExpanded={defaultExpanded}
    sx={{
      mb: 2,
      borderRadius: '8px',
      '&:before': { display: 'none' },
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}
  >
    <AccordionSummary
      expandIcon={<ChevronDown className="h-4 w-4" />}
      sx={{
        backgroundColor: '#f8fafc',
        borderRadius: '8px 8px 0 0',
        minHeight: '48px',
        '&.Mui-expanded': {
          minHeight: '48px',
        },
      }}
    >
      <Typography variant="subtitle1" sx={{ 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#111827'
      }}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ p: 3 }}>
      {children}
    </AccordionDetails>
  </Accordion>
);

// Grid Layout Components
export interface FormGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
}

export const FormGrid: React.FC<FormGridProps> = ({
  children,
  columns = 2,
  gap = 2
}) => (
  <Box sx={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(${columns}, 1fr)`, 
    gap 
  }}>
    {children}
  </Box>
);

export const FormRow: React.FC<FormGridProps> = ({
  children,
  gap = 2
}) => (
  <Box sx={{ 
    display: 'flex', 
    gap,
    flexWrap: 'wrap',
    '& > *': {
      flex: 1,
      minWidth: '250px'
    }
  }}>
    {children}
  </Box>
);

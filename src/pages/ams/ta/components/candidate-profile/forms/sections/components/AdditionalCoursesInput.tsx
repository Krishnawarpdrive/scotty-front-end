
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { Plus, X } from 'lucide-react';

interface AdditionalCoursesInputProps {
  courses: string[];
  onAddCourse: (course: string) => void;
  onRemoveCourse: (index: number) => void;
}

export const AdditionalCoursesInput: React.FC<AdditionalCoursesInputProps> = ({
  courses,
  onAddCourse,
  onRemoveCourse
}) => {
  const [newCourse, setNewCourse] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      onAddCourse(newCourse.trim());
      setNewCourse('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCourse();
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
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
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddCourse}
          size="small"
          sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {courses.map((course, index) => (
          <Chip
            key={index}
            label={course}
            onDelete={() => onRemoveCourse(index)}
            deleteIcon={<X className="h-3 w-3" />}
            sx={{ bgcolor: '#e1f5fe', color: '#0277bd' }}
          />
        ))}
      </Box>
    </Box>
  );
};

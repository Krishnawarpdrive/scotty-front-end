
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { Plus, X } from 'lucide-react';

interface CertificationsInputProps {
  certifications: string[];
  onAddCertification: (certification: string) => void;
  onRemoveCertification: (index: number) => void;
}

export const CertificationsInput: React.FC<CertificationsInputProps> = ({
  certifications,
  onAddCertification,
  onRemoveCertification
}) => {
  const [newCertification, setNewCertification] = useState('');

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      onAddCertification(newCertification.trim());
      setNewCertification('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCertification();
    }
  };

  return (
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
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          onClick={handleAddCertification}
          size="small"
          sx={{ bgcolor: '#009933', color: 'white', '&:hover': { bgcolor: '#00a341' } }}
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {certifications.map((cert, index) => (
          <Chip
            key={index}
            label={cert}
            onDelete={() => onRemoveCertification(index)}
            deleteIcon={<X className="h-3 w-3" />}
            sx={{ bgcolor: '#dcfce7', color: '#16a34a' }}
          />
        ))}
      </Box>
    </Box>
  );
};

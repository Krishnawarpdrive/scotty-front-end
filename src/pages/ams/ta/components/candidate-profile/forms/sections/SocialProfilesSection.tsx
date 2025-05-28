
import React from 'react';
import { Box, Typography, Grid2 as Grid, InputAdornment } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { Linkedin, Github, Globe, Twitter } from 'lucide-react';

interface SocialProfilesSectionProps {
  formData: {
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    twitterUrl: string;
    otherProfiles: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

export const SocialProfilesSection: React.FC<SocialProfilesSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#111827'
      }}>
        Social Profiles & Portfolio
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="LinkedIn Profile"
            value={formData.linkedinUrl}
            onChange={(e) => onFieldChange('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="GitHub Profile"
            value={formData.githubUrl}
            onChange={(e) => onFieldChange('githubUrl', e.target.value)}
            placeholder="https://github.com/..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Github className="h-4 w-4 text-gray-700" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Portfolio/Website"
            value={formData.portfolioUrl}
            onChange={(e) => onFieldChange('portfolioUrl', e.target.value)}
            placeholder="https://yourportfolio.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Globe className="h-4 w-4 text-green-600" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Twitter Profile"
            value={formData.twitterUrl}
            onChange={(e) => onFieldChange('twitterUrl', e.target.value)}
            placeholder="https://twitter.com/..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Twitter className="h-4 w-4 text-blue-400" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Other Professional Profiles"
            value={formData.otherProfiles}
            onChange={(e) => onFieldChange('otherProfiles', e.target.value)}
            multiline
            rows={2}
            placeholder="List any other relevant professional profiles or certifications..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

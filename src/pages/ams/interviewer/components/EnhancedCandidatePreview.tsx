
import React, { useState } from 'react';
import { Box, Typography, Avatar, Chip, Card, CardContent, Tabs, Tab, IconButton, Collapse } from '@mui/material';
import { Person, Email, Phone, Work, School, Star, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Interview } from '../MyInterviewsPage';

interface CandidateSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years: number;
}

interface CandidateExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface CandidateEducation {
  institution: string;
  degree: string;
  year: string;
}

interface EnhancedCandidatePreviewProps {
  interview: Interview;
  compact?: boolean;
}

export const EnhancedCandidatePreview: React.FC<EnhancedCandidatePreviewProps> = ({
  interview,
  compact = false
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contact: true,
    skills: true,
    experience: false,
    education: false
  });

  // Mock data - in real app, this would come from props or API
  const candidateData = {
    skills: [
      { name: 'React', level: 'Expert' as const, years: 5 },
      { name: 'TypeScript', level: 'Advanced' as const, years: 3 },
      { name: 'Node.js', level: 'Intermediate' as const, years: 2 },
      { name: 'AWS', level: 'Intermediate' as const, years: 2 }
    ],
    experience: [
      {
        company: 'TechCorp',
        role: 'Senior Developer',
        duration: '2021 - Present',
        description: 'Led frontend development team, implemented new architecture'
      },
      {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        duration: '2019 - 2021',
        description: 'Built scalable web applications using React and Node.js'
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'B.S. Computer Science',
        year: '2019'
      }
    ],
    rating: 4.2,
    matchScore: 85
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return '#2e7d32';
      case 'Advanced': return '#1976d2';
      case 'Intermediate': return '#f57c00';
      case 'Beginner': return '#666';
      default: return '#666';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (compact) {
    return (
      <Card sx={{ maxWidth: 300 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: '#1976d2' }}>
              {getInitials(interview.candidateName)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {interview.candidateName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Match: {candidateData.matchScore}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: '#ffd700' }} />
              <Typography variant="caption">{candidateData.rating}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {candidateData.skills.slice(0, 3).map((skill, index) => (
              <Chip 
                key={index}
                label={skill.name}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {candidateData.skills.length > 3 && (
              <Chip 
                label={`+${candidateData.skills.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Candidate Preview
      </Typography>

      {/* Header */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2' }}>
              {getInitials(interview.candidateName)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {interview.candidateName}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip 
                  label={`${candidateData.matchScore}% Match`}
                  sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ fontSize: 18, color: '#ffd700' }} />
                  <Typography variant="body2">{candidateData.rating}/5.0</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Applying for: {interview.roleName} at {interview.clientName}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Overview" />
        <Tab label="Skills" />
        <Tab label="Experience" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box sx={{ space: 2 }}>
          {/* Contact Info */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight="bold">Contact Information</Typography>
                <IconButton 
                  size="small"
                  onClick={() => toggleSection('contact')}
                >
                  {expandedSections.contact ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              
              <Collapse in={expandedSections.contact}>
                <Box sx={{ mt: 2, space: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{interview.candidateEmail}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">+1 (555) 123-4567</Typography>
                  </Box>
                </Box>
              </Collapse>
            </CardContent>
          </Card>

          {/* Quick Skills */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight="bold">Key Skills</Typography>
                <IconButton 
                  size="small"
                  onClick={() => toggleSection('skills')}
                >
                  {expandedSections.skills ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              
              <Collapse in={expandedSections.skills}>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {candidateData.skills.map((skill, index) => (
                    <Chip 
                      key={index}
                      label={`${skill.name} (${skill.years}y)`}
                      size="small"
                      sx={{ 
                        bgcolor: getSkillLevelColor(skill.level),
                        color: 'white'
                      }}
                    />
                  ))}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Technical Skills
            </Typography>
            {candidateData.skills.map((skill, index) => (
              <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < candidateData.skills.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="medium">{skill.name}</Typography>
                  <Chip 
                    label={skill.level}
                    size="small"
                    sx={{ 
                      bgcolor: getSkillLevelColor(skill.level),
                      color: 'white'
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {skill.years} years experience
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Box sx={{ space: 2 }}>
          {candidateData.experience.map((exp, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Work sx={{ color: 'text.secondary', mt: 0.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{exp.role}</Typography>
                    <Typography variant="body2" color="primary" sx={{ mb: 1 }}>{exp.company}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      {exp.duration}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

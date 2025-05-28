
import React from 'react';
import { Box, Typography, Chip, Avatar, LinearProgress } from '@mui/material';
import { Phone, Mail, MapPin, Calendar, Clock, Star } from 'lucide-react';
import { Candidate } from '../../../types/CandidateTypes';

interface EnhancedCandidateHeaderProps {
  candidate: Candidate;
  currentStage?: string;
  progress?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const EnhancedCandidateHeader: React.FC<EnhancedCandidateHeaderProps> = ({
  candidate,
  currentStage = 'Phone Screening',
  progress = 30,
  collapsed = false,
  onToggleCollapse
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'screening': return { color: '#0ea5e9', bgcolor: '#e0f2fe' };
      case 'interview': return { color: '#f59e0b', bgcolor: '#fef3c7' };
      case 'approved': return { color: '#10b981', bgcolor: '#ecfdf5' };
      case 'rejected': return { color: '#ef4444', bgcolor: '#fef2f2' };
      default: return { color: '#6b7280', bgcolor: '#f3f4f6' };
    }
  };

  const statusColor = getStatusColor(candidate.status.type);

  if (collapsed) {
    return (
      <Box sx={{ 
        p: 2, 
        bgcolor: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0',
        mb: 2,
        cursor: 'pointer'
      }}
      onClick={onToggleCollapse}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#009933' }}>
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              {candidate.name}
            </Typography>
            <Chip
              label={candidate.status.text}
              sx={{
                ...statusColor,
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase'
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Click to expand
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#f8fafc', 
      borderRadius: '8px', 
      border: '1px solid #e2e8f0',
      mb: 3
    }}>
      {/* Header Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#009933', fontSize: '24px' }}>
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ 
              fontFamily: 'Rubik, sans-serif', 
              fontWeight: 600,
              fontSize: '24px',
              color: '#111827',
              mb: 1
            }}>
              {candidate.name}
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280',
              fontFamily: 'Rubik, sans-serif',
              fontSize: '16px',
              fontWeight: 400
            }}>
              {candidate.role}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={candidate.status.text}
            sx={{
              ...statusColor,
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase'
            }}
          />
          {candidate.score && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star className="h-4 w-4 text-amber-500" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {candidate.score}/100
              </Typography>
            </Box>
          )}
          {onToggleCollapse && (
            <Typography 
              variant="body2" 
              sx={{ color: '#6b7280', cursor: 'pointer' }}
              onClick={onToggleCollapse}
            >
              Collapse
            </Typography>
          )}
        </Box>
      </Box>

      {/* Contact Information */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Mail className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            {candidate.email}
          </Typography>
        </Box>

        {candidate.phone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone className="h-4 w-4 text-gray-500" />
            <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
              {candidate.phone}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapPin className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            {candidate.location}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Calendar className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            Applied: {candidate.appliedDate}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Clock className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            Experience: {candidate.experience}
          </Typography>
        </Box>
      </Box>

      {/* Progress Section */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
            Current Stage: {currentStage}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {progress}% Complete
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#e5e7eb',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#009933',
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Skills Section */}
      {candidate.skills && candidate.skills.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ 
            mb: 1, 
            fontFamily: 'Rubik, sans-serif', 
            fontWeight: 500,
            color: '#374151'
          }}>
            Key Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {candidate.skills.slice(0, 6).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                sx={{ 
                  bgcolor: '#e0f2fe', 
                  color: '#0277bd',
                  fontSize: '11px'
                }}
              />
            ))}
            {candidate.skills.length > 6 && (
              <Chip
                label={`+${candidate.skills.length - 6} more`}
                size="small"
                sx={{ 
                  bgcolor: '#f3f4f6', 
                  color: '#6b7280',
                  fontSize: '11px'
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

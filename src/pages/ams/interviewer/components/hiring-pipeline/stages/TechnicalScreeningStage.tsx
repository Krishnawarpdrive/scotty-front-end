
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { Video, Calendar, Clock, MessageSquare, FileText, Star } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';
import { InterviewDetailsForm } from '../../forms/InterviewDetailsForm';
import { InterviewFeedbackForm } from '../../forms/InterviewFeedbackForm';
import { InterviewNotesForm } from '../../forms/InterviewNotesForm';

interface TechnicalScreeningStageProps {
  interview: Interview;
}

export const TechnicalScreeningStage: React.FC<TechnicalScreeningStageProps> = ({
  interview
}) => {
  const [activeSection, setActiveSection] = useState('details');

  const renderSection = () => {
    switch (activeSection) {
      case 'details':
        return <InterviewDetailsForm interview={interview} />;
      case 'feedback':
        return <InterviewFeedbackForm interview={interview} />;
      case 'notes':
        return <InterviewNotesForm interview={interview} />;
      default:
        return <InterviewDetailsForm interview={interview} />;
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      {/* Stage Header */}
      <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Technical Screening Interview
            </Typography>
            <Chip 
              label="In Progress" 
              color="primary" 
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Calendar className="h-4 w-4 text-gray-600" />
              <Typography variant="body2" color="text.secondary">
                {interview.scheduledDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock className="h-4 w-4 text-gray-600" />
              <Typography variant="body2" color="text.secondary">
                {interview.duration} minutes
              </Typography>
            </Box>
          </Box>

          {/* Join Interview Button */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Video />}
              sx={{
                bgcolor: '#2e7d32',
                '&:hover': { bgcolor: '#1b5e20' },
                borderRadius: 2,
                px: 3
              }}
            >
              Join Interview Now
            </Button>
            <Button
              variant="outlined"
              startIcon={<MessageSquare />}
              sx={{ borderRadius: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1, borderBottom: '1px solid #e0e0e0' }}>
          {[
            { id: 'details', label: 'Interview Details', icon: FileText },
            { id: 'feedback', label: 'Feedback Form', icon: Star },
            { id: 'notes', label: 'Notes & Comments', icon: MessageSquare }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                sx={{
                  minHeight: '42px',
                  textTransform: 'none',
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '14px',
                  fontWeight: activeSection === tab.id ? 600 : 500,
                  color: activeSection === tab.id ? '#1976d2' : '#666',
                  borderBottom: activeSection === tab.id ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  px: 2
                }}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Content Area */}
      <Box>
        {renderSection()}
      </Box>
    </Box>
  );
};


import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Grid2 as Grid,
  Chip
} from '@mui/material';
import { 
  Search, 
  CloudUpload, 
  Schedule, 
  Assignment,
  VideoCall,
  Description,
  Edit,
  Refresh
} from '@mui/icons-material';

interface CandidateContextualActionsProps {
  dashboardData: any;
  candidateId: string;
}

export const CandidateContextualActions: React.FC<CandidateContextualActionsProps> = ({ 
  dashboardData,
  candidateId 
}) => {
  const getContextualActions = () => {
    const actions = [];

    // Always available actions
    actions.push({
      title: 'Search New Opportunities',
      description: 'Find roles that match your profile',
      icon: <Search />,
      color: '#2563eb',
      priority: 'high',
      action: () => console.log('Search jobs')
    });

    // Profile completion actions
    if ((dashboardData?.profile_completion_percentage || 0) < 80) {
      actions.push({
        title: 'Complete Your Profile',
        description: 'Boost visibility by completing your profile',
        icon: <Edit />,
        color: '#dc2626',
        priority: 'high',
        urgency: true,
        action: () => console.log('Complete profile')
      });
    }

    // Document upload actions
    if ((dashboardData?.documents_uploaded || 0) < 3) {
      actions.push({
        title: 'Upload Required Documents',
        description: 'Upload resume, certificates, and ID proof',
        icon: <CloudUpload />,
        color: '#ea580c',
        priority: 'high',
        action: () => console.log('Upload documents')
      });
    }

    // Interview actions
    if ((dashboardData?.interviews_scheduled || 0) > 0) {
      actions.push({
        title: 'Join Upcoming Interview',
        description: 'Your next interview is in 2 hours',
        icon: <VideoCall />,
        color: '#16a34a',
        priority: 'urgent',
        urgency: true,
        action: () => console.log('Join interview')
      });
    }

    // Assessment actions
    if ((dashboardData?.pending_assessments || 0) > 0) {
      actions.push({
        title: 'Complete Pending Assessment',
        description: `${dashboardData.pending_assessments} assessment(s) waiting`,
        icon: <Assignment />,
        color: '#9333ea',
        priority: 'medium',
        action: () => console.log('Take assessment')
      });
    }

    // Schedule availability
    actions.push({
      title: 'Update Availability',
      description: 'Set your interview preferences and schedule',
      icon: <Schedule />,
      color: '#0284c7',
      priority: 'medium',
      action: () => console.log('Update availability')
    });

    return actions.slice(0, 6); // Limit to 6 actions
  };

  const actions = getContextualActions();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recommended Actions
          </Typography>
          <Button size="small" startIcon={<Refresh />}>
            Refresh
          </Button>
        </Box>

        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: action.urgency ? `2px solid ${action.color}` : '1px solid #e2e8f0',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderColor: action.color
                  }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box 
                      sx={{ 
                        backgroundColor: `${action.color}20`, 
                        borderRadius: 2, 
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {React.cloneElement(action.icon, { 
                        sx: { color: action.color, fontSize: 20 } 
                      })}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '14px' }}>
                          {action.title}
                        </Typography>
                        {action.urgency && (
                          <Chip 
                            label="Urgent" 
                            size="small" 
                            color="error" 
                            sx={{ height: 16, fontSize: '10px' }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
                        {action.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

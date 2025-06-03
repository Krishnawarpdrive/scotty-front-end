
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Button,
  Box
} from '@mui/material';
import { 
  Search, 
  CloudUpload, 
  Schedule, 
  Assignment,
  Message,
  Settings
} from '@mui/icons-material';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Search Jobs',
      icon: <Search />,
      color: '#1976d2',
      onClick: () => console.log('Search jobs')
    },
    {
      label: 'Upload Documents',
      icon: <CloudUpload />,
      color: '#ed6c02',
      onClick: () => console.log('Upload documents')
    },
    {
      label: 'Schedule Interview',
      icon: <Schedule />,
      color: '#2e7d32',
      onClick: () => console.log('Schedule interview')
    },
    {
      label: 'Take Assessment',
      icon: <Assignment />,
      color: '#9c27b0',
      onClick: () => console.log('Take assessment')
    },
    {
      label: 'Messages',
      icon: <Message />,
      color: '#d32f2f',
      onClick: () => console.log('View messages')
    },
    {
      label: 'Settings',
      icon: <Settings />,
      color: '#0288d1',
      onClick: () => console.log('Open settings')
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderColor: action.color,
                  color: action.color,
                  '&:hover': {
                    borderColor: action.color,
                    backgroundColor: `${action.color}10`
                  }
                }}
                onClick={action.onClick}
              >
                {React.cloneElement(action.icon, { sx: { fontSize: 24 } })}
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  {action.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, AccountCircle } from '@mui/icons-material';

interface ProfileCompletionWidgetProps {
  completionPercentage: number;
}

export const ProfileCompletionWidget: React.FC<ProfileCompletionWidgetProps> = ({ 
  completionPercentage 
}) => {
  const completionItems = [
    { label: 'Basic Information', completed: completionPercentage > 20 },
    { label: 'Work Experience', completed: completionPercentage > 40 },
    { label: 'Education Details', completed: completionPercentage > 60 },
    { label: 'Skills & Certifications', completed: completionPercentage > 80 },
    { label: 'Documents Upload', completed: completionPercentage === 100 }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return 'error';
    if (percentage < 70) return 'warning';
    return 'success';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AccountCircle color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Profile Completion
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={completionPercentage}
              size={80}
              thickness={4}
              color={getProgressColor(completionPercentage)}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" component="div" color="text.secondary">
                {completionPercentage}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <List sx={{ p: 0, mb: 2 }}>
          {completionItems.map((item, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                {item.completed ? (
                  <CheckCircle color="success" sx={{ fontSize: 20 }} />
                ) : (
                  <RadioButtonUnchecked color="disabled" sx={{ fontSize: 20 }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'text.secondary' : 'text.primary'
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 1 }}
          disabled={completionPercentage === 100}
        >
          {completionPercentage === 100 ? 'Profile Complete' : 'Complete Profile'}
        </Button>
      </CardContent>
    </Card>
  );
};

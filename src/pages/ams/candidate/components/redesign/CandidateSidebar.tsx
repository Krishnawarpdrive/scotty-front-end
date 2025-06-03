
import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  CircularProgress,
  LinearProgress,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Dashboard, 
  Work, 
  Schedule, 
  Assignment, 
  Description,
  Message,
  Settings,
  AccountCircle,
  TrendingUp,
  CheckCircle
} from '@mui/icons-material';

interface CandidateSidebarProps {
  open: boolean;
  onClose: () => void;
  dashboardData: any;
  isLoading: boolean;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({ 
  open, 
  onClose, 
  dashboardData,
  isLoading 
}) => {
  const menuItems = [
    { label: 'Dashboard', icon: <Dashboard />, active: true },
    { label: 'Applications', icon: <Work />, count: dashboardData?.total_applications || 0 },
    { label: 'Interviews', icon: <Schedule />, count: dashboardData?.interviews_scheduled || 0 },
    { label: 'Assessments', icon: <Assignment />, count: dashboardData?.pending_assessments || 0 },
    { label: 'Documents', icon: <Description />, count: dashboardData?.documents_uploaded || 0 },
    { label: 'Messages', icon: <Message /> },
    { label: 'Settings', icon: <Settings /> }
  ];

  const getCompletionColor = (percentage: number) => {
    if (percentage < 30) return 'error';
    if (percentage < 70) return 'warning';
    return 'success';
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 48, height: 48, mr: 2, bgcolor: 'primary.main' }}>
            <AccountCircle />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer
            </Typography>
          </Box>
        </Box>

        {/* Profile Completion Widget */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Profile Completion
            </Typography>
            <Typography variant="body2" color="primary">
              {dashboardData?.profile_completion_percentage || 0}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={dashboardData?.profile_completion_percentage || 0}
            color={getCompletionColor(dashboardData?.profile_completion_percentage || 0)}
            sx={{ mb: 1, height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" color="text.secondary">
            Complete your profile to increase visibility
          </Typography>
        </Box>

        {/* Navigation Menu */}
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem 
              key={index}
              sx={{ 
                borderRadius: 2, 
                mb: 0.5,
                backgroundColor: item.active ? 'primary.main' : 'transparent',
                color: item.active ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: item.active ? 'primary.main' : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ color: item.active ? 'white' : 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{ fontSize: '14px', fontWeight: item.active ? 600 : 400 }}
              />
              {item.count !== undefined && (
                <Chip 
                  label={item.count} 
                  size="small" 
                  color={item.active ? 'default' : 'primary'}
                  sx={{ 
                    minWidth: 24, 
                    height: 20, 
                    fontSize: '12px',
                    backgroundColor: item.active ? 'rgba(255,255,255,0.2)' : undefined
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Quick Stats */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Stats
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb' }}>
                {dashboardData?.active_applications || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Active
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#16a34a' }}>
                {dashboardData?.interviews_completed || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Completed
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

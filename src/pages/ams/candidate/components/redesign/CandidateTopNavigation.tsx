
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  IconButton, 
  Badge, 
  Avatar,
  Menu,
  MenuItem,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications, 
  Search,
  AccountCircle,
  KeyboardArrowDown,
  Schedule,
  Assignment
} from '@mui/icons-material';

interface CandidateTopNavigationProps {
  onMenuClick: () => void;
  notifications: any[];
  dashboardData: any;
  isLoading: boolean;
}

export const CandidateTopNavigation: React.FC<CandidateTopNavigationProps> = ({ 
  onMenuClick, 
  notifications,
  dashboardData,
  isLoading 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const unreadNotifications = notifications?.filter(n => !n.is_read).length || 0;
  const upcomingInterviews = dashboardData?.interviews_scheduled || 0;
  const pendingTasks = dashboardData?.pending_assessments || 0;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: '#ffffff', 
        color: '#1e293b',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page Title */}
        <Typography variant="h6" sx={{ fontWeight: 600, mr: 4 }}>
          Candidate Dashboard
        </Typography>

        {/* Quick Info Chips */}
        <Box sx={{ display: 'flex', gap: 2, mr: 'auto' }}>
          {upcomingInterviews > 0 && (
            <Chip
              icon={<Schedule />}
              label={`${upcomingInterviews} interviews`}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          {pendingTasks > 0 && (
            <Chip
              icon={<Assignment />}
              label={`${pendingTasks} pending`}
              color="warning"
              variant="outlined"
              size="small"
            />
          )}
        </Box>

        {/* Search Bar */}
        <TextField
          placeholder="Search applications, interviews..."
          size="small"
          sx={{ 
            width: 300, 
            mr: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f8fafc'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Notifications */}
        <IconButton 
          color="inherit" 
          onClick={handleNotificationClick}
          sx={{ mr: 1 }}
        >
          <Badge badgeContent={unreadNotifications} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* Profile Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleProfileClick}>
          <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
            <AccountCircle />
          </Avatar>
          <Typography variant="body2" sx={{ mr: 1 }}>
            John Doe
          </Typography>
          <KeyboardArrowDown />
        </Box>

        {/* Profile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* Notifications Dropdown */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
        >
          {notifications?.slice(0, 5).map((notification, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          )) || (
            <MenuItem onClick={handleClose}>
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

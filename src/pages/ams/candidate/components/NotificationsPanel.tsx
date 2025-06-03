
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Badge,
  Box,
  Button,
  Chip
} from '@mui/material';
import { 
  Notifications, 
  Info, 
  Warning, 
  Error, 
  CheckCircle 
} from '@mui/icons-material';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      default: return <Info color="info" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            )}
          </Box>
          <Button size="small" variant="outlined">
            View All
          </Button>
        </Box>

        {notifications.length === 0 ? (
          <Typography color="text.secondary">No notifications.</Typography>
        ) : (
          <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
            {notifications.slice(0, 5).map((notification) => (
              <ListItem 
                key={notification.id} 
                sx={{ 
                  px: 0, 
                  backgroundColor: notification.is_read ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {notification.title}
                      </Typography>
                      <Chip 
                        label={notification.priority} 
                        color={getPriorityColor(notification.priority)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notification.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

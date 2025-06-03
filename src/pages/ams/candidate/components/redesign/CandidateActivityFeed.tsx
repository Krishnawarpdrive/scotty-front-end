
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
  Divider
} from '@mui/material';
import { 
  Work, 
  Schedule, 
  Assignment, 
  Message,
  CheckCircle,
  Info,
  Warning,
  Error
} from '@mui/icons-material';

interface CandidateActivityFeedProps {
  notifications: any[];
  messages: any[];
  isLoading: boolean;
}

export const CandidateActivityFeed: React.FC<CandidateActivityFeedProps> = ({ 
  notifications, 
  messages, 
  isLoading 
}) => {
  // Combine and sort notifications and messages by date
  const combinedActivity = [
    ...(notifications || []).map(n => ({ ...n, type: 'notification' })),
    ...(messages || []).map(m => ({ ...m, type: 'message' }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
   .slice(0, 10); // Show latest 10 items

  const getActivityIcon = (item: any) => {
    if (item.type === 'message') {
      return <Message />;
    }
    
    switch (item.type?.toLowerCase()) {
      case 'interview': return <Schedule />;
      case 'application': return <Work />;
      case 'assessment': return <Assignment />;
      case 'success': return <CheckCircle />;
      case 'warning': return <Warning />;
      case 'error': return <Error />;
      default: return <Info />;
    }
  };

  const getActivityColor = (item: any) => {
    if (item.type === 'message') {
      return '#2563eb';
    }
    
    switch (item.priority?.toLowerCase() || item.message_type?.toLowerCase()) {
      case 'high':
      case 'urgent':
      case 'error': return '#dc2626';
      case 'medium':
      case 'important':
      case 'warning': return '#ea580c';
      case 'low':
      case 'info':
      case 'success': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (isLoading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Activity
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ backgroundColor: '#f1f5f9', width: 40, height: 40, borderRadius: '50%' }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ backgroundColor: '#f1f5f9', height: 16, borderRadius: 1, mb: 1 }} />
                  <Box sx={{ backgroundColor: '#f1f5f9', height: 12, borderRadius: 1, width: '70%' }} />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', maxHeight: 600, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Button size="small" variant="outlined">
            View All
          </Button>
        </Box>
      </CardContent>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {combinedActivity.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No recent activity
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {combinedActivity.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <ListItem sx={{ px: 2, py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${getActivityColor(item)}20`,
                        color: getActivityColor(item),
                        width: 36,
                        height: 36
                      }}
                    >
                      {getActivityIcon(item)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '13px' }}>
                          {item.title || item.subject}
                        </Typography>
                        {!item.is_read && (
                          <Box 
                            sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              bgcolor: 'primary.main' 
                            }} 
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5 }}>
                          {item.message || item.message_body}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatTimeAgo(item.created_at)}
                          </Typography>
                          {(item.priority || item.message_type) && (
                            <Chip 
                              label={item.priority || item.message_type} 
                              size="small"
                              sx={{ 
                                height: 16, 
                                fontSize: '10px',
                                backgroundColor: `${getActivityColor(item)}20`,
                                color: getActivityColor(item)
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < combinedActivity.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Card>
  );
};

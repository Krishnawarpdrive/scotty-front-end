
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  Chip
} from '@mui/material';
import { Message, Person, Support } from '@mui/icons-material';

interface Message {
  id: string;
  sender_name: string;
  sender_role: string;
  subject: string;
  message_body: string;
  is_read: boolean;
  message_type: string;
  created_at: string;
}

interface MessagesPanelProps {
  messages: Message[];
}

export const MessagesPanel: React.FC<MessagesPanelProps> = ({ messages }) => {
  const getSenderIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'hr': return <Person />;
      case 'ta': return <Person />;
      case 'system': return <Support />;
      default: return <Message />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'urgent': return 'error';
      case 'important': return 'warning';
      case 'update': return 'info';
      default: return 'default';
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Messages
            </Typography>
            {unreadCount > 0 && (
              <Chip label={`${unreadCount} unread`} color="primary" size="small" />
            )}
          </Box>
          <Button size="small" variant="outlined">
            Inbox
          </Button>
        </Box>

        {messages.length === 0 ? (
          <Typography color="text.secondary">No messages.</Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {messages.slice(0, 3).map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  px: 0, 
                  backgroundColor: message.is_read ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getSenderIcon(message.sender_role)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {message.subject}
                      </Typography>
                      <Chip 
                        label={message.message_type} 
                        color={getMessageTypeColor(message.message_type)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        From: {message.sender_name} ({message.sender_role})
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 0.5 }}>
                        {message.message_body}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.created_at).toLocaleString()}
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

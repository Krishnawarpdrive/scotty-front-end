
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Box,
  Button,
  Divider
} from '@mui/material';
import { VideoCall, Schedule, LocationOn } from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';

interface Interview {
  id: string;
  interview_type: string;
  scheduled_date: string;
  duration_minutes: number;
  status: string;
  location?: string;
  meeting_link?: string;
  requirement_name?: string;
}

interface InterviewsScheduleProps {
  candidateId: string;
}

export const InterviewsSchedule: React.FC<InterviewsScheduleProps> = ({ candidateId }) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const { data, error } = await supabase
          .from('interview_schedules')
          .select(`
            id,
            interview_type,
            scheduled_date,
            duration_minutes,
            status,
            location,
            meeting_link,
            requirement_id,
            requirements(name)
          `)
          .eq('candidate_id', candidateId)
          .gte('scheduled_date', new Date().toISOString())
          .order('scheduled_date', { ascending: true })
          .limit(5);

        if (error) {
          console.error('Error fetching interviews:', error);
          return;
        }

        const formattedInterviews = (data || []).map((interview: any) => ({
          id: interview.id,
          interview_type: interview.interview_type,
          scheduled_date: interview.scheduled_date,
          duration_minutes: interview.duration_minutes,
          status: interview.status,
          location: interview.location,
          meeting_link: interview.meeting_link,
          requirement_name: interview.requirements?.name
        }));

        setInterviews(formattedInterviews);
      } catch (error) {
        console.error('Error in fetchInterviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [candidateId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'primary';
      case 'confirmed': return 'success';
      case 'rescheduled': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Interviews
          </Typography>
          <Button size="small" variant="outlined">
            Calendar
          </Button>
        </Box>

        {loading ? (
          <Typography>Loading interviews...</Typography>
        ) : interviews.length === 0 ? (
          <Typography color="text.secondary">No upcoming interviews.</Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {interviews.map((interview, index) => (
              <React.Fragment key={interview.id}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {interview.interview_type}
                        </Typography>
                        <Chip 
                          label={interview.status} 
                          color={getStatusColor(interview.status)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(interview.scheduled_date).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {interview.duration_minutes} minutes
                        </Typography>
                        {interview.requirement_name && (
                          <Typography variant="body2" color="text.secondary">
                            Role: {interview.requirement_name}
                          </Typography>
                        )}
                        {interview.meeting_link && (
                          <Button 
                            size="small" 
                            startIcon={<VideoCall />}
                            href={interview.meeting_link}
                            target="_blank"
                            sx={{ mt: 1 }}
                          >
                            Join Meeting
                          </Button>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < interviews.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

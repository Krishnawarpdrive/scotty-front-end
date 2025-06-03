import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MapPin, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InterviewScheduleProps {
  panelistId?: string;
}

interface ScheduledInterview {
  id: string;
  candidate_id: string;
  scheduled_date: string;
  duration_minutes: number;
  interview_type: string;
  status: string;
  meeting_link?: string;
  location?: string;
  notes?: string;
  candidate?: {
    name: string;
    email: string;
  } | null;
}

export const InterviewSchedule: React.FC<InterviewScheduleProps> = ({ panelistId }) => {
  const [interviews, setInterviews] = useState<ScheduledInterview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (panelistId) {
      fetchScheduledInterviews();
    }
  }, [panelistId]);

  const fetchScheduledInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from('interview_schedules')
        .select(`
          *,
          candidate:candidates(name, email)
        `)
        .eq('panelist_id', panelistId)
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true });

      if (error) {
        console.error('Error fetching interviews:', error);
      } else if (data) {
        // Transform the data to match our interface
        const transformedInterviews: ScheduledInterview[] = data.map(interview => ({
          id: interview.id,
          candidate_id: interview.candidate_id,
          scheduled_date: interview.scheduled_date,
          duration_minutes: interview.duration_minutes,
          interview_type: interview.interview_type,
          status: interview.status,
          meeting_link: interview.meeting_link || undefined,
          location: interview.location || undefined,
          notes: interview.notes || undefined,
          candidate: interview.candidate && 
                     typeof interview.candidate === 'object' && 
                     interview.candidate !== null &&
                     'name' in interview.candidate 
            ? {
                name: interview.candidate.name || 'Unknown Candidate',
                email: interview.candidate.email || ''
              } 
            : null
        }));
        setInterviews(transformedInterviews);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading schedule...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Interview Schedule</h2>
        <Badge variant="outline">{interviews.length} upcoming</Badge>
      </div>

      <div className="grid gap-4">
        {interviews.map((interview) => (
          <Card key={interview.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">
                      {interview.candidate?.name || 'Unknown Candidate'}
                    </span>
                    <Badge variant="outline" className={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(interview.scheduled_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(interview.scheduled_date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} ({interview.duration_minutes} min)
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="outline">{interview.interview_type}</Badge>
                    
                    {interview.meeting_link && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Video className="h-4 w-4" />
                        <span>Video Call</span>
                      </div>
                    )}

                    {interview.location && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{interview.location}</span>
                      </div>
                    )}
                  </div>

                  {interview.notes && (
                    <p className="text-sm text-gray-600 mt-2">{interview.notes}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {interview.meeting_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer">
                        Join Meeting
                      </a>
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {interviews.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Interviews</h3>
              <p className="text-gray-500">Your interview schedule is clear.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

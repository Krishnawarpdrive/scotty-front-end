
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MapPin, User } from 'lucide-react';
import { ScheduledInterview } from '../types/ScheduleTypes';
import { getStatusColor, formatInterviewDate, formatInterviewTime } from '../utils/scheduleUtils';

interface InterviewCardProps {
  interview: ScheduledInterview;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  const candidateName = interview.candidate?.name || 'Unknown Candidate';
  const candidateEmail = interview.candidate?.email || '';

  return (
    <Card key={interview.id}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <span className="font-semibold">{candidateName}</span>
              <Badge variant="outline" className={getStatusColor(interview.status)}>
                {interview.status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatInterviewDate(interview.scheduled_date)}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatInterviewTime(interview.scheduled_date)}
                ({interview.duration_minutes} min)
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
  );
};

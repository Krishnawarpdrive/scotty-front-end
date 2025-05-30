
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CalendarDays, 
  Clock, 
  User, 
  VideoIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { InterviewState } from './TechnicalInterviewTab';

interface InterviewStatusManagerProps {
  candidate: Candidate;
  interviewState: InterviewState;
  onScheduleInterview: (scheduleData: any) => void;
}

export const InterviewStatusManager: React.FC<InterviewStatusManagerProps> = ({
  candidate,
  interviewState,
  onScheduleInterview
}) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    interviewer: '',
    meetingLink: ''
  });

  const handleScheduleSubmit = () => {
    onScheduleInterview(scheduleForm);
    setIsScheduling(false);
  };

  if (interviewState.status === 'not-scheduled') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Technical Interview - Not Scheduled
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isScheduling ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Schedule Technical Interview
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a technical interview for {candidate.name} to assess their technical skills.
              </p>
              <Button onClick={() => setIsScheduling(true)}>
                Schedule Interview
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Interview Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Interview Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="interviewer">Interviewer Name</Label>
                <Input
                  id="interviewer"
                  placeholder="Enter interviewer name"
                  value={scheduleForm.interviewer}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, interviewer: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="meetingLink">Meeting Link</Label>
                <Input
                  id="meetingLink"
                  placeholder="Enter video call link"
                  value={scheduleForm.meetingLink}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, meetingLink: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleScheduleSubmit} disabled={!scheduleForm.date || !scheduleForm.time}>
                  Confirm Schedule
                </Button>
                <Button variant="outline" onClick={() => setIsScheduling(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Technical Interview - Scheduled
          </CardTitle>
          <Badge variant="default">Scheduled</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date & Time</p>
              <p className="text-sm text-gray-600">
                {interviewState.scheduledDate} at {interviewState.scheduledTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Interviewer</p>
              <p className="text-sm text-gray-600">{interviewState.interviewerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <VideoIcon className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Meeting</p>
              <a 
                href={interviewState.meetingLink} 
                className="text-sm text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

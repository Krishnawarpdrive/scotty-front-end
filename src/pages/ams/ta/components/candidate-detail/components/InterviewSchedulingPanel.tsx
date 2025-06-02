
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { PipelineStage } from '../types/MultiPipelineTypes';
import { Calendar as CalendarIcon, Clock, Video, MapPin, Users } from 'lucide-react';

interface InterviewSchedulingPanelProps {
  open: boolean;
  onClose: () => void;
  stage: PipelineStage;
  applicationId: string;
  onSchedule: (scheduleData: any) => void;
}

export const InterviewSchedulingPanel: React.FC<InterviewSchedulingPanelProps> = ({
  open,
  onClose,
  stage,
  applicationId,
  onSchedule
}) => {
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    duration: stage.interview_details?.duration_minutes || 60,
    interviewer: stage.interview_details?.interviewer || '',
    type: stage.interview_details?.type || 'video',
    location: '',
    meeting_link: '',
    notes: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const interviewers = [
    'John Smith',
    'Sarah Wilson',
    'Mike Johnson',
    'Lisa Chen',
    'David Brown'
  ];

  const handleSchedule = () => {
    if (!selectedDate || !scheduleData.time || !scheduleData.interviewer) {
      alert('Please fill in all required fields');
      return;
    }

    const scheduledDateTime = new Date(selectedDate);
    const [hours, minutes] = scheduleData.time.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

    onSchedule({
      ...scheduleData,
      date: selectedDate.toISOString().split('T')[0],
      scheduled_datetime: scheduledDateTime.toISOString(),
      applicationId,
      stageId: stage.id
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Schedule Interview - {stage.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Date & Time */}
          <div className="space-y-4">
            <div>
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="time">Time Slot *</Label>
              <Select value={scheduleData.time} onValueChange={(value) => setScheduleData({ ...scheduleData, time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={scheduleData.duration.toString()} onValueChange={(value) => setScheduleData({ ...scheduleData, duration: parseInt(value) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="interviewer">Interviewer *</Label>
              <Select value={scheduleData.interviewer} onValueChange={(value) => setScheduleData({ ...scheduleData, interviewer: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {interviewers.map((interviewer) => (
                    <SelectItem key={interviewer} value={interviewer}>
                      {interviewer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Interview Type</Label>
              <Select value={scheduleData.type} onValueChange={(value) => setScheduleData({ ...scheduleData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>Video Call</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Phone Call</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="in-person">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>In Person</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scheduleData.type === 'video' && (
              <div>
                <Label htmlFor="meeting_link">Meeting Link</Label>
                <Input
                  type="url"
                  value={scheduleData.meeting_link}
                  onChange={(e) => setScheduleData({ ...scheduleData, meeting_link: e.target.value })}
                  placeholder="https://meet.google.com/..."
                />
              </div>
            )}

            {scheduleData.type === 'in-person' && (
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  value={scheduleData.location}
                  onChange={(e) => setScheduleData({ ...scheduleData, location: e.target.value })}
                  placeholder="Office address or room number"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSchedule} className="flex-1">
            Schedule Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

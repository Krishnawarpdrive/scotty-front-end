
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Video, Clock } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { TechnicalInterviewData } from '../hooks/useTechnicalInterviewManagement';

interface InterviewSchedulingSectionProps {
  candidate: Candidate;
  currentSchedule?: TechnicalInterviewData['scheduleDetails'];
  onSchedule: (details: TechnicalInterviewData['scheduleDetails']) => void;
  onReschedule: (details: TechnicalInterviewData['scheduleDetails']) => void;
  onCancel: (reason: string) => void;
  isLoading: boolean;
}

export const InterviewSchedulingSection: React.FC<InterviewSchedulingSectionProps> = ({
  candidate,
  currentSchedule,
  onSchedule,
  onReschedule,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    interviewerId: currentSchedule?.interviewerId || '',
    interviewerName: currentSchedule?.interviewerName || '',
    scheduledDate: currentSchedule?.scheduledDate ? new Date(currentSchedule.scheduledDate).toISOString().slice(0, 16) : '',
    duration: currentSchedule?.duration || 60,
    meetingLink: currentSchedule?.meetingLink || '',
    notes: currentSchedule?.notes || '',
    interviewType: currentSchedule?.interviewType || 'technical'
  });
  
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelForm, setShowCancelForm] = useState(false);

  // Mock interviewers - in real app, fetch from API
  const availableInterviewers = [
    { id: '1', name: 'Sarah Johnson', title: 'Senior Engineer', expertise: ['React', 'Node.js'] },
    { id: '2', name: 'Mike Chen', title: 'Tech Lead', expertise: ['System Design', 'Microservices'] },
    { id: '3', name: 'Emily Davis', title: 'Principal Engineer', expertise: ['Architecture', 'Scalability'] }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scheduleDetails: TechnicalInterviewData['scheduleDetails'] = {
      interviewerId: formData.interviewerId,
      interviewerName: formData.interviewerName,
      scheduledDate: formData.scheduledDate,
      duration: formData.duration,
      meetingLink: formData.meetingLink || undefined,
      notes: formData.notes || undefined,
      interviewType: formData.interviewType as any
    };

    if (currentSchedule) {
      onReschedule(scheduleDetails);
    } else {
      onSchedule(scheduleDetails);
    }
  };

  const handleInterviewerChange = (interviewerId: string) => {
    const interviewer = availableInterviewers.find(i => i.id === interviewerId);
    setFormData(prev => ({
      ...prev,
      interviewerId,
      interviewerName: interviewer?.name || ''
    }));
  };

  const handleCancel = () => {
    if (cancelReason.trim()) {
      onCancel(cancelReason);
      setShowCancelForm(false);
      setCancelReason('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          {currentSchedule ? 'Reschedule Interview' : 'Schedule Interview'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interviewer">Select Interviewer</Label>
            <Select 
              value={formData.interviewerId} 
              onValueChange={handleInterviewerChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an interviewer" />
              </SelectTrigger>
              <SelectContent>
                {availableInterviewers.map((interviewer) => (
                  <SelectItem key={interviewer.id} value={interviewer.id}>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{interviewer.name}</div>
                        <div className="text-xs text-gray-500">{interviewer.title}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewType">Interview Type</Label>
            <Select 
              value={formData.interviewType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, interviewType: value as any }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="coding">Coding Challenge</SelectItem>
                <SelectItem value="system-design">System Design</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledDate">Date & Time</Label>
            <Input
              id="scheduledDate"
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select 
              value={formData.duration.toString()} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingLink">Meeting Link (optional)</Label>
          <Input
            id="meetingLink"
            type="url"
            placeholder="https://meet.google.com/..."
            value={formData.meetingLink}
            onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special instructions or notes for the interview..."
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <div className="space-x-2">
            {currentSchedule && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowCancelForm(true)}
                disabled={isLoading}
              >
                Cancel Interview
              </Button>
            )}
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : currentSchedule ? 'Reschedule' : 'Schedule Interview'}
          </Button>
        </div>
      </form>

      {/* Cancel Interview Form */}
      {showCancelForm && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Cancel Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancelReason">Reason for cancellation</Label>
              <Textarea
                id="cancelReason"
                placeholder="Please provide a reason for cancelling the interview..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCancelForm(false)}
              >
                Keep Interview
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleCancel}
                disabled={!cancelReason.trim() || isLoading}
              >
                Confirm Cancellation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

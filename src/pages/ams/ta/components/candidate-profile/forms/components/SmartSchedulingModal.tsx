
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Video, Mail, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import type { Candidate } from '../../../types/CandidateTypes';

interface SchedulingData {
  type: 'internal' | 'external';
  date: string;
  time: string;
  interviewer?: string;
  candidateEmail?: string;
  meetingLink?: string;
  duration: string;
  notes?: string;
}

interface SmartSchedulingModalProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate;
  onSchedule: (data: SchedulingData) => void;
  existingSchedule?: SchedulingData;
}

export const SmartSchedulingModal: React.FC<SmartSchedulingModalProps> = ({
  open,
  onClose,
  candidate,
  onSchedule,
  existingSchedule
}) => {
  const [schedulingType, setSchedulingType] = useState<'internal' | 'external'>(
    existingSchedule?.type || 'internal'
  );
  const [formData, setFormData] = useState<SchedulingData>(
    existingSchedule || {
      type: 'internal',
      date: '',
      time: '',
      duration: '60',
      interviewer: '',
      candidateEmail: candidate.email || '',
      meetingLink: '',
      notes: ''
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useEnhancedToast();

  const availableInterviewers = [
    { id: '1', name: 'Sarah Johnson', title: 'Senior Engineer', available: true },
    { id: '2', name: 'Mike Chen', title: 'Tech Lead', available: true },
    { id: '3', name: 'Alex Rodriguez', title: 'Principal Engineer', available: false }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSchedule(formData);
      onClose();
      
      toast.success({
        title: existingSchedule ? 'Interview rescheduled' : 'Interview scheduled',
        description: `${candidate.name}'s interview has been ${existingSchedule ? 'rescheduled' : 'scheduled'} successfully`,
        action: {
          label: 'View Calendar',
          onClick: () => console.log('Open calendar')
        }
      });
    } catch (error) {
      toast.error({
        title: 'Scheduling failed',
        description: 'Unable to schedule the interview. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.date && formData.time && 
    (schedulingType === 'external' || formData.interviewer);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {existingSchedule ? 'Reschedule' : 'Schedule'} Technical Interview
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Scheduling interview for {candidate.name} - {candidate.appliedRole}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scheduling Type Selection */}
          <div>
            <Label className="text-base font-medium">Interview Type</Label>
            <RadioGroup 
              value={schedulingType} 
              onValueChange={(value: 'internal' | 'external') => {
                setSchedulingType(value);
                setFormData(prev => ({ ...prev, type: value }));
              }}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Internal Interview (with our team)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  External Interview (candidate schedules themselves)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Tabs value={schedulingType} className="w-full">
            {/* Internal Scheduling */}
            <TabsContent value="internal" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Interview Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={formData.time} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, time: value }))
                  }>
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
              </div>

              <div>
                <Label htmlFor="interviewer">Select Interviewer</Label>
                <Select value={formData.interviewer} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, interviewer: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableInterviewers.map((interviewer) => (
                      <SelectItem 
                        key={interviewer.id} 
                        value={interviewer.name}
                        disabled={!interviewer.available}
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{interviewer.name}</div>
                            <div className="text-xs text-gray-500">{interviewer.title}</div>
                          </div>
                          {!interviewer.available && (
                            <Badge variant="outline" className="ml-auto">Unavailable</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="meetingLink"
                    placeholder="https://meet.google.com/..."
                    value={formData.meetingLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                  />
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* External Scheduling */}
            <TabsContent value="external" className="space-y-4 mt-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">External Scheduling</span>
                </div>
                <p className="text-sm text-blue-700">
                  An email will be sent to the candidate with available time slots to choose from.
                </p>
              </div>

              <div>
                <Label htmlFor="candidateEmail">Candidate Email</Label>
                <Input
                  id="candidateEmail"
                  type="email"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))}
                  placeholder="candidate@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availableDate">Available From</Label>
                  <Input
                    id="availableDate"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={formData.duration} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, duration: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isFormValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting 
                ? 'Scheduling...' 
                : existingSchedule 
                  ? 'Update Schedule' 
                  : 'Schedule Interview'
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

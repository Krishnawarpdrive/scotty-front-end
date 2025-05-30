
import React, { useState } from 'react';
import { SchedulerProgress } from './SchedulerProgress';
import { TemplateSelectionStep } from './TemplateSelectionStep';
import { PanelistSelectionStep } from './PanelistSelectionStep';
import { DateTimeSelectionStep } from './DateTimeSelectionStep';
import { MeetingDetailsStep } from './MeetingDetailsStep';
import { Button } from '@/components/ui/button';
import type { InterviewSchedule, InterviewTemplate } from '../InterviewSchedulingService';

interface InterviewSchedulerCoreProps {
  candidateId: string;
  requirementId?: string;
  onScheduleComplete?: (schedule: InterviewSchedule) => void;
  onCancel?: () => void;
}

export const InterviewSchedulerCore: React.FC<InterviewSchedulerCoreProps> = ({
  candidateId,
  requirementId,
  onScheduleComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<InterviewTemplate | null>(null);
  const [selectedPanelistId, setSelectedPanelistId] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const [timezone, setTimezone] = useState('America/New_York');
  const [meetingDetails, setMeetingDetails] = useState({
    meeting_link: '',
    location: '',
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Template', description: 'Choose interview type' },
    { id: 2, title: 'Interviewer', description: 'Select panelist' },
    { id: 3, title: 'Date & Time', description: 'Pick schedule' },
    { id: 4, title: 'Details', description: 'Meeting info' },
    { id: 5, title: 'Review', description: 'Confirm & schedule' }
  ];

  const mockTemplates: InterviewTemplate[] = [
    {
      id: '1',
      name: 'Technical Interview',
      interview_type: 'technical',
      duration_minutes: 60,
      questions: ['Coding problem', 'System design'],
      checklist_items: ['Technical skills', 'Problem solving'],
      required_skills: ['JavaScript', 'React'],
      is_active: true,
      created_by: 'system',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const handleTemplateSelect = (template: InterviewTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  const handlePanelistSelect = (panelistId: string) => {
    setSelectedPanelistId(panelistId);
    setCurrentStep(3);
  };

  const handleSlotSelect = (slot: { start: string; end: string }) => {
    setSelectedSlot(slot);
    setCurrentStep(4);
  };

  const handleMeetingDetailsContinue = () => {
    setCurrentStep(5);
  };

  const handleScheduleConfirm = () => {
    if (selectedTemplate && selectedPanelistId && selectedSlot) {
      const schedule: InterviewSchedule = {
        id: `schedule_${Date.now()}`,
        candidate_id: candidateId,
        requirement_id: requirementId,
        panelist_id: selectedPanelistId,
        scheduled_date: selectedSlot.start,
        duration_minutes: selectedTemplate.duration_minutes,
        interview_type: selectedTemplate.interview_type,
        status: 'scheduled',
        timezone,
        meeting_link: meetingDetails.meeting_link,
        location: meetingDetails.location,
        notes: meetingDetails.notes,
        created_by: 'current_user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      onScheduleComplete?.(schedule);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemplateSelectionStep
            templates={mockTemplates}
            onTemplateSelect={handleTemplateSelect}
          />
        );
      case 2:
        return selectedTemplate ? (
          <PanelistSelectionStep
            interviewType={selectedTemplate.interview_type}
            onPanelistSelect={handlePanelistSelect}
          />
        ) : null;
      case 3:
        return selectedTemplate && selectedPanelistId ? (
          <DateTimeSelectionStep
            panelistId={selectedPanelistId}
            duration={selectedTemplate.duration_minutes}
            timezone={timezone}
            onTimezoneChange={setTimezone}
            onSlotSelect={handleSlotSelect}
          />
        ) : null;
      case 4:
        return (
          <MeetingDetailsStep
            formData={meetingDetails}
            onFormDataChange={(updates) => setMeetingDetails(prev => ({ ...prev, ...updates }))}
            onBack={() => setCurrentStep(3)}
            onContinue={handleMeetingDetailsContinue}
          />
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Confirm</h3>
            <div className="space-y-2">
              <p><strong>Template:</strong> {selectedTemplate?.name}</p>
              <p><strong>Duration:</strong> {selectedTemplate?.duration_minutes} minutes</p>
              <p><strong>Date:</strong> {selectedSlot?.start}</p>
              <p><strong>Timezone:</strong> {timezone}</p>
              {meetingDetails.meeting_link && (
                <p><strong>Meeting Link:</strong> {meetingDetails.meeting_link}</p>
              )}
              {meetingDetails.location && (
                <p><strong>Location:</strong> {meetingDetails.location}</p>
              )}
              {meetingDetails.notes && (
                <p><strong>Notes:</strong> {meetingDetails.notes}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                Back
              </Button>
              <Button onClick={handleScheduleConfirm}>
                Confirm & Schedule
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <SchedulerProgress currentStep={currentStep} steps={steps} />
      {renderCurrentStep()}
      
      {currentStep > 1 && currentStep < 5 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
            Back
          </Button>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

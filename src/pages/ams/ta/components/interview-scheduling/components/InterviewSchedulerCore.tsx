
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { interviewSchedulingService, InterviewSchedule, InterviewTemplate } from '../InterviewSchedulingService';
import { SchedulerProgress } from './SchedulerProgress';
import { TemplateSelectionStep } from './TemplateSelectionStep';
import { PanelistSelectionStep } from './PanelistSelectionStep';
import { DateTimeSelectionStep } from './DateTimeSelectionStep';
import { MeetingDetailsStep } from './MeetingDetailsStep';
import { ReviewConfirmStep } from './ReviewConfirmStep';

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
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<InterviewTemplate[]>([]);

  const [formData, setFormData] = useState({
    interview_type: 'technical',
    duration_minutes: 60,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    scheduled_date: '',
    panelist_id: '',
    meeting_link: '',
    location: '',
    notes: '',
    template_id: ''
  });

  useEffect(() => {
    loadInterviewTemplates();
  }, []);

  const loadInterviewTemplates = async () => {
    try {
      const data = await interviewSchedulingService.getInterviewTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleTemplateSelect = (template: InterviewTemplate) => {
    setFormData(prev => ({
      ...prev,
      interview_type: template.interview_type,
      duration_minutes: template.duration_minutes,
      template_id: template.id
    }));
    setCurrentStep(2);
  };

  const handlePanelistSelect = (panelistId: string) => {
    setFormData(prev => ({ ...prev, panelist_id: panelistId }));
    setCurrentStep(3);
  };

  const handleSlotSelect = (slot: { start: string; end: string }) => {
    setFormData(prev => ({ ...prev, scheduled_date: slot.start }));
    setCurrentStep(4);
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleScheduleInterview = async () => {
    setLoading(true);
    try {
      const schedule = await interviewSchedulingService.createInterviewSchedule({
        candidate_id: candidateId,
        requirement_id: requirementId,
        panelist_id: formData.panelist_id,
        scheduled_date: formData.scheduled_date,
        duration_minutes: formData.duration_minutes,
        interview_type: formData.interview_type,
        status: 'scheduled',
        timezone: formData.timezone,
        meeting_link: formData.meeting_link,
        location: formData.location,
        notes: formData.notes,
        created_by: 'current-user', // Replace with actual user
        metadata: { template_id: formData.template_id }
      });

      onScheduleComplete?.(schedule);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Interview Type', description: 'Select interview template' },
    { id: 2, title: 'Panelist', description: 'Choose interviewer' },
    { id: 3, title: 'Date & Time', description: 'Pick schedule' },
    { id: 4, title: 'Details', description: 'Final details' },
    { id: 5, title: 'Review', description: 'Confirm booking' }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule Interview
        </CardTitle>
        <CardDescription>
          Enhanced scheduling with conflict detection and smart suggestions
        </CardDescription>
        
        <SchedulerProgress currentStep={currentStep} steps={steps} />
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <TemplateSelectionStep
                templates={templates}
                onTemplateSelect={handleTemplateSelect}
              />
            )}

            {currentStep === 2 && (
              <PanelistSelectionStep
                interviewType={formData.interview_type}
                onPanelistSelect={handlePanelistSelect}
              />
            )}

            {currentStep === 3 && (
              <DateTimeSelectionStep
                panelistId={formData.panelist_id}
                duration={formData.duration_minutes}
                timezone={formData.timezone}
                onTimezoneChange={(timezone) => handleFormDataChange({ timezone })}
                onSlotSelect={handleSlotSelect}
              />
            )}

            {currentStep === 4 && (
              <MeetingDetailsStep
                formData={{
                  meeting_link: formData.meeting_link,
                  location: formData.location,
                  notes: formData.notes
                }}
                onFormDataChange={handleFormDataChange}
                onBack={() => setCurrentStep(3)}
                onContinue={() => setCurrentStep(5)}
              />
            )}

            {currentStep === 5 && (
              <ReviewConfirmStep
                formData={formData}
                loading={loading}
                onBack={() => setCurrentStep(4)}
                onCancel={onCancel}
                onConfirm={handleScheduleInterview}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

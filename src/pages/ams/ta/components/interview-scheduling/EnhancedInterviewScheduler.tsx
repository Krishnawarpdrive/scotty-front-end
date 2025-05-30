
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, Video, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { interviewSchedulingService, InterviewSchedule, InterviewTemplate } from './InterviewSchedulingService';
import { TimezoneSelector } from './TimezoneSelector';
import { PanelistSelector } from './PanelistSelector';
import { TimeSlotPicker } from './TimeSlotPicker';

interface EnhancedInterviewSchedulerProps {
  candidateId: string;
  requirementId?: string;
  onScheduleComplete?: (schedule: InterviewSchedule) => void;
  onCancel?: () => void;
}

export const EnhancedInterviewScheduler: React.FC<EnhancedInterviewSchedulerProps> = ({
  candidateId,
  requirementId,
  onScheduleComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<InterviewTemplate[]>([]);
  const [suggestedSlots, setSuggestedSlots] = useState<Array<{ start: string; end: string }>>([]);
  const [conflicts, setConflicts] = useState<any[]>([]);

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

  const checkConflicts = async () => {
    if (formData.panelist_id && formData.scheduled_date) {
      try {
        const conflictData = await interviewSchedulingService.detectConflicts(
          formData.panelist_id,
          formData.scheduled_date,
          formData.duration_minutes
        );
        setConflicts(conflictData);
      } catch (error) {
        console.error('Error checking conflicts:', error);
      }
    }
  };

  const loadTimeSlotSuggestions = async () => {
    if (formData.panelist_id && formData.scheduled_date) {
      try {
        const suggestions = await interviewSchedulingService.suggestTimeSlots(
          formData.panelist_id,
          formData.scheduled_date.split('T')[0],
          formData.duration_minutes
        );
        setSuggestedSlots(suggestions);
      } catch (error) {
        console.error('Error loading suggestions:', error);
      }
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
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>
              <div className="ml-2 text-sm">
                <div className="font-medium">{step.title}</div>
                <div className="text-gray-500">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  mx-4 h-0.5 w-8 
                  ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
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
            {/* Step 1: Interview Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Interview Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.interview_type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {template.duration_minutes}m
                        </span>
                        <span>{template.questions.length} questions</span>
                        <span>{template.required_skills.length} skills</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Panelist Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Interviewer</h3>
                <PanelistSelector
                  interviewType={formData.interview_type}
                  onSelect={(panelistId) => {
                    setFormData(prev => ({ ...prev, panelist_id: panelistId }));
                    setCurrentStep(3);
                  }}
                />
              </div>
            )}

            {/* Step 3: Date & Time Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pick Date & Time</h3>
                
                <TimezoneSelector
                  value={formData.timezone}
                  onChange={(timezone) => setFormData(prev => ({ ...prev, timezone }))}
                />

                <TimeSlotPicker
                  panelistId={formData.panelist_id}
                  duration={formData.duration_minutes}
                  timezone={formData.timezone}
                  onSelect={(slot) => {
                    setFormData(prev => ({ ...prev, scheduled_date: slot.start }));
                    checkConflicts();
                    setCurrentStep(4);
                  }}
                />

                {conflicts.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-800 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Scheduling Conflicts Detected</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      The selected time conflicts with existing interviews. Please choose a different time slot.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Meeting Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Meeting Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Video className="inline h-4 w-4 mr-1" />
                      Meeting Link (Optional)
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="https://zoom.us/j/..."
                      value={formData.meeting_link}
                      onChange={(e) => setFormData(prev => ({ ...prev, meeting_link: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Conference Room A or Online"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Any special instructions or notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(5)}>
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Confirm */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Review & Confirm</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Interview Type:</span>
                    <Badge>{formData.interview_type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{formData.duration_minutes} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date & Time:</span>
                    <span>{new Date(formData.scheduled_date).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Timezone:</span>
                    <span>{formData.timezone}</span>
                  </div>
                  {formData.meeting_link && (
                    <div className="flex justify-between">
                      <span className="font-medium">Meeting Link:</span>
                      <span className="text-blue-600 break-all">{formData.meeting_link}</span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{formData.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleScheduleInterview}
                      disabled={loading}
                    >
                      {loading ? 'Scheduling...' : 'Schedule Interview'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

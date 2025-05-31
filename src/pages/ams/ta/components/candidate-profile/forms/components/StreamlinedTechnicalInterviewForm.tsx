
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Video, MessageSquare, CheckCircle } from 'lucide-react';
import { SmartScheduleButton } from './SmartScheduleButton';
import { SmartSchedulingModal } from './SmartSchedulingModal';
import { EnhancedInterviewStatus } from './EnhancedInterviewStatus';
import { InterviewFeedbackTab } from './InterviewFeedbackTab';
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

interface StreamlinedTechnicalInterviewFormProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const StreamlinedTechnicalInterviewForm: React.FC<StreamlinedTechnicalInterviewFormProps> = ({
  candidate,
  onSave
}) => {
  const [interviewStatus, setInterviewStatus] = useState<'not-scheduled' | 'scheduled' | 'completed'>('not-scheduled');
  const [scheduleData, setScheduleData] = useState<SchedulingData | null>(null);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);

  const handleSchedule = (data: SchedulingData) => {
    setScheduleData(data);
    setInterviewStatus('scheduled');
    console.log('Interview scheduled:', data);
  };

  const handleMarkCompleted = () => {
    setInterviewStatus('completed');
  };

  const handleFeedbackSave = (feedback: any) => {
    setFeedbackData(feedback);
    onSave?.({
      schedule: scheduleData,
      feedback: feedback,
      status: 'completed'
    });
    console.log('Feedback saved:', feedback);
  };

  const getProgressValue = () => {
    switch (interviewStatus) {
      case 'not-scheduled': return 0;
      case 'scheduled': return 50;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-scheduled': return 'bg-gray-200 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Technical Interview</CardTitle>
                <p className="text-sm text-gray-600">
                  Assess technical skills for {candidate.name} - {candidate.appliedRole}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(interviewStatus)}>
              {interviewStatus === 'not-scheduled' && 'Not Scheduled'}
              {interviewStatus === 'scheduled' && 'Scheduled'}
              {interviewStatus === 'completed' && 'Completed'}
            </Badge>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1">
              <Progress value={getProgressValue()} className="h-2" />
            </div>
            <span className="text-xs text-gray-500 w-10">
              {getProgressValue()}%
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Scheduling Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Interview Management</h3>
          {interviewStatus === 'not-scheduled' && (
            <SmartScheduleButton
              isScheduled={false}
              onSchedule={() => setShowSchedulingModal(true)}
            />
          )}
        </div>

        <EnhancedInterviewStatus
          status={interviewStatus}
          schedule={scheduleData || undefined}
          onEdit={() => setShowSchedulingModal(true)}
          onMarkCompleted={handleMarkCompleted}
        />
      </div>

      {/* Content Tabs */}
      {interviewStatus !== 'not-scheduled' && (
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="details" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-2 h-12 bg-transparent">
                  <TabsTrigger 
                    value="details" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    <Video className="h-4 w-4" />
                    Interview Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="feedback" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    disabled={interviewStatus !== 'completed'}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Feedback & Assessment
                    {interviewStatus === 'completed' && (
                      <Badge variant="secondary" className="ml-1 text-xs">Ready</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="details" className="p-6">
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Interview Successfully Scheduled
                    </h3>
                    <p className="text-gray-600 mb-4">
                      All interview details have been configured and notifications sent.
                    </p>
                    {interviewStatus === 'scheduled' && (
                      <Button
                        onClick={handleMarkCompleted}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="p-6">
                {interviewStatus === 'completed' && (
                  <InterviewFeedbackTab
                    candidate={candidate}
                    interviewData={scheduleData}
                    onFeedbackSave={handleFeedbackSave}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Scheduling Modal */}
      <SmartSchedulingModal
        open={showSchedulingModal}
        onClose={() => setShowSchedulingModal(false)}
        candidate={candidate}
        onSchedule={handleSchedule}
        existingSchedule={scheduleData || undefined}
      />
    </div>
  );
};

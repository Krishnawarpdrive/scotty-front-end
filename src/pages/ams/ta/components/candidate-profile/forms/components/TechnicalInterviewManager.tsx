
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare,
  Video,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { InterviewSchedulingSection } from './InterviewSchedulingSection';
import { InterviewFeedbackSection } from './InterviewFeedbackSection';
import { InterviewAnalyticsSection } from './InterviewAnalyticsSection';
import { InterviewStatusTimeline } from './InterviewStatusTimeline';
import { useTechnicalInterviewManagement } from '../hooks/useTechnicalInterviewManagement';
import type { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewManagerProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const TechnicalInterviewManager: React.FC<TechnicalInterviewManagerProps> = ({
  candidate,
  onSave
}) => {
  const {
    interviewData,
    isLoading,
    scheduleInterview,
    submitFeedback,
    rescheduleInterview,
    cancelInterview
  } = useTechnicalInterviewManagement(candidate.id.toString());

  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-scheduled': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressValue = () => {
    switch (interviewData.status) {
      case 'not-scheduled': return 0;
      case 'scheduled': return 25;
      case 'in-progress': return 75;
      case 'completed': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const getStatusIcon = () => {
    switch (interviewData.status) {
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      case 'in-progress': return <Video className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                {getStatusIcon()}
              </div>
              <div>
                <CardTitle className="text-lg">Technical Interview</CardTitle>
                <p className="text-sm text-gray-600">
                  {candidate.name} - {candidate.appliedRole || 'Position not specified'}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(interviewData.status)}>
              {interviewData.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          
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

      {/* Status Timeline */}
      <InterviewStatusTimeline 
        status={interviewData.status}
        scheduleDetails={interviewData.scheduleDetails}
        feedback={interviewData.feedback}
      />

      {/* Main Content Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-4 h-12 bg-transparent">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  <Video className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="scheduling" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  <Calendar className="h-4 w-4" />
                  Scheduling
                </TabsTrigger>
                <TabsTrigger 
                  value="feedback" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  disabled={interviewData.status === 'not-scheduled'}
                >
                  <MessageSquare className="h-4 w-4" />
                  Feedback
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-4">
                {interviewData.status === 'not-scheduled' && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Ready to Schedule Technical Interview
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Schedule a technical interview to assess {candidate.name}'s technical skills and capabilities.
                    </p>
                    <Button 
                      onClick={() => setActiveTab('scheduling')}
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule Interview
                    </Button>
                  </div>
                )}

                {interviewData.status !== 'not-scheduled' && interviewData.scheduleDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Interview Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Interviewer:</span> {interviewData.scheduleDetails.interviewerName}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {new Date(interviewData.scheduleDetails.scheduledDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {new Date(interviewData.scheduleDetails.scheduledDate).toLocaleTimeString()}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {interviewData.scheduleDetails.duration} minutes
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {interviewData.scheduleDetails.interviewType}
                        </div>
                      </div>
                      {interviewData.scheduleDetails.meetingLink && (
                        <div className="mt-3">
                          <Button variant="outline" size="sm" asChild>
                            <a href={interviewData.scheduleDetails.meetingLink} target="_blank" rel="noopener noreferrer">
                              <Video className="h-4 w-4 mr-1" />
                              Join Meeting
                            </a>
                          </Button>
                        </div>
                      )}
                    </Card>

                    {interviewData.feedback && (
                      <Card className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Feedback Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Overall Rating:</span> {interviewData.feedback.overallRating}/5
                          </div>
                          <div>
                            <span className="font-medium">Recommendation:</span> 
                            <Badge 
                              variant={interviewData.feedback.recommendation === 'proceed' ? 'default' : 'secondary'}
                              className="ml-2"
                            >
                              {interviewData.feedback.recommendation}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {new Date(interviewData.feedback.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="scheduling" className="p-6">
              <InterviewSchedulingSection
                candidate={candidate}
                currentSchedule={interviewData.scheduleDetails}
                onSchedule={scheduleInterview}
                onReschedule={rescheduleInterview}
                onCancel={cancelInterview}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="feedback" className="p-6">
              <InterviewFeedbackSection
                candidate={candidate}
                interviewData={interviewData}
                onSubmitFeedback={submitFeedback}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="analytics" className="p-6">
              <InterviewAnalyticsSection
                candidate={candidate}
                interviewData={interviewData}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

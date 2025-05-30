
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Clock, Users } from 'lucide-react';
import { InterviewSchedulingTab } from './InterviewSchedulingTab';
import { InterviewFeedbackTab } from './InterviewFeedbackTab';
import type { Candidate } from '../../../types/CandidateTypes';

interface EnhancedTechnicalInterviewTabsProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const EnhancedTechnicalInterviewTabs: React.FC<EnhancedTechnicalInterviewTabsProps> = ({
  candidate,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('scheduling');
  const [interviewData, setInterviewData] = useState<any>(null);

  const handleSchedulingComplete = (scheduleData: any) => {
    setInterviewData(scheduleData);
    setActiveTab('feedback');
  };

  const handleFeedbackSave = (feedbackData: any) => {
    onSave?.({
      schedule: interviewData,
      feedback: feedbackData
    });
  };

  return (
    <div className="w-full">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-blue-600" />
            Technical Interview Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Schedule interviews and collect feedback for {candidate.name}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="scheduling" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Interview Scheduling
                {!interviewData && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="flex items-center gap-2"
                disabled={!interviewData}
              >
                <MessageSquare className="h-4 w-4" />
                Interview Feedback
                {interviewData && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Ready
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scheduling" className="mt-0">
              <InterviewSchedulingTab
                candidate={candidate}
                onSchedulingComplete={handleSchedulingComplete}
              />
            </TabsContent>

            <TabsContent value="feedback" className="mt-0">
              <InterviewFeedbackTab
                candidate={candidate}
                interviewData={interviewData}
                onFeedbackSave={handleFeedbackSave}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

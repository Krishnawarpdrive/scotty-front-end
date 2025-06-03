
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnhancedTechnicalInterviewTabs } from './EnhancedTechnicalInterviewTabs';
import { Calendar, MessageSquare, BookOpen, Video, Clock, CheckCircle } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewManagerProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const TechnicalInterviewManager: React.FC<TechnicalInterviewManagerProps> = ({
  candidate,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('interview');

  // Mock data for demonstration - in real app, this would come from props/API
  const interviewStatus = {
    scheduled: true,
    completed: false,
    dateTime: '2024-01-25 14:00',
    interviewer: 'John Smith',
    duration: 60,
    type: 'Technical'
  };

  const handleScheduleInterview = () => {
    console.log('Schedule interview for:', candidate.name);
    // This would open the interview scheduling modal
  };

  const handleRescheduleInterview = () => {
    console.log('Reschedule interview for:', candidate.name);
    // This would open the rescheduling modal
  };

  const handleConductInterview = () => {
    console.log('Start interview for:', candidate.name);
    // This would start the interview process
  };

  return (
    <div className="w-full h-full">
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Technical Interview Management</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {interviewStatus.scheduled && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Scheduled
                </Badge>
              )}
              {interviewStatus.completed && (
                <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Manage technical interviews and assessments for {candidate.name}
          </p>
        </CardHeader>
        <CardContent className="h-full">
          {/* Prominent CTAs for Technical Interview */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Interview Actions</h3>
                <p className="text-sm text-blue-700">
                  {!interviewStatus.scheduled 
                    ? 'Schedule a technical interview to assess candidate\'s technical skills'
                    : interviewStatus.completed
                    ? 'Interview completed - review feedback and scores'
                    : `Interview scheduled for ${new Date(interviewStatus.dateTime).toLocaleDateString()} at ${new Date(interviewStatus.dateTime).toLocaleTimeString()}`
                  }
                </p>
              </div>
              <div className="flex gap-2">
                {!interviewStatus.scheduled ? (
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleScheduleInterview}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                ) : !interviewStatus.completed ? (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleConductInterview}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Start Interview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRescheduleInterview}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Feedback
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleScheduleInterview}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-1 mb-6">
              <TabsTrigger value="interview" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Technical Interview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interview" className="mt-0 h-full">
              <EnhancedTechnicalInterviewTabs
                candidate={candidate}
                onSave={onSave}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

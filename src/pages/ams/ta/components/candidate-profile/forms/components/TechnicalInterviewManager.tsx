
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnhancedTechnicalInterviewTabs } from './EnhancedTechnicalInterviewTabs';
import { AptitudeTestTab } from '../../../aptitude-tests/AptitudeTestTab';
import { Calendar, MessageSquare, BookOpen, Users, Clock, CheckCircle } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewManagerProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const TechnicalInterviewManager: React.FC<TechnicalInterviewManagerProps> = ({
  candidate,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock progress data - replace with actual data
  const progressData = {
    totalStages: 4,
    completedStages: 2,
    currentStage: 'technical',
    stages: [
      { id: 'screening', name: 'Phone Screening', status: 'completed', date: '2024-01-15' },
      { id: 'aptitude', name: 'Aptitude Test', status: 'completed', date: '2024-01-16' },
      { id: 'technical', name: 'Technical Interview', status: 'current', date: null },
      { id: 'final', name: 'Final Interview', status: 'pending', date: null }
    ]
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Technical Assessment - {candidate.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive technical evaluation and aptitude testing
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {progressData.completedStages}/{progressData.totalStages}
              </div>
              <div className="text-xs text-gray-500">Stages Complete</div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
              <span className="text-sm text-gray-500">
                {Math.round((progressData.completedStages / progressData.totalStages) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progressData.completedStages / progressData.totalStages) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage indicators */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {progressData.stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center space-x-2">
                {getStageIcon(stage.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{stage.name}</p>
                  <Badge className={`text-xs ${getStageColor(stage.status)}`}>
                    {stage.status === 'completed' ? 'Done' : 
                     stage.status === 'current' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="aptitude" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Aptitude Tests
              </TabsTrigger>
              <TabsTrigger value="interview" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Technical Interview
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback & Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Candidate Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Current Stage</label>
                        <p className="text-lg font-semibold text-blue-600">Technical Interview</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Applied Date</label>
                        <p className="text-sm text-gray-900">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Last Activity</label>
                        <p className="text-sm text-gray-900">Aptitude test completed</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Next Action</label>
                        <p className="text-sm font-semibold text-amber-600">Schedule technical interview</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Technical Interview
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Assign Aptitude Test
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Feedback
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="aptitude" className="mt-0 h-full">
              <div className="h-full overflow-auto">
                <AptitudeTestTab />
              </div>
            </TabsContent>

            <TabsContent value="interview" className="mt-0 h-full">
              <EnhancedTechnicalInterviewTabs
                candidate={candidate}
                onSave={onSave}
              />
            </TabsContent>

            <TabsContent value="feedback" className="mt-0 h-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Assessment Feedback & Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-blue-900">Aptitude Test Completed</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Candidate scored 85% on the technical aptitude test. Strong performance in algorithm and data structure questions.
                          </p>
                          <p className="text-xs text-blue-600 mt-2">January 16, 2024 at 2:30 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-green-900">Phone Screening Passed</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Good communication skills and relevant experience. Recommended for technical interview.
                          </p>
                          <p className="text-xs text-green-600 mt-2">January 15, 2024 at 10:00 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Assessment Note
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        rows={4}
                        placeholder="Enter your assessment notes here..."
                      />
                      <div className="mt-2 flex justify-end">
                        <Button size="sm">Add Note</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

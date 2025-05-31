
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  User,
  CheckCircle,
  Star,
  MessageSquare,
  Video,
  Phone,
  MapPin
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface OptimizedTechnicalInterviewFormProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const OptimizedTechnicalInterviewForm: React.FC<OptimizedTechnicalInterviewFormProps> = ({
  candidate,
  onSave
}) => {
  const [interviewStatus, setInterviewStatus] = useState<'not-scheduled' | 'scheduled' | 'completed'>('not-scheduled');
  const [selectedPanelist, setSelectedPanelist] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [feedbackData, setFeedbackData] = useState({
    technicalSkills: { 'Problem Solving': 0, 'Code Quality': 0, 'System Design': 0 },
    overallRating: 0,
    recommendation: '',
    notes: ''
  });

  // Mock panelists data
  const panelists = [
    { id: '1', name: 'Sarah Johnson', title: 'Senior Engineer', rating: 4.8, available: true },
    { id: '2', name: 'Mike Chen', title: 'Tech Lead', rating: 4.9, available: true },
    { id: '3', name: 'Alex Rodriguez', title: 'Principal Engineer', rating: 4.7, available: false }
  ];

  // Mock time slots
  const timeSlots = [
    { id: '1', time: '2024-02-15 10:00 AM', available: true },
    { id: '2', time: '2024-02-15 2:00 PM', available: true },
    { id: '3', time: '2024-02-16 11:00 AM', available: true }
  ];

  const handleScheduleInterview = () => {
    if (selectedPanelist && selectedSlot) {
      setInterviewStatus('scheduled');
    }
  };

  const handleSubmitFeedback = () => {
    setInterviewStatus('completed');
    onSave?.(feedbackData);
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
    <div className="space-y-4">
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
                <p className="text-sm text-gray-600">Assess technical skills and problem-solving ability</p>
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
              <Progress 
                value={interviewStatus === 'not-scheduled' ? 0 : interviewStatus === 'scheduled' ? 50 : 100} 
                className="h-2"
              />
            </div>
            <span className="text-xs text-gray-500 w-10">
              {interviewStatus === 'not-scheduled' ? '0%' : interviewStatus === 'scheduled' ? '50%' : '100%'}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {interviewStatus === 'not-scheduled' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Interview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Interviewer</label>
                <Select value={selectedPanelist} onValueChange={setSelectedPanelist}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {panelists.map((panelist) => (
                      <SelectItem key={panelist.id} value={panelist.id} disabled={!panelist.available}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-medium">{panelist.name}</div>
                            <div className="text-xs text-gray-500">{panelist.title} • ⭐ {panelist.rating}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Time Slot</label>
                <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id} disabled={!slot.available}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {slot.time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleScheduleInterview}
              disabled={!selectedPanelist || !selectedSlot}
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </CardContent>
        </Card>
      )}

      {interviewStatus === 'scheduled' && (
        <div className="space-y-4">
          {/* Interview Details */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">Interview Scheduled</h3>
                <Badge variant="outline" className="border-blue-500 text-blue-700">
                  Upcoming
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>{panelists.find(p => p.id === selectedPanelist)?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>{timeSlots.find(s => s.id === selectedSlot)?.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-600" />
                  <span>Video Call</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Interview Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <TabsContent value="technical" className="space-y-4 mt-4">
                  {Object.entries(feedbackData.technicalSkills).map(([skill, rating]) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">{skill}</label>
                        <span className="text-sm text-gray-600">{rating}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackData(prev => ({
                              ...prev,
                              technicalSkills: { ...prev.technicalSkills, [skill]: star }
                            }))}
                            className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="behavioral" className="space-y-4 mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Behavioral assessment coming soon</p>
                  </div>
                </TabsContent>

                <TabsContent value="summary" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Overall Rating</label>
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setFeedbackData(prev => ({ ...prev, overallRating: star }))}
                          className={`p-1 ${feedbackData.overallRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Recommendation</label>
                    <Select value={feedbackData.recommendation} onValueChange={(value) => 
                      setFeedbackData(prev => ({ ...prev, recommendation: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proceed">Proceed to Next Stage</SelectItem>
                        <SelectItem value="hold">Put on Hold</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackData.overallRating || !feedbackData.recommendation}
                    className="w-full"
                  >
                    Submit Feedback
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {interviewStatus === 'completed' && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Interview Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Feedback has been submitted for {candidate.name}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-green-600">
              <span>Overall Rating: {feedbackData.overallRating}/5</span>
              <span>•</span>
              <span>Recommendation: {feedbackData.recommendation}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Star, 
  Edit,
  Target,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Pause
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { InterviewState } from './TechnicalInterviewTab';

interface InterviewSummaryPanelProps {
  candidate: Candidate;
  interviewState: InterviewState;
  onEdit: () => void;
}

export const InterviewSummaryPanel: React.FC<InterviewSummaryPanelProps> = ({
  candidate,
  interviewState,
  onEdit
}) => {
  const feedback = interviewState.feedback!;
  
  const getRecommendationBadge = () => {
    switch (feedback.recommendation) {
      case 'proceed':
        return <Badge className="bg-green-100 text-green-800"><ThumbsUp className="h-3 w-3 mr-1" />Proceed</Badge>;
      case 'hold':
        return <Badge className="bg-yellow-100 text-yellow-800"><Pause className="h-3 w-3 mr-1" />Hold</Badge>;
      case 'reject':
        return <Badge className="bg-red-100 text-red-800"><ThumbsDown className="h-3 w-3 mr-1" />Reject</Badge>;
      default:
        return null;
    }
  };

  const skillAreas = [
    { name: 'Problem Solving', weight: 30 },
    { name: 'Code Quality', weight: 25 },
    { name: 'System Design', weight: 20 },
    { name: 'Communication', weight: 15 },
    { name: 'Best Practices', weight: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Technical Interview - Completed
            </CardTitle>
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Feedback
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < feedback.overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-900">Overall Rating</p>
              <p className="text-2xl font-bold text-blue-600">{feedback.overallRating}/5</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MessageSquare className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Recommendation</p>
              <div className="mt-2">{getRecommendationBadge()}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Interview Date</p>
              <p className="text-sm text-gray-600">{interviewState.scheduledDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Skills Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillAreas.map((area) => {
              const score = feedback.technicalSkills[area.name] || 0;
              return (
                <div key={area.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{area.name}</h4>
                      <Badge variant="outline">{area.weight}% weight</Badge>
                    </div>
                    <Progress value={(score / 5) * 100} className="h-2" />
                  </div>
                  <div className="ml-4 text-right">
                    <span className="text-lg font-semibold text-gray-900">{score}</span>
                    <span className="text-sm text-gray-500">/5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interview Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Interview Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{feedback.notes}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

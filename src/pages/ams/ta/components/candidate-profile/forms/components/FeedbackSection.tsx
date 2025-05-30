
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Star,
  CheckCircle,
  Target
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { InterviewState } from './TechnicalInterviewTab';

interface FeedbackSectionProps {
  candidate: Candidate;
  interviewState: InterviewState;
  onSubmitFeedback: (feedbackData: any) => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  candidate,
  interviewState,
  onSubmitFeedback
}) => {
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    technicalSkills: {
      'Problem Solving': 0,
      'Code Quality': 0,
      'System Design': 0,
      'Communication': 0,
      'Best Practices': 0
    },
    notes: '',
    recommendation: ''
  });

  const skillAreas = [
    { name: 'Problem Solving', weight: 30 },
    { name: 'Code Quality', weight: 25 },
    { name: 'System Design', weight: 20 },
    { name: 'Communication', weight: 15 },
    { name: 'Best Practices', weight: 10 }
  ];

  const handleSkillRatingChange = (skill: string, rating: number) => {
    setFeedback(prev => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [skill]: rating
      }
    }));
  };

  const handleSubmit = () => {
    onSubmitFeedback(feedback);
  };

  const isFormValid = feedback.overallRating > 0 && feedback.recommendation && feedback.notes.trim();

  return (
    <div className="space-y-6">
      {/* Technical Skills Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Technical Skills Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillAreas.map((area) => (
              <div key={area.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{area.name}</Label>
                  <Badge variant="outline">{area.weight}% weight</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={(feedback.technicalSkills[area.name] / 5) * 100} className="h-2" />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleSkillRatingChange(area.name, rating)}
                        className={`p-1 ${
                          feedback.technicalSkills[area.name] >= rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium w-8 text-center">
                    {feedback.technicalSkills[area.name]}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="font-medium mb-2 block">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFeedback(prev => ({ ...prev, overallRating: rating }))}
                  className={`p-1 ${
                    feedback.overallRating >= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
              <span className="ml-2 font-medium">{feedback.overallRating}/5</span>
            </div>
          </div>

          <div>
            <Label htmlFor="recommendation" className="font-medium">Recommendation</Label>
            <Select value={feedback.recommendation} onValueChange={(value) => setFeedback(prev => ({ ...prev, recommendation: value }))}>
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

          <div>
            <Label htmlFor="notes" className="font-medium">Interview Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter detailed feedback about the candidate's performance..."
              value={feedback.notes}
              onChange={(e) => setFeedback(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

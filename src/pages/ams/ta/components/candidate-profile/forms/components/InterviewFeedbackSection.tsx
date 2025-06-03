
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Award } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { TechnicalInterviewData } from '../hooks/useTechnicalInterviewManagement';

interface InterviewFeedbackSectionProps {
  candidate: Candidate;
  interviewData: TechnicalInterviewData;
  onSubmitFeedback: (feedback: TechnicalInterviewData['feedback']) => void;
  isLoading: boolean;
}

export const InterviewFeedbackSection: React.FC<InterviewFeedbackSectionProps> = ({
  candidate,
  interviewData,
  onSubmitFeedback,
  isLoading
}) => {
  const [feedbackData, setFeedbackData] = useState<Partial<TechnicalInterviewData['feedback']>>({
    technicalSkills: {
      'Problem Solving': 0,
      'Code Quality': 0,
      'System Design': 0,
      'Communication': 0,
      'Best Practices': 0
    },
    overallRating: 0,
    recommendation: 'hold',
    strengths: '',
    weaknesses: '',
    detailedNotes: ''
  });

  // If feedback already exists, show read-only view
  if (interviewData.feedback) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Interview Feedback</h3>
          <Badge variant="outline" className="ml-auto">
            Submitted {new Date(interviewData.feedback.submittedAt).toLocaleDateString()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Technical Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(interviewData.feedback.technicalSkills).map(([skill, rating]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="font-medium">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{rating}/5</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Rating</span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${interviewData.feedback.overallRating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{interviewData.feedback.overallRating}/5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Recommendation</span>
                <Badge variant={
                  interviewData.feedback.recommendation === 'proceed' ? 'default' :
                  interviewData.feedback.recommendation === 'hold' ? 'secondary' : 'destructive'
                }>
                  {interviewData.feedback.recommendation === 'proceed' && <ThumbsUp className="h-3 w-3 mr-1" />}
                  {interviewData.feedback.recommendation === 'reject' && <ThumbsDown className="h-3 w-3 mr-1" />}
                  {interviewData.feedback.recommendation.toUpperCase()}
                </Badge>
              </div>

              <div>
                <span className="font-medium">Submitted by</span>
                <p className="text-sm text-gray-600">{interviewData.feedback.submittedBy}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-green-700">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{interviewData.feedback.strengths || 'No strengths noted'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-amber-700">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{interviewData.feedback.weaknesses || 'No areas for improvement noted'}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detailed Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">
              {interviewData.feedback.detailedNotes || 'No detailed notes provided'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show feedback form if interview is completed but no feedback submitted
  if (interviewData.status !== 'completed' && interviewData.status !== 'in-progress') {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Interview Not Yet Completed
        </h3>
        <p className="text-gray-600">
          Feedback can be submitted once the interview is in progress or completed.
        </p>
      </div>
    );
  }

  const handleSkillRatingChange = (skill: string, rating: number) => {
    setFeedbackData(prev => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills!,
        [skill]: rating
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback: TechnicalInterviewData['feedback'] = {
      technicalSkills: feedbackData.technicalSkills!,
      overallRating: feedbackData.overallRating!,
      recommendation: feedbackData.recommendation as any,
      strengths: feedbackData.strengths!,
      weaknesses: feedbackData.weaknesses!,
      detailedNotes: feedbackData.detailedNotes!,
      submittedAt: new Date().toISOString(),
      submittedBy: 'Current User' // TODO: Get from auth context
    };

    onSubmitFeedback(feedback);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Submit Interview Feedback</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Technical Skills Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(feedbackData.technicalSkills!).map(([skill, rating]) => (
              <div key={skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={skill}>{skill}</Label>
                  <span className="text-sm text-gray-600">{rating}/5</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleSkillRatingChange(skill, star)}
                      className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="overallRating">Overall Rating</Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackData(prev => ({ ...prev, overallRating: star }))}
                    className={`p-1 ${feedbackData.overallRating! >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
              <span className="text-lg font-semibold">{feedbackData.overallRating}/5</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendation">Recommendation</Label>
            <Select 
              value={feedbackData.recommendation} 
              onValueChange={(value) => setFeedbackData(prev => ({ ...prev, recommendation: value as any }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proceed">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    Proceed to Next Stage
                  </div>
                </SelectItem>
                <SelectItem value="hold">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    Hold for Review
                  </div>
                </SelectItem>
                <SelectItem value="reject">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                    Do Not Proceed
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="What did the candidate do well?"
              value={feedbackData.strengths}
              onChange={(e) => setFeedbackData(prev => ({ ...prev, strengths: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weaknesses">Areas for Improvement</Label>
            <Textarea
              id="weaknesses"
              placeholder="What areas need improvement?"
              value={feedbackData.weaknesses}
              onChange={(e) => setFeedbackData(prev => ({ ...prev, weaknesses: e.target.value }))}
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="detailedNotes">Detailed Notes</Label>
          <Textarea
            id="detailedNotes"
            placeholder="Provide detailed feedback about the interview..."
            value={feedbackData.detailedNotes}
            onChange={(e) => setFeedbackData(prev => ({ ...prev, detailedNotes: e.target.value }))}
            rows={6}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || !feedbackData.overallRating || !feedbackData.recommendation}
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </form>
    </div>
  );
};

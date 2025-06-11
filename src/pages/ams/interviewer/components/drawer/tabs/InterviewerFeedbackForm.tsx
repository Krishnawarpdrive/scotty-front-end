
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewerFeedbackFormProps {
  interview: Interview;
}

export const InterviewerFeedbackForm: React.FC<InterviewerFeedbackFormProps> = ({
  interview
}) => {
  const [ratings, setRatings] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    culturalFit: 0
  });
  
  const [feedback, setFeedback] = useState({
    strengths: '',
    improvements: '',
    overallNotes: '',
    recommendation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(interview.status === 'completed');

  const renderStarRating = (category: keyof typeof ratings, label: string) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRatings(prev => ({ ...prev, [category]: star }))}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`h-5 w-5 ${
                  star <= ratings[category]
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {ratings[category] > 0 ? `${ratings[category]}/5` : 'Not rated'}
          </span>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    // Mock submission
    setIsSubmitted(true);
    console.log('Feedback submitted:', { ratings, feedback });
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Feedback Submitted</h3>
                <p className="text-sm text-green-700">
                  Your feedback has been successfully submitted and shared with the hiring team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display submitted feedback summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Feedback Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Overall Rating</h4>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.2/5 Average</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Recommendation</h4>
              <Badge className="bg-green-100 text-green-800">
                Strongly Recommend
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {interview.status !== 'completed' && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-amber-800">
                Interview is {interview.status}. You can save draft feedback or wait until completion to submit.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rating Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Evaluation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStarRating('technical', 'Technical Skills')}
          {renderStarRating('communication', 'Communication')}
          {renderStarRating('problemSolving', 'Problem Solving')}
          {renderStarRating('culturalFit', 'Cultural Fit')}
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Key Strengths
            </label>
            <Textarea
              value={feedback.strengths}
              onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
              placeholder="What did the candidate do well?"
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Areas for Improvement
            </label>
            <Textarea
              value={feedback.improvements}
              onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
              placeholder="What areas could the candidate improve?"
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Overall Notes
            </label>
            <Textarea
              value={feedback.overallNotes}
              onChange={(e) => setFeedback(prev => ({ ...prev, overallNotes: e.target.value }))}
              placeholder="Any additional observations or notes?"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['Strongly Recommend', 'Recommend', 'Maybe', 'Do Not Recommend'].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="recommendation"
                  value={option}
                  checked={feedback.recommendation === option}
                  onChange={(e) => setFeedback(prev => ({ ...prev, recommendation: e.target.value }))}
                  className="text-blue-600"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex space-x-3">
        <Button 
          onClick={handleSubmit}
          className="flex-1"
          disabled={Object.values(ratings).some(r => r === 0) || !feedback.recommendation}
        >
          Submit Feedback
        </Button>
        <Button variant="outline">
          Save Draft
        </Button>
      </div>
    </div>
  );
};

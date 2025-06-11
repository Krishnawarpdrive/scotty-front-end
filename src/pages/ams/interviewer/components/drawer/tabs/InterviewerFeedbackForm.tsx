
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Star,
  ThumbsUp,
  ThumbsDown,
  Save
} from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewerFeedbackFormProps {
  interview: Interview;
}

export const InterviewerFeedbackForm: React.FC<InterviewerFeedbackFormProps> = ({
  interview
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState<'hire' | 'reject' | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSaveFeedback = () => {
    console.log('Saving feedback:', { rating, feedback, recommendation });
    // Implementation for saving feedback
  };

  return (
    <div className="space-y-6">
      {/* Rating Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingClick(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Click to rate the candidate's performance
          </p>
        </CardContent>
      </Card>

      {/* Recommendation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              variant={recommendation === 'hire' ? 'default' : 'outline'}
              onClick={() => setRecommendation('hire')}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Recommend Hire</span>
            </Button>
            <Button
              variant={recommendation === 'reject' ? 'destructive' : 'outline'}
              onClick={() => setRecommendation('reject')}
              className="flex items-center space-x-2"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>Do Not Recommend</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Provide detailed feedback about the candidate's performance, strengths, areas for improvement, and any other relevant observations..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      {/* Status and Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={interview.status === 'completed' ? 'default' : 'secondary'}>
            {interview.status === 'completed' ? 'Ready for Review' : 'Pending Completion'}
          </Badge>
        </div>
        
        <Button 
          onClick={handleSaveFeedback}
          disabled={!rating || !recommendation}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Feedback</span>
        </Button>
      </div>
    </div>
  );
};

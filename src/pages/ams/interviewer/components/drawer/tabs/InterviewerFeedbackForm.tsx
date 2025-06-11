
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle,
  Save
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerFeedbackFormProps {
  interview: Interview;
}

export const InterviewerFeedbackForm: React.FC<InterviewerFeedbackFormProps> = ({
  interview
}) => {
  const [feedback, setFeedback] = useState({
    overallRating: [4],
    technicalSkills: [4],
    communication: [4],
    problemSolving: [4],
    culturalFit: [4],
    recommendation: 'proceed',
    notes: '',
    strengths: '',
    improvements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Feedback submitted:', feedback);
    }, 1000);
  };

  const ratingLabels = {
    1: 'Poor',
    2: 'Below Average',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };

  const RatingSlider = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: number[]; 
    onChange: (value: number[]) => void 
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{value[0]}/5</span>
          <Badge variant="outline" className="text-xs">
            {ratingLabels[value[0] as keyof typeof ratingLabels]}
          </Badge>
        </div>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        max={5}
        min={1}
        step={1}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RatingSlider
            label="Overall Rating"
            value={feedback.overallRating}
            onChange={(value) => setFeedback(prev => ({ ...prev, overallRating: value }))}
          />

          <Separator />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Recommendation</Label>
            <RadioGroup
              value={feedback.recommendation}
              onValueChange={(value) => setFeedback(prev => ({ ...prev, recommendation: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="proceed" id="proceed" />
                <Label htmlFor="proceed" className="flex items-center space-x-2 cursor-pointer">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <span>Proceed to next round</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hold" id="hold" />
                <Label htmlFor="hold" className="flex items-center space-x-2 cursor-pointer">
                  <span className="h-4 w-4 rounded-full bg-yellow-400" />
                  <span>Hold/Undecided</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject" className="flex items-center space-x-2 cursor-pointer">
                  <ThumbsDown className="h-4 w-4 text-red-600" />
                  <span>Do not proceed</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Ratings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Evaluation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RatingSlider
            label="Technical Skills"
            value={feedback.technicalSkills}
            onChange={(value) => setFeedback(prev => ({ ...prev, technicalSkills: value }))}
          />
          
          <RatingSlider
            label="Communication"
            value={feedback.communication}
            onChange={(value) => setFeedback(prev => ({ ...prev, communication: value }))}
          />
          
          <RatingSlider
            label="Problem Solving"
            value={feedback.problemSolving}
            onChange={(value) => setFeedback(prev => ({ ...prev, problemSolving: value }))}
          />
          
          <RatingSlider
            label="Cultural Fit"
            value={feedback.culturalFit}
            onChange={(value) => setFeedback(prev => ({ ...prev, culturalFit: value }))}
          />
        </CardContent>
      </Card>

      {/* Written Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Written Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strengths">Key Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="What impressed you about this candidate?"
              value={feedback.strengths}
              onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="improvements">Areas for Improvement</Label>
            <Textarea
              id="improvements"
              placeholder="What areas could the candidate work on?"
              value={feedback.improvements}
              onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional comments or observations..."
              value={feedback.notes}
              onChange={(e) => setFeedback(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star,
  Target,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Pause,
  User,
  Calendar,
  Clock
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface InterviewFeedbackTabProps {
  candidate: Candidate;
  interviewData: any;
  onFeedbackSave: (feedbackData: any) => void;
}

export const InterviewFeedbackTab: React.FC<InterviewFeedbackTabProps> = ({
  candidate,
  interviewData,
  onFeedbackSave
}) => {
  const [activeSection, setActiveSection] = useState('technical');
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    technicalSkills: {
      'Problem Solving': 0,
      'Code Quality': 0,
      'System Design': 0,
      'Technical Communication': 0,
      'Best Practices': 0
    },
    behavioralSkills: {
      'Communication': 0,
      'Teamwork': 0,
      'Problem Solving Approach': 0,
      'Cultural Fit': 0,
      'Learning Ability': 0
    },
    strengths: '',
    areasForImprovement: '',
    detailedNotes: '',
    recommendation: '',
    confidenceLevel: 0
  });

  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'submitted'>('draft');

  const skillAreas = [
    { name: 'Problem Solving', weight: 30, category: 'technical' },
    { name: 'Code Quality', weight: 25, category: 'technical' },
    { name: 'System Design', weight: 20, category: 'technical' },
    { name: 'Technical Communication', weight: 15, category: 'technical' },
    { name: 'Best Practices', weight: 10, category: 'technical' }
  ];

  const behavioralAreas = [
    { name: 'Communication', weight: 25, category: 'behavioral' },
    { name: 'Teamwork', weight: 20, category: 'behavioral' },
    { name: 'Problem Solving Approach', weight: 20, category: 'behavioral' },
    { name: 'Cultural Fit', weight: 20, category: 'behavioral' },
    { name: 'Learning Ability', weight: 15, category: 'behavioral' }
  ];

  const handleSkillRatingChange = (skill: string, rating: number, category: 'technical' | 'behavioral') => {
    setFeedback(prev => ({
      ...prev,
      [category === 'technical' ? 'technicalSkills' : 'behavioralSkills']: {
        ...prev[category === 'technical' ? 'technicalSkills' : 'behavioralSkills'],
        [skill]: rating
      }
    }));
  };

  const calculateOverallScore = () => {
    const technicalAvg = Object.values(feedback.technicalSkills).reduce((a, b) => a + b, 0) / Object.values(feedback.technicalSkills).length;
    const behavioralAvg = Object.values(feedback.behavioralSkills).reduce((a, b) => a + b, 0) / Object.values(feedback.behavioralSkills).length;
    return ((technicalAvg * 0.7) + (behavioralAvg * 0.3)).toFixed(1);
  };

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

  const handleSubmit = () => {
    const finalFeedback = {
      ...feedback,
      overallScore: calculateOverallScore(),
      submittedAt: new Date().toISOString(),
      interviewData
    };
    
    setSubmissionStatus('submitted');
    onFeedbackSave(finalFeedback);
  };

  const isFormValid = feedback.overallRating > 0 && feedback.recommendation && feedback.detailedNotes.trim();
  const isExternalPanelist = interviewData?.type === 'external';

  if (submissionStatus === 'submitted') {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Feedback Submitted Successfully!
          </h3>
          <p className="text-gray-600">
            Your interview feedback for {candidate.name} has been recorded.
          </p>
        </div>

        <Card className="p-4 bg-gray-50">
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Score</span>
              <span className="text-lg font-bold text-blue-600">{calculateOverallScore()}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Recommendation</span>
              {getRecommendationBadge()}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Interviewer</span>
              <span className="text-sm">{interviewData?.panelist?.name}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Interview Not Scheduled
        </h3>
        <p className="text-gray-600">
          Please schedule the interview first before providing feedback.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isExternalPanelist ? 'border-2 border-yellow-300 rounded-lg p-4' : ''}`}>
      {/* Interview Summary */}
      <Card className={`${isExternalPanelist ? 'bg-yellow-50 border-yellow-200' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Interview Feedback Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Interviewer</p>
                <p className="text-sm text-gray-600">{interviewData.panelist.name}</p>
                {isExternalPanelist && (
                  <Badge variant="outline" className="text-xs mt-1 border-yellow-500 text-yellow-700">
                    External
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-gray-600">{new Date(interviewData.timeSlot?.start || new Date()).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-gray-600">60 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Technical Skills Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                          onClick={() => handleSkillRatingChange(area.name, rating, 'technical')}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Behavioral Skills Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {behavioralAreas.map((area) => (
                <div key={area.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{area.name}</Label>
                    <Badge variant="outline">{area.weight}% weight</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={(feedback.behavioralSkills[area.name] / 5) * 100} className="h-2" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleSkillRatingChange(area.name, rating, 'behavioral')}
                          className={`p-1 ${
                            feedback.behavioralSkills[area.name] >= rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm font-medium w-8 text-center">
                      {feedback.behavioralSkills[area.name]}/5
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment & Recommendation</CardTitle>
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
                  <span className="ml-2 text-sm text-gray-500">
                    (Calculated: {calculateOverallScore()}/5)
                  </span>
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
                <Label htmlFor="strengths" className="font-medium">Key Strengths</Label>
                <Textarea
                  id="strengths"
                  placeholder="What were the candidate's key strengths during the interview?"
                  value={feedback.strengths}
                  onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="improvements" className="font-medium">Areas for Improvement</Label>
                <Textarea
                  id="improvements"
                  placeholder="What areas could the candidate improve upon?"
                  value={feedback.areasForImprovement}
                  onChange={(e) => setFeedback(prev => ({ ...prev, areasForImprovement: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes" className="font-medium">Detailed Interview Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Provide detailed feedback about the candidate's performance, specific examples, and any additional observations..."
                  value={feedback.detailedNotes}
                  onChange={(e) => setFeedback(prev => ({ ...prev, detailedNotes: e.target.value }))}
                  rows={6}
                />
              </div>

              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid}
                className="w-full"
                size="lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Interview Feedback
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

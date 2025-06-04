
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  FileText,
  Building,
  MapPin,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterviewHistory {
  id: string;
  type: string;
  date: string;
  interviewer: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  feedback?: string;
  rating?: number;
  duration: string;
  notes?: string;
}

interface ApplicationDetails {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  location: string;
  employmentType: string;
  workMode: string;
  jobDescription: string;
  requirements: string[];
  skillsRequired: string[];
  interviewHistory: InterviewHistory[];
}

interface CandidateApplicationDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  application: ApplicationDetails | null;
  onViewFullDetails: (applicationId: string) => void;
  onSubmitReview: (interviewId: string, review: any) => void;
}

export const CandidateApplicationDetailDrawer: React.FC<CandidateApplicationDetailDrawerProps> = ({
  open,
  onClose,
  application,
  onViewFullDetails,
  onSubmitReview
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewingInterview, setReviewingInterview] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    feedback: '',
    experience: '',
    recommendations: ''
  });

  if (!application) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSubmitReview = (interviewId: string) => {
    onSubmitReview(interviewId, reviewForm);
    setReviewingInterview(null);
    setReviewForm({ rating: 0, feedback: '', experience: '', recommendations: '' });
  };

  const renderStarRating = (rating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'h-5 w-5 cursor-pointer',
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            )}
            onClick={() => onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl">{application.roleName}</DrawerTitle>
              <p className="text-gray-600 mt-1">{application.companyName}</p>
            </div>
            <Button
              onClick={() => onViewFullDetails(application.id)}
              className="flex items-center gap-2"
            >
              View Full Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <Badge className={cn(
              application.status === 'active' ? 'bg-blue-100 text-blue-700' :
              application.status === 'offer' ? 'bg-green-100 text-green-700' :
              application.status === 'rejected' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            )}>
              {application.status}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {application.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="h-4 w-4" />
              {application.employmentType} • {application.workMode}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Application Progress</span>
              <span>{application.progress}%</span>
            </div>
            <Progress value={application.progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">Current Stage: {application.currentStage}</p>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interviews">Interview History</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{application.jobDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {application.skillsRequired.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Application Submitted</p>
                        <p className="text-sm text-gray-600">{application.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Currently in {application.currentStage}</p>
                        <p className="text-sm text-gray-600">Active stage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4 mt-4">
              {application.interviewHistory.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Interviews Yet</h3>
                    <p className="text-gray-600">Your interview history will appear here once scheduled.</p>
                  </CardContent>
                </Card>
              ) : (
                application.interviewHistory.map((interview) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{interview.type}</CardTitle>
                          <p className="text-sm text-gray-600">with {interview.interviewer}</p>
                        </div>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {interview.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {interview.duration}
                          </div>
                        </div>

                        {interview.rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rating:</span>
                            {renderStarRating(interview.rating)}
                          </div>
                        )}

                        {interview.feedback && (
                          <div>
                            <p className="text-sm font-medium mb-1">Feedback:</p>
                            <p className="text-sm text-gray-700">{interview.feedback}</p>
                          </div>
                        )}

                        {interview.status === 'completed' && !interview.rating && (
                          <div className="border-t pt-3">
                            {reviewingInterview === interview.id ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Your Rating</label>
                                  {renderStarRating(reviewForm.rating, (rating) => 
                                    setReviewForm(prev => ({ ...prev, rating }))
                                  )}
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Interview Experience</label>
                                  <textarea
                                    value={reviewForm.experience}
                                    onChange={(e) => setReviewForm(prev => ({ ...prev, experience: e.target.value }))}
                                    className="w-full p-2 border rounded-md text-sm"
                                    rows={3}
                                    placeholder="How was your interview experience?"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Feedback for Interviewer</label>
                                  <textarea
                                    value={reviewForm.feedback}
                                    onChange={(e) => setReviewForm(prev => ({ ...prev, feedback: e.target.value }))}
                                    className="w-full p-2 border rounded-md text-sm"
                                    rows={2}
                                    placeholder="Any feedback for the interviewer?"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleSubmitReview(interview.id)}
                                    disabled={reviewForm.rating === 0}
                                  >
                                    Submit Review
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => setReviewingInterview(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setReviewingInterview(interview.id)}
                                className="flex items-center gap-2"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Submit Review
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Role Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {application.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">{requirement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {application.skillsRequired.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

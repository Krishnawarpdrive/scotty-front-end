
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare,
  Star,
  User,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from 'lucide-react';

interface RecentFeedbackProps {
  searchTerm: string;
}

export const RecentFeedback: React.FC<RecentFeedbackProps> = ({ searchTerm }) => {
  const feedbackList = [
    {
      id: '1',
      candidateName: 'John Smith',
      role: 'Senior Frontend Developer',
      interviewer: 'Sarah Johnson',
      interviewDate: '2024-01-24',
      rating: 4.5,
      recommendation: 'proceed',
      submittedAt: '2024-01-24 15:30',
      status: 'submitted',
      feedback: 'Strong technical skills, good problem-solving approach. Excellent communication.',
      strengths: ['React expertise', 'System thinking', 'Communication'],
      improvements: ['Testing knowledge could be deeper']
    },
    {
      id: '2',
      candidateName: 'Emily Davis',
      role: 'Product Manager',
      interviewer: 'Mike Chen',
      interviewDate: '2024-01-24',
      rating: 3.8,
      recommendation: 'hold',
      submittedAt: '2024-01-24 14:15',
      status: 'submitted',
      feedback: 'Good product sense but needs more experience with technical stakeholders.',
      strengths: ['Product vision', 'User empathy', 'Data analysis'],
      improvements: ['Technical communication', 'Stakeholder management']
    },
    {
      id: '3',
      candidateName: 'Alex Wilson',
      role: 'UX Designer',
      interviewer: 'Lisa Rodriguez',
      interviewDate: '2024-01-24',
      rating: 4.2,
      recommendation: 'proceed',
      submittedAt: '2024-01-24 16:45',
      status: 'submitted',
      feedback: 'Creative problem solver with strong portfolio. Great attention to detail.',
      strengths: ['Design thinking', 'User research', 'Prototyping'],
      improvements: ['Design systems knowledge']
    },
    {
      id: '4',
      candidateName: 'Robert Chen',
      role: 'DevOps Engineer',
      interviewer: 'Jennifer Wu',
      interviewDate: '2024-01-23',
      rating: 0,
      recommendation: 'pending',
      submittedAt: '',
      status: 'overdue',
      feedback: '',
      strengths: [],
      improvements: []
    }
  ];

  const filteredFeedback = feedbackList.filter(feedback =>
    feedback.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'proceed': return 'bg-green-100 text-green-700';
      case 'hold': return 'bg-yellow-100 text-yellow-700';
      case 'reject': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Recent Interview Feedback ({filteredFeedback.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className={`border rounded-lg p-4 ${
                feedback.status === 'overdue' ? 'border-red-200 bg-red-50' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feedback.candidateName}</h4>
                    <p className="text-sm text-gray-600">{feedback.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {feedback.status}
                  </Badge>
                  {feedback.recommendation !== 'pending' && (
                    <Badge className={getRecommendationColor(feedback.recommendation)}>
                      {feedback.recommendation === 'proceed' && <ThumbsUp className="h-3 w-3 mr-1" />}
                      {feedback.recommendation === 'reject' && <ThumbsDown className="h-3 w-3 mr-1" />}
                      {feedback.recommendation}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{feedback.interviewer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(feedback.interviewDate)}</span>
                </div>
                {feedback.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(feedback.rating)}
                    </div>
                    <span>{feedback.rating}</span>
                  </div>
                )}
                {feedback.submittedAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(feedback.submittedAt)}</span>
                  </div>
                )}
              </div>

              {feedback.feedback && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    "{feedback.feedback}"
                  </p>
                </div>
              )}

              {feedback.strengths.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Strengths:</p>
                  <div className="flex flex-wrap gap-2">
                    {feedback.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="text-green-700 border-green-200">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {feedback.improvements.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Areas for improvement:</p>
                  <div className="flex flex-wrap gap-2">
                    {feedback.improvements.map((improvement, index) => (
                      <Badge key={index} variant="outline" className="text-orange-700 border-orange-200">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}

          {filteredFeedback.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No feedback found
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No interview feedback available'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

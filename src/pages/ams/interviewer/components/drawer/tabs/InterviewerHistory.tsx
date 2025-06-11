
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  Star,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewerHistoryProps {
  interview: Interview;
}

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  type: string;
  interviewer: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  rating?: number;
  notes?: string;
}

export const InterviewerHistory: React.FC<InterviewerHistoryProps> = ({
  interview
}) => {
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'Technical Interview',
      interviewer: 'You',
      status: 'scheduled',
      notes: 'Current interview session'
    },
    {
      id: '2',
      date: '2024-01-10',
      time: '10:00 AM',
      type: 'Phone Screening',
      interviewer: 'Sarah Chen',
      status: 'completed',
      rating: 4,
      notes: 'Strong technical background, good communication skills'
    },
    {
      id: '3',
      date: '2024-01-08',
      time: '3:30 PM',
      type: 'HR Screening',
      interviewer: 'Mike Johnson',
      status: 'completed',
      rating: 5,
      notes: 'Excellent cultural fit, very enthusiastic about the role'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Interview Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-xs text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">2</div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Interview History</h3>
        
        {historyItems.map((item, index) => (
          <Card 
            key={item.id} 
            className={`${item.status === 'scheduled' ? 'border-blue-200 bg-blue-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{item.type}</h4>
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.time}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {item.interviewer}
                    </div>
                  </div>
                  
                  {item.rating && (
                    <div className="mb-2">
                      {renderStars(item.rating)}
                    </div>
                  )}
                  
                  {item.notes && (
                    <p className="text-sm text-gray-700">{item.notes}</p>
                  )}
                </div>
                
                {item.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    View Feedback
                  </Button>
                )}
                
                {item.status === 'scheduled' && item.interviewer === 'You' && (
                  <Button size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Join Now
                  </Button>
                )}
              </div>
              
              {/* Progress indicator line */}
              {index < historyItems.length - 1 && (
                <div className="absolute left-8 mt-2 w-0.5 h-6 bg-gray-200"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Interviews */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-amber-800">
            <Clock className="h-5 w-5 mr-2" />
            Upcoming Interviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-amber-900">Final Interview</p>
                <p className="text-sm text-amber-700">January 20, 2024 at 3:00 PM</p>
              </div>
              <Badge variant="outline" className="text-amber-700 border-amber-300">
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

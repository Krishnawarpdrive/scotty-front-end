
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Interview } from '../MyInterviewsPage';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Video,
  MessageSquare,
  User,
  Building2,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

interface InterviewerCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export const InterviewerCandidateDetailDrawer: React.FC<InterviewerCandidateDetailDrawerProps> = ({
  open,
  onClose,
  interview
}) => {
  if (!interview) {
    return (
      <SideDrawer
        open={open}
        onOpenChange={onClose}
        size="lg"
        title="Interview Details"
        description="No interview selected"
      >
        <div className="p-6">
          <p className="text-gray-500">No interview data available</p>
        </div>
      </SideDrawer>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const interviewDate = new Date(interview.scheduledDate);

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      size="lg"
      title="Interview Details"
      description="Candidate and interview information"
    >
      <div className="p-6 space-y-6">
        {/* Candidate Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt={interview.candidateName} />
                <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                  {getInitials(interview.candidateName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{interview.candidateName}</h2>
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{interview.candidateEmail}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  {interview.meetingLink && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => window.open(interview.meetingLink, '_blank')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Interview
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Interview Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-sm text-gray-900">{interview.roleName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Client</label>
                <p className="text-sm text-gray-900">{interview.clientName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Date & Time</label>
                <p className="text-sm text-gray-900">
                  {format(interviewDate, 'MMM dd, yyyy')} at {format(interviewDate, 'hh:mm a')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-sm text-gray-900">{interview.duration} minutes</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Interview Type</label>
                <Badge variant="outline" className="capitalize">
                  {interview.interviewType}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-sm text-gray-900">
                  {interview.meetingLink ? 'Virtual Meeting' : interview.location || 'Not specified'}
                </p>
              </div>
            </div>

            {interview.notes && (
              <div>
                <label className="text-sm font-medium text-gray-500">Notes</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{interview.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interview Feedback (for completed interviews) */}
        {interview.status === 'completed' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-600" />
                Interview Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {interview.rating && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Rating</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= interview.rating! 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({interview.rating}/5)</span>
                  </div>
                </div>
              )}

              {interview.feedback && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Feedback</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{interview.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </SideDrawer>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Phone,
  MessageSquare,
  Star,
  MapPin
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerDrawerHeaderProps {
  interview: Interview;
  onClose: () => void;
}

export const InterviewerDrawerHeader: React.FC<InterviewerDrawerHeaderProps> = ({
  interview,
  onClose
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-white/50"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="p-6 pb-4">
        {/* Candidate Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src="" alt={interview.candidateName} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-medium">
              {getInitials(interview.candidateName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 mb-1 truncate">
              {interview.candidateName}
            </h1>
            
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getStatusColor(interview.status)} variant="secondary">
                {interview.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {interview.type}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-1">{interview.role}</p>
            <p className="text-sm text-gray-500">{interview.client}</p>
          </div>
        </div>

        {/* Interview Details Row */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-lg border border-white/50">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{interview.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{interview.time}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {interview.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{interview.location}</span>
              </div>
            )}
            {interview.rating && (
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                <span>{interview.rating}/5</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mt-4">
          <Button size="sm" className="flex-1">
            <Video className="h-4 w-4 mr-2" />
            Join Interview
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

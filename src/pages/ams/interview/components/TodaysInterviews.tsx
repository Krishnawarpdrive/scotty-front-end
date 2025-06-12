
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  Building
} from 'lucide-react';

interface TodaysInterviewsProps {
  searchTerm: string;
}

export const TodaysInterviews: React.FC<TodaysInterviewsProps> = ({ searchTerm }) => {
  const todaysInterviews = [
    {
      id: '1',
      candidateName: 'John Smith',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      time: '09:00 AM',
      duration: '60 min',
      type: 'Technical',
      interviewer: 'Sarah Johnson',
      status: 'scheduled',
      meetingType: 'video',
      meetingLink: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: '2',
      candidateName: 'Emily Davis',
      role: 'Product Manager',
      company: 'DataFlow Systems',
      time: '11:30 AM',
      duration: '45 min',
      type: 'Behavioral',
      interviewer: 'Mike Chen',
      status: 'in-progress',
      meetingType: 'in-person',
      location: 'Conference Room A'
    },
    {
      id: '3',
      candidateName: 'Alex Wilson',
      role: 'UX Designer',
      company: 'Creative Labs',
      time: '02:00 PM',
      duration: '90 min',
      type: 'Portfolio Review',
      interviewer: 'Lisa Rodriguez',
      status: 'scheduled',
      meetingType: 'video',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '4',
      candidateName: 'Maria Garcia',
      role: 'Backend Engineer',
      company: 'CloudTech Solutions',
      time: '04:30 PM',
      duration: '75 min',
      type: 'System Design',
      interviewer: 'David Park',
      status: 'completed',
      meetingType: 'video',
      meetingLink: 'https://teams.microsoft.com/meeting/abc'
    }
  ];

  const filteredInterviews = todaysInterviews.filter(interview =>
    interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Video className="h-4 w-4" />;
      case 'completed': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Interviews ({filteredInterviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{interview.candidateName}</h4>
                    <p className="text-sm text-gray-600">{interview.role}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(interview.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(interview.status)}
                    {interview.status}
                  </span>
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{interview.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{interview.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{interview.interviewer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {interview.meetingType === 'video' ? (
                    <>
                      <Video className="h-4 w-4" />
                      <span>Video Call</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4" />
                      <span>{interview.location}</span>
                    </>
                  )}
                  <Badge variant="outline" className="ml-2">
                    {interview.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  {interview.meetingLink && interview.status !== 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(interview.meetingLink, '_blank')}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredInterviews.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No interviews found
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No interviews scheduled for today'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

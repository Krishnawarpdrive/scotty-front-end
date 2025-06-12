
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

interface UpcomingInterviewsProps {
  searchTerm: string;
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ searchTerm }) => {
  const upcomingInterviews = [
    {
      id: '1',
      candidateName: 'Robert Chen',
      role: 'DevOps Engineer',
      company: 'CloudScale Inc',
      date: '2024-01-26',
      time: '10:00 AM',
      duration: '60 min',
      type: 'Technical',
      interviewer: 'Jennifer Wu',
      status: 'scheduled',
      meetingType: 'video',
      meetingLink: 'https://meet.google.com/xyz-abc-def'
    },
    {
      id: '2',
      candidateName: 'Amanda Foster',
      role: 'Marketing Manager',
      company: 'BrandForce',
      date: '2024-01-26',
      time: '02:30 PM',
      duration: '45 min',
      type: 'Behavioral',
      interviewer: 'Tom Bradley',
      status: 'confirmed',
      meetingType: 'in-person',
      location: 'Office Building 2, Floor 3'
    },
    {
      id: '3',
      candidateName: 'Kevin Zhang',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      date: '2024-01-27',
      time: '11:00 AM',
      duration: '90 min',
      type: 'Technical + Case Study',
      interviewer: 'Dr. Sarah Kim',
      status: 'scheduled',
      meetingType: 'video',
      meetingLink: 'https://zoom.us/j/987654321'
    },
    {
      id: '4',
      candidateName: 'Lisa Thompson',
      role: 'Senior UX Designer',
      company: 'DesignHub',
      date: '2024-01-27',
      time: '03:00 PM',
      duration: '75 min',
      type: 'Portfolio Review',
      interviewer: 'Mark Stevens',
      status: 'rescheduled',
      meetingType: 'video',
      meetingLink: 'https://teams.microsoft.com/meeting/xyz'
    }
  ];

  const filteredInterviews = upcomingInterviews.filter(interview =>
    interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Interviews ({filteredInterviews.length})
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
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{interview.candidateName}</h4>
                    <p className="text-sm text-gray-600">{interview.role}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(interview.date)}</span>
                </div>
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
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
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
                No upcoming interviews found
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No upcoming interviews scheduled'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

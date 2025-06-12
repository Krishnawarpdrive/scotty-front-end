import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users,
  MapPin,
  Phone,
  Laptop,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';

interface InterviewsScheduleProps {
  interviews: any[];
}

export const InterviewsSchedule: React.FC<InterviewsScheduleProps> = ({ interviews }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {interviews.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No interviews scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div key={interview.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{interview.title}</h3>
                    <p className="text-gray-600">{interview.company}</p>
                  </div>
                  <Badge variant="secondary">{interview.status}</Badge>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Video className="h-4 w-4 mr-1" />
                    <span>{interview.type} Interview</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                  <Button size="sm">
                    Join Interview
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

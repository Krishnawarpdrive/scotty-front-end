
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Eye,
  Download,
  Briefcase,
  TrendingUp
} from 'lucide-react';

interface CandidateDataTablesProps {
  dashboardData: any;
}

export const CandidateDataTables: React.FC<CandidateDataTablesProps> = ({ dashboardData }) => {
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const mockApplications = [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      status: 'Interview',
      progress: 65,
      appliedDate: '2024-01-15'
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      status: 'Applied',
      progress: 25,
      appliedDate: '2024-01-20'
    }
  ];

  const mockInterviews = [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'Technical'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Company</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Progress</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockApplications.map((app) => (
                  <tr key={app.id} className="border-b">
                    <td className="p-2">{app.role}</td>
                    <td className="p-2">{app.company}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{app.status}</Badge>
                    </td>
                    <td className="p-2">
                      <div className="w-20">
                        <Progress value={app.progress} className="h-2" />
                      </div>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{dashboardData.totalApplications || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Applications</p>
                <p className="text-2xl font-bold">{dashboardData.activeApplications || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold">{dashboardData.interviewsScheduled || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {mockInterviews.length > 0 ? (
            <div className="space-y-3">
              {mockInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{interview.role}</p>
                    <p className="text-sm text-gray-600">{interview.company}</p>
                    <p className="text-sm text-gray-500">{interview.date} at {interview.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{interview.type}</Badge>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No upcoming interviews</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

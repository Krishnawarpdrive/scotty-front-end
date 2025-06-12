
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react';

interface CandidateLeftSidebarProps {
  data: any;
}

export const CandidateLeftSidebar: React.FC<CandidateLeftSidebarProps> = ({ data }) => {
  const profileCompletion = data?.profile_completion_percentage || 0;
  const activeApplications = data?.active_applications || 0;
  const interviewsScheduled = data?.interviews_scheduled || 0;
  const documentsVerified = data?.documents_verified || 0;
  const documentsUploaded = data?.documents_uploaded || 0;

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Profile Completion */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
              <div className="flex items-center gap-2">
                {profileCompletion === 100 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                )}
                <span className="text-xs text-gray-600">
                  {profileCompletion === 100 ? 'Profile Complete' : 'Complete your profile to boost visibility'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Applications</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {activeApplications}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Applications</span>
              <Badge variant="outline">
                {data?.total_applications || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Success Rate</span>
              <span className="text-sm font-medium text-blue-600">
                {activeApplications > 0 ? Math.round((activeApplications / (data?.total_applications || 1)) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Interview Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Interview Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Upcoming Interviews</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {interviewsScheduled}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Completed Interviews</span>
              <Badge variant="outline">
                {data?.interviews_completed || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Results</span>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {data?.interviews_completed - (data?.interviews_results_received || 0) || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Document Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Uploaded</span>
              <Badge variant="outline">
                {documentsUploaded}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Verified</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {documentsVerified}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Verification</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {documentsUploaded - documentsVerified}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Assessments Pending</span>
              <span className="font-medium">{data?.pending_assessments || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Response Rate</span>
              <span className="font-medium text-green-600">85%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Avg. Response Time</span>
              <span className="font-medium">2.4 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

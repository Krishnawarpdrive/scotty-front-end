import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CandidateQuickInsightsProps {
  dashboardData: any;
}

export const CandidateQuickInsights: React.FC<CandidateQuickInsightsProps> = ({ dashboardData }) => {
  if (!dashboardData) {
    return <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>
      <CardContent>
        Loading...
      </CardContent>
    </Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Response Rate</p>
              <p className="text-lg font-semibold">{dashboardData.quickStats.responseRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Avg. Progress Time</p>
              <p className="text-lg font-semibold">{dashboardData.quickStats.averageProgressTime}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Interview Success Rate</p>
              <p className="text-lg font-semibold">{dashboardData.quickStats.interviewSuccessRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm font-medium">Active Applications</p>
              <p className="text-lg font-semibold">{dashboardData.quickStats.activeApplications}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Profile Completion</p>
            <p className="text-sm text-gray-600">{dashboardData.profileCompletion}%</p>
          </div>
          <Progress value={dashboardData.profileCompletion} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

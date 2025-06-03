
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Target,
  Activity
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';
import type { TechnicalInterviewData } from '../hooks/useTechnicalInterviewManagement';

interface InterviewAnalyticsSectionProps {
  candidate: Candidate;
  interviewData: TechnicalInterviewData;
}

export const InterviewAnalyticsSection: React.FC<InterviewAnalyticsSectionProps> = ({
  candidate,
  interviewData
}) => {
  // Mock analytics data - in real app, calculate from actual data
  const analytics = {
    timeToSchedule: interviewData.analytics?.timeToSchedule || 0,
    timeToComplete: interviewData.analytics?.timeToComplete || 0,
    rescheduledCount: interviewData.analytics?.rescheduledCount || 0,
    feedbackQuality: interviewData.analytics?.feedbackQuality || 0,
    
    // Additional mock analytics
    averageTimeToSchedule: 3.2, // days
    averageTimeToComplete: 2.1, // days
    successRate: 78, // percentage
    interviewerRating: 4.2, // out of 5
    candidateExperience: 4.0 // out of 5
  };

  const formatDuration = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return '< 1h';
  };

  const getPerformanceIndicator = (current: number, average: number, reverse = false) => {
    const isGood = reverse ? current < average : current > average;
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Interview Analytics</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Time to Schedule</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {analytics.timeToSchedule > 0 ? formatDuration(analytics.timeToSchedule) : '-'}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Avg: {analytics.averageTimeToSchedule}d</span>
                {analytics.timeToSchedule > 0 && (
                  <TrendingUp className={`h-3 w-3 ${getPerformanceIndicator(analytics.timeToSchedule / (1000 * 60 * 60 * 24), analytics.averageTimeToSchedule, true)}`} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Time to Complete</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {analytics.timeToComplete > 0 ? formatDuration(analytics.timeToComplete) : '-'}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Avg: {analytics.averageTimeToComplete}d</span>
                {analytics.timeToComplete > 0 && (
                  <TrendingDown className={`h-3 w-3 ${getPerformanceIndicator(analytics.timeToComplete / (1000 * 60 * 60 * 24), analytics.averageTimeToComplete, true)}`} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Reschedules</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{analytics.rescheduledCount}</div>
              <div className="text-xs text-gray-500">
                {analytics.rescheduledCount === 0 ? 'Perfect timing' : 
                 analytics.rescheduledCount === 1 ? 'Once rescheduled' : 
                 `${analytics.rescheduledCount} times`}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{analytics.successRate}%</div>
              <Progress value={analytics.successRate} className="h-1 mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Process Efficiency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scheduling Speed</span>
                <Badge variant={analytics.timeToSchedule <= analytics.averageTimeToSchedule * 1000 * 60 * 60 * 24 ? 'default' : 'secondary'}>
                  {analytics.timeToSchedule <= analytics.averageTimeToSchedule * 1000 * 60 * 60 * 24 ? 'Fast' : 'Average'}
                </Badge>
              </div>
              <Progress 
                value={Math.max(20, 100 - (analytics.timeToSchedule / (1000 * 60 * 60 * 24) / analytics.averageTimeToSchedule * 50))} 
                className="h-2" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <Badge variant={interviewData.status === 'completed' ? 'default' : 'secondary'}>
                  {interviewData.status === 'completed' ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              <Progress 
                value={interviewData.status === 'completed' ? 100 : interviewData.status === 'scheduled' ? 50 : 25} 
                className="h-2" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Process Stability</span>
                <Badge variant={analytics.rescheduledCount <= 1 ? 'default' : 'destructive'}>
                  {analytics.rescheduledCount <= 1 ? 'Stable' : 'Unstable'}
                </Badge>
              </div>
              <Progress 
                value={Math.max(20, 100 - (analytics.rescheduledCount * 30))} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Interviewer Rating</span>
                <span className="font-medium">{analytics.interviewerRating}/5</span>
              </div>
              <Progress value={analytics.interviewerRating * 20} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Feedback Quality</span>
                <span className="font-medium">
                  {interviewData.feedback ? 'High' : 'Pending'}
                </span>
              </div>
              <Progress 
                value={interviewData.feedback ? 85 : 0} 
                className="h-2" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Candidate Experience</span>
                <span className="font-medium">{analytics.candidateExperience}/5</span>
              </div>
              <Progress value={analytics.candidateExperience * 20} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Process Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.rescheduledCount > 1 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <Activity className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Multiple Reschedules Detected</p>
                  <p className="text-xs text-yellow-700">
                    Consider implementing buffer time or improving initial scheduling coordination.
                  </p>
                </div>
              </div>
            )}

            {!interviewData.feedback && interviewData.status === 'completed' && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Feedback Pending</p>
                  <p className="text-xs text-blue-700">
                    Prompt feedback submission improves candidate experience and process efficiency.
                  </p>
                </div>
              </div>
            )}

            {analytics.timeToSchedule > analytics.averageTimeToSchedule * 1000 * 60 * 60 * 24 && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Slow Scheduling</p>
                  <p className="text-xs text-orange-700">
                    Consider automated scheduling tools or dedicated coordinators for faster turnaround.
                  </p>
                </div>
              </div>
            )}

            {analytics.rescheduledCount === 0 && interviewData.status === 'completed' && interviewData.feedback && (
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Excellent Process Execution</p>
                  <p className="text-xs text-green-700">
                    This interview process was completed efficiently with no issues. Great work!
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

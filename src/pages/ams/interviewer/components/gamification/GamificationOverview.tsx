
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, TrendingUp, Star, Zap, Award } from 'lucide-react';
import type { InterviewPanelist, InterviewerMetric, InterviewerAchievement } from '../../types/InterviewerTypes';

interface GamificationOverviewProps {
  interviewer: InterviewPanelist | null;
  metrics: InterviewerMetric[];
  achievements: InterviewerAchievement[];
}

export const GamificationOverview: React.FC<GamificationOverviewProps> = ({
  interviewer,
  metrics,
  achievements
}) => {
  if (!interviewer) return null;

  const currentMonthMetrics = metrics.filter(m => {
    const metricDate = new Date(m.period_start);
    const now = new Date();
    return metricDate.getMonth() === now.getMonth() && metricDate.getFullYear() === now.getFullYear();
  });

  const interviewsThisMonth = currentMonthMetrics
    .filter(m => m.metric_type === 'interviews_conducted')
    .reduce((sum, m) => sum + m.metric_value, 0);

  const feedbacksThisMonth = currentMonthMetrics
    .filter(m => m.metric_type === 'feedback_submitted')
    .reduce((sum, m) => sum + m.metric_value, 0);

  const recentAchievements = achievements.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Goals Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Goals</CardTitle>
          <Target className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Interviews</span>
                <span>{interviewsThisMonth}/{interviewer.monthly_interview_goal || 10}</span>
              </div>
              <Progress 
                value={(interviewsThisMonth / (interviewer.monthly_interview_goal || 10)) * 100} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Feedback</span>
                <span>{feedbacksThisMonth}/{interviewer.weekly_feedback_goal || 5}</span>
              </div>
              <Progress 
                value={(feedbacksThisMonth / (interviewer.weekly_feedback_goal || 5)) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points & Level */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Experience</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{interviewer.total_points || 0} XP</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Level {interviewer.current_level || 1}</Badge>
              <span className="text-sm text-gray-500">
                {interviewer.xp_to_next_level || 0} to next level
              </span>
            </div>
            <Progress 
              value={((interviewer.total_points || 0) % 1000) / 10} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Recent Achievements</CardTitle>
          <Award className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentAchievements.length > 0 ? (
              recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-2">
                  <Trophy className={`h-4 w-4 ${
                    achievement.tier === 'gold' ? 'text-yellow-500' :
                    achievement.tier === 'silver' ? 'text-gray-400' :
                    achievement.tier === 'bronze' ? 'text-orange-600' :
                    'text-purple-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{achievement.achievement_name}</div>
                    <div className="text-xs text-gray-500">+{achievement.points_awarded} XP</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No achievements yet</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{interviewer.total_interviews || 0}</div>
              <div className="text-sm text-gray-500">Total Interviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{interviewer.rating?.toFixed(1) || 0}</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{interviewer.interviews_converted_to_offers || 0}</div>
              <div className="text-sm text-gray-500">Converted to Offers</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{achievements.length}</div>
              <div className="text-sm text-gray-500">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

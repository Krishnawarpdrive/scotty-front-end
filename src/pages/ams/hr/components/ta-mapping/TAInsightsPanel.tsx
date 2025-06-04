
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Brain,
  BarChart3,
  Users
} from 'lucide-react';

interface TAProfile {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'on_leave';
  skills: string[];
  certifications: string[];
  experience_years: number;
  current_workload: number;
  max_workload: number;
  efficiency_score: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

interface TAAssignment {
  id: string;
  ta_id: string;
  client_id: string;
  requirement_id?: string;
  assigned_at: string;
  status: 'active' | 'completed' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  assignment_type: string;
  target_completion_date?: string;
  notes?: string;
}

interface TAPerformanceInsight {
  id: string;
  ta_id: string;
  insight_type: 'strength' | 'improvement_area' | 'recommendation' | 'trend';
  insight_data: Record<string, any>;
  confidence_score: number;
  generated_at: string;
  is_active: boolean;
}

interface TAAssignmentMetrics {
  id: string;
  assignment_id: string;
  metric_type: 'candidates_sourced' | 'interviews_scheduled' | 'offers_made' | 'hires_completed';
  target_value: number;
  actual_value: number;
  measurement_period_start: string;
  measurement_period_end: string;
}

interface TAInsightsPanelProps {
  taProfiles: TAProfile[];
  assignments: TAAssignment[];
  performanceInsights: TAPerformanceInsight[];
  assignmentMetrics: TAAssignmentMetrics[];
}

export const TAInsightsPanel: React.FC<TAInsightsPanelProps> = ({
  taProfiles,
  assignments,
  performanceInsights,
  assignmentMetrics
}) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'improvement_area': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'recommendation': return <Brain className="h-4 w-4 text-blue-600" />;
      case 'trend': return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-green-100 text-green-700 border-green-200';
      case 'improvement_area': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'recommendation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'trend': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Calculate team-wide insights
  const topPerformers = taProfiles
    .filter(ta => ta.efficiency_score > 85)
    .sort((a, b) => b.efficiency_score - a.efficiency_score)
    .slice(0, 3);

  const overloadedTAs = taProfiles.filter(ta => 
    (ta.current_workload / ta.max_workload) > 0.9
  );

  const underutilizedTAs = taProfiles.filter(ta => 
    (ta.current_workload / ta.max_workload) < 0.5
  );

  const avgTeamEfficiency = taProfiles.reduce((acc, ta) => acc + ta.efficiency_score, 0) / taProfiles.length;
  const avgTeamSuccessRate = taProfiles.reduce((acc, ta) => acc + ta.success_rate, 0) / taProfiles.length;

  return (
    <div className="space-y-6">
      {/* Team Overview Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Team Efficiency</p>
                <p className="text-xl font-bold">{avgTeamEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-xl font-bold">{avgTeamSuccessRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Overloaded TAs</p>
                <p className="text-xl font-bold">{overloadedTAs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Underutilized</p>
                <p className="text-xl font-bold">{underutilizedTAs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI-Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceInsights.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No insights generated yet</p>
                </div>
              ) : (
                performanceInsights.slice(0, 5).map((insight) => {
                  const ta = taProfiles.find(t => t.id === insight.ta_id);
                  return (
                    <div key={insight.id} className={`p-3 rounded-lg border ${getInsightColor(insight.insight_type)}`}>
                      <div className="flex items-start space-x-2">
                        {getInsightIcon(insight.insight_type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{ta?.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {(insight.confidence_score * 100).toFixed(0)}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm">
                            {insight.insight_data.title || `${insight.insight_type.replace('_', ' ')} insight`}
                          </p>
                          {insight.insight_data.description && (
                            <p className="text-xs mt-1 opacity-75">
                              {insight.insight_data.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Top Performers */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Top Performers
                </h4>
                <div className="space-y-2">
                  {topPerformers.map((ta) => (
                    <div key={ta.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium">{ta.name}</span>
                      <Badge className="bg-green-100 text-green-700">
                        {ta.efficiency_score}% efficiency
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workload Concerns */}
              {overloadedTAs.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    Workload Concerns
                  </h4>
                  <div className="space-y-2">
                    {overloadedTAs.map((ta) => {
                      const utilization = (ta.current_workload / ta.max_workload) * 100;
                      return (
                        <div key={ta.id} className="p-2 bg-orange-50 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{ta.name}</span>
                            <span className="text-xs text-orange-600">{utilization.toFixed(0)}% capacity</span>
                          </div>
                          <Progress value={utilization} className="h-1" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <Brain className="h-4 w-4 text-blue-600" />
                  Smart Recommendations
                </h4>
                <div className="space-y-2">
                  {underutilizedTAs.length > 0 && overloadedTAs.length > 0 && (
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <p className="font-medium text-blue-900">Redistribute Workload</p>
                      <p className="text-blue-700">
                        Consider moving assignments from overloaded TAs to {underutilizedTAs.length} underutilized team members.
                      </p>
                    </div>
                  )}
                  
                  {topPerformers.length > 0 && (
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <p className="font-medium text-green-900">Leverage Top Talent</p>
                      <p className="text-green-700">
                        {topPerformers[0].name} shows exceptional performance - consider expanding their responsibilities.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Metrics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['candidates_sourced', 'interviews_scheduled', 'offers_made', 'hires_completed'].map((metricType) => {
              const metrics = assignmentMetrics.filter(m => m.metric_type === metricType);
              const totalTarget = metrics.reduce((acc, m) => acc + m.target_value, 0);
              const totalActual = metrics.reduce((acc, m) => acc + m.actual_value, 0);
              const achievementRate = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

              return (
                <div key={metricType} className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2 capitalize">
                    {metricType.replace('_', ' ')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target: {totalTarget}</span>
                      <span>Actual: {totalActual}</span>
                    </div>
                    <Progress value={Math.min(achievementRate, 100)} className="h-2" />
                    <p className="text-xs text-gray-600 text-center">
                      {achievementRate.toFixed(1)}% achievement
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

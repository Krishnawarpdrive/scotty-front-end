
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock
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

interface PerformanceInsight {
  id: string;
  ta_id: string;
  insight_type: string;
  insight_data: Record<string, any>;
  confidence_score: number;
  generated_at: string;
  is_active: boolean;
}

interface AssignmentMetric {
  id: string;
  assignment_id: string;
  metric_type: string;
  target_value: number;
  actual_value: number;
  measurement_period_start: string;
  measurement_period_end: string;
}

interface TAInsightsPanelProps {
  taProfiles: TAProfile[];
  assignments: TAAssignment[];
  performanceInsights: PerformanceInsight[];
  assignmentMetrics: AssignmentMetric[];
}

export const TAInsightsPanel: React.FC<TAInsightsPanelProps> = ({
  taProfiles,
  assignments,
  performanceInsights,
  assignmentMetrics
}) => {
  const getTopPerformers = () => {
    return taProfiles
      .sort((a, b) => b.efficiency_score - a.efficiency_score)
      .slice(0, 3);
  };

  const getWorkloadDistribution = () => {
    const overloaded = taProfiles.filter(ta => (ta.current_workload / ta.max_workload) >= 0.9).length;
    const optimal = taProfiles.filter(ta => {
      const ratio = ta.current_workload / ta.max_workload;
      return ratio >= 0.5 && ratio < 0.9;
    }).length;
    const underutilized = taProfiles.filter(ta => (ta.current_workload / ta.max_workload) < 0.5).length;

    return { overloaded, optimal, underutilized };
  };

  const getAssignmentTrends = () => {
    const activeAssignments = assignments.filter(a => a.status === 'active').length;
    const completedThisWeek = assignments.filter(a => {
      const assignedDate = new Date(a.assigned_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return a.status === 'completed' && assignedDate >= weekAgo;
    }).length;
    
    return { activeAssignments, completedThisWeek };
  };

  const topPerformers = getTopPerformers();
  const workloadDistribution = getWorkloadDistribution();
  const assignmentTrends = getAssignmentTrends();

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Efficiency</p>
                <p className="text-xl font-bold">
                  {(taProfiles.reduce((acc, ta) => acc + ta.efficiency_score, 0) / taProfiles.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-xl font-bold">{assignmentTrends.activeAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Completed This Week</p>
                <p className="text-xl font-bold">{assignmentTrends.completedThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((ta, index) => (
              <div key={ta.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{ta.name}</h4>
                    <p className="text-sm text-gray-600">{ta.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{ta.efficiency_score}% efficiency</p>
                  <p className="text-sm text-gray-600">{ta.success_rate}% success rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workload Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-medium text-red-900">Overloaded</h3>
              <p className="text-2xl font-bold text-red-600">{workloadDistribution.overloaded}</p>
              <p className="text-sm text-red-700">TAs (≥90% capacity)</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium text-green-900">Optimal</h3>
              <p className="text-2xl font-bold text-green-600">{workloadDistribution.optimal}</p>
              <p className="text-sm text-green-700">TAs (50-90% capacity)</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium text-blue-900">Underutilized</h3>
              <p className="text-2xl font-bold text-blue-600">{workloadDistribution.underutilized}</p>
              <p className="text-sm text-blue-700">TAs (&lt;50% capacity)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceInsights.filter(insight => insight.is_active).slice(0, 5).map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{insight.insight_type.replace('_', ' ').toUpperCase()}</h4>
                  <Badge variant="outline">
                    {Math.round(insight.confidence_score * 100)}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  TA: {taProfiles.find(ta => ta.id === insight.ta_id)?.name || 'Unknown'}
                </p>
                <div className="mt-2 text-sm">
                  {Object.entries(insight.insight_data).map(([key, value]) => (
                    <p key={key} className="text-gray-700">
                      <strong>{key.replace('_', ' ')}:</strong> {String(value)}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-xs text-gray-500">
                    Generated: {new Date(insight.generated_at).toLocaleDateString()}
                  </span>
                  <Clock className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            ))}
            
            {performanceInsights.filter(insight => insight.is_active).length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Performance Insights</h3>
                <p>Performance insights will appear here as data is collected.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

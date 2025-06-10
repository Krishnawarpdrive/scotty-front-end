
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';

interface TAInsightsPanelProps {
  taProfiles: any[];
  assignments: any[];
  performanceInsights: any[];
  assignmentMetrics: any[];
}

export const TAInsightsPanel: React.FC<TAInsightsPanelProps> = ({
  taProfiles,
  assignments,
  performanceInsights,
  assignmentMetrics
}) => {
  const topPerformers = taProfiles
    .sort((a, b) => b.efficiency_score - a.efficiency_score)
    .slice(0, 3);

  const totalEfficiency = taProfiles.reduce((acc, ta) => acc + ta.efficiency_score, 0) / taProfiles.length || 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Team Efficiency</p>
                <p className="text-xl font-bold">{totalEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total TAs</p>
                <p className="text-xl font-bold">{taProfiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-xl font-bold">{assignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Performance Insights</p>
                <p className="text-xl font-bold">{performanceInsights.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing TAs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((ta, index) => (
              <div key={ta.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{ta.name}</div>
                    <div className="text-sm text-gray-600">{ta.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Efficiency</div>
                    <div className="font-bold text-green-600">{ta.efficiency_score}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Workload</div>
                    <div className="font-bold">{ta.current_workload}/{ta.max_workload}</div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Top Performer
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      {performanceInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceInsights.slice(0, 5).map((insight) => (
                <div key={insight.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{insight.insight_type.replace('_', ' ').toUpperCase()}</div>
                    <Badge variant="outline">
                      {Math.round(insight.confidence_score * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {insight.insight_data?.recommendation || 'Performance insight available'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

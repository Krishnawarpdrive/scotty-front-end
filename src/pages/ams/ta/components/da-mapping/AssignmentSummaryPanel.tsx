
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { AssignmentMapping, DAProfile, ClientRole } from './DAMappingInterface';

interface AssignmentSummaryPanelProps {
  assignments: AssignmentMapping[];
  daProfiles: DAProfile[];
  clientRoles: ClientRole[];
}

export const AssignmentSummaryPanel: React.FC<AssignmentSummaryPanelProps> = ({
  assignments,
  daProfiles,
  clientRoles
}) => {
  // Calculate summary statistics
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => a.status === 'active').length;
  const averageWorkload = daProfiles.reduce((sum, da) => sum + da.current_workload, 0) / daProfiles.length || 0;
  const overloadedDAs = daProfiles.filter(da => da.current_workload > 80).length;
  
  // Get recent assignments
  const recentAssignments = assignments
    .sort((a, b) => new Date(b.assigned_at).getTime() - new Date(a.assigned_at).getTime())
    .slice(0, 5);

  // Get workload distribution
  const workloadRanges = {
    low: daProfiles.filter(da => da.current_workload < 50).length,
    medium: daProfiles.filter(da => da.current_workload >= 50 && da.current_workload < 80).length,
    high: daProfiles.filter(da => da.current_workload >= 80).length
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case 'primary': return 'bg-blue-100 text-blue-800';
      case 'secondary': return 'bg-green-100 text-green-800';
      case 'backup': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDAName = (daId: string) => {
    const da = daProfiles.find(d => d.id === daId);
    return da ? da.name : 'Unknown DA';
  };

  const getRoleName = (roleId: string) => {
    const role = clientRoles.find(r => r.id === roleId);
    return role ? role.role_name : 'Unknown Role';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Assignment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{totalAssignments}</p>
              <p className="text-xs text-blue-700">Total Assignments</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{activeAssignments}</p>
              <p className="text-xs text-green-700">Active</p>
            </div>
          </div>

          {/* Average Workload */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Average Workload</span>
              <span>{Math.round(averageWorkload)}%</span>
            </div>
            <Progress value={averageWorkload} className="h-2" />
          </div>

          {/* Alerts */}
          {overloadedDAs > 0 && (
            <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">
                {overloadedDAs} DA{overloadedDAs > 1 ? 's' : ''} overloaded (>80%)
              </span>
            </div>
          )}
        </div>

        {/* Workload Distribution */}
        <div>
          <h4 className="font-medium text-sm mb-3">Workload Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Low (&lt;50%)</span>
              <span className="font-medium">{workloadRanges.low} DAs</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Medium (50-80%)</span>
              <span className="font-medium">{workloadRanges.medium} DAs</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">High (&gt;80%)</span>
              <span className="font-medium text-red-600">{workloadRanges.high} DAs</span>
            </div>
          </div>
        </div>

        {/* Recent Assignments */}
        <div>
          <h4 className="font-medium text-sm mb-3">Recent Assignments</h4>
          <div className="space-y-2">
            {recentAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-2 border border-gray-200 rounded-md text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">
                    {getDAName(assignment.da_id)}
                  </span>
                  <Badge className={getAssignmentTypeColor(assignment.assignment_type)} variant="secondary">
                    {assignment.assignment_type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {getRoleName(assignment.client_role_id)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(assignment.assigned_at).toLocaleDateString()}
                </p>
              </div>
            ))}
            
            {recentAssignments.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No recent assignments
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-1 gap-2">
            <button className="text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              View Detailed Analytics
            </button>
            <button className="text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Export Assignment Report
            </button>
            <button className="text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Optimize Workload Distribution
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

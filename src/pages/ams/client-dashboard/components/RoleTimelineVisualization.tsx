
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, Clock, CheckCircle } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  department: string;
  status: 'Active' | 'On Hold' | 'Completed';
  progress: number;
  totalPositions: number;
  filledPositions: number;
  candidatesInPipeline: number;
  targetDate: string;
  daysRemaining: number;
  stages: {
    applied: number;
    screening: number;
    interview: number;
    offer: number;
    hired: number;
  };
}

interface RoleTimelineVisualizationProps {
  roles: Role[];
  onRoleClick?: (role: Role) => void;
}

export const RoleTimelineVisualization: React.FC<RoleTimelineVisualizationProps> = ({
  roles,
  onRoleClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getUrgencyIndicator = (daysRemaining: number) => {
    if (daysRemaining <= 7) return 'bg-red-100 text-red-800';
    if (daysRemaining <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Role Hiring Timeline</CardTitle>
        <p className="text-[13px] text-gray-600">Visual progress tracking for all active roles</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onRoleClick?.(role)}
            >
              {/* Role Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{role.title}</h3>
                  <p className="text-[13px] text-gray-600">{role.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(role.status)}>
                    {role.status}
                  </Badge>
                  <Badge className={getUrgencyIndicator(role.daysRemaining)}>
                    {role.daysRemaining}d left
                  </Badge>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-3 w-3 text-gray-500" />
                    <span className="text-[11px] text-gray-500">Positions</span>
                  </div>
                  <p className="text-sm font-medium">{role.filledPositions}/{role.totalPositions}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-[11px] text-gray-500">Pipeline</span>
                  </div>
                  <p className="text-sm font-medium">{role.candidatesInPipeline}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-[11px] text-gray-500">Progress</span>
                  </div>
                  <p className="text-sm font-medium">{role.progress}%</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="h-3 w-3 text-gray-500" />
                    <span className="text-[11px] text-gray-500">Target</span>
                  </div>
                  <p className="text-sm font-medium">{role.targetDate}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-500">Overall Progress</span>
                  <span className="text-[11px] font-medium">{role.progress}%</span>
                </div>
                <Progress value={role.progress} className="h-2" />
              </div>

              {/* Pipeline Stages */}
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(role.stages).map(([stage, count]) => (
                  <div key={stage} className="text-center">
                    <div className="text-[11px] text-gray-500 capitalize mb-1">{stage}</div>
                    <div className={`w-full h-6 rounded flex items-center justify-center text-xs font-medium text-white ${
                      count > 0 ? 'bg-primary' : 'bg-gray-200'
                    }`}>
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

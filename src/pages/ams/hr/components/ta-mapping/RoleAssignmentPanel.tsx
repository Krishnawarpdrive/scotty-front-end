
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';

interface RoleAssignmentPanelProps {
  taId: string;
  roleId: string;
  assignments: any[];
  onAssignmentUpdate: (assignmentId: string, updates: any) => void;
}

export const RoleAssignmentPanel: React.FC<RoleAssignmentPanelProps> = ({
  taId,
  roleId,
  assignments,
  onAssignmentUpdate
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // Mock data for demonstration
  const taMetrics = {
    totalAssignments: assignments.length,
    completedThisWeek: Math.floor(assignments.length * 0.3),
    avgTimeToComplete: '4.2 days',
    successRate: 87,
    currentCapacity: 75,
    weeklyTarget: 10,
    weeklyActual: 7
  };

  const weeklyProgress = [
    { day: 'Mon', target: 2, actual: 2, completed: true },
    { day: 'Tue', target: 2, actual: 1, completed: false },
    { day: 'Wed', target: 2, actual: 2, completed: true },
    { day: 'Thu', target: 2, actual: 1, completed: false },
    { day: 'Fri', target: 2, actual: 1, completed: false },
  ];

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'on_hold': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* TA Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Weekly Progress</span>
            <span className="text-sm text-gray-600">{taMetrics.weeklyActual}/{taMetrics.weeklyTarget}</span>
          </div>
          <Progress value={(taMetrics.weeklyActual / taMetrics.weeklyTarget) * 100} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Capacity</span>
            <span className="text-sm text-gray-600">{taMetrics.currentCapacity}%</span>
          </div>
          <Progress value={taMetrics.currentCapacity} className="h-2" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Success Rate</p>
                <p className="text-lg font-bold">{taMetrics.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Avg Completion</p>
                <p className="text-lg font-bold">{taMetrics.avgTimeToComplete}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-10">{day.day}</span>
                  <div className="flex items-center space-x-1">
                    {day.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{day.actual}/{day.target}</span>
                  <div className="w-16">
                    <Progress value={(day.actual / day.target) * 100} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No assignments for this TA</p>
              </div>
            ) : (
              assignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAssignment === assignment.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAssignment(assignment.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Assignment #{assignment.id.slice(0, 8)}</h4>
                    <div className="flex items-center space-x-1">
                      <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                        {assignment.priority}
                      </Badge>
                      <Badge className={getAssignmentStatusColor(assignment.status)} variant="secondary">
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}</span>
                      {assignment.target_completion_date && (
                        <span>Due: {new Date(assignment.target_completion_date).toLocaleDateString()}</span>
                      )}
                    </div>
                    
                    {assignment.notes && (
                      <p className="text-xs text-gray-500 mt-1">{assignment.notes}</p>
                    )}
                  </div>

                  {selectedAssignment === assignment.id && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAssignmentUpdate(assignment.id, { status: 'completed' });
                          }}
                        >
                          Mark Complete
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAssignmentUpdate(assignment.id, { status: 'on_hold' });
                          }}
                        >
                          Put on Hold
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-2 p-2 bg-green-50 border border-green-200 rounded">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Strong Performance</p>
                <p className="text-xs text-green-700">Consistently meeting weekly targets with high efficiency</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 bg-blue-50 border border-blue-200 rounded">
              <Target className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Capacity Available</p>
                <p className="text-xs text-blue-700">Can take on 2-3 additional assignments this week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

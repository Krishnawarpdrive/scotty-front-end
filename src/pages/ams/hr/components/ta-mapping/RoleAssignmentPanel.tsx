
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Activity
} from 'lucide-react';

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

interface AssignmentMetric {
  id: string;
  assignment_id: string;
  metric_type: string;
  target_value: number;
  actual_value: number;
  measurement_period_start: string;
  measurement_period_end: string;
}

interface RoleAssignmentPanelProps {
  taId: string;
  roleId: string;
  assignments: TAAssignment[];
  assignmentMetrics: AssignmentMetric[];
  onAssignmentUpdate: (assignmentId: string, status: 'active' | 'completed' | 'on_hold') => void;
}

export const RoleAssignmentPanel: React.FC<RoleAssignmentPanelProps> = ({
  taId,
  roleId,
  assignments,
  assignmentMetrics,
  onAssignmentUpdate
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const getAssignmentMetrics = (assignmentId: string) => {
    return assignmentMetrics.filter(metric => metric.assignment_id === assignmentId);
  };

  const calculateProgress = (metrics: AssignmentMetric[]) => {
    if (metrics.length === 0) return 0;
    const totalProgress = metrics.reduce((acc, metric) => {
      const progress = metric.target_value > 0 ? (metric.actual_value / metric.target_value) * 100 : 0;
      return acc + Math.min(progress, 100);
    }, 0);
    return Math.round(totalProgress / metrics.length);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'on_hold': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Assignment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-xl font-bold">{assignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-bold">
                  {assignments.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold">
                  {assignments.filter(a => a.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Assignment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const metrics = getAssignmentMetrics(assignment.id);
              const progress = calculateProgress(metrics);
              
              return (
                <div 
                  key={assignment.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAssignment === assignment.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAssignment(
                    selectedAssignment === assignment.id ? null : assignment.id
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Assignment #{assignment.id.slice(0, 8)}</h4>
                      <p className="text-sm text-gray-600">
                        Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                        {assignment.priority}
                      </Badge>
                      <Badge className={getStatusColor(assignment.status)} variant="secondary">
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    {assignment.target_completion_date && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {new Date(assignment.target_completion_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedAssignment === assignment.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Assignment Metrics</h5>
                          <div className="space-y-2">
                            {metrics.map((metric) => (
                              <div key={metric.id} className="p-2 bg-gray-50 rounded text-sm">
                                <div className="flex justify-between">
                                  <span>{metric.metric_type.replace('_', ' ')}</span>
                                  <span>{metric.actual_value}/{metric.target_value}</span>
                                </div>
                                <Progress 
                                  value={(metric.actual_value / metric.target_value) * 100} 
                                  className="h-1 mt-1" 
                                />
                              </div>
                            ))}
                            {metrics.length === 0 && (
                              <p className="text-gray-500 text-sm">No metrics available</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Actions</h5>
                          <div className="space-y-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAssignmentUpdate(assignment.id, 
                                  assignment.status === 'active' ? 'on_hold' : 'active'
                                );
                              }}
                            >
                              {assignment.status === 'active' ? 'Put on Hold' : 'Activate'}
                            </Button>
                            
                            {assignment.status !== 'completed' && (
                              <Button 
                                size="sm" 
                                variant="default" 
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAssignmentUpdate(assignment.id, 'completed');
                                }}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                          
                          {assignment.notes && (
                            <div className="mt-3">
                              <h6 className="text-sm font-medium mb-1">Notes</h6>
                              <p className="text-sm text-gray-600">{assignment.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {assignments.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Assignments</h3>
                <p>This TA has no assignments for the selected role.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

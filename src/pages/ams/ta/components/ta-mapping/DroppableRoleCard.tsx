
import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  X, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { ClientRole, AssignmentMapping } from './TAMappingInterface';

interface DroppableRoleCardProps {
  role: ClientRole;
  assignments: AssignmentMapping[];
  onDrop: (taId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => void;
  onRemoveAssignment: (assignmentId: string) => void;
}

export const DroppableRoleCard: React.FC<DroppableRoleCardProps> = ({
  role,
  assignments,
  onDrop,
  onRemoveAssignment
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'TA_CARD',
    drop: (item: { id: string; ta: any }) => {
      // Determine assignment type based on existing assignments
      const primaryExists = assignments.some(a => a.assignment_type === 'primary');
      const assignmentType = primaryExists ? 'secondary' : 'primary';
      onDrop(item.id, role.id, assignmentType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fully_assigned': return 'bg-green-100 text-green-800';
      case 'partially_assigned': return 'bg-yellow-100 text-yellow-800';
      case 'unassigned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fully_assigned': return <CheckCircle className="h-4 w-4" />;
      case 'partially_assigned': return <Clock className="h-4 w-4" />;
      case 'unassigned': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  const assignmentProgress = (assignments.length / role.requirements_count) * 100;

  return (
    <Card
      ref={drop}
      className={`transition-all duration-200 ${
        isOver && canDrop 
          ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
          : isOver 
          ? 'border-red-500 bg-red-50' 
          : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Role Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium">{role.role_name}</h4>
                <Badge className={getPriorityColor(role.priority)} variant="secondary">
                  {role.priority}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{role.requirements_count} positions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {new Date(role.due_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {getStatusIcon(role.assignment_status)}
              <Badge className={getStatusColor(role.assignment_status)} variant="secondary">
                {role.assignment_status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Assignment Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Assignment Progress</span>
              <span>{assignments.length}/{role.requirements_count}</span>
            </div>
            <Progress value={assignmentProgress} className="h-2" />
          </div>

          {/* Required Skills */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
            <div className="flex flex-wrap gap-1">
              {role.skills_required.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Current Assignments */}
          {assignments.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Assigned TAs:</p>
              <div className="space-y-2">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={
                          assignment.assignment_type === 'primary' 
                            ? 'bg-blue-100 text-blue-800' 
                            : assignment.assignment_type === 'secondary'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {assignment.assignment_type}
                      </Badge>
                      <span className="text-sm">TA #{assignment.ta_id.slice(0, 8)}</span>
                      <span className="text-xs text-gray-500">
                        {assignment.workload_percentage}% workload
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveAssignment(assignment.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drop Zone Indicator */}
          {isOver && canDrop && (
            <div className="border-2 border-dashed border-blue-400 bg-blue-50 p-4 rounded-lg text-center">
              <Plus className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">Drop TA here to assign</p>
            </div>
          )}
          
          {isOver && !canDrop && (
            <div className="border-2 border-dashed border-red-400 bg-red-50 p-4 rounded-lg text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <p className="text-sm text-red-600 font-medium">Cannot assign this TA</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

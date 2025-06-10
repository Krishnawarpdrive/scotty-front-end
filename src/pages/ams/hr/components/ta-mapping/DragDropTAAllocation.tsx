
import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Target, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Zap
} from 'lucide-react';

interface TA {
  id: string;
  name: string;
  email: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiencyScore: number;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  assignments: number;
}

interface Requirement {
  id: string;
  name: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  targetCandidates: number;
  targetInterviews: number;
  targetClosures: number;
  deadline: string;
  assignedTAs: string[];
  progress: {
    candidates: number;
    interviews: number;
    closures: number;
  };
}

interface DragDropTAAllocationProps {
  requirements: Requirement[];
  availableTAs: TA[];
  onAssignTA: (taId: string, requirementId: string) => void;
  onUnassignTA: (taId: string, requirementId: string) => void;
  onUpdateTargets: (requirementId: string, targets: any) => void;
}

export const DragDropTAAllocation: React.FC<DragDropTAAllocationProps> = ({
  requirements,
  availableTAs,
  onAssignTA,
  onUnassignTA,
  onUpdateTargets
}) => {
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // If dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taId = draggableId.replace('ta-', '');
    
    if (destination.droppableId.startsWith('requirement-')) {
      const requirementId = destination.droppableId.replace('requirement-', '');
      onAssignTA(taId, requirementId);
    } else if (destination.droppableId === 'available-tas') {
      // Remove from current assignment if moving back to available
      if (source.droppableId.startsWith('requirement-')) {
        const requirementId = source.droppableId.replace('requirement-', '');
        onUnassignTA(taId, requirementId);
      }
    }
  }, [onAssignTA, onUnassignTA]);

  const getWorkloadColor = (workload: number, maxWorkload: number) => {
    const percentage = (workload / maxWorkload) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (actual: number, target: number) => {
    return target > 0 ? Math.min((actual / target) * 100, 100) : 0;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">TA Allocation Dashboard</h3>
            <p className="text-sm text-gray-600">
              Drag and drop TAs to assign them to requirements
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {availableTAs.length} TAs Available
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {requirements.length} Requirements
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available TAs Pool */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Available TAs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId="available-tas">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[200px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      {availableTAs
                        .filter(ta => !requirements.some(req => req.assignedTAs.includes(ta.id)))
                        .map((ta, index) => (
                          <Draggable key={ta.id} draggableId={`ta-${ta.id}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 bg-white border rounded-lg shadow-sm cursor-move transition-all ${
                                  snapshot.isDragging 
                                    ? 'shadow-lg rotate-2 scale-105' 
                                    : 'hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {getInitials(ta.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-sm font-medium truncate">{ta.name}</h4>
                                      <Badge 
                                        className={getAvailabilityColor(ta.availability)} 
                                        variant="secondary"
                                      >
                                        {ta.availability}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{ta.email}</p>
                                    
                                    <div className="mt-2 space-y-1">
                                      <div className="flex items-center justify-between text-xs">
                                        <span>Workload</span>
                                        <span>{ta.currentWorkload}/{ta.maxWorkload}</span>
                                      </div>
                                      <Progress 
                                        value={(ta.currentWorkload / ta.maxWorkload) * 100} 
                                        className="h-1"
                                      />
                                      
                                      <div className="flex items-center justify-between text-xs">
                                        <span>Efficiency</span>
                                        <span className="font-medium">{ta.efficiencyScore}%</span>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                      <div className="flex flex-wrap gap-1">
                                        {ta.skills.slice(0, 3).map((skill, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {skill}
                                          </Badge>
                                        ))}
                                        {ta.skills.length > 3 && (
                                          <Badge variant="outline" className="text-xs">
                                            +{ta.skills.length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          {/* Requirements with TA Assignment Areas */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {requirements.map((requirement) => (
                <Card key={requirement.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <CardTitle className="text-base">{requirement.name}</CardTitle>
                          <p className="text-sm text-gray-600">{requirement.client}</p>
                        </div>
                        <Badge className={getPriorityColor(requirement.priority)} variant="secondary">
                          {requirement.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(requirement.deadline).toLocaleDateString()}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedRequirement(
                            selectedRequirement === requirement.id ? null : requirement.id
                          )}
                        >
                          {selectedRequirement === requirement.id ? 'Collapse' : 'Expand'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Target Expectations */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium">Candidates</span>
                        </div>
                        <div className="space-y-1">
                          <Progress 
                            value={calculateProgress(requirement.progress.candidates, requirement.targetCandidates)} 
                            className="h-2"
                          />
                          <div className="text-xs text-gray-600">
                            {requirement.progress.candidates}/{requirement.targetCandidates}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium">Interviews</span>
                        </div>
                        <div className="space-y-1">
                          <Progress 
                            value={calculateProgress(requirement.progress.interviews, requirement.targetInterviews)} 
                            className="h-2"
                          />
                          <div className="text-xs text-gray-600">
                            {requirement.progress.interviews}/{requirement.targetInterviews}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-medium">Closures</span>
                        </div>
                        <div className="space-y-1">
                          <Progress 
                            value={calculateProgress(requirement.progress.closures, requirement.targetClosures)} 
                            className="h-2"
                          />
                          <div className="text-xs text-gray-600">
                            {requirement.progress.closures}/{requirement.targetClosures}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TA Assignment Area */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Assigned TAs ({requirement.assignedTAs.length})
                      </h4>
                      
                      <Droppable droppableId={`requirement-${requirement.id}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[80px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                              snapshot.isDraggingOver 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {requirement.assignedTAs.map((taId, index) => {
                                const ta = availableTAs.find(t => t.id === taId);
                                if (!ta) return null;
                                
                                return (
                                  <Draggable key={taId} draggableId={`ta-${taId}`} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`p-2 bg-white border rounded-lg shadow-sm cursor-move transition-all ${
                                          snapshot.isDragging 
                                            ? 'shadow-lg rotate-1 scale-105' 
                                            : 'hover:shadow-md'
                                        }`}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs">
                                              {getInitials(ta.name)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium truncate">{ta.name}</div>
                                            <div className="text-xs text-gray-500">
                                              {ta.efficiencyScore}% efficiency
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            {ta.currentWorkload >= ta.maxWorkload * 0.9 && (
                                              <AlertTriangle className="h-3 w-3 text-red-500" />
                                            )}
                                            <div 
                                              className={`w-2 h-2 rounded-full ${
                                                getWorkloadColor(ta.currentWorkload, ta.maxWorkload)
                                              }`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            </div>
                            
                            {requirement.assignedTAs.length === 0 && !snapshot.isDraggingOver && (
                              <div className="flex items-center justify-center h-16 text-gray-400">
                                <div className="text-center">
                                  <Users className="h-6 w-6 mx-auto mb-1" />
                                  <p className="text-xs">Drag TAs here to assign</p>
                                </div>
                              </div>
                            )}
                            
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>

                    {/* Expanded Details */}
                    {selectedRequirement === requirement.id && (
                      <div className="pt-3 border-t space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Target Timeline:</span>
                            <p className="text-gray-600">{requirement.deadline}</p>
                          </div>
                          <div>
                            <span className="font-medium">Overall Progress:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress 
                                value={
                                  ((requirement.progress.candidates / requirement.targetCandidates) +
                                   (requirement.progress.interviews / requirement.targetInterviews) +
                                   (requirement.progress.closures / requirement.targetClosures)) / 3 * 100
                                } 
                                className="flex-1 h-2"
                              />
                              <span className="text-xs">
                                {Math.round(
                                  ((requirement.progress.candidates / requirement.targetCandidates) +
                                   (requirement.progress.interviews / requirement.targetInterviews) +
                                   (requirement.progress.closures / requirement.targetClosures)) / 3 * 100
                                )}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Edit Targets
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

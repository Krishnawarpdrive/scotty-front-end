import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTAManagement } from '@/hooks/useTAManagement';
import { Plus, User, Clock, AlertTriangle } from 'lucide-react';

export const TAAssignmentManager: React.FC = () => {
  const { assignments, taProfiles, loading, actions } = useTAManagement();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTA, setSelectedTA] = useState<string>('');
  const [selectedRequirement, setSelectedRequirement] = useState<string>('');

  const handleAssignment = async () => {
    if (!selectedTA || !selectedRequirement) return;

    try {
      await actions.assignTA({
        ta_id: selectedTA,
        requirement_id: selectedRequirement,
        client_id: 'temp-client-id', // This would come from the requirement
        status: 'active',
        priority: 'medium',
        assignment_type: 'primary'
      });
      setIsAssignModalOpen(false);
      setSelectedTA('');
      setSelectedRequirement('');
    } catch (error) {
      console.error('Failed to assign TA:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'on_hold': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return <div className="space-y-4 animate-pulse">
      <div className="h-32 bg-gray-100 rounded-lg" />
      <div className="h-64 bg-gray-100 rounded-lg" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TA Assignments</h2>
          <p className="text-gray-600">Manage talent acquisition assignments and workload</p>
        </div>
        
        <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign TA to Requirement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select TA</label>
                <Select value={selectedTA} onValueChange={setSelectedTA}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a TA" />
                  </SelectTrigger>
                  <SelectContent>
                    {taProfiles.map((ta) => (
                      <SelectItem key={ta.id} value={ta.id}>
                        {ta.name} - {ta.current_workload}/{ta.max_workload} assignments
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Select Requirement</label>
                <Select value={selectedRequirement} onValueChange={setSelectedRequirement}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="req-1">Software Engineer - TechCorp</SelectItem>
                    <SelectItem value="req-2">Product Manager - StartupXYZ</SelectItem>
                    <SelectItem value="req-3">Data Analyst - DataCo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignment}>
                  Assign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-xl font-bold">{assignments.filter(a => a.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold">{assignments.filter(a => a.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">On Hold</p>
                <p className="text-xl font-bold">{assignments.filter(a => a.status === 'on_hold').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-xl font-bold">{assignments.filter(a => a.priority === 'high').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No assignments found. Create your first assignment above.
              </div>
            ) : (
              assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">Requirement #{assignment.requirement_id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">Assigned to: TA #{assignment.ta_id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span>Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}</span>
                      {assignment.deadline && (
                        <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                    <Badge variant={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => actions.updateAssignmentStatus(assignment.id, 
                        assignment.status === 'active' ? 'completed' : 'active'
                      )}
                    >
                      {assignment.status === 'active' ? 'Complete' : 'Reactivate'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

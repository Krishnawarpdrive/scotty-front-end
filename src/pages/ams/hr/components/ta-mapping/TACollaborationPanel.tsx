
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Equal, 
  GraduationCap,
  Plus
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

interface TACollaboration {
  id: string;
  primary_ta_id: string;
  secondary_ta_id: string;
  assignment_id: string;
  collaboration_type: 'primary_secondary' | 'equal_partners' | 'mentor_mentee';
  responsibilities: Record<string, any>;
}

interface TACollaborationPanelProps {
  taProfiles: TAProfile[];
  assignments: TAAssignment[];
  collaborations: TACollaboration[];
  onCreateCollaboration: (
    primaryTaId: string,
    secondaryTaId: string,
    assignmentId: string,
    collaborationType: 'primary_secondary' | 'equal_partners' | 'mentor_mentee',
    responsibilities?: Record<string, any>
  ) => Promise<any>;
}

export const TACollaborationPanel: React.FC<TACollaborationPanelProps> = ({
  taProfiles,
  assignments,
  collaborations,
  onCreateCollaboration
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPrimaryTA, setSelectedPrimaryTA] = useState<string>('');
  const [selectedSecondaryTA, setSelectedSecondaryTA] = useState<string>('');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  const [collaborationType, setCollaborationType] = useState<'primary_secondary' | 'equal_partners' | 'mentor_mentee'>('primary_secondary');
  const [responsibilities, setResponsibilities] = useState('');

  const getCollaborationIcon = (type: string) => {
    switch (type) {
      case 'primary_secondary': return <Crown className="h-4 w-4" />;
      case 'equal_partners': return <Equal className="h-4 w-4" />;
      case 'mentor_mentee': return <GraduationCap className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getCollaborationColor = (type: string) => {
    switch (type) {
      case 'primary_secondary': return 'bg-blue-100 text-blue-700';
      case 'equal_partners': return 'bg-green-100 text-green-700';
      case 'mentor_mentee': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateCollaboration = async () => {
    if (!selectedPrimaryTA || !selectedSecondaryTA || !selectedAssignment) return;

    try {
      const responsibilitiesData = responsibilities ? 
        { notes: responsibilities } : {};
      
      await onCreateCollaboration(
        selectedPrimaryTA,
        selectedSecondaryTA,
        selectedAssignment,
        collaborationType,
        responsibilitiesData
      );

      // Reset form
      setSelectedPrimaryTA('');
      setSelectedSecondaryTA('');
      setSelectedAssignment('');
      setCollaborationType('primary_secondary');
      setResponsibilities('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create collaboration:', error);
    }
  };

  const activeAssignments = assignments.filter(a => a.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">TA Collaborations</h3>
          <p className="text-sm text-gray-600">Manage team assignments and collaborative work</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Collaboration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Collaboration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Primary TA</label>
                <Select value={selectedPrimaryTA} onValueChange={setSelectedPrimaryTA}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary TA" />
                  </SelectTrigger>
                  <SelectContent>
                    {taProfiles.filter(ta => ta.status === 'active').map((ta) => (
                      <SelectItem key={ta.id} value={ta.id}>
                        {ta.name} - {ta.current_workload}/{ta.max_workload} load
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Secondary TA</label>
                <Select value={selectedSecondaryTA} onValueChange={setSelectedSecondaryTA}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary TA" />
                  </SelectTrigger>
                  <SelectContent>
                    {taProfiles
                      .filter(ta => ta.status === 'active' && ta.id !== selectedPrimaryTA)
                      .map((ta) => (
                        <SelectItem key={ta.id} value={ta.id}>
                          {ta.name} - {ta.current_workload}/{ta.max_workload} load
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Assignment</label>
                <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeAssignments.map((assignment) => {
                      const ta = taProfiles.find(t => t.id === assignment.ta_id);
                      return (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          Assignment #{assignment.id.slice(0, 8)} - {ta?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Collaboration Type</label>
                <Select value={collaborationType} onValueChange={(value: any) => setCollaborationType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary_secondary">Primary-Secondary</SelectItem>
                    <SelectItem value="equal_partners">Equal Partners</SelectItem>
                    <SelectItem value="mentor_mentee">Mentor-Mentee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Responsibilities (Optional)</label>
                <Textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  placeholder="Describe roles and responsibilities..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCollaboration}>
                  Create Collaboration
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Collaboration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Collaborations</p>
                <p className="text-xl font-bold">{collaborations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Primary-Secondary</p>
                <p className="text-xl font-bold">
                  {collaborations.filter(c => c.collaboration_type === 'primary_secondary').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Equal className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Equal Partners</p>
                <p className="text-xl font-bold">
                  {collaborations.filter(c => c.collaboration_type === 'equal_partners').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Mentor-Mentee</p>
                <p className="text-xl font-bold">
                  {collaborations.filter(c => c.collaboration_type === 'mentor_mentee').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Collaborations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Collaborations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collaborations.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Collaborations</h3>
                <p>Create your first collaboration to enable team-based assignments.</p>
              </div>
            ) : (
              collaborations.map((collaboration) => {
                const primaryTA = taProfiles.find(ta => ta.id === collaboration.primary_ta_id);
                const secondaryTA = taProfiles.find(ta => ta.id === collaboration.secondary_ta_id);
                const assignment = assignments.find(a => a.id === collaboration.assignment_id);
                
                return (
                  <div key={collaboration.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getCollaborationIcon(collaboration.collaboration_type)}
                          <Badge className={getCollaborationColor(collaboration.collaboration_type)} variant="secondary">
                            {collaboration.collaboration_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Assignment #{assignment?.id.slice(0, 8)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Primary TA</p>
                        <p className="text-sm">{primaryTA?.name}</p>
                        <p className="text-xs text-gray-500">{primaryTA?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Secondary TA</p>
                        <p className="text-sm">{secondaryTA?.name}</p>
                        <p className="text-xs text-gray-500">{secondaryTA?.email}</p>
                      </div>
                    </div>

                    {collaboration.responsibilities?.notes && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <p className="font-medium text-gray-700 mb-1">Responsibilities:</p>
                        <p className="text-gray-600">{collaboration.responsibilities.notes}</p>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        Edit Collaboration
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

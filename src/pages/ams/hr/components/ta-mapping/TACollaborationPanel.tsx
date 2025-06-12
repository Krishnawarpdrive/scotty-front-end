
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  UserPlus, 
  Settings,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
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
  ) => void;
}

export const TACollaborationPanel: React.FC<TACollaborationPanelProps> = ({
  taProfiles,
  assignments,
  collaborations,
  onCreateCollaboration
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollaboration, setNewCollaboration] = useState({
    primary_ta_id: '',
    secondary_ta_id: '',
    assignment_id: '',
    collaboration_type: 'primary_secondary' as const,
    primary_responsibilities: '',
    secondary_responsibilities: ''
  });

  const getCollaborationIcon = (type: string) => {
    switch (type) {
      case 'mentor_mentee': return <Users className="h-4 w-4 text-purple-600" />;
      case 'equal_partners': return <Users className="h-4 w-4 text-blue-600" />;
      default: return <Users className="h-4 w-4 text-green-600" />;
    }
  };

  const getCollaborationColor = (type: string) => {
    switch (type) {
      case 'mentor_mentee': return 'bg-purple-100 text-purple-700';
      case 'equal_partners': return 'bg-blue-100 text-blue-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getTAName = (taId: string) => {
    return taProfiles.find(ta => ta.id === taId)?.name || 'Unknown TA';
  };

  const getAssignmentInfo = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    return assignment ? `Assignment #${assignment.id.slice(0, 8)}` : 'Unknown Assignment';
  };

  const activeAssignments = assignments.filter(a => a.status === 'active');

  const handleCreateCollaboration = () => {
    if (!newCollaboration.primary_ta_id || !newCollaboration.secondary_ta_id || !newCollaboration.assignment_id) {
      return;
    }

    const responsibilities = {
      primary: newCollaboration.primary_responsibilities,
      secondary: newCollaboration.secondary_responsibilities
    };

    onCreateCollaboration(
      newCollaboration.primary_ta_id,
      newCollaboration.secondary_ta_id,
      newCollaboration.assignment_id,
      newCollaboration.collaboration_type,
      responsibilities
    );

    // Reset form
    setNewCollaboration({
      primary_ta_id: '',
      secondary_ta_id: '',
      assignment_id: '',
      collaboration_type: 'primary_secondary',
      primary_responsibilities: '',
      secondary_responsibilities: ''
    });
    setShowCreateForm(false);
  };

  // Calculate collaboration stats
  const collaborationStats = {
    total: collaborations.length,
    mentoring: collaborations.filter(c => c.collaboration_type === 'mentor_mentee').length,
    partnerships: collaborations.filter(c => c.collaboration_type === 'equal_partners').length,
    primarySecondary: collaborations.filter(c => c.collaboration_type === 'primary_secondary').length
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Collaborations</p>
                <p className="text-xl font-bold">{collaborationStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Mentoring</p>
                <p className="text-xl font-bold">{collaborationStats.mentoring}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Partnerships</p>
                <p className="text-xl font-bold">{collaborationStats.partnerships}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Primary/Secondary</p>
                <p className="text-xl font-bold">{collaborationStats.primarySecondary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Collaboration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Manage Collaborations
            </CardTitle>
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              size="sm"
            >
              {showCreateForm ? 'Cancel' : 'New Collaboration'}
            </Button>
          </div>
        </CardHeader>
        {showCreateForm && (
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Primary TA</label>
                  <Select 
                    value={newCollaboration.primary_ta_id} 
                    onValueChange={(value) => setNewCollaboration(prev => ({ ...prev, primary_ta_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary TA" />
                    </SelectTrigger>
                    <SelectContent>
                      {taProfiles.filter(ta => ta.status === 'active').map(ta => (
                        <SelectItem key={ta.id} value={ta.id}>{ta.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Secondary TA</label>
                  <Select 
                    value={newCollaboration.secondary_ta_id} 
                    onValueChange={(value) => setNewCollaboration(prev => ({ ...prev, secondary_ta_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select secondary TA" />
                    </SelectTrigger>
                    <SelectContent>
                      {taProfiles
                        .filter(ta => ta.status === 'active' && ta.id !== newCollaboration.primary_ta_id)
                        .map(ta => (
                          <SelectItem key={ta.id} value={ta.id}>{ta.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Assignment</label>
                  <Select 
                    value={newCollaboration.assignment_id} 
                    onValueChange={(value) => setNewCollaboration(prev => ({ ...prev, assignment_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeAssignments.map(assignment => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          Assignment #{assignment.id.slice(0, 8)} - {assignment.notes?.slice(0, 30)}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Collaboration Type</label>
                  <Select 
                    value={newCollaboration.collaboration_type} 
                    onValueChange={(value: any) => setNewCollaboration(prev => ({ ...prev, collaboration_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary_secondary">Primary/Secondary</SelectItem>
                      <SelectItem value="equal_partners">Equal Partners</SelectItem>
                      <SelectItem value="mentor_mentee">Mentor/Mentee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Primary TA Responsibilities</label>
                  <Textarea
                    placeholder="Describe primary TA responsibilities..."
                    value={newCollaboration.primary_responsibilities}
                    onChange={(e) => setNewCollaboration(prev => ({ ...prev, primary_responsibilities: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Secondary TA Responsibilities</label>
                  <Textarea
                    placeholder="Describe secondary TA responsibilities..."
                    value={newCollaboration.secondary_responsibilities}
                    onChange={(e) => setNewCollaboration(prev => ({ ...prev, secondary_responsibilities: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={handleCreateCollaboration}
                  className="w-full"
                  disabled={!newCollaboration.primary_ta_id || !newCollaboration.secondary_ta_id || !newCollaboration.assignment_id}
                >
                  Create Collaboration
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Active Collaborations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Collaborations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collaborations.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Collaborations</h3>
                <p>Create your first collaboration to see it here.</p>
              </div>
            ) : (
              collaborations.map((collaboration) => (
                <div key={collaboration.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCollaborationIcon(collaboration.collaboration_type)}
                      <h4 className="font-medium">
                        {getTAName(collaboration.primary_ta_id)} & {getTAName(collaboration.secondary_ta_id)}
                      </h4>
                    </div>
                    <Badge className={getCollaborationColor(collaboration.collaboration_type)} variant="secondary">
                      {collaboration.collaboration_type.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Assignment</p>
                      <p className="text-sm font-medium">{getAssignmentInfo(collaboration.assignment_id)}</p>
                    </div>
                    
                    {collaboration.responsibilities && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Responsibilities</p>
                        <div className="space-y-1">
                          {collaboration.responsibilities.primary && (
                            <p className="text-xs text-gray-500">
                              <strong>Primary:</strong> {collaboration.responsibilities.primary}
                            </p>
                          )}
                          {collaboration.responsibilities.secondary && (
                            <p className="text-xs text-gray-500">
                              <strong>Secondary:</strong> {collaboration.responsibilities.secondary}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Created recently</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, Edit3, Mail, Phone, Calendar } from 'lucide-react';

interface RoleApplication {
  id: string;
  name: string;
  client: string;
  status: string;
  currentStage: string;
  appliedDate: string;
}

interface CandidateTAMappingTabProps {
  candidate: any;
  roleApplications: RoleApplication[];
}

interface TAMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatar?: string;
  assignedStages: string[];
  workload: number;
  availability: 'available' | 'busy' | 'unavailable';
}

export const CandidateTAMappingTab: React.FC<CandidateTAMappingTabProps> = ({
  candidate,
  roleApplications
}) => {
  const [selectedRole, setSelectedRole] = useState(roleApplications[0]?.id || null);

  // Mock TA team data
  const taTeam: TAMember[] = [
    {
      id: 'ta1',
      name: 'Sarah Chen',
      role: 'Senior TA Specialist',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 123-4567',
      assignedStages: ['screening', 'technical'],
      workload: 75,
      availability: 'available'
    },
    {
      id: 'ta2',
      name: 'Mike Rodriguez',
      role: 'TA Coordinator',
      email: 'mike.rodriguez@company.com',
      assignedStages: ['cultural', 'final'],
      workload: 60,
      availability: 'busy'
    },
    {
      id: 'ta3',
      name: 'Emily Watson',
      role: 'TA Manager',
      email: 'emily.watson@company.com',
      assignedStages: ['offer'],
      workload: 40,
      availability: 'available'
    }
  ];

  const pipelineStages = [
    { id: 'screening', name: 'Phone Screening', assignedTo: 'ta1' },
    { id: 'technical', name: 'Technical Interview', assignedTo: 'ta1' },
    { id: 'cultural', name: 'Cultural Fit', assignedTo: 'ta2' },
    { id: 'final', name: 'Final Interview', assignedTo: 'ta2' },
    { id: 'offer', name: 'Offer', assignedTo: 'ta3' }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">TA Team Mapping</h3>
          <p className="text-sm text-gray-600">
            Assign and manage Talent Acquisition team members for this candidate
          </p>
        </div>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Add TA Member
        </Button>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roleApplications.map((role) => (
              <div
                key={role.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRole === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-gray-600">{role.client}</p>
                  </div>
                  <Badge variant="outline">{role.currentStage}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TA Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">TA Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taTeam.map((member) => (
              <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={getAvailabilityColor(member.availability)} variant="secondary">
                      {member.availability.charAt(0).toUpperCase() + member.availability.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-600 mr-2">Workload:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${getWorkloadColor(member.workload)}`}
                        style={{ width: `${member.workload}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{member.workload}%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stage Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage) => {
              const assignedMember = taTeam.find(member => member.id === stage.assignedTo);
              return (
                <div key={stage.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {pipelineStages.indexOf(stage) + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{stage.name}</h4>
                      {assignedMember && (
                        <p className="text-sm text-gray-600">
                          Assigned to {assignedMember.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {assignedMember && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={assignedMember.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(assignedMember.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <Button variant="outline" size="sm">
                      {assignedMember ? 'Reassign' : 'Assign'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Users className="h-4 w-4 mr-2" />
              Team Meeting
            </Button>
            <Button variant="outline" className="h-12">
              <Calendar className="h-4 w-4 mr-2" />
              Coordinate Schedules
            </Button>
            <Button variant="outline" className="h-12">
              <Mail className="h-4 w-4 mr-2" />
              Send Update
            </Button>
            <Button variant="outline" className="h-12">
              <Edit3 className="h-4 w-4 mr-2" />
              Update Assignments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

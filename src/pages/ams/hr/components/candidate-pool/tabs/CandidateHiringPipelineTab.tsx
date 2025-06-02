
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, Play, Pause, SkipForward, Edit3, Clock, User } from 'lucide-react';

interface RoleApplication {
  id: string;
  name: string;
  client: string;
  status: string;
  currentStage: string;
  appliedDate: string;
}

interface CandidateHiringPipelineTabProps {
  candidate: any;
  roleApplications: RoleApplication[];
}

export const CandidateHiringPipelineTab: React.FC<CandidateHiringPipelineTabProps> = ({
  candidate,
  roleApplications
}) => {
  const [selectedRole, setSelectedRole] = useState(roleApplications[0]?.id || null);

  // Mock pipeline stages data
  const pipelineStages = [
    { id: 'screening', name: 'Phone Screening', status: 'completed', order: 1, completedAt: '2024-01-16' },
    { id: 'technical', name: 'Technical Interview', status: 'current', order: 2, scheduledAt: '2024-01-22' },
    { id: 'cultural', name: 'Cultural Fit', status: 'pending', order: 3 },
    { id: 'final', name: 'Final Interview', status: 'pending', order: 4 },
    { id: 'offer', name: 'Offer', status: 'pending', order: 5 }
  ];

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageProgress = () => {
    const completedStages = pipelineStages.filter(stage => stage.status === 'completed').length;
    const currentStage = pipelineStages.find(stage => stage.status === 'current') ? 1 : 0;
    return ((completedStages + currentStage) / pipelineStages.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Hiring Pipeline Management</h3>
          <p className="text-sm text-gray-600">
            Manage and track candidate progress through hiring stages
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure Pipeline
        </Button>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Role Applications</CardTitle>
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
                  <Badge className={getStageStatusColor(role.status)} variant="secondary">
                    {role.currentStage}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pipeline Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(getStageProgress())}% Complete</span>
            </div>
            <Progress value={getStageProgress()} className="h-3" />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-700">
                  {pipelineStages.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-xs text-green-600">Completed Stages</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-700">
                  {pipelineStages.filter(s => s.status === 'pending').length}
                </div>
                <div className="text-xs text-blue-600">Remaining Stages</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pipeline Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${stage.status === 'completed' ? 'bg-green-500 text-white' : 
                    stage.status === 'current' ? 'bg-blue-500 text-white' : 
                    'bg-gray-300 text-gray-600'}
                `}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{stage.name}</h4>
                    <Badge className={getStageStatusColor(stage.status)} variant="secondary">
                      {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                    </Badge>
                  </div>
                  
                  {stage.completedAt && (
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed on {new Date(stage.completedAt).toLocaleDateString()}
                    </div>
                  )}
                  
                  {stage.scheduledAt && (
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Scheduled for {new Date(stage.scheduledAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {stage.status === 'current' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Pause className="h-3 w-3 mr-1" />
                        Hold
                      </Button>
                      <Button variant="outline" size="sm">
                        <SkipForward className="h-3 w-3 mr-1" />
                        Advance
                      </Button>
                    </>
                  )}
                  
                  {stage.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <User className="h-4 w-4 mr-2" />
              Assign Interviewer
            </Button>
            <Button variant="outline" className="h-12">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Next Stage
            </Button>
            <Button variant="outline" className="h-12">
              <Edit3 className="h-4 w-4 mr-2" />
              Add Feedback
            </Button>
            <Button variant="outline" className="h-12">
              <Settings className="h-4 w-4 mr-2" />
              Modify Pipeline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

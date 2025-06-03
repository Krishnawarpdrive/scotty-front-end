
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, User, CheckCircle, Circle, AlertTriangle } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface HiringPipelineTabProps {
  candidate: Candidate;
}

export const HiringPipelineTab: React.FC<HiringPipelineTabProps> = ({ candidate }) => {
  // Mock pipeline data - in real app this would come from props or API
  const pipelineStages = [
    { name: 'Application', status: 'completed', date: '2024-01-15' },
    { name: 'Phone Screening', status: 'completed', date: '2024-01-18' },
    { name: 'Technical Interview', status: 'current', date: '2024-01-22' },
    { name: 'Manager Interview', status: 'pending', date: null },
    { name: 'Final Interview', status: 'pending', date: null },
    { name: 'Offer', status: 'pending', date: null },
  ];

  const currentStageIndex = pipelineStages.findIndex(stage => stage.status === 'current');
  const progress = ((currentStageIndex + 1) / pipelineStages.length) * 100;

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Stage {currentStageIndex + 1} of {pipelineStages.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {pipelineStages.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">
                {pipelineStages.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  stage.status === 'current' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getStageIcon(stage.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{stage.name}</h4>
                    <Badge
                      variant={
                        stage.status === 'completed' ? 'default' :
                        stage.status === 'current' ? 'secondary' : 'outline'
                      }
                    >
                      {stage.status === 'completed' ? 'Completed' :
                       stage.status === 'current' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>
                  
                  {stage.date && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(stage.date).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {stage.status === 'current' && (
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm" variant="outline">
                        Schedule Interview
                      </Button>
                      <Button size="sm" variant="outline">
                        Add Notes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {candidate.appliedRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{role}</div>
                    <div className="text-sm text-gray-500">Applied {candidate.lastUpdated}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{candidate.currentStage}</Badge>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Urgent Actions */}
      {candidate.nextAction && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Urgent Actions Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white border border-orange-200 rounded-lg">
                <div>
                  <div className="font-medium">{candidate.nextAction}</div>
                  {candidate.actionDueDate && (
                    <div className="text-sm text-gray-500">Due: {candidate.actionDueDate}</div>
                  )}
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Take Action
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

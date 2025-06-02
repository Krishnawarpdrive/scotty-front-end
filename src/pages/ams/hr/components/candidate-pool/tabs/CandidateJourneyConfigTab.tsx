
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Route, 
  FileText, 
  Video, 
  Link, 
  CheckSquare, 
  Clock, 
  Play, 
  Pause,
  Settings,
  Plus
} from 'lucide-react';

interface RoleApplication {
  id: string;
  name: string;
  client: string;
  status: string;
  currentStage: string;
  appliedDate: string;
}

interface CandidateJourneyConfigTabProps {
  candidate: any;
  roleApplications: RoleApplication[];
}

interface JourneyItem {
  id: string;
  type: 'document' | 'video' | 'form' | 'assessment' | 'link';
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  dueDate?: string;
}

interface JourneyStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  items: JourneyItem[];
  completionRate: number;
}

export const CandidateJourneyConfigTab: React.FC<CandidateJourneyConfigTabProps> = ({
  candidate,
  roleApplications
}) => {
  const [selectedRole, setSelectedRole] = useState(roleApplications[0]?.id || null);
  const [activeStage, setActiveStage] = useState('screening');

  // Mock journey stages data
  const journeyStages: JourneyStage[] = [
    {
      id: 'screening',
      name: 'Phone Screening',
      status: 'completed',
      completionRate: 100,
      items: [
        {
          id: 'welcome-doc',
          type: 'document',
          title: 'Welcome Package',
          description: 'Company overview and role details',
          required: true,
          completed: true
        },
        {
          id: 'pre-screen-form',
          type: 'form',
          title: 'Pre-screening Questionnaire',
          description: 'Basic eligibility and interest assessment',
          required: true,
          completed: true
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical Interview',
      status: 'current',
      completionRate: 60,
      items: [
        {
          id: 'tech-prep',
          type: 'document',
          title: 'Technical Interview Prep Guide',
          description: 'What to expect and how to prepare',
          required: true,
          completed: true
        },
        {
          id: 'coding-assessment',
          type: 'assessment',
          title: 'Coding Assessment',
          description: 'Complete the technical coding challenge',
          required: true,
          completed: true
        },
        {
          id: 'portfolio-review',
          type: 'link',
          title: 'Portfolio Submission',
          description: 'Submit your portfolio for review',
          required: true,
          completed: false,
          dueDate: '2024-01-25'
        },
        {
          id: 'interview-video',
          type: 'video',
          title: 'Interview Prep Video',
          description: 'Watch this video to prepare for your interview',
          required: false,
          completed: false
        }
      ]
    },
    {
      id: 'cultural',
      name: 'Cultural Fit',
      status: 'pending',
      completionRate: 0,
      items: [
        {
          id: 'culture-doc',
          type: 'document',
          title: 'Company Culture Guide',
          description: 'Learn about our values and culture',
          required: true,
          completed: false
        },
        {
          id: 'team-intro',
          type: 'video',
          title: 'Meet the Team',
          description: 'Introduction video from your potential team',
          required: false,
          completed: false
        }
      ]
    }
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'form': return <CheckSquare className="h-4 w-4" />;
      case 'assessment': return <CheckSquare className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentStage = journeyStages.find(stage => stage.id === activeStage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Candidate Journey Configuration</h3>
          <p className="text-sm text-gray-600">
            Manage the candidate experience throughout the hiring process
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure Journey
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

      {/* Journey Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Journey Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journeyStages.map((stage, index) => (
              <div
                key={stage.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  activeStage === stage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveStage(stage.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${stage.status === 'completed' ? 'bg-green-500 text-white' : 
                        stage.status === 'current' ? 'bg-blue-500 text-white' : 
                        'bg-gray-300 text-gray-600'}
                    `}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{stage.name}</h4>
                      <p className="text-sm text-gray-600">
                        {stage.items.length} items • {stage.items.filter(item => item.completed).length} completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">{stage.completionRate}%</div>
                      <Progress value={stage.completionRate} className="w-20 h-2" />
                    </div>
                    <Badge className={getStageStatusColor(stage.status)} variant="secondary">
                      {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Details */}
      {currentStage && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{currentStage.name} - Journey Items</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStage.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className={`
                    p-2 rounded-lg
                    ${item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {getItemIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                      {item.completed && (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    {item.dueDate && !item.completed && (
                      <div className="flex items-center mt-2 text-xs text-amber-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!item.completed && (
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journey Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Journey Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Route className="h-4 w-4 mr-2" />
              Preview Journey
            </Button>
            <Button variant="outline" className="h-12">
              <Play className="h-4 w-4 mr-2" />
              Activate Stage
            </Button>
            <Button variant="outline" className="h-12">
              <Pause className="h-4 w-4 mr-2" />
              Pause Journey
            </Button>
            <Button variant="outline" className="h-12">
              <Settings className="h-4 w-4 mr-2" />
              Customize Flow
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

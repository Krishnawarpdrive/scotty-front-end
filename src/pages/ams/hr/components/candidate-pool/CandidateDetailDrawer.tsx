
import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Star,
  Clock,
  User,
  Download,
  MessageSquare,
  Video,
  Building2,
  CheckCircle,
  Circle,
  AlertTriangle,
  FileText,
  Edit
} from 'lucide-react';
import { Candidate } from './CandidateTable';

interface CandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidateId: string | null;
}

export const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidateId
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock candidate data - replace with actual data fetching
  const candidate: Candidate | null = candidateId ? {
    id: candidateId,
    name: "Sarah Johnson",
    candidateId: "CND-001",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    currentStage: "Phone Interview",
    source: "LinkedIn",
    status: "Active",
    appliedRoles: ["Senior Frontend Developer", "Tech Lead"],
    experience: {
      years: 5,
      months: 6
    },
    score: 85,
    assignedTA: {
      name: "Mike Chen",
      avatar: undefined
    },
    lastUpdated: "2024-01-15",
    priority: "High",
    nextAction: "Schedule technical interview",
    actionDueDate: "2024-01-20",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    currentRole: "Senior Frontend Developer",
    currentCompany: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "2024-01-15",
    resumeUrl: "#",
    notes: "Excellent technical skills, strong communication, looking for remote opportunities.",
    type: "Experienced",
    avatar: undefined
  } : null;

  if (!candidate) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'On Hold': return 'secondary';
      case 'Rejected': return 'destructive';
      case 'Hired': return 'default';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Mock pipeline data
  const pipelineStages = [
    { name: 'Application', status: 'completed', date: candidate.appliedDate },
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
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      size="xl"
      title="Candidate Profile"
      description="Detailed candidate information and progress tracking"
    >
      <div className="space-y-6">
        {/* Candidate Header Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                  {getInitials(candidate.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
                    <p className="text-sm text-gray-500">{candidate.candidateId}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusBadgeVariant(candidate.status)}>
                      {candidate.status}
                    </Badge>
                    <Badge className={getPriorityColor(candidate.priority || 'Medium')}>
                      {candidate.priority || 'Medium'} Priority
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{candidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{candidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{candidate.currentCompany}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Hiring Pipeline</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">{candidate.score || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Score</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-semibold">{candidate.currentStage}</div>
                  <div className="text-sm text-gray-600">Current Stage</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <User className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="text-sm font-semibold">
                    {candidate.assignedTA ? candidate.assignedTA.name : 'Unassigned'}
                  </div>
                  <div className="text-sm text-gray-600">Assigned TA</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm font-semibold">{candidate.appliedRoles.length}</div>
                  <div className="text-sm text-gray-600">Applied Roles</div>
                </CardContent>
              </Card>
            </div>

            {/* Applied Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applied Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.appliedRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{role}</div>
                        <div className="text-sm text-gray-600">Applied on {candidate.appliedDate}</div>
                      </div>
                      <Badge variant="outline">{candidate.currentStage}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Experience</span>
                    <span className="font-medium">
                      {candidate.experience ? `${candidate.experience.years}y ${candidate.experience.months}m` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Role</span>
                    <span className="font-medium">{candidate.currentRole}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Company</span>
                    <span className="font-medium">{candidate.currentCompany}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Candidate Type</span>
                    <Badge variant="outline">{candidate.type}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {candidate.skills && candidate.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Action */}
            {candidate.nextAction && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Next Action Required</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">{candidate.nextAction}</p>
                    {candidate.actionDueDate && (
                      <p className="text-sm text-gray-600">
                        Due: {candidate.actionDueDate}
                      </p>
                    )}
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Take Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6 mt-6">
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
                
                <div className="grid grid-cols-3 gap-4 mt-4">
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

            {/* Role Applications in Pipeline */}
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
                          <div className="text-sm text-gray-500">Applied {candidate.appliedDate}</div>
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
          </TabsContent>
        </Tabs>
      </div>
    </SideDrawer>
  );
};

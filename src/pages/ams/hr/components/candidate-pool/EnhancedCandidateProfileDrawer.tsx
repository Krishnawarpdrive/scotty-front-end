
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
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
  Edit3,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Candidate } from './CandidateTable';

interface EnhancedCandidateProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export const EnhancedCandidateProfileDrawer: React.FC<EnhancedCandidateProfileDrawerProps> = ({
  open,
  onClose,
  candidate
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Mock pipeline data - in a real app this would come from the candidate data
  const pipelineStages = [
    { id: 'applied', name: 'Applied', status: 'completed', date: '2024-01-15' },
    { id: 'screening', name: 'Screening', status: 'completed', date: '2024-01-18' },
    { id: 'interview', name: 'Technical Interview', status: 'current', date: '2024-01-22' },
    { id: 'manager', name: 'Manager Review', status: 'pending', date: null },
    { id: 'final', name: 'Final Interview', status: 'pending', date: null },
    { id: 'offer', name: 'Offer', status: 'pending', date: null },
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'On Hold': return 'secondary';
      case 'Rejected': return 'destructive';
      case 'Hired': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[60vw] max-h-[95vh] overflow-hidden p-0 gap-0">
        <div className="flex flex-col h-[95vh]">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-start space-x-6">
              <Avatar className="h-20 w-20 border-4 border-white/20">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-xl bg-white/20 text-white">
                  {getInitials(candidate.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-2xl font-bold">{candidate.name}</h1>
                    <p className="text-blue-100 mb-1">{candidate.email}</p>
                    <p className="text-blue-200 text-sm">{candidate.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button variant="secondary" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Interview
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">TechCorp Inc.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">5+ years exp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-300" />
                    <span className="text-blue-100">Score: {candidate.score}</span>
                  </div>
                </div>

                {/* Skills preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {candidate.skills?.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills && candidate.skills.length > 5 && (
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                      +{candidate.skills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b bg-white px-6">
                <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center space-x-2 px-6 py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pipeline"
                    className="flex items-center space-x-2 px-6 py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium">Hiring Pipeline</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto bg-gray-50">
                <TabsContent value="overview" className="m-0 h-full">
                  <div className="p-6 space-y-6">
                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-4 gap-4">
                      <Card className="bg-white shadow-sm">
                        <CardContent className="p-4 text-center">
                          <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                          <div className="text-2xl font-bold text-gray-900">{candidate.score || 'N/A'}</div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white shadow-sm">
                        <CardContent className="p-4 text-center">
                          <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm font-semibold text-gray-900">{candidate.currentStage}</div>
                          <div className="text-sm text-gray-600">Current Stage</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white shadow-sm">
                        <CardContent className="p-4 text-center">
                          <User className="h-6 w-6 mx-auto mb-2 text-green-500" />
                          <div className="text-sm font-semibold text-gray-900">
                            {candidate.assignedTA ? candidate.assignedTA.name : 'Unassigned'}
                          </div>
                          <div className="text-sm text-gray-600">Assigned TA</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white shadow-sm">
                        <CardContent className="p-4 text-center">
                          <FileText className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                          <div className="text-sm font-semibold text-gray-900">{candidate.appliedRoles.length}</div>
                          <div className="text-sm text-gray-600">Applied Roles</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Applied Roles */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Applied Roles</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {candidate.appliedRoles.map((role, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Briefcase className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{role}</div>
                                  <div className="text-sm text-gray-600">Applied on {candidate.appliedDate || candidate.lastUpdated}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getStatusBadgeVariant(candidate.status)}>
                                  {candidate.currentStage}
                                </Badge>
                                <Button size="sm" variant="ghost">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experience & Skills */}
                    <div className="grid grid-cols-2 gap-6">
                      <Card className="bg-white shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-900">Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Total Experience</span>
                              <span className="font-medium text-gray-900">
                                {candidate.experience ? `${candidate.experience.years}y ${candidate.experience.months}m` : 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Candidate Type</span>
                              <Badge variant="outline" className="text-gray-700">
                                {candidate.type || 'N/A'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Source</span>
                              <Badge variant="outline" className="text-gray-700">
                                {candidate.source}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-900">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills?.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Next Action */}
                    {candidate.nextAction && (
                      <Card className="bg-amber-50 border-amber-200 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-amber-800 flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Next Action Required</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <p className="text-amber-700">{candidate.nextAction}</p>
                            {candidate.actionDueDate && (
                              <p className="text-sm text-amber-600">
                                Due: {candidate.actionDueDate}
                              </p>
                            )}
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                              Take Action
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pipeline" className="m-0 h-full">
                  <div className="p-6 space-y-6">
                    {/* Pipeline Progress */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Hiring Pipeline Progress</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Stage {currentStageIndex + 1} of {pipelineStages.length}</span>
                            <span className="font-medium text-gray-900">{Math.round(progress)}% Complete</span>
                          </div>
                          <Progress value={progress} className="h-3" />
                        </div>
                        
                        {/* Stage Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {pipelineStages.filter(s => s.status === 'completed').length}
                            </div>
                            <div className="text-sm text-green-700">Completed</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">1</div>
                            <div className="text-sm text-blue-700">In Progress</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">
                              {pipelineStages.filter(s => s.status === 'pending').length}
                            </div>
                            <div className="text-sm text-gray-700">Pending</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Detailed Pipeline Stages */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Stage Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pipelineStages.map((stage, index) => (
                            <div
                              key={stage.id}
                              className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                                stage.status === 'current' 
                                  ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                  : stage.status === 'completed'
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {getStageIcon(stage.status)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                                  <Badge
                                    variant={
                                      stage.status === 'completed' ? 'default' :
                                      stage.status === 'current' ? 'secondary' : 'outline'
                                    }
                                    className={
                                      stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      stage.status === 'current' ? 'bg-blue-100 text-blue-800' : ''
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
                                  <div className="mt-3 flex space-x-2">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      Schedule Interview
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Edit3 className="h-3 w-3 mr-1" />
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
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

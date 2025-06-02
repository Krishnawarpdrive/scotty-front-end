
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Building, 
  Briefcase,
  Star,
  ChevronRight,
  Eye,
  Edit,
  MessageSquare
} from 'lucide-react';

interface RoleApplication {
  id: string;
  role_name: string;
  client_name: string;
  applied_date: string;
  current_stage: string;
  stage_progress: number;
  total_stages: number;
  status: 'Active' | 'Hired' | 'Rejected' | 'On Hold';
  hiring_manager: string;
  ta_assigned: string;
  next_action: string;
  next_action_date?: string;
}

interface PipelineStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  notes?: string;
  interviewer?: string;
  feedback_score?: number;
}

interface CandidateDetailData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  current_position?: string;
  current_employer?: string;
  experience_years: number;
  location?: string;
  skills: string[];
  source: string;
  applied_date: string;
  status: 'Active' | 'Inactive' | 'Hired' | 'Rejected';
  avatar?: string;
  role_applications: RoleApplication[];
  overall_score?: number;
  notes?: string;
}

interface EnhancedCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidate: CandidateDetailData | null;
}

export const EnhancedCandidateDetailDrawer: React.FC<EnhancedCandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidate
}) => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  if (!candidate) return null;

  const mockPipelineStages: PipelineStage[] = [
    { id: '1', name: 'Application', status: 'completed', date: '2024-01-15' },
    { id: '2', name: 'Phone Screening', status: 'completed', date: '2024-01-18', interviewer: 'Sarah Johnson', feedback_score: 4 },
    { id: '3', name: 'Technical Interview', status: 'current', date: '2024-01-22', interviewer: 'Mike Chen' },
    { id: '4', name: 'Final Interview', status: 'pending' },
    { id: '5', name: 'Offer', status: 'pending' }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Hired': return 'default';
      case 'Rejected': return 'destructive';
      case 'On Hold': return 'secondary';
      default: return 'outline';
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'current': return '⏳';
      case 'pending': return '○';
      default: return '○';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[900px] sm:w-[900px] overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} />
                <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl">{candidate.name}</SheetTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{candidate.email}</span>
                  </div>
                  {candidate.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{candidate.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Badge variant={getStatusBadgeVariant(candidate.status)}>
              {candidate.status}
            </Badge>
          </div>
        </SheetHeader>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">Role Applications</TabsTrigger>
            <TabsTrigger value="pipeline">Hiring Pipeline</TabsTrigger>
            <TabsTrigger value="profile">Candidate Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="space-y-4">
              {candidate.role_applications?.map((application) => (
                <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{application.role_name}</h3>
                          <Badge variant={getStatusBadgeVariant(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{application.client_name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Applied {application.applied_date}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium">Stage Progress:</span>
                              <span className="text-sm">{application.current_stage}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">
                                {application.stage_progress}/{application.total_stages} stages
                              </span>
                            </div>
                          </div>
                          <Progress 
                            value={(application.stage_progress / application.total_stages) * 100} 
                            className="h-2 mt-2"
                          />
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No role applications found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Pipeline Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPipelineStages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center space-x-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${stage.status === 'completed' ? 'bg-green-100 text-green-600' : 
                          stage.status === 'current' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-400'}
                      `}>
                        {getStageIcon(stage.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            stage.status === 'completed' ? 'text-green-700' :
                            stage.status === 'current' ? 'text-blue-700' :
                            'text-gray-500'
                          }`}>
                            {stage.name}
                          </h4>
                          {stage.date && (
                            <span className="text-sm text-gray-500">{stage.date}</span>
                          )}
                        </div>
                        {stage.interviewer && (
                          <p className="text-sm text-gray-600 mt-1">
                            Interviewer: {stage.interviewer}
                            {stage.feedback_score && (
                              <span className="ml-2">
                                <Star className="h-4 w-4 inline text-yellow-400" />
                                {stage.feedback_score}/5
                              </span>
                            )}
                          </p>
                        )}
                        {stage.notes && (
                          <p className="text-sm text-gray-600 mt-1">{stage.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Current Position</p>
                      <p className="text-sm text-gray-600">{candidate.current_position || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Current Employer</p>
                      <p className="text-sm text-gray-600">{candidate.current_employer || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-gray-600">{candidate.experience_years} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-gray-600">{candidate.location || 'Not specified'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {candidate.overall_score && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Overall Score</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={candidate.overall_score} className="flex-1" />
                        <span className="text-sm font-medium">{candidate.overall_score}%</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {candidate.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{candidate.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="flex justify-between space-x-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Resume
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button size="sm">
              Schedule Interview
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

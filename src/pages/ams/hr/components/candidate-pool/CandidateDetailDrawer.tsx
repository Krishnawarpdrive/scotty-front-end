
import React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  FileText,
  Star,
  Clock,
  User,
  Download,
  MessageSquare,
  Video
} from "lucide-react";

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
  // Mock candidate data - replace with actual data fetching
  const candidate = candidateId ? {
    id: candidateId,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    currentPosition: "Senior Frontend Developer",
    currentEmployer: "TechCorp Inc.",
    experienceYears: 5,
    location: "San Francisco, CA",
    currentStage: "Technical Interview",
    source: "LinkedIn",
    status: "Active",
    appliedDate: "2024-01-15",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    resumeUrl: "#",
    notes: "Excellent technical skills, strong communication, looking for remote opportunities."
  } : null;

  if (!candidate) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'technical interview': return 'bg-purple-100 text-purple-800';
      case 'final interview': return 'bg-green-100 text-green-800';
      case 'offer': return 'bg-emerald-100 text-emerald-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on hold': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Candidate Profile</DrawerTitle>
              <DrawerDescription>
                Detailed information about {candidate.name}
              </DrawerDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt={candidate.name} />
                  <AvatarFallback className="text-lg">{getInitials(candidate.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{candidate.currentPosition}</p>
                  <p className="text-sm text-gray-500">{candidate.currentEmployer}</p>
                  
                  <div className="flex items-center space-x-3 mt-3">
                    <Badge className={getStageColor(candidate.currentStage)} variant="secondary">
                      {candidate.currentStage}
                    </Badge>
                    <Badge className={getStatusColor(candidate.status)} variant="secondary">
                      {candidate.status}
                    </Badge>
                    <Badge variant="outline">
                      {candidate.experienceYears} years exp
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applied Date</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{new Date(candidate.appliedDate).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.floor((Date.now() - new Date(candidate.appliedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Source</CardTitle>
                <User className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{candidate.source}</div>
                <p className="text-xs text-muted-foreground">Application source</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Experience</CardTitle>
                <Briefcase className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{candidate.experienceYears} Years</div>
                <p className="text-xs text-muted-foreground">Total experience</p>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{candidate.notes}</p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Application Submitted</p>
                    <p className="text-sm text-gray-600">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Initial Screening Completed</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Technical Interview Scheduled</p>
                    <p className="text-sm text-gray-600">Current stage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

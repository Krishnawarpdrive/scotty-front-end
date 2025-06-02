
import React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Calendar, 
  Award, 
  Briefcase,
  Edit,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";
import { Panelist } from "../types/PanelistTypes";

interface PanelistDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  panelist: Panelist;
}

export const PanelistDetailDrawer: React.FC<PanelistDetailDrawerProps> = ({
  open,
  onClose,
  panelist
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Panelist Profile</DrawerTitle>
              <DrawerDescription>
                Detailed information about {panelist.name}
              </DrawerDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
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
                  <AvatarImage src={panelist.avatar_url} alt={panelist.name} />
                  <AvatarFallback className="text-lg">{getInitials(panelist.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{panelist.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{panelist.title}</p>
                  <p className="text-sm text-gray-500">{panelist.department}</p>
                  
                  <div className="flex items-center space-x-3 mt-3">
                    <Badge className={getStatusColor(panelist.status)} variant="secondary">
                      {panelist.status}
                    </Badge>
                    <Badge className={getAvailabilityColor(panelist.availability_status)} variant="secondary">
                      {panelist.availability_status}
                    </Badge>
                    <Badge variant="outline">
                      {panelist.seniority_level} level
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-6 text-sm text-gray-600">
                    {panelist.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{panelist.email}</span>
                      </div>
                    )}
                    {panelist.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{panelist.phone}</span>
                      </div>
                    )}
                    {panelist.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{panelist.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {panelist.bio && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600">{panelist.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{panelist.rating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{panelist.total_interviews}</div>
                <p className="text-xs text-muted-foreground">Total conducted</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {panelist.total_interviews > 0 
                    ? Math.round((panelist.interviews_converted_to_offers / panelist.total_interviews) * 100)
                    : 0
                  }%
                </div>
                <p className="text-xs text-muted-foreground">Conversion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Capacity</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{panelist.max_interviews_per_week}</div>
                <p className="text-xs text-muted-foreground">Max per week</p>
              </CardContent>
            </Card>
          </div>

          {/* Skills and Expertise */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {panelist.skills.length > 0 ? (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills listed</p>
                )}

                {panelist.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {panelist.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {panelist.interview_types.length > 0 ? (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Interview Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.interview_types.map((type, index) => (
                        <Badge key={index} variant="default">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No interview types specified</p>
                )}

                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Authorization Level</h4>
                  <Badge variant="outline" className="capitalize">
                    {panelist.interview_authorization_level}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Allocation</h4>
                  <p className="text-sm text-gray-600">
                    {panelist.interviews_allocated_per_day} interviews per day, 
                    {panelist.max_interviews_per_week} per week maximum
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects and Tools */}
          {(panelist.projects_worked_on.length > 0 || panelist.tools_used.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {panelist.projects_worked_on.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Projects</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.projects_worked_on.map((project, index) => (
                        <Badge key={index} variant="outline">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {panelist.tools_used.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {panelist.tools_used.map((tool, index) => (
                        <Badge key={index} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

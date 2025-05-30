
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Mail, Phone, MapPin, Edit, Calendar, Trophy, Clock } from "lucide-react";
import { Panelist } from "../types/PanelistTypes";

interface PanelistDetailContentProps {
  panelist: Panelist;
  onUpdate: (id: string, data: any) => Promise<void>;
}

export const PanelistDetailContent: React.FC<PanelistDetailContentProps> = ({
  panelist,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
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
    <div className="space-y-6 mt-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={panelist.avatar_url} />
          <AvatarFallback className="text-lg">
            {panelist.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{panelist.name}</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <p className="text-lg text-muted-foreground mb-2">{panelist.title}</p>
          <p className="text-muted-foreground mb-3">{panelist.department}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{panelist.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({panelist.total_interviews} interviews)
              </span>
            </div>
            
            <Badge className={getStatusColor(panelist.status)}>
              {panelist.status.replace('_', ' ')}
            </Badge>
            
            <Badge className={getAvailabilityColor(panelist.availability_status)}>
              {panelist.availability_status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {panelist.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${panelist.email}`} className="hover:text-primary">
                  {panelist.email}
                </a>
              </div>
            )}
            
            {panelist.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <a href={`tel:${panelist.phone}`} className="hover:text-primary">
                  {panelist.phone}
                </a>
              </div>
            )}
            
            {panelist.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{panelist.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {panelist.bio && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{panelist.bio}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Availability</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Seniority Level:</span>
                  <Badge>{panelist.seniority_level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Interviews:</span>
                  <span className="font-medium">{panelist.total_interviews}</span>
                </div>
                <div className="flex justify-between">
                  <span>Feedback Score:</span>
                  <span className="font-medium">{panelist.feedback_score.toFixed(1)}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Interviews/Week:</span>
                  <span className="font-medium">{panelist.max_interviews_per_week}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {panelist.interview_types.map((type, index) => (
                    <Badge key={index} variant="outline">{type}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {panelist.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {panelist.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {panelist.languages.map((language, index) => (
                    <Badge key={index} variant="outline">{language}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Preferred Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(panelist.preferred_time_slots).map(([day, slots]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="font-medium capitalize">{day}:</span>
                    <div className="flex gap-2">
                      {Array.isArray(slots) ? slots.map((slot, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {slot}
                        </Badge>
                      )) : (
                        <Badge variant="outline" className="text-xs">No slots</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                  {panelist.rating.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Out of 5.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{panelist.total_interviews}</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feedback Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{panelist.feedback_score.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Average feedback</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};


import React, { useState } from "react";
import { Panelist } from "../types/PanelistTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Calendar,
  Edit,
  Award,
  Languages,
  Briefcase
} from "lucide-react";

interface PanelistDetailContentProps {
  panelist: Panelist;
  onUpdate: (id: string, data: any) => Promise<void>;
}

export const PanelistDetailContent: React.FC<PanelistDetailContentProps> = ({
  panelist,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const statusConfig = {
    active: { label: "Active", color: "bg-green-100 text-green-800" },
    inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
    on_leave: { label: "On Leave", color: "bg-yellow-100 text-yellow-800" }
  };

  const availabilityConfig = {
    available: { label: "Available", color: "bg-green-100 text-green-800" },
    busy: { label: "Busy", color: "bg-yellow-100 text-yellow-800" },
    unavailable: { label: "Unavailable", color: "bg-red-100 text-red-800" }
  };

  const seniorityConfig = {
    junior: "bg-blue-100 text-blue-800",
    mid: "bg-green-100 text-green-800",
    senior: "bg-purple-100 text-purple-800",
    principal: "bg-orange-100 text-orange-800",
    executive: "bg-red-100 text-red-800"
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header Section */}
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={panelist.avatar_url} />
          <AvatarFallback className="text-lg">
            {getInitials(panelist.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{panelist.name}</h2>
              <p className="text-lg text-muted-foreground">{panelist.title}</p>
              <p className="text-sm text-muted-foreground">{panelist.department}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Badge className={statusConfig[panelist.status].color}>
              {statusConfig[panelist.status].label}
            </Badge>
            <Badge className={availabilityConfig[panelist.availability_status].color}>
              {availabilityConfig[panelist.availability_status].label}
            </Badge>
            <Badge className={seniorityConfig[panelist.seniority_level]}>
              {panelist.seniority_level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${panelist.email}`} className="text-blue-600 hover:underline">
              {panelist.email}
            </a>
          </div>
          {panelist.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${panelist.phone}`} className="text-blue-600 hover:underline">
                {panelist.phone}
              </a>
            </div>
          )}
          {panelist.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{panelist.location}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{panelist.rating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{panelist.total_interviews}</div>
              <div className="text-sm text-muted-foreground">Total Interviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{panelist.feedback_score.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Feedback Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {panelist.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      {panelist.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {panelist.certifications.map((cert, index) => (
                <Badge key={index} variant="outline">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bio */}
      {panelist.bio && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{panelist.bio}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Briefcase, 
  Mail, 
  Phone, 
  User,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface OverviewTabProps {
  candidate: Candidate;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ candidate }) => {
  if (!candidate) {
    return (
      <div className="p-6 text-center text-gray-500">
        No candidate selected
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="text-lg">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <Badge variant={candidate.status === 'Active' ? 'default' : 'secondary'}>
                  {candidate.status}
                </Badge>
              </div>
              
              <div className="text-gray-600 space-y-1">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
              </div>

              {candidate.experience && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{candidate.experience.years} years, {candidate.experience.months} months experience</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Badge variant="outline">{candidate.type || 'N/A'}</Badge>
                <Badge variant="outline">{candidate.source}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-purple-500" />
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
          <div className="space-y-2">
            {candidate.appliedRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{role}</div>
                  <div className="text-sm text-gray-600">Priority: {candidate.priority || 'Medium'}</div>
                </div>
                <Badge variant={candidate.priority === 'High' ? 'destructive' : 
                               candidate.priority === 'Medium' ? 'default' : 'secondary'}>
                  {candidate.priority || 'Medium'}
                </Badge>
              </div>
            ))}
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
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Action */}
      {candidate.nextAction && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{candidate.nextAction}</p>
              {candidate.actionDueDate && (
                <p className="text-sm text-gray-600">
                  Due: {candidate.actionDueDate}
                </p>
              )}
              <Button size="sm" className="mt-2">
                Take Action
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

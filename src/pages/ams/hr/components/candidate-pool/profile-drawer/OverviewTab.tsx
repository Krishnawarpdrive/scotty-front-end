
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, Edit, Star } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface OverviewTabProps {
  candidate: Candidate;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ candidate }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Contact Information</CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{candidate.email}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium">{candidate.phone || 'Not provided'}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="font-medium">{candidate.lastUpdated}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Source</div>
              <div className="font-medium">{candidate.source}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Experience</div>
                <div className="font-medium">
                  {candidate.experience?.years || 0} years, {candidate.experience?.months || 0} months
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Type</div>
                <Badge variant="outline">{candidate.type}</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-2">Current Status</div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={
                  candidate.status === 'Active' ? 'default' :
                  candidate.status === 'Hired' ? 'default' :
                  candidate.status === 'Rejected' ? 'destructive' : 'secondary'
                }
              >
                {candidate.status}
              </Badge>
              <span className="text-sm text-gray-600">in {candidate.currentStage}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applied Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Applied Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {candidate.appliedRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium">{role}</div>
                    <div className="text-sm text-gray-500">Applied on {candidate.lastUpdated}</div>
                  </div>
                </div>
                <Badge variant="outline">{candidate.currentStage}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment & Priority</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              {candidate.assignedTA.avatar ? (
                <img src={candidate.assignedTA.avatar} alt="TA" className="w-8 h-8 rounded-full" />
              ) : (
                <span className="text-xs font-medium text-green-600">
                  {candidate.assignedTA.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <div className="text-sm text-gray-500">Assigned TA</div>
              <div className="font-medium">{candidate.assignedTA.name}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Star className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Priority</div>
              <Badge 
                variant={
                  candidate.priority === 'High' ? 'destructive' :
                  candidate.priority === 'Medium' ? 'secondary' : 'outline'
                }
              >
                {candidate.priority}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Action */}
      {candidate.nextAction && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="font-medium">{candidate.nextAction}</div>
                  {candidate.actionDueDate && (
                    <div className="text-sm text-gray-500">Due: {candidate.actionDueDate}</div>
                  )}
                </div>
              </div>
              <Button size="sm">
                Take Action
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

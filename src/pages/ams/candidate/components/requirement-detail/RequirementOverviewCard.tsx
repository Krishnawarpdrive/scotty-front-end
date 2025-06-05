
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase,
  Star,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

interface RequirementOverviewCardProps {
  requirement: {
    id: string;
    roleName: string;
    companyName: string;
    location: string;
    workMode: string;
    employmentType: string;
    appliedDate: string;
    currentStage: string;
    status: string;
    priority: string;
    salaryRange?: string;
    teamSize?: string;
    department?: string;
    hiringManager?: string;
    description: string;
    keyRequirements: string[];
    benefits?: string[];
    companyRating?: number;
  };
  onContactRecruiter: () => void;
  onViewJobDetails: () => void;
}

export const RequirementOverviewCard: React.FC<RequirementOverviewCardProps> = ({
  requirement,
  onContactRecruiter,
  onViewJobDetails
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'offer':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-gray-900 mb-2">{requirement.roleName}</CardTitle>
            <div className="flex items-center space-x-2 text-gray-600">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{requirement.companyName}</span>
              {requirement.companyRating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{requirement.companyRating}/5</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(requirement.status)}>
              {requirement.status}
            </Badge>
            <Badge className={getPriorityColor(requirement.priority)}>
              {requirement.priority} Priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Job Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">{requirement.location}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Work Mode</div>
              <div className="font-medium">{requirement.workMode}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Employment Type</div>
              <div className="font-medium">{requirement.employmentType}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Applied Date</div>
              <div className="font-medium">{requirement.appliedDate}</div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        {(requirement.salaryRange || requirement.teamSize || requirement.department || requirement.hiringManager) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            {requirement.salaryRange && (
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Salary Range</div>
                  <div className="font-medium">{requirement.salaryRange}</div>
                </div>
              </div>
            )}
            
            {requirement.teamSize && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Team Size</div>
                  <div className="font-medium">{requirement.teamSize}</div>
                </div>
              </div>
            )}
            
            {requirement.department && (
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="font-medium">{requirement.department}</div>
                </div>
              </div>
            )}
            
            {requirement.hiringManager && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Hiring Manager</div>
                  <div className="font-medium">{requirement.hiringManager}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Job Description */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{requirement.description}</p>
        </div>

        {/* Key Requirements */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Key Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {requirement.keyRequirements.map((req, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        {requirement.benefits && requirement.benefits.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Benefits & Perks</h4>
            <div className="flex flex-wrap gap-2">
              {requirement.benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button onClick={onContactRecruiter} className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Recruiter
          </Button>
          <Button variant="outline" onClick={onViewJobDetails}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Job Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

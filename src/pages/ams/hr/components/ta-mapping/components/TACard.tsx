
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface TAProfile {
  id: string;
  name: string;
  email: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiencyScore: number;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  assignments: number;
}

interface TACardProps {
  ta: TAProfile;
  isSelected: boolean;
  onSelect: (taId: string) => void;
  recommendationCount: number;
}

export const TACard: React.FC<TACardProps> = ({
  ta,
  isSelected,
  onSelect,
  recommendationCount
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(ta.id === isSelected ? '' : ta.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{getInitials(ta.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{ta.name}</div>
            <div className="text-xs text-gray-600">{ta.email}</div>
          </div>
        </div>
        <Badge className={getAvailabilityColor(ta.availability)} variant="secondary">
          {ta.availability}
        </Badge>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>Workload</span>
          <span>{ta.currentWorkload}/{ta.maxWorkload}</span>
        </div>
        <Progress value={(ta.currentWorkload / ta.maxWorkload) * 100} className="h-2" />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>Efficiency</span>
        <div className="flex items-center gap-1">
          <span className={`font-medium ${
            ta.efficiencyScore >= 85 ? 'text-green-600' : 
            ta.efficiencyScore >= 70 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {ta.efficiencyScore}%
          </span>
          {ta.efficiencyScore >= 85 ? (
            <CheckCircle className="h-3 w-3 text-green-600" />
          ) : ta.efficiencyScore < 70 ? (
            <AlertTriangle className="h-3 w-3 text-red-600" />
          ) : null}
        </div>
      </div>

      <div className="mt-2">
        <div className="flex flex-wrap gap-1">
          {ta.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {ta.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{ta.skills.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {recommendationCount > 0 && (
        <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
          <div className="flex items-center gap-1 text-xs text-yellow-800">
            <Lightbulb className="h-3 w-3" />
            {recommendationCount} AI suggestion(s)
          </div>
        </div>
      )}
    </div>
  );
};

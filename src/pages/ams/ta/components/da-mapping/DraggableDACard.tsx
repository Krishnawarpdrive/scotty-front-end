
import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Star } from 'lucide-react';
import { DAProfile } from './DAMappingInterface';

interface DraggableDACardProps {
  da: DAProfile;
  isSelected: boolean;
}

export const DraggableDACard: React.FC<DraggableDACardProps> = ({ da, isSelected }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DA_CARD',
    item: { id: da.id, da },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card
      ref={drag}
      className={`cursor-move transition-all duration-200 hover:shadow-md ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <CardContent className="p-3">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${da.name}`} />
            <AvatarFallback>{getInitials(da.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm truncate">{da.name}</h4>
              <Badge className={getAvailabilityColor(da.availability_status)} variant="secondary">
                {da.availability_status}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{da.email}</p>
            
            <div className="space-y-2">
              {/* Workload */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Workload</span>
                  <span>{da.current_workload}%</span>
                </div>
                <Progress 
                  value={da.current_workload} 
                  className="h-1"
                />
              </div>
              
              {/* Performance Score */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-gray-600">Performance</span>
                </div>
                <span className="font-medium">{da.performance_score}/100</span>
              </div>
              
              {/* Experience */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span className="text-gray-600">Experience</span>
                </div>
                <span>{da.experience_years} years</span>
              </div>
              
              {/* Location */}
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{da.location}</span>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {da.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {da.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{da.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

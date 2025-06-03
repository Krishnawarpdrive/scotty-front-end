
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Calendar, 
  FileCheck, 
  Bell,
  ChevronRight
} from 'lucide-react';

interface CandidateTopNavigationProps {
  data: any;
  onSectionClick: (section: string) => void;
}

export const CandidateTopNavigation: React.FC<CandidateTopNavigationProps> = ({ 
  data, 
  onSectionClick 
}) => {
  const navigationItems = [
    {
      id: 'applications',
      title: 'Recent Applications',
      value: data?.active_applications || 0,
      icon: Briefcase,
      color: 'blue',
      description: 'Active applications'
    },
    {
      id: 'interviews',
      title: 'Upcoming Interviews',
      value: data?.interviews_scheduled || 0,
      icon: Calendar,
      color: 'purple',
      description: 'Scheduled sessions'
    },
    {
      id: 'documents',
      title: 'Document Status',
      value: data?.documents_verified || 0,
      icon: FileCheck,
      color: 'green',
      description: 'Verified documents'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      value: 3,
      icon: Bell,
      color: 'orange',
      description: 'Unread notifications'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          hover: 'hover:bg-blue-50'
        };
      case 'purple':
        return {
          icon: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          hover: 'hover:bg-purple-50'
        };
      case 'green':
        return {
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-700 border-green-200',
          hover: 'hover:bg-green-50'
        };
      case 'orange':
        return {
          icon: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-700 border-orange-200',
          hover: 'hover:bg-orange-50'
        };
      default:
        return {
          icon: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          hover: 'hover:bg-gray-50'
        };
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {navigationItems.map((item) => {
          const colors = getColorClasses(item.color);
          const IconComponent = item.icon;
          
          return (
            <Card 
              key={item.id} 
              className={`cursor-pointer transition-colors ${colors.hover} border-2`}
              onClick={() => onSectionClick(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={colors.badge}>
                      {item.value}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

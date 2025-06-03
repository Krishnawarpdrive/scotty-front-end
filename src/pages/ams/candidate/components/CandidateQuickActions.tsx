
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Calendar, 
  Search, 
  MessageSquare,
  FileText,
  UserCheck,
  Briefcase,
  Building
} from 'lucide-react';

interface CandidateQuickActionsProps {
  onActionClick: (action: string) => void;
}

export const CandidateQuickActions: React.FC<CandidateQuickActionsProps> = ({ 
  onActionClick 
}) => {
  const quickActions = [
    {
      id: 'upload_resume',
      title: 'Upload Resume',
      description: 'Update your latest resume',
      icon: Upload,
      color: 'blue'
    },
    {
      id: 'schedule_interview',
      title: 'Schedule Interview',
      description: 'Book available time slots',
      icon: Calendar,
      color: 'purple'
    },
    {
      id: 'browse_jobs',
      title: 'Browse Jobs',
      description: 'Find new opportunities',
      icon: Search,
      color: 'green'
    },
    {
      id: 'contact_recruiter',
      title: 'Contact Recruiter',
      description: 'Reach out to your assigned TA',
      icon: MessageSquare,
      color: 'orange'
    },
    {
      id: 'update_profile',
      title: 'Update Profile',
      description: 'Complete your profile',
      icon: UserCheck,
      color: 'indigo'
    },
    {
      id: 'view_applications',
      title: 'My Applications',
      description: 'Track application status',
      icon: Briefcase,
      color: 'teal'
    },
    {
      id: 'company_insights',
      title: 'Company Insights',
      description: 'Research potential employers',
      icon: Building,
      color: 'pink'
    },
    {
      id: 'prepare_interview',
      title: 'Interview Prep',
      description: 'Access preparation materials',
      icon: FileText,
      color: 'amber'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
      green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
      orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700',
      indigo: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700',
      teal: 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-700',
      pink: 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700',
      amber: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <p className="text-gray-600">Fast access to essential candidate tools</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            const colorClasses = getColorClasses(action.color);
            
            return (
              <Button
                key={action.id}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${colorClasses} border-2 transition-all duration-200`}
                onClick={() => onActionClick(action.id)}
              >
                <IconComponent className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-75">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

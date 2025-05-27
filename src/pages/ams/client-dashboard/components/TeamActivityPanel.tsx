
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  UserPlus,
  Calendar
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'interview' | 'offer' | 'hire' | 'feedback' | 'application';
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  activeRoles: number;
  completedInterviews: number;
}

interface TeamActivityPanelProps {
  activities: Activity[];
  teamMembers: TeamMember[];
}

export const TeamActivityPanel: React.FC<TeamActivityPanelProps> = ({
  activities,
  teamMembers
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Calendar className="h-3 w-3 text-blue-500" />;
      case 'offer': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'hire': return <UserPlus className="h-3 w-3 text-purple-500" />;
      case 'feedback': return <MessageSquare className="h-3 w-3 text-yellow-500" />;
      case 'application': return <Users className="h-3 w-3 text-gray-500" />;
      default: return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members
            <Badge variant="outline" className="ml-auto">
              {teamMembers.filter(m => m.status === 'online').length} online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="relative">
                <Avatar className="h-8 w-8 bg-gray-200">
                  <span className="text-[11px] font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{member.name}</p>
                <p className="text-[11px] text-gray-600">{member.role}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium">{member.activeRoles} roles</p>
                <p className="text-[11px] text-gray-600">{member.completedInterviews} interviews</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Team Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.slice(0, 10).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-medium">{activity.user.name}</span>
                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                      {activity.user.role}
                    </Badge>
                  </div>
                  <p className="text-[12px] text-gray-700 mb-1">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  {activity.details && (
                    <p className="text-[11px] text-gray-600 mb-1">{activity.details}</p>
                  )}
                  <span className="text-[10px] text-gray-500">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

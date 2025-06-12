import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bell, 
  MessageSquare, 
  Search,
  Filter,
  Settings
} from 'lucide-react';

interface CandidateTopNavigationProps {
  candidateName: string;
  totalApplications: number;
  activeApplications: number;
  upcomingInterviews: number;
}

export const CandidateTopNavigation: React.FC<CandidateTopNavigationProps> = ({
  candidateName,
  totalApplications,
  activeApplications,
  upcomingInterviews
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">{candidateName}</div>
          <Badge variant="secondary">
            Total Applications: {totalApplications}
          </Badge>
          <Badge variant="secondary">
            Active: {activeApplications}
          </Badge>
          <Badge variant="secondary">
            Interviews: {upcomingInterviews}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="h-5 w-5 cursor-pointer" />
          <Filter className="h-5 w-5 cursor-pointer" />
          <Bell className="h-5 w-5 cursor-pointer" />
          <MessageSquare className="h-5 w-5 cursor-pointer" />
          <Settings className="h-5 w-5 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
};

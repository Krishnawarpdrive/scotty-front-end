
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, UserPlus, Calendar, Phone, Clock, FileText, Star, MoreVertical, Building } from 'lucide-react';
import { motion } from 'framer-motion';

interface PipelineDetailSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: string | null;
  data: any;
}

export const PipelineDetailSidebar: React.FC<PipelineDetailSidebarProps> = ({
  open,
  onOpenChange,
  stage,
  data
}) => {
  if (!stage || !data) return null;

  const getBulkActions = () => {
    switch (stage) {
      case 'Screening':
        return [
          { label: 'Schedule Interviews', icon: Calendar, variant: 'default' as const },
          { label: 'Send Reminders', icon: MessageSquare, variant: 'outline' as const },
          { label: 'Reassign TA', icon: UserPlus, variant: 'outline' as const }
        ];
      case 'Interview':
        return [
          { label: 'Follow Up', icon: Phone, variant: 'default' as const },
          { label: 'Schedule Next Round', icon: Calendar, variant: 'outline' as const },
          { label: 'Request Feedback', icon: MessageSquare, variant: 'outline' as const }
        ];
      case 'Offer':
        return [
          { label: 'Send Reminders', icon: MessageSquare, variant: 'default' as const },
          { label: 'Prepare Alternatives', icon: UserPlus, variant: 'outline' as const }
        ];
      default:
        return [
          { label: 'Send Welcome Kit', icon: MessageSquare, variant: 'default' as const },
          { label: 'Schedule Onboarding', icon: Calendar, variant: 'outline' as const }
        ];
    }
  };

  const mockCandidates = [
    { 
      name: 'John Doe', 
      role: 'Software Engineer', 
      requirementId: 'REQ-001',
      ta: 'Sarah Johnson', 
      taInitials: 'SJ',
      client: 'Acme Corp', 
      clientInitials: 'AC',
      status: 'In Progress', 
      daysInStage: 3,
      source: 'LinkedIn',
      statusType: 'success',
      hasResume: true,
      isStarred: false,
      riskStatus: null
    },
    { 
      name: 'Jane Smith', 
      role: 'UX Designer', 
      requirementId: 'REQ-002',
      ta: 'Mike Peterson', 
      taInitials: 'MP',
      client: 'Tech Innovations', 
      clientInitials: 'TI',
      status: 'Pending Feedback', 
      daysInStage: 7,
      source: 'Referral',
      statusType: 'warning',
      hasResume: true,
      isStarred: true,
      riskStatus: 'At Risk'
    },
    { 
      name: 'Alice Brown', 
      role: 'Product Manager', 
      requirementId: 'REQ-003',
      ta: null, 
      taInitials: null,
      client: 'Global Solutions', 
      clientInitials: 'GS',
      status: 'Scheduled', 
      daysInStage: 2,
      source: 'Direct',
      statusType: 'info',
      hasResume: true,
      isStarred: false,
      riskStatus: null
    },
    { 
      name: 'Bob Chen', 
      role: 'Data Scientist', 
      requirementId: 'REQ-004',
      ta: 'John Taylor', 
      taInitials: 'JT',
      client: 'Future Systems', 
      clientInitials: 'FS',
      status: 'In Progress', 
      daysInStage: 5,
      source: 'Agency',
      statusType: 'success',
      hasResume: true,
      isStarred: false,
      riskStatus: null
    }
  ];

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysColor = (days: number) => {
    if (days > 5) return 'bg-red-100 text-red-800';
    if (days > 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`${stage} Stage Details`}
      subtitle={`${data.count} candidates in this stage`}
      size="lg"
    >
      <TooltipProvider>
        <div className="p-6 space-y-6">
          {/* Stage Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Stage Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Candidates:</span>
                <span className="font-medium ml-2">{data.count}</span>
              </div>
              <div>
                <span className="text-gray-500">Avg. Time in Stage:</span>
                <span className="font-medium ml-2">4.2 days</span>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div>
            <h3 className="font-semibold mb-3">Bulk Actions</h3>
            <div className="flex flex-wrap gap-2">
              {getBulkActions().map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant}
                  className="flex items-center gap-2"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Candidate List */}
          <div>
            <h3 className="font-semibold mb-3">Candidates ({mockCandidates.length})</h3>
            <div className="space-y-2">
              {mockCandidates.map((candidate, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white"
                >
                  {/* Top Row - Client Logo and TA Chip */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                              <Building className="h-3 w-3" />
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{candidate.client}</p>
                        </TooltipContent>
                      </Tooltip>
                      {candidate.isStarred && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {candidate.ta ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 px-2 py-1 text-xs">
                              {candidate.taInitials}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>TA: {candidate.ta}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-500 px-2 py-1 text-xs">
                          Unassigned
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Main Candidate Info */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{candidate.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{candidate.role}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                        {candidate.requirementId}
                      </Badge>
                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                        {candidate.source}
                      </Badge>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs px-2 py-0.5 ${getDaysColor(candidate.daysInStage)}`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {candidate.daysInStage}d
                      </Badge>
                      
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(candidate.statusType)}`}>
                        {candidate.status}
                      </Badge>

                      {candidate.riskStatus && (
                        <Badge className="text-xs px-2 py-0.5 bg-red-100 text-red-800">
                          ⚠️ {candidate.riskStatus}
                        </Badge>
                      )}

                      {candidate.hasResume && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <FileText className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Resume</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-6">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-6">
                        Message TA
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Reassign TA
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reject Candidate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </SideDrawer>
  );
};

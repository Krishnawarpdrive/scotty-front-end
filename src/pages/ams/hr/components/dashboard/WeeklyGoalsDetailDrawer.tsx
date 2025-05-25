
import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Users, MessageSquare, Clock, AlertTriangle, CheckCircle, Eye, UserPlus } from 'lucide-react';

interface WeeklyGoalsDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalType: string | null;
}

export const WeeklyGoalsDetailDrawer: React.FC<WeeklyGoalsDetailDrawerProps> = ({
  open,
  onOpenChange,
  goalType
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'accordion'>('table');

  if (!goalType) return null;

  const getGoalData = () => {
    switch (goalType) {
      case 'interviews':
        return {
          title: 'Interview Schedules - This Week',
          target: 25,
          achieved: 18,
          taContributions: [
            { 
              name: 'Sarah Johnson', 
              initials: 'SJ',
              contribution: 5, 
              target: 6, 
              progress: 83,
              status: 'behind',
              insight: '1 interview unscheduled, 1 pending feedback',
              avgDelay: '2.4 days',
              roles: ['Senior Developer', 'UX Designer'],
              candidates: ['John Doe', 'Jane Smith'],
              hasConflicts: false
            },
            { 
              name: 'Mike Peterson', 
              initials: 'MP',
              contribution: 4, 
              target: 5, 
              progress: 80,
              status: 'on-track',
              insight: 'All interviews scheduled on time',
              avgDelay: '0.8 days',
              roles: ['Product Manager'],
              candidates: ['Alice Brown'],
              hasConflicts: false
            },
            { 
              name: 'Emma Wilson', 
              initials: 'EW',
              contribution: 3, 
              target: 4, 
              progress: 75,
              status: 'feedback-pending',
              insight: '2 feedback responses overdue',
              avgDelay: '1.2 days',
              roles: ['Data Scientist', 'ML Engineer'],
              candidates: ['Bob Chen', 'Carol Davis'],
              hasConflicts: true
            },
            { 
              name: 'John Taylor', 
              initials: 'JT',
              contribution: 6, 
              target: 6, 
              progress: 100,
              status: 'done',
              insight: 'All targets met ahead of schedule',
              avgDelay: '0 days',
              roles: ['DevOps Engineer', 'Cloud Architect'],
              candidates: ['David Wilson', 'Eva Martinez'],
              hasConflicts: false
            },
            { 
              name: 'Rachel Garcia', 
              initials: 'RG',
              contribution: 0, 
              target: 4, 
              progress: 0,
              status: 'at-risk',
              insight: 'No interviews scheduled this week',
              avgDelay: '4+ days',
              roles: ['Frontend Developer'],
              candidates: [],
              hasConflicts: false
            }
          ]
        };
      case 'roles':
        return {
          title: 'Roles Filled - This Week',
          target: 10,
          achieved: 7,
          details: [
            { role: 'Senior Developer', client: 'Acme Corp', ta: 'Sarah Johnson', status: 'Filled' },
            { role: 'UX Designer', client: 'Tech Inc', ta: 'Mike Peterson', status: 'Filled' },
            { role: 'Product Manager', client: 'Global Co', ta: 'Emma Wilson', status: 'Pending' }
          ]
        };
      case 'feedback':
        return {
          title: 'Candidate Feedback - This Week',
          target: 20,
          achieved: 15,
          pending: [
            { candidate: 'John Doe', role: 'Developer', ta: 'Sarah Johnson', days: 2 },
            { candidate: 'Jane Smith', role: 'Designer', ta: 'Mike Peterson', days: 1 },
            { candidate: 'Bob Wilson', role: 'Manager', ta: 'Emma Wilson', days: 3 }
          ]
        };
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Done</Badge>;
      case 'on-track':
        return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>;
      case 'behind':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Behind</Badge>;
      case 'feedback-pending':
        return <Badge className="bg-orange-100 text-orange-800">Feedback Pending</Badge>;
      case 'at-risk':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />At Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getActionButtons = (ta: any) => {
    if (ta.status === 'done') {
      return <span className="text-gray-400 text-sm">—</span>;
    }

    const actions = [];
    
    if (ta.status === 'behind' || ta.status === 'at-risk') {
      actions.push(
        <Tooltip key="reassign">
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <UserPlus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reassign</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    
    actions.push(
      <Tooltip key="message">
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Message</p>
        </TooltipContent>
      </Tooltip>
    );

    if (ta.status === 'feedback-pending') {
      actions.push(
        <Tooltip key="follow-up">
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Clock className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Follow Up</p>
          </TooltipContent>
        </Tooltip>
      );
    } else if (ta.status === 'on-track') {
      actions.push(
        <Tooltip key="nudge">
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <AlertTriangle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Nudge</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    actions.push(
      <Tooltip key="view">
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View</p>
        </TooltipContent>
      </Tooltip>
    );

    return <div className="flex gap-1">{actions}</div>;
  };

  const goalData = getGoalData();
  if (!goalData) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={goalData.title}
      subtitle={`${goalData.achieved}/${goalData.target} completed (${Math.round((goalData.achieved / goalData.target) * 100)}%)`}
      size="xl"
    >
      <TooltipProvider>
        <div className="p-6 space-y-4">
          {/* Overall Progress */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-lg font-bold">
                {goalData.achieved}/{goalData.target}
              </span>
            </div>
            <Progress value={(goalData.achieved / goalData.target) * 100} className="mb-2" />
            <p className="text-sm text-gray-500">
              {Math.round((goalData.achieved / goalData.target) * 100)}% completed • {goalData.target - goalData.achieved} remaining
            </p>
          </Card>

          {/* View Mode Toggle */}
          {goalType === 'interviews' && goalData.taContributions && (
            <>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  TA Contributions
                </h4>
                <div className="flex gap-1">
                  <Button 
                    variant={viewMode === 'table' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                  <Button 
                    variant={viewMode === 'accordion' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('accordion')}
                  >
                    Details
                  </Button>
                </div>
              </div>

              {viewMode === 'table' ? (
                <Card className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">TA Name</TableHead>
                        <TableHead className="w-[80px]">Done</TableHead>
                        <TableHead className="w-[100px]">Progress</TableHead>
                        <TableHead className="w-[140px]">Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {goalData.taContributions.map((ta, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {ta.initials}
                                </AvatarFallback>
                              </Avatar>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="font-medium cursor-pointer">
                                    {ta.name}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-xs">
                                  <div className="space-y-1 text-xs">
                                    <p><strong>Roles:</strong> {ta.roles.join(', ')}</p>
                                    <p><strong>Candidates:</strong> {ta.candidates.length > 0 ? ta.candidates.join(', ') : 'None assigned'}</p>
                                    <p><strong>Avg Delay:</strong> {ta.avgDelay}</p>
                                    {ta.hasConflicts && <p className="text-red-600">⚠️ Time slot conflicts detected</p>}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {ta.contribution}/{ta.target}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={ta.progress} className="h-2 w-12" />
                              <span className="text-xs font-medium">{ta.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(ta.status)}
                          </TableCell>
                          <TableCell>
                            {getActionButtons(ta)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Accordion type="multiple" className="space-y-2">
                  {goalData.taContributions.map((ta, index) => (
                    <AccordionItem key={index} value={`ta-${index}`} className="border rounded-lg">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {ta.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                              <p className="font-medium">{ta.name}</p>
                              <p className="text-sm text-gray-500">{ta.contribution}/{ta.target} completed</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(ta.status)}
                            <span className="text-sm font-medium">{ta.progress}%</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Insight:</strong>
                              <p className="text-gray-600">{ta.insight}</p>
                            </div>
                            <div>
                              <strong>Average Delay:</strong>
                              <p className="text-gray-600 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {ta.avgDelay}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <strong className="text-sm">Roles Involved:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {ta.roles.map((role, roleIndex) => (
                                <Badge key={roleIndex} variant="outline" className="text-xs">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {ta.candidates.length > 0 && (
                            <div>
                              <strong className="text-sm">Candidates:</strong>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {ta.candidates.map((candidate, candidateIndex) => (
                                  <Badge key={candidateIndex} variant="secondary" className="text-xs">
                                    {candidate}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {ta.hasConflicts && (
                            <div className="bg-red-50 border border-red-200 rounded p-2">
                              <p className="text-red-700 text-xs flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Time slot conflicts detected - requires attention
                              </p>
                            </div>
                          )}

                          <div className="pt-2 border-t">
                            {getActionButtons(ta)}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </>
          )}

          {/* Role Details */}
          {goalType === 'roles' && goalData.details && (
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Role Details
              </h4>
              <div className="space-y-3">
                {goalData.details.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{detail.role}</p>
                      <p className="text-sm text-gray-500">{detail.client}</p>
                      <p className="text-xs text-gray-400">TA: {detail.ta}</p>
                    </div>
                    <Badge variant={detail.status === 'Filled' ? 'default' : 'secondary'}>
                      {detail.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Feedback Pending */}
          {goalType === 'feedback' && goalData.pending && (
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Pending Feedback
              </h4>
              <div className="space-y-3">
                {goalData.pending.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{item.candidate}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
                      <p className="text-xs text-gray-400">TA: {item.ta}</p>
                    </div>
                    <Badge 
                      variant={item.days <= 1 ? 'destructive' : item.days <= 2 ? 'secondary' : 'outline'}
                    >
                      {item.days} days
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </TooltipProvider>
    </SideDrawer>
  );
};

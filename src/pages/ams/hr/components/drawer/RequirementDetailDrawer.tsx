
import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Target, Settings, Plus, Calendar, AlertCircle, Clock } from 'lucide-react';

interface RequirementDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirement: any;
}

export const RequirementDetailDrawer: React.FC<RequirementDetailDrawerProps> = ({
  open,
  onOpenChange,
  requirement
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!requirement) return null;

  // Mock data for requirement details
  const requirementData = {
    id: requirement.id,
    linkedRole: requirement.linkedRole,
    clientName: requirement.clientName,
    dueDate: requirement.dueDate,
    status: 'Active',
    priority: 'High',
    description: 'Looking for experienced developers to join our growing team...',
    vacancies: 3,
    candidatesInPipeline: {
      screening: 8,
      interview: 6,
      offer: 3,
      onboarding: 1
    },
    assignedTA: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      workload: 75
    },
    hiringManager: 'John Smith',
    budgetRange: '$80k - $120k',
    timeline: {
      created: '2025-01-10',
      firstCandidate: '2025-01-12',
      expectedClose: requirement.dueDate
    }
  };

  const daysLeft = Math.ceil((new Date(requirementData.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Requirement #${requirementData.id.substring(0, 8)}`}
      subtitle={`${requirementData.linkedRole} • ${requirementData.clientName}`}
      size="lg"
    >
      <div className="h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-6 py-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="pipeline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pipeline
              </TabsTrigger>
              <TabsTrigger value="configuration" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuration
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full overflow-y-auto p-6 space-y-6">
              {/* Requirement Overview */}
              <Card className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{requirementData.linkedRole}</h3>
                    <p className="text-gray-600">{requirementData.clientName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={requirementData.status === 'Active' ? 'default' : 'secondary'}>
                      {requirementData.status}
                    </Badge>
                    <Badge variant={requirementData.priority === 'High' ? 'destructive' : 'outline'}>
                      {requirementData.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{requirementData.description}</p>
                
                {/* Deadline Alert */}
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  daysLeft <= 7 ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {daysLeft <= 0 ? 'Deadline passed!' : `${daysLeft} days left until deadline`}
                  </span>
                </div>
              </Card>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Requirement Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vacancies:</span>
                      <span className="font-medium">{requirementData.vacancies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget Range:</span>
                      <span className="font-medium">{requirementData.budgetRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hiring Manager:</span>
                      <span className="font-medium">{requirementData.hiringManager}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{requirementData.timeline.created}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Candidate:</span>
                      <span className="font-medium">{requirementData.timeline.firstCandidate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Close:</span>
                      <span className="font-medium">{requirementData.timeline.expectedClose}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Assigned TA */}
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Assigned Talent Acquisition
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {requirementData.assignedTA.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{requirementData.assignedTA.name}</p>
                      <p className="text-sm text-gray-500">{requirementData.assignedTA.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Workload</p>
                    <p className="text-lg font-semibold">{requirementData.assignedTA.workload}%</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="pipeline" className="h-full overflow-y-auto p-6 space-y-6">
              {/* Candidate Pipeline */}
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Candidate Pipeline
                </h4>
                <div className="space-y-3">
                  {Object.entries(requirementData.candidatesInPipeline).map(([stage, count]) => (
                    <div key={stage} className="flex justify-between items-center">
                      <span className="capitalize text-sm">{stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-full bg-blue-500 rounded" 
                            style={{ width: `${(count / Object.values(requirementData.candidatesInPipeline).reduce((a, b) => a + b, 0)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="configuration" className="h-full overflow-y-auto p-6 space-y-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Requirement Configuration</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Priority Level</Label>
                      <Select defaultValue={requirementData.priority.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select defaultValue={requirementData.status.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Vacancies</Label>
                    <Input type="number" defaultValue={requirementData.vacancies} />
                  </div>
                  
                  <div>
                    <Label>Budget Range</Label>
                    <Input defaultValue={requirementData.budgetRange} />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>

          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button>
                Save Changes
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </SideDrawer>
  );
};


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
import { Users, Target, Settings, Plus, Trash2, Clock, TrendingUp } from 'lucide-react';

interface RoleConfigurationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: any;
}

export const RoleConfigurationDrawer: React.FC<RoleConfigurationDrawerProps> = ({
  open,
  onOpenChange,
  role
}) => {
  const [activeTab, setActiveTab] = useState('pipeline');

  // Mock requirements for this role
  const mockRequirements = [
    {
      id: 'REQ-001',
      title: 'Senior React Developer',
      status: 'Active',
      priority: 'High',
      candidatesInPipeline: 12,
      dailyTargets: {
        profiles: 5,
        calls: 3,
        interviews: 2
      }
    },
    {
      id: 'REQ-002', 
      title: 'Frontend Engineer',
      status: 'Active',
      priority: 'Medium',
      candidatesInPipeline: 8,
      dailyTargets: {
        profiles: 4,
        calls: 2,
        interviews: 1
      }
    }
  ];

  // Mock TA data
  const mockTAs = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      currentLoad: 8,
      maxLoad: 10,
      efficiency: 87,
      skills: ['React', 'Frontend']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.c@company.com',
      currentLoad: 12,
      maxLoad: 10,
      efficiency: 72,
      skills: ['Full Stack', 'Backend']
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.d@company.com',
      currentLoad: 6,
      maxLoad: 10,
      efficiency: 92,
      skills: ['UI/UX', 'Frontend']
    }
  ];

  const [taAssignments, setTaAssignments] = useState<Record<string, string>>({
    'REQ-001': '1',
    'REQ-002': '3'
  });

  const [dailyTargets, setDailyTargets] = useState<Record<string, any>>({
    'REQ-001': { profiles: 5, calls: 3, interviews: 2 },
    'REQ-002': { profiles: 4, calls: 2, interviews: 1 }
  });

  const handleTaAssignment = (requirementId: string, taId: string) => {
    setTaAssignments(prev => ({
      ...prev,
      [requirementId]: taId
    }));
  };

  const handleTargetChange = (requirementId: string, field: string, value: number) => {
    setDailyTargets(prev => ({
      ...prev,
      [requirementId]: {
        ...prev[requirementId],
        [field]: value
      }
    }));
  };

  if (!role) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Configure ${role.name}`}
      subtitle={`${role.client} • Pipeline & TA Management`}
      size="xl"
    >
      <div className="h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-6 py-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pipeline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Pipeline Config
              </TabsTrigger>
              <TabsTrigger value="ta-mapping" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                TA Mapping
              </TabsTrigger>
              <TabsTrigger value="requirements" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Requirements
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="pipeline" className="h-full overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hiring Pipeline Configuration</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Pipeline Type</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Tech Hiring</SelectItem>
                            <SelectItem value="executive">Executive Search</SelectItem>
                            <SelectItem value="bulk">Bulk Hiring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>SLA (Days)</Label>
                        <Input type="number" defaultValue="30" />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Pipeline Stages</Label>
                      <div className="mt-2 space-y-2">
                        {['Screening', 'Technical Interview', 'Cultural Fit', 'Final Interview', 'Offer', 'Onboarding'].map((stage, index) => (
                          <div key={stage} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="font-medium">{stage}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Stage {index + 1}</span>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ta-mapping" className="h-full overflow-hidden">
              <div className="flex h-full">
                {/* Left Panel - Requirements */}
                <div className="w-1/2 border-r">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Requirements ({mockRequirements.length})
                      </h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Requirement
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {mockRequirements.map((req) => (
                        <Card key={req.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{req.title}</h4>
                                <p className="text-sm text-gray-500">{req.id}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant={req.status === 'Active' ? 'default' : 'secondary'}>
                                  {req.status}
                                </Badge>
                                <Badge variant={req.priority === 'High' ? 'destructive' : 'outline'}>
                                  {req.priority}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Daily Targets */}
                            <div>
                              <Label className="text-sm font-medium">Daily Targets</Label>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <div>
                                  <Label className="text-xs">Profiles</Label>
                                  <Input
                                    type="number"
                                    value={dailyTargets[req.id]?.profiles || 0}
                                    onChange={(e) => handleTargetChange(req.id, 'profiles', parseInt(e.target.value))}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Calls</Label>
                                  <Input
                                    type="number"
                                    value={dailyTargets[req.id]?.calls || 0}
                                    onChange={(e) => handleTargetChange(req.id, 'calls', parseInt(e.target.value))}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Interviews</Label>
                                  <Input
                                    type="number"
                                    value={dailyTargets[req.id]?.interviews || 0}
                                    onChange={(e) => handleTargetChange(req.id, 'interviews', parseInt(e.target.value))}
                                    className="h-8"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* TA Assignment */}
                            <div>
                              <Label className="text-sm font-medium">Assigned TA</Label>
                              <Select
                                value={taAssignments[req.id] || ''}
                                onValueChange={(value) => handleTaAssignment(req.id, value)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select TA" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockTAs.map((ta) => (
                                    <SelectItem key={ta.id} value={ta.id.toString()}>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback className="text-xs">
                                            {ta.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{ta.name}</span>
                                        <Badge variant="outline" className="text-xs">
                                          {ta.currentLoad}/{ta.maxLoad}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {req.candidatesInPipeline} candidates in pipeline
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel - TA Cards */}
                <div className="w-1/2">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Available TAs ({mockTAs.length})
                      </h3>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {mockTAs.map((ta) => {
                        const assignedRequirements = Object.entries(taAssignments)
                          .filter(([_, taId]) => taId === ta.id.toString())
                          .map(([reqId]) => mockRequirements.find(r => r.id === reqId))
                          .filter(Boolean);

                        const workloadPercentage = (ta.currentLoad / ta.maxLoad) * 100;
                        
                        return (
                          <Card key={ta.id} className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                      {ta.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{ta.name}</h4>
                                    <p className="text-xs text-gray-500">{ta.email}</p>
                                  </div>
                                </div>
                                <Badge variant={workloadPercentage >= 90 ? "destructive" : workloadPercentage >= 70 ? "outline" : "default"}>
                                  {Math.round(workloadPercentage)}% Load
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">Workload</span>
                                  <span className="font-medium">{ta.currentLoad} / {ta.maxLoad} roles</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Efficiency
                                  </span>
                                  <span className={`font-medium ${ta.efficiency >= 85 ? 'text-green-600' : ta.efficiency >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                                    {ta.efficiency}%
                                  </span>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm">Skills</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {ta.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {assignedRequirements.length > 0 && (
                                <div>
                                  <Label className="text-sm">Assigned Requirements</Label>
                                  <div className="space-y-1 mt-1">
                                    {assignedRequirements.map((req) => (
                                      <div key={req!.id} className="text-xs bg-blue-50 p-2 rounded">
                                        {req!.title} ({req!.id})
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="h-full overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Requirement Management</h3>
                <div className="space-y-4">
                  {mockRequirements.map((req) => (
                    <Card key={req.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{req.title}</h4>
                          <p className="text-sm text-gray-500">{req.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>

          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>
                Save Configuration
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </SideDrawer>
  );
};

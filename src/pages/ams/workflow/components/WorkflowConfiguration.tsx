
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowStage, QualityGate } from '@/types/WorkflowTypes';
import { Plus, Settings, Save, RotateCcw, Move, Eye, Edit, Trash2 } from 'lucide-react';

interface WorkflowConfigurationProps {
  stages: WorkflowStage[];
  qualityGates: QualityGate[];
}

export const WorkflowConfiguration: React.FC<WorkflowConfigurationProps> = ({
  stages,
  qualityGates
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getStageTypeColor = (type: string) => {
    switch (type) {
      case 'sourcing': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'offer': return 'bg-purple-100 text-purple-800';
      case 'onboarding': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedStages = [...stages].sort((a, b) => a.stage_order - b.stage_order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Configuration</h2>
          <p className="text-muted-foreground">
            Configure workflow stages, quality gates, and process automation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Changes
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="stages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stages">Workflow Stages</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="stages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stage List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Workflow Stages</CardTitle>
                      <CardDescription>
                        Manage and reorder workflow stages
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Stage
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sortedStages.map((stage, index) => (
                      <Card 
                        key={stage.id} 
                        className={`border-2 transition-colors cursor-pointer ${
                          selectedStage === stage.id ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedStage(stage.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Move className="h-4 w-4 text-muted-foreground cursor-grab" />
                                <span className="text-sm font-medium text-muted-foreground">
                                  {stage.stage_order}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium">{stage.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {stage.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStageTypeColor(stage.stage_type)}>
                                {stage.stage_type}
                              </Badge>
                              <Badge variant={stage.is_active ? "default" : "secondary"} className="text-xs">
                                {stage.is_active ? "Active" : "Inactive"}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Quality Gates for this stage */}
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">
                                Quality Gates ({qualityGates.filter(qg => qg.workflow_stage_id === stage.id).length})
                              </span>
                              <Button variant="ghost" size="sm">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Gate
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {qualityGates
                                .filter(qg => qg.workflow_stage_id === stage.id)
                                .slice(0, 3)
                                .map((gate) => (
                                  <Badge key={gate.id} variant="outline" className="text-xs">
                                    {gate.name}
                                  </Badge>
                                ))}
                              {qualityGates.filter(qg => qg.workflow_stage_id === stage.id).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{qualityGates.filter(qg => qg.workflow_stage_id === stage.id).length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stage Details */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Stage Details</CardTitle>
                  <CardDescription>
                    {selectedStage ? "Configure selected stage" : "Select a stage to configure"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStage ? (
                    <div className="space-y-4">
                      {(() => {
                        const stage = stages.find(s => s.id === selectedStage);
                        if (!stage) return null;
                        
                        return (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Stage Name</label>
                              <Input value={stage.name} readOnly />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Input value={stage.description || ''} readOnly />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Stage Type</label>
                              <Badge className={getStageTypeColor(stage.stage_type)}>
                                {stage.stage_type}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Order</label>
                              <Input value={stage.stage_order} readOnly type="number" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Active</span>
                              <Badge variant={stage.is_active ? "default" : "secondary"}>
                                {stage.is_active ? "Yes" : "No"}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2 pt-4">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </Button>
                            </div>
                            
                            <Button variant="destructive" size="sm" className="w-full">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete Stage
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a stage to view and edit its configuration</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Configure automated transitions and quality gate validations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Automation rules configuration coming soon</p>
                <p className="text-sm">Set up automated workflows, triggers, and conditions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Templates</CardTitle>
              <CardDescription>
                Manage and create reusable workflow templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Workflow templates coming soon</p>
                <p className="text-sm">Create and manage templates for different types of workflows</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

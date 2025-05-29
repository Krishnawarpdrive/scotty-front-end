
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowStage, QualityGate } from '@/types/WorkflowTypes';
import { Plus, Search, Filter, Settings, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface QualityGatesManagerProps {
  qualityGates: QualityGate[];
  workflowStages: WorkflowStage[];
}

export const QualityGatesManager: React.FC<QualityGatesManagerProps> = ({
  qualityGates,
  workflowStages
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const getGateTypeColor = (type: string) => {
    switch (type) {
      case 'mandatory': return 'text-red-600 bg-red-50 border-red-200';
      case 'optional': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'conditional': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getGateTypeIcon = (type: string) => {
    switch (type) {
      case 'mandatory': return <AlertTriangle className="h-4 w-4" />;
      case 'optional': return <Clock className="h-4 w-4" />;
      case 'conditional': return <Settings className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const filteredGates = qualityGates.filter(gate => {
    const matchesSearch = gate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gate.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || gate.workflow_stage_id === selectedStage;
    return matchesSearch && matchesStage;
  });

  const gatesByStage = workflowStages.map(stage => ({
    stage,
    gates: qualityGates.filter(gate => gate.workflow_stage_id === stage.id)
  }));

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quality gates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Quality Gate
        </Button>
      </div>

      <Tabs defaultValue="by-stage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="by-stage">By Stage</TabsTrigger>
          <TabsTrigger value="all-gates">All Gates</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="by-stage" className="space-y-4">
          {gatesByStage.map(({ stage, gates }) => (
            <Card key={stage.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <CardDescription>{stage.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{gates.length} gates</Badge>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Gate
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {gates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gates.map((gate) => (
                      <Card key={gate.id} className="border-2 hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded border ${getGateTypeColor(gate.gate_type)}`}>
                                {getGateTypeIcon(gate.gate_type)}
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{gate.name}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getGateTypeColor(gate.gate_type)}`}
                                >
                                  {gate.gate_type}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {gate.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {gate.automatable && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Auto
                                </Badge>
                              )}
                              {gate.is_active ? (
                                <Badge variant="default" className="text-xs">Active</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">Inactive</Badge>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No quality gates configured for this stage</p>
                    <Button variant="outline" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Gate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all-gates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGates.map((gate) => {
              const stage = workflowStages.find(s => s.id === gate.workflow_stage_id);
              return (
                <Card key={gate.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{gate.name}</h4>
                        <p className="text-sm text-muted-foreground">{stage?.name}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getGateTypeColor(gate.gate_type)}
                      >
                        {gate.gate_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {gate.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {gate.automatable && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Automatable
                          </Badge>
                        )}
                        <Badge variant={gate.is_active ? "default" : "secondary"} className="text-xs">
                          {gate.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredGates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No quality gates found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Gate Templates</CardTitle>
              <CardDescription>
                Pre-configured quality gate templates for common workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Quality gate templates coming soon</p>
                <p className="text-sm">Create reusable templates for consistent quality gates across projects</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { WorkflowStage, QualityGate, HandoffDocumentation } from '@/types/WorkflowTypes';
import { CheckCircle, Clock, AlertTriangle, ArrowRight, Eye } from 'lucide-react';

interface WorkflowOverviewProps {
  stages: WorkflowStage[];
  qualityGates: QualityGate[];
  handoffDocuments: HandoffDocumentation[];
}

export const WorkflowOverview: React.FC<WorkflowOverviewProps> = ({
  stages,
  qualityGates,
  handoffDocuments
}) => {
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

  const getHandoffStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHandoffStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const pendingHandoffs = handoffDocuments.filter(doc => doc.status === 'pending').length;
  const inProgressHandoffs = handoffDocuments.filter(doc => doc.status === 'in_progress').length;
  const completedHandoffs = handoffDocuments.filter(doc => doc.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Workflow Stages Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Workflow Stages
            <Badge variant="secondary">{stages.length} Total</Badge>
          </CardTitle>
          <CardDescription>
            Current workflow configuration and stage progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getStageTypeColor(stage.stage_type)}>
                        {stage.stage_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        #{stage.stage_order}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <h4 className="font-medium text-sm mb-2">{stage.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {stage.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <Badge variant={stage.is_active ? "default" : "secondary"} className="text-xs">
                        {stage.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {index < stages.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Gates Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Gates Summary</CardTitle>
            <CardDescription>
              Overview of quality gate configurations across workflow stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Quality Gates</span>
                <Badge>{qualityGates.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mandatory Gates</span>
                <Badge variant="destructive">
                  {qualityGates.filter(gate => gate.gate_type === 'mandatory').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Optional Gates</span>
                <Badge variant="secondary">
                  {qualityGates.filter(gate => gate.gate_type === 'optional').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conditional Gates</span>
                <Badge variant="outline">
                  {qualityGates.filter(gate => gate.gate_type === 'conditional').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Automatable Gates</span>
                <Badge className="bg-green-100 text-green-800">
                  {qualityGates.filter(gate => gate.automatable).length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Handoff Documentation Status</CardTitle>
            <CardDescription>
              Current status of handoff processes and documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Handoffs</span>
                <Badge>{handoffDocuments.length}</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-medium">{pendingHandoffs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">In Progress</span>
                  </div>
                  <span className="font-medium">{inProgressHandoffs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-medium">{completedHandoffs}</span>
                </div>
              </div>
              {handoffDocuments.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs text-muted-foreground mb-1">Completion Rate</div>
                  <Progress 
                    value={(completedHandoffs / handoffDocuments.length) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {Math.round((completedHandoffs / handoffDocuments.length) * 100)}% completed
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Handoff Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Handoff Activities</CardTitle>
          <CardDescription>
            Latest handoff documentation and transitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {handoffDocuments.slice(0, 5).map((handoff) => (
              <div key={handoff.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`${getHandoffStatusColor(handoff.status)}`}>
                    {getHandoffStatusIcon(handoff.status)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {handoff.handoff_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created by {handoff.created_by} • {new Date(handoff.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={handoff.status === 'completed' ? 'default' : 'secondary'}
                    className={getHandoffStatusColor(handoff.status)}
                  >
                    {handoff.status.replace(/_/g, ' ')}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            {handoffDocuments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No recent handoff activities
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

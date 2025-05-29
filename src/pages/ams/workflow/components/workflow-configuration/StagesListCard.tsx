
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowStage, QualityGate } from '@/types/WorkflowTypes';
import { Plus, Move, Settings } from 'lucide-react';

interface StagesListCardProps {
  stages: WorkflowStage[];
  qualityGates: QualityGate[];
  selectedStage: string | null;
  onStageSelect: (stageId: string) => void;
}

export const StagesListCard: React.FC<StagesListCardProps> = ({
  stages,
  qualityGates,
  selectedStage,
  onStageSelect
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

  const sortedStages = [...stages].sort((a, b) => a.stage_order - b.stage_order);

  return (
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
          {sortedStages.map((stage) => (
            <Card 
              key={stage.id} 
              className={`border-2 transition-colors cursor-pointer ${
                selectedStage === stage.id ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onStageSelect(stage.id)}
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
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { WorkflowStage } from '@/types/WorkflowTypes';
import { Settings, Edit, Eye, Trash2 } from 'lucide-react';

interface StageDetailsCardProps {
  selectedStage: string | null;
  stages: WorkflowStage[];
}

export const StageDetailsCard: React.FC<StageDetailsCardProps> = ({
  selectedStage,
  stages
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

  return (
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
  );
};

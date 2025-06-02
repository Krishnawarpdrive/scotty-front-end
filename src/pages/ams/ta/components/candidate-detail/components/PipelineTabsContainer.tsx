
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RoleApplication } from '../types/MultiPipelineTypes';
import { PipelineStageView } from './PipelineStageView';
import { Building2, Users, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface PipelineTabsContainerProps {
  roleApplications: RoleApplication[];
  onStageAction: (applicationId: string, stageId: string, actionId: string) => void;
  onAddStage: (applicationId: string, afterStageId?: string) => void;
  onReorderStages: (applicationId: string, stageIds: string[]) => void;
}

export const PipelineTabsContainer: React.FC<PipelineTabsContainerProps> = ({
  roleApplications,
  onStageAction,
  onAddStage,
  onReorderStages
}) => {
  const [activeTab, setActiveTab] = useState(roleApplications[0]?.id || '');

  const getPipelineTypeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Building2 className="h-4 w-4" />;
      case 'partner': return <Users className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getPipelineTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'partner': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const hasUrgentActions = (application: RoleApplication) => {
    return application.stages.some(stage => 
      stage.status === 'current' && 
      stage.required_actions.length > 0 &&
      stage.estimated_date && 
      new Date(stage.estimated_date) < new Date(Date.now() + 24 * 60 * 60 * 1000) // Within 24 hours
    );
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${roleApplications.length}, 1fr)` }}>
          {roleApplications.map((application) => (
            <TabsTrigger key={application.id} value={application.id} className="relative">
              <div className="flex items-center space-x-2">
                {getPipelineTypeIcon(application.pipeline_type)}
                <span className="truncate max-w-[120px]">{application.role_name}</span>
                {hasUrgentActions(application) && (
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {roleApplications.map((application) => (
          <TabsContent key={application.id} value={application.id} className="mt-6">
            {/* Application Header */}
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{application.role_name}</h3>
                  <p className="text-sm text-gray-600">{application.client_name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPipelineTypeColor(application.pipeline_type)}>
                    {application.pipeline_type.charAt(0).toUpperCase() + application.pipeline_type.slice(1)}
                  </Badge>
                  <Badge className={getPriorityColor(application.priority)}>
                    {application.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Applied:</span>
                  <p className="font-medium">{new Date(application.applied_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Hiring Manager:</span>
                  <p className="font-medium">{application.hiring_manager}</p>
                </div>
                <div>
                  <span className="text-gray-500">TA Assigned:</span>
                  <p className="font-medium">{application.ta_assigned}</p>
                </div>
                <div>
                  <span className="text-gray-500">Next Action:</span>
                  <p className="font-medium text-blue-600">{application.next_action}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pipeline Progress</span>
                  <span className="font-medium">{application.stage_progress}/{application.total_stages} stages</span>
                </div>
                <Progress value={(application.stage_progress / application.total_stages) * 100} className="h-2" />
              </div>
            </div>

            {/* Pipeline Stages */}
            <PipelineStageView
              application={application}
              onStageAction={onStageAction}
              onAddStage={onAddStage}
              onReorderStages={onReorderStages}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

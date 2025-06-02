
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RoleApplication, PipelineStage } from '../types/MultiPipelineTypes';
import { StageActionDialog } from './StageActionDialog';
import { InterviewSchedulingPanel } from './InterviewSchedulingPanel';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Calendar,
  FileText,
  Users,
  MessageSquare,
  ChevronRight,
  GripVertical
} from 'lucide-react';

interface PipelineStageViewProps {
  application: RoleApplication;
  onStageAction: (applicationId: string, stageId: string, actionId: string) => void;
  onAddStage: (applicationId: string, afterStageId?: string) => void;
  onReorderStages: (applicationId: string, stageIds: string[]) => void;
}

export const PipelineStageView: React.FC<PipelineStageViewProps> = ({
  application,
  onStageAction,
  onAddStage,
  onReorderStages
}) => {
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [schedulingPanelOpen, setSchedulingPanelOpen] = useState(false);

  const getStageStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending': return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
      case 'skipped': return <div className="h-5 w-5 rounded-full bg-gray-400" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'current': return 'bg-blue-50 border-blue-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
      case 'skipped': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleStageClick = (stage: PipelineStage) => {
    setSelectedStage(stage);
    if (stage.type === 'interview') {
      setSchedulingPanelOpen(true);
    } else {
      setActionDialogOpen(true);
    }
  };

  const handleScheduleInterview = (stage: PipelineStage) => {
    setSelectedStage(stage);
    setSchedulingPanelOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Stages Timeline */}
      <div className="space-y-3">
        {application.stages.map((stage, index) => (
          <Card 
            key={stage.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${getStageStatusColor(stage.status)}`}
            onClick={() => handleStageClick(stage)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    {getStageStatusIcon(stage.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{stage.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>Step {stage.order}</span>
                      {stage.completed_date && (
                        <span>Completed: {new Date(stage.completed_date).toLocaleDateString()}</span>
                      )}
                      {stage.estimated_date && stage.status !== 'completed' && (
                        <span>Est: {new Date(stage.estimated_date).toLocaleDateString()}</span>
                      )}
                      {stage.assigned_to && (
                        <span>Assigned: {stage.assigned_to}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Required Actions Badge */}
                  {stage.required_actions.length > 0 && stage.status === 'current' && (
                    <Badge variant="destructive" className="text-xs">
                      {stage.required_actions.length} actions
                    </Badge>
                  )}

                  {/* Interview Scheduling Button */}
                  {stage.type === 'interview' && stage.status === 'current' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleInterview(stage);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  )}

                  {/* Stage Actions */}
                  {stage.status === 'current' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStage(stage);
                        setActionDialogOpen(true);
                      }}
                    >
                      Actions
                    </Button>
                  )}

                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Required Actions List */}
              {stage.required_actions.length > 0 && stage.status === 'current' && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Required Actions:</p>
                      <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
                        {stage.required_actions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Interview Details */}
              {stage.interview_details && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        {stage.interview_details.type.charAt(0).toUpperCase() + stage.interview_details.type.slice(1)} Interview
                      </span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {stage.interview_details.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Interviewer: {stage.interview_details.interviewer}</p>
                    <p>Duration: {stage.interview_details.duration_minutes} minutes</p>
                    {stage.interview_details.scheduled_date && (
                      <p>Scheduled: {new Date(stage.interview_details.scheduled_date).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {stage.notes && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{stage.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Stage Button */}
        <Button
          variant="outline"
          className="w-full border-dashed border-2 h-12"
          onClick={() => onAddStage(application.id)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stage
        </Button>
      </div>

      {/* Stage Action Dialog */}
      {selectedStage && (
        <StageActionDialog
          open={actionDialogOpen}
          onClose={() => {
            setActionDialogOpen(false);
            setSelectedStage(null);
          }}
          stage={selectedStage}
          applicationId={application.id}
          onAction={(actionId) => {
            onStageAction(application.id, selectedStage.id, actionId);
            setActionDialogOpen(false);
            setSelectedStage(null);
          }}
        />
      )}

      {/* Interview Scheduling Panel */}
      {selectedStage && selectedStage.interview_details && (
        <InterviewSchedulingPanel
          open={schedulingPanelOpen}
          onClose={() => {
            setSchedulingPanelOpen(false);
            setSelectedStage(null);
          }}
          stage={selectedStage}
          applicationId={application.id}
          onSchedule={(scheduleData) => {
            // Handle interview scheduling
            console.log('Schedule interview:', scheduleData);
            setSchedulingPanelOpen(false);
            setSelectedStage(null);
          }}
        />
      )}
    </div>
  );
};

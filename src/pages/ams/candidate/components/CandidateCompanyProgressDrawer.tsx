
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  Play,
  Pause,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  type: 'document' | 'interview' | 'assessment' | 'video' | 'questionnaire';
  dueDate?: string;
  completedDate?: string;
  hasAction?: boolean;
  actionType?: string;
  description?: string;
  duration?: string;
  location?: string;
  interviewer?: string;
  documents?: string[];
  notes?: string;
}

interface CompanyApplication {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  stages: ApplicationStage[];
}

interface CandidateCompanyProgressDrawerProps {
  open: boolean;
  onClose: () => void;
  application: CompanyApplication | null;
}

export const CandidateCompanyProgressDrawer: React.FC<CandidateCompanyProgressDrawerProps> = ({
  open,
  onClose,
  application
}) => {
  const [selectedStage, setSelectedStage] = useState<ApplicationStage | null>(null);

  if (!application) return null;

  const getStageIcon = (stage: ApplicationStage) => {
    const iconClass = 'h-5 w-5';
    switch (stage.type) {
      case 'document':
        return <FileText className={iconClass} />;
      case 'interview':
        return <Calendar className={iconClass} />;
      case 'assessment':
        return <Clock className={iconClass} />;
      case 'video':
        return <Play className={iconClass} />;
      case 'questionnaire':
        return <FileText className={iconClass} />;
      default:
        return <CheckCircle className={iconClass} />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'blocked':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      offer: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      withdrawn: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] w-[60%] ml-auto">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-blue-600" />
              <div>
                <DrawerTitle className="text-xl">{application.companyName}</DrawerTitle>
                <p className="text-gray-600 mt-1">{application.roleName}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            {getStatusBadge(application.status)}
            <div className="text-sm text-gray-600">
              Applied on {application.appliedDate}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{application.progress}%</span>
            </div>
            <Progress value={application.progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">Current Stage: {application.currentStage}</p>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Stage Progress Stepper */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Progress</h3>
              <div className="space-y-4">
                {application.stages.map((stage, index) => (
                  <div 
                    key={stage.id}
                    className={cn(
                      'flex items-start gap-4 p-3 rounded-lg border cursor-pointer transition-colors',
                      selectedStage?.id === stage.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50',
                      stage.status === 'current' && 'ring-2 ring-blue-200'
                    )}
                    onClick={() => setSelectedStage(stage)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-white',
                        getStageColor(stage.status)
                      )}>
                        {stage.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : stage.status === 'current' ? (
                          <Play className="h-4 w-4" />
                        ) : stage.status === 'blocked' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      {index < application.stages.length - 1 && (
                        <div className={cn(
                          'w-0.5 h-8 mt-2',
                          stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                        )} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {getStageIcon(stage)}
                        <h4 className={cn(
                          'font-medium',
                          stage.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                        )}>
                          {stage.name}
                        </h4>
                      </div>
                      {stage.completedDate && (
                        <p className="text-sm text-gray-500 mt-1">
                          Completed on {stage.completedDate}
                        </p>
                      )}
                      {stage.dueDate && stage.status !== 'completed' && (
                        <p className="text-sm text-amber-600 mt-1">
                          Due: {stage.dueDate}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Stage Details</h3>
              {selectedStage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {getStageIcon(selectedStage)}
                      <CardTitle className="text-base">{selectedStage.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <Badge className={cn(
                          selectedStage.status === 'completed' ? 'bg-green-100 text-green-700' :
                          selectedStage.status === 'current' ? 'bg-blue-100 text-blue-700' :
                          selectedStage.status === 'blocked' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        )}>
                          {selectedStage.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Type</p>
                        <p className="text-sm text-gray-900 capitalize">{selectedStage.type}</p>
                      </div>
                    </div>

                    {selectedStage.description && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Description</p>
                        <p className="text-sm text-gray-700">{selectedStage.description}</p>
                      </div>
                    )}

                    {selectedStage.completedDate && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Completed Date</p>
                        <p className="text-sm text-gray-700">{selectedStage.completedDate}</p>
                      </div>
                    )}

                    {selectedStage.dueDate && selectedStage.status !== 'completed' && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Due Date</p>
                        <p className="text-sm text-amber-600">{selectedStage.dueDate}</p>
                      </div>
                    )}

                    {selectedStage.duration && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Duration</p>
                        <p className="text-sm text-gray-700">{selectedStage.duration}</p>
                      </div>
                    )}

                    {selectedStage.interviewer && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Interviewer</p>
                        <p className="text-sm text-gray-700">{selectedStage.interviewer}</p>
                      </div>
                    )}

                    {selectedStage.location && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
                        <p className="text-sm text-gray-700">{selectedStage.location}</p>
                      </div>
                    )}

                    {selectedStage.documents && selectedStage.documents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Documents</p>
                        <div className="space-y-1">
                          {selectedStage.documents.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <FileText className="h-4 w-4" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStage.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{selectedStage.notes}</p>
                      </div>
                    )}

                    {selectedStage.hasAction && (
                      <div className="pt-2 border-t">
                        <Button className="w-full">
                          Continue with {selectedStage.name}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <Calendar className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Stage</h3>
                    <p className="text-gray-600">Click on any stage from the progress timeline to view its details and metadata.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

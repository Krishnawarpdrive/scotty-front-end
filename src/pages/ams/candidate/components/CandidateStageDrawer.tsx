
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Video, 
  Calendar, 
  Clock, 
  Upload,
  Play,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StageContent {
  id: string;
  type: 'document' | 'video' | 'questionnaire' | 'interview' | 'assessment' | 'form';
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  dueDate?: string;
  estimatedTime?: string;
  instructions?: string;
  downloadUrl?: string;
  videoUrl?: string;
  formFields?: any[];
  metadata?: Record<string, any>;
}

interface StageData {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  progress: number;
  content: StageContent[];
  nextSteps?: string[];
  supportContact?: string;
}

interface CandidateStageDrawerProps {
  open: boolean;
  onClose: () => void;
  stageData: StageData | null;
  onContentAction: (contentId: string, action: string) => void;
  onStageComplete: () => void;
}

export const CandidateStageDrawer: React.FC<CandidateStageDrawerProps> = ({
  open,
  onClose,
  stageData,
  onContentAction,
  onStageComplete
}) => {
  const [activeContent, setActiveContent] = useState<string | null>(null);

  if (!stageData) return null;

  const getContentIcon = (type: string) => {
    const iconClass = 'h-5 w-5';
    switch (type) {
      case 'document':
        return <FileText className={iconClass} />;
      case 'video':
        return <Video className={iconClass} />;
      case 'interview':
        return <Calendar className={iconClass} />;
      case 'assessment':
        return <Clock className={iconClass} />;
      case 'questionnaire':
      case 'form':
        return <FileText className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  const getStatusBadge = (content: StageContent) => {
    if (content.isCompleted) {
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
    }
    if (content.isRequired) {
      return <Badge className="bg-red-100 text-red-700">Required</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-700">Optional</Badge>;
  };

  const renderContentActions = (content: StageContent) => {
    if (content.isCompleted) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Completed</span>
        </div>
      );
    }

    switch (content.type) {
      case 'document':
        return (
          <div className="flex gap-2">
            {content.downloadUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContentAction(content.id, 'download')}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => onContentAction(content.id, 'upload')}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </div>
        );
      
      case 'video':
        return (
          <Button
            size="sm"
            onClick={() => onContentAction(content.id, 'watch')}
          >
            <Play className="h-4 w-4 mr-1" />
            Watch Video
          </Button>
        );
      
      case 'questionnaire':
      case 'form':
        return (
          <Button
            size="sm"
            onClick={() => onContentAction(content.id, 'start')}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            Start {content.type === 'questionnaire' ? 'Survey' : 'Form'}
          </Button>
        );
      
      case 'interview':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onContentAction(content.id, 'schedule')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button
              size="sm"
              onClick={() => onContentAction(content.id, 'join')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Join Meeting
            </Button>
          </div>
        );
      
      case 'assessment':
        return (
          <Button
            size="sm"
            onClick={() => onContentAction(content.id, 'start')}
          >
            <Clock className="h-4 w-4 mr-1" />
            Start Assessment
          </Button>
        );
      
      default:
        return (
          <Button
            size="sm"
            onClick={() => onContentAction(content.id, 'view')}
          >
            View
          </Button>
        );
    }
  };

  const completedCount = stageData.content.filter(c => c.isCompleted).length;
  const totalCount = stageData.content.length;
  const canComplete = stageData.content.filter(c => c.isRequired).every(c => c.isCompleted);

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl">{stageData.name}</DrawerTitle>
              <p className="text-gray-600 mt-1">{stageData.description}</p>
            </div>
            <Badge 
              className={cn(
                stageData.status === 'completed' ? 'bg-green-100 text-green-700' :
                stageData.status === 'current' ? 'bg-blue-100 text-blue-700' :
                stageData.status === 'blocked' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              )}
            >
              {stageData.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{completedCount}/{totalCount} completed</span>
              </div>
              <Progress value={(completedCount / totalCount) * 100} className="h-2" />
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stage Content */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Required Actions</h3>
              {stageData.content.map((content) => (
                <Card 
                  key={content.id} 
                  className={cn(
                    'transition-all duration-200',
                    content.isCompleted ? 'bg-green-50 border-green-200' : 
                    content.isRequired ? 'bg-red-50 border-red-200' : 'bg-gray-50',
                    activeContent === content.id && 'ring-2 ring-blue-200'
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'p-2 rounded-lg',
                          content.isCompleted ? 'bg-green-100' : 'bg-white'
                        )}>
                          {getContentIcon(content.type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{content.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{content.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(content)}
                    </div>
                    
                    {(content.dueDate || content.estimatedTime) && (
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        {content.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {content.dueDate}
                          </div>
                        )}
                        {content.estimatedTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Est. {content.estimatedTime}
                          </div>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {content.instructions && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{content.instructions}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {renderContentActions(content)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Next Steps */}
            {stageData.nextSteps && stageData.nextSteps.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">What's Next</h3>
                <Card>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {stageData.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Support Contact */}
            {stageData.supportContact && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600">
                      If you have questions about this stage, contact: 
                      <span className="font-medium text-blue-600 ml-1">{stageData.supportContact}</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {canComplete ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  All required actions completed
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  Complete required actions to proceed
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {canComplete && stageData.status === 'current' && (
                <Button onClick={onStageComplete}>
                  Complete Stage
                </Button>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

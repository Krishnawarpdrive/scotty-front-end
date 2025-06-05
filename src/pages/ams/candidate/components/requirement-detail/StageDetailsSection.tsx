
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Video, 
  Clock, 
  User, 
  MapPin, 
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface StageContent {
  id: string;
  type: 'video' | 'document' | 'interview' | 'form' | 'assessment';
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  estimatedTime?: string;
  dueDate?: string;
  videoUrl?: string;
  downloadUrl?: string;
  instructions?: string;
}

interface StageDetailsProps {
  stage: {
    id: string;
    name: string;
    description: string;
    status: 'completed' | 'current' | 'pending' | 'overdue';
    progress: number;
    content: StageContent[];
    nextSteps?: string[];
    supportContact?: string;
    interviewer?: string;
    location?: string;
    duration?: string;
  };
  onContentAction: (contentId: string, action: string) => void;
  onStageComplete: () => void;
}

export const StageDetailsSection: React.FC<StageDetailsProps> = ({
  stage,
  onContentAction,
  onStageComplete
}) => {
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'interview':
        return <User className="h-5 w-5 text-purple-600" />;
      case 'form':
        return <FileText className="h-5 w-5 text-orange-600" />;
      case 'assessment':
        return <CheckCircle className="h-5 w-5 text-indigo-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActionButton = (content: StageContent) => {
    if (content.isCompleted) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }

    switch (content.type) {
      case 'video':
        return (
          <Button 
            size="sm" 
            onClick={() => onContentAction(content.id, 'watch')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Video className="h-4 w-4 mr-2" />
            Watch Video
          </Button>
        );
      case 'document':
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onContentAction(content.id, 'download')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        );
      case 'interview':
        return (
          <Button 
            size="sm"
            onClick={() => onContentAction(content.id, 'join')}
            className="bg-green-600 hover:bg-green-700"
          >
            <Video className="h-4 w-4 mr-2" />
            Join Interview
          </Button>
        );
      case 'form':
        return (
          <Button 
            size="sm"
            onClick={() => onContentAction(content.id, 'fill')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
        );
      default:
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onContentAction(content.id, 'view')}
          >
            View Details
          </Button>
        );
    }
  };

  const allRequiredCompleted = stage.content
    .filter(c => c.isRequired)
    .every(c => c.isCompleted);

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{stage.name}</CardTitle>
            <Badge 
              className={
                stage.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                stage.status === 'current' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                stage.status === 'overdue' ? 'bg-red-100 text-red-800 border-red-300' :
                'bg-gray-100 text-gray-800 border-gray-300'
              }
            >
              {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{stage.description}</p>
          
          {/* Interview Details */}
          {stage.interviewer && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  <strong>Interviewer:</strong> {stage.interviewer}
                </span>
              </div>
              {stage.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    <strong>Location:</strong> {stage.location}
                  </span>
                </div>
              )}
              {stage.duration && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    <strong>Duration:</strong> {stage.duration}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stage Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tasks & Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stage.content.map((content) => (
              <div 
                key={content.id}
                className={`p-4 rounded-lg border ${
                  content.isCompleted ? 'bg-green-50 border-green-200' : 
                  content.isRequired ? 'bg-blue-50 border-blue-200' : 
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getContentIcon(content.type)}
                      <h4 className="font-medium text-gray-900">{content.title}</h4>
                      {content.isRequired && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                      {content.dueDate && !content.isCompleted && (
                        <div className="flex items-center space-x-1 text-sm text-orange-600">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {content.dueDate}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{content.description}</p>
                    {content.estimatedTime && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Estimated time: {content.estimatedTime}</span>
                      </div>
                    )}
                    {content.instructions && (
                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>Instructions:</strong> {content.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {getActionButton(content)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {stage.nextSteps && stage.nextSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stage.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Complete Stage Button */}
      {stage.status === 'current' && allRequiredCompleted && (
        <div className="flex justify-center">
          <Button 
            onClick={onStageComplete}
            className="bg-green-600 hover:bg-green-700 px-8 py-3"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Complete This Stage
          </Button>
        </div>
      )}

      {/* Support Contact */}
      {stage.supportContact && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  Need help? Contact: <strong>{stage.supportContact}</strong>
                </span>
              </div>
              <Button variant="outline" size="sm">
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

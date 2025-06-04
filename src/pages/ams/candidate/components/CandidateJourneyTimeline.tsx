
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  FileText,
  MessageSquare,
  Users,
  Trophy
} from 'lucide-react';

interface JourneyStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming' | 'blocked';
  type: 'application' | 'screening' | 'interview' | 'assessment' | 'offer' | 'onboarding';
  date?: string;
  duration?: string;
  description?: string;
  nextAction?: string;
  documents?: string[];
  feedback?: string;
}

interface CandidateJourneyTimelineProps {
  roleId: string;
  roleName: string;
  companyName: string;
  stages: JourneyStage[];
  overallProgress: number;
}

export const CandidateJourneyTimeline: React.FC<CandidateJourneyTimelineProps> = ({
  roleId,
  roleName,
  companyName,
  stages,
  overallProgress
}) => {
  const getStageIcon = (type: string, status: string) => {
    const iconClass = status === 'completed' ? 'text-green-600' : 
                     status === 'current' ? 'text-blue-600' : 
                     status === 'blocked' ? 'text-red-600' : 'text-gray-400';
    
    switch (type) {
      case 'application':
        return <FileText className={`h-5 w-5 ${iconClass}`} />;
      case 'screening':
        return <MessageSquare className={`h-5 w-5 ${iconClass}`} />;
      case 'interview':
        return <Users className={`h-5 w-5 ${iconClass}`} />;
      case 'assessment':
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case 'offer':
        return <Trophy className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case 'current':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'upcoming':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Upcoming</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Action Required</Badge>;
      default:
        return null;
    }
  };

  const currentStage = stages.find(stage => stage.status === 'current');

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{roleName}</h2>
              <p className="text-gray-600">{companyName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3 mb-4" />
          {currentStage && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Current Stage:</span>
              <span>{currentStage.name}</span>
              {currentStage.nextAction && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-blue-600">{currentStage.nextAction}</span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Journey Timeline */}
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card 
            key={stage.id} 
            className={`transition-all duration-200 ${
              stage.status === 'current' ? 'ring-2 ring-blue-200 bg-blue-50' : 
              stage.status === 'completed' ? 'bg-green-50' :
              stage.status === 'blocked' ? 'bg-red-50' : 'bg-gray-50'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stage.status === 'completed' ? 'bg-green-100' :
                    stage.status === 'current' ? 'bg-blue-100' :
                    stage.status === 'blocked' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {getStageIcon(stage.type, stage.status)}
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                    }`} />
                  )}
                </div>

                {/* Stage Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                      {getStatusBadge(stage.status)}
                    </div>
                    {stage.date && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {stage.date}
                      </div>
                    )}
                  </div>

                  {stage.description && (
                    <p className="text-gray-600 mb-3">{stage.description}</p>
                  )}

                  {/* Stage Details */}
                  <div className="space-y-3">
                    {stage.documents && stage.documents.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Required Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.documents.map((doc, docIndex) => (
                            <Badge key={docIndex} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.feedback && (
                      <div className="bg-white p-3 rounded-lg border">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
                        <p className="text-sm text-gray-600">{stage.feedback}</p>
                      </div>
                    )}

                    {stage.status === 'current' && stage.nextAction && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                          Next Action: {stage.nextAction}
                        </span>
                        <Button size="sm" className="ml-auto">
                          Take Action
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

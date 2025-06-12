
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle,
  FileText
} from 'lucide-react';

interface Application {
  id: string;
  roleName: string;
  clientName: string;
  status: string;
  stage_progress: number;
  total_stages: number;
  current_stage: string;
  stages: Array<{
    id: string;
    name: string;
    status: 'completed' | 'current' | 'pending';
    completed_date?: string;
    estimated_date?: string;
  }>;
}

interface CandidateJourneyTimelineProps {
  applications: Application[];
}

export const CandidateJourneyTimeline: React.FC<CandidateJourneyTimelineProps> = ({ applications }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Journey</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{app.roleName}</h3>
                  <p className="text-sm text-gray-500">{app.clientName}</p>
                </div>
                <Badge className="rounded-full px-3 py-1 text-xs">{app.status}</Badge>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{app.stage_progress}/{app.total_stages} Stages</span>
                </div>
                <Progress value={(app.stage_progress / app.total_stages) * 100} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">Current Stage: {app.current_stage}</p>
              </div>
              <div className="relative">
                {app.stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start mb-3">
                    <div className="mr-3">
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : stage.status === 'current' ? (
                        <Circle className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{stage.name}</h4>
                      {stage.status === 'completed' && stage.completed_date && (
                        <p className="text-xs text-gray-500">Completed on {stage.completed_date}</p>
                      )}
                      {stage.status === 'current' && stage.estimated_date && (
                        <p className="text-xs text-gray-500">Estimated Date: {stage.estimated_date}</p>
                      )}
                    </div>
                    {index < app.stages.length - 1 && (
                      <div className="absolute left-2 top-8 h-full border-l border-gray-300 ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <FileText className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No applications found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

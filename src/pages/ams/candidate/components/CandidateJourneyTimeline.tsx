
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Circle } from 'lucide-react';

interface JourneyStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  completedAt?: string;
  description?: string;
}

interface CandidateJourneyTimelineProps {
  candidateId: string;
  applicationId: string;
}

export const CandidateJourneyTimeline: React.FC<CandidateJourneyTimelineProps> = ({
  candidateId,
  applicationId
}) => {
  // Mock journey data
  const journeyStages: JourneyStage[] = [
    {
      id: '1',
      name: 'Application Submitted',
      status: 'completed',
      completedAt: '2024-01-15',
      description: 'Application successfully submitted'
    },
    {
      id: '2',
      name: 'HR Screening',
      status: 'completed',
      completedAt: '2024-01-18',
      description: 'Initial HR screening completed'
    },
    {
      id: '3',
      name: 'Technical Interview',
      status: 'current',
      description: 'Scheduled for Jan 25, 2024'
    },
    {
      id: '4',
      name: 'Final Interview',
      status: 'upcoming',
      description: 'Pending technical interview completion'
    }
  ];

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'current':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Upcoming</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {journeyStages.map((stage, index) => (
            <div key={stage.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                {getStageIcon(stage.status)}
                {index < journeyStages.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{stage.name}</h4>
                  {getStatusBadge(stage.status)}
                </div>
                <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                {stage.completedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Completed on {new Date(stage.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

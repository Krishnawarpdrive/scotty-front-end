
import React from 'react';
import { InterviewStage, InterviewStageData } from './InterviewStage';
import { Candidate } from '../../types/CandidateTypes';

interface InterviewStagesTimelineProps {
  candidate: Candidate;
  currentStage: string;
}

const generateInterviewStagesData = (candidate: Candidate, currentStage: string): InterviewStageData[] => {
  const stages = [
    { 
      id: 'phone-screening', 
      title: 'Phone Screening', 
      description: 'Initial screening call',
      duration: '30 min'
    },
    { 
      id: 'technical', 
      title: 'Technical Interview', 
      description: 'Technical assessment',
      duration: '60 min'
    },
    { 
      id: 'client-interview', 
      title: 'Client Interview', 
      description: 'Interview with client team',
      duration: '45 min'
    },
    { 
      id: 'background-verification', 
      title: 'Background Check', 
      description: 'Document verification',
      duration: '2-3 days'
    },
    { 
      id: 'final-review', 
      title: 'Final Review', 
      description: 'Final decision and offer',
      duration: '1 day'
    }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === currentStage);

  return stages.map((stage, index) => ({
    ...stage,
    status: index < currentStageIndex ? 'completed' : 
           index === currentStageIndex ? 'current' : 'upcoming',
    date: index <= currentStageIndex ? '2024-01-15' : undefined,
    interviewer: index <= currentStageIndex ? 'Sarah Johnson' : undefined
  })) as InterviewStageData[];
};

export const InterviewStagesTimeline: React.FC<InterviewStagesTimelineProps> = ({
  candidate,
  currentStage
}) => {
  const stagesData = generateInterviewStagesData(candidate, currentStage);

  return (
    <div className="p-4 font-rubik">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 font-rubik">
        Interview Progress
      </h3>
      
      <div className="space-y-2">
        {stagesData.map((stage, index) => (
          <InterviewStage
            key={stage.id}
            stage={stage}
            isLast={index === stagesData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

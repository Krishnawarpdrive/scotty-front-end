
import React from 'react';
import { Box } from '@mui/material';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui-mui/Tabs';
import { SplitLayoutContainer } from './SplitLayoutContainer';
import { Candidate } from '../types/CandidateTypes';

interface InterviewStagesTabSystemProps {
  candidate: Candidate;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const interviewStages = [
  { id: 'phone-screening', label: 'Phone Screening' },
  { id: 'technical', label: 'Technical' },
  { id: 'client-interview', label: 'Client Interview' },
  { id: 'background-verification', label: 'Background' },
  { id: 'final-review', label: 'Final Review' }
];

export const InterviewStagesTabSystem: React.FC<InterviewStagesTabSystemProps> = ({
  candidate,
  activeStage,
  onStageChange
}) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs value={activeStage} onValueChange={onStageChange}>
        <Box sx={{ borderBottom: '1px solid #e0e0e0', px: 2 }}>
          <TabsList>
            {interviewStages.map((stage) => (
              <TabsTrigger key={stage.id} value={stage.id}>
                {stage.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Box>

        {interviewStages.map((stage) => (
          <TabsContent key={stage.id} value={stage.id} className="flex-1">
            <SplitLayoutContainer
              candidate={candidate}
              stageId={stage.id}
              stageName={stage.label}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Box>
  );
};

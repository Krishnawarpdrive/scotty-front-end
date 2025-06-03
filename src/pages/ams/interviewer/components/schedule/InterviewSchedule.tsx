
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { InterviewScheduleProps } from './types/ScheduleTypes';
import { useInterviewSchedule } from './hooks/useInterviewSchedule';
import { InterviewCard } from './components/InterviewCard';
import { EmptyScheduleState } from './components/EmptyScheduleState';

export const InterviewSchedule: React.FC<InterviewScheduleProps> = ({ panelistId }) => {
  const { interviews, isLoading } = useInterviewSchedule(panelistId);

  if (isLoading) {
    return <div>Loading schedule...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Interview Schedule</h2>
        <Badge variant="outline">{interviews.length} upcoming</Badge>
      </div>

      <div className="grid gap-4">
        {interviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}

        {interviews.length === 0 && <EmptyScheduleState />}
      </div>
    </div>
  );
};

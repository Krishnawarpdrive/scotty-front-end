
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SmartScheduleButtonProps {
  isScheduled: boolean;
  scheduledDate?: string;
  scheduledTime?: string;
  onSchedule: () => void;
  disabled?: boolean;
}

export const SmartScheduleButton: React.FC<SmartScheduleButtonProps> = ({
  isScheduled,
  scheduledDate,
  scheduledTime,
  onSchedule,
  disabled = false
}) => {
  if (isScheduled && scheduledDate && scheduledTime) {
    return (
      <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">Scheduled</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-green-700">
          <Clock className="h-3 w-3" />
          {scheduledDate} at {scheduledTime}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSchedule}
          className="ml-auto border-green-300 text-green-700 hover:bg-green-100"
        >
          Reschedule
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={onSchedule}
      disabled={disabled}
      className="w-full flex items-center gap-2"
    >
      <CalendarDays className="h-4 w-4" />
      Schedule Interview
    </Button>
  );
};

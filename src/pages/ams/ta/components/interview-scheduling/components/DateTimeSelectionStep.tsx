
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { TimezoneSelector } from '../TimezoneSelector';
import { TimeSlotPicker } from '../TimeSlotPicker';
import { interviewSchedulingService } from '../InterviewSchedulingService';

interface DateTimeSelectionStepProps {
  panelistId: string;
  duration: number;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
  onSlotSelect: (slot: { start: string; end: string }) => void;
}

export const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  panelistId,
  duration,
  timezone,
  onTimezoneChange,
  onSlotSelect
}) => {
  const [conflicts, setConflicts] = useState<any[]>([]);

  const checkConflicts = async (scheduledDate: string) => {
    if (panelistId && scheduledDate) {
      try {
        const conflictData = await interviewSchedulingService.detectConflicts(
          panelistId,
          scheduledDate,
          duration
        );
        setConflicts(conflictData);
      } catch (error) {
        console.error('Error checking conflicts:', error);
      }
    }
  };

  const handleSlotSelect = (slot: { start: string; end: string }) => {
    checkConflicts(slot.start);
    onSlotSelect(slot);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Pick Date & Time</h3>
      
      <TimezoneSelector
        value={timezone}
        onChange={onTimezoneChange}
      />

      <TimeSlotPicker
        panelistId={panelistId}
        duration={duration}
        timezone={timezone}
        onSelect={handleSlotSelect}
      />

      {conflicts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800 mb-2">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">Scheduling Conflicts Detected</span>
          </div>
          <p className="text-sm text-yellow-700">
            The selected time conflicts with existing interviews. Please choose a different time slot.
          </p>
        </div>
      )}
    </div>
  );
};

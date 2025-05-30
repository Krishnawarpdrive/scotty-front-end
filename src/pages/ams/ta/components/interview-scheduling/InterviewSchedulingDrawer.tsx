
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { EnhancedInterviewScheduler } from './EnhancedInterviewScheduler';
import { InterviewSchedule } from './InterviewSchedulingService';

interface InterviewSchedulingDrawerProps {
  open: boolean;
  onClose: () => void;
  candidateId: string;
  candidateName?: string;
  requirementId?: string;
  onScheduleComplete?: (schedule: InterviewSchedule) => void;
}

export const InterviewSchedulingDrawer: React.FC<InterviewSchedulingDrawerProps> = ({
  open,
  onClose,
  candidateId,
  candidateName,
  requirementId,
  onScheduleComplete
}) => {
  const handleScheduleComplete = (schedule: InterviewSchedule) => {
    onScheduleComplete?.(schedule);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Schedule Interview</DrawerTitle>
              <DrawerDescription>
                {candidateName ? `Scheduling interview for ${candidateName}` : 'Schedule a new interview'}
              </DrawerDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          <EnhancedInterviewScheduler
            candidateId={candidateId}
            requirementId={requirementId}
            onScheduleComplete={handleScheduleComplete}
            onCancel={onClose}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

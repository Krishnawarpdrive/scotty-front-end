
import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { InterviewerDrawerHeader } from './drawer/InterviewerDrawerHeader';
import { InterviewerDrawerProgress } from './drawer/InterviewerDrawerProgress';
import { InterviewerDrawerTabs } from './drawer/InterviewerDrawerTabs';
import { Interview } from '../MyInterviewsPage';

interface InterviewerCandidateDrawerProps {
  open: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export const InterviewerCandidateDrawer: React.FC<InterviewerCandidateDrawerProps> = ({
  open,
  onClose,
  interview
}) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!interview) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      size="xl"
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <InterviewerDrawerHeader 
          interview={interview}
          onClose={onClose}
        />

        {/* Progress Section */}
        <InterviewerDrawerProgress 
          interview={interview}
        />

        {/* Tabbed Content */}
        <div className="flex-1 overflow-hidden">
          <InterviewerDrawerTabs
            interview={interview}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </SideDrawer>
  );
};

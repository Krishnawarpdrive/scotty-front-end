
import React from 'react';
import { PanelistSelector } from '../PanelistSelector';

interface PanelistSelectionStepProps {
  interviewType: string;
  onPanelistSelect: (panelistId: string) => void;
}

export const PanelistSelectionStep: React.FC<PanelistSelectionStepProps> = ({
  interviewType,
  onPanelistSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Interviewer</h3>
      <PanelistSelector
        interviewType={interviewType}
        onSelect={onPanelistSelect}
      />
    </div>
  );
};

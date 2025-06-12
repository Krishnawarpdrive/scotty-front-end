
import React from 'react';
import { SimplifiedDragDropTAAllocation } from './SimplifiedDragDropTAAllocation';
import { sampleTAProfiles, sampleRequirements } from './SampleTAData';

interface RestructuredTAAllocationProps {
  onAssignTA: (taId: string, requirementId: string) => void;
  onApplyRecommendation: (recommendationId: string) => void;
}

export const RestructuredTAAllocation: React.FC<RestructuredTAAllocationProps> = ({
  onAssignTA,
  onApplyRecommendation
}) => {
  // Transform sample data for the simplified component
  const transformedTAs = sampleTAProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    email: ta.email,
    availability: ta.availability
  }));

  const transformedRequirements = sampleRequirements.map(req => ({
    id: req.id,
    name: req.name,
    client: req.client,
    priority: req.priority,
    assignedTAs: req.assignedTAs
  }));

  const handleUnassignTA = (taId: string, requirementId: string) => {
    console.log(`Unassigning TA ${taId} from requirement ${requirementId}`);
    // This would typically update the state to remove the assignment
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">TA Assignment</h3>
        <p className="text-sm text-gray-600">
          Drag TAs from the right panel to requirements on the left to assign them
        </p>
      </div>
      
      <SimplifiedDragDropTAAllocation
        availableTAs={transformedTAs}
        requirements={transformedRequirements}
        onAssignTA={onAssignTA}
        onUnassignTA={handleUnassignTA}
      />
    </div>
  );
};

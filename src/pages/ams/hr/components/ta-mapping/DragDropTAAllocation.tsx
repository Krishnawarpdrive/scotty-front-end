
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DragDropTAAllocationProps {
  requirements: any[];
  availableTAs: any[];
  onAssignTA: (taId: string, requirementId: string) => void;
  onUnassignTA: (taId: string, requirementId: string) => void;
  onUpdateTargets: (requirementId: string, targets: any) => void;
}

export const DragDropTAAllocation: React.FC<DragDropTAAllocationProps> = ({
  requirements,
  availableTAs,
  onAssignTA,
  onUnassignTA,
  onUpdateTargets
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drag & Drop TA Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Legacy drag and drop interface - replaced by simplified allocation.</p>
      </CardContent>
    </Card>
  );
};

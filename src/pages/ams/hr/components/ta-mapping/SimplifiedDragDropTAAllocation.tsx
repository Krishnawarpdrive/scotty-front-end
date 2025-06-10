
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Plus } from 'lucide-react';

interface TAProfile {
  id: string;
  name: string;
  email: string;
  availability: 'available' | 'busy' | 'unavailable';
}

interface Requirement {
  id: string;
  name: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  assignedTAs: string[];
}

interface SimplifiedDragDropTAAllocationProps {
  availableTAs: TAProfile[];
  requirements: Requirement[];
  onAssignTA: (taId: string, requirementId: string) => void;
  onUnassignTA: (taId: string, requirementId: string) => void;
}

export const SimplifiedDragDropTAAllocation: React.FC<SimplifiedDragDropTAAllocationProps> = ({
  availableTAs,
  requirements,
  onAssignTA,
  onUnassignTA
}) => {
  const [draggedTA, setDraggedTA] = useState<string | null>(null);

  const handleDragStart = (taId: string) => {
    setDraggedTA(taId);
  };

  const handleDragEnd = () => {
    setDraggedTA(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, requirementId: string) => {
    e.preventDefault();
    if (draggedTA) {
      onAssignTA(draggedTA, requirementId);
      setDraggedTA(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex gap-4">
      {/* Requirements Panel */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            Requirements ({requirements.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
          {requirements.map((requirement) => (
            <div
              key={requirement.id}
              className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, requirement.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-sm">{requirement.name}</div>
                  <div className="text-xs text-gray-600">{requirement.client}</div>
                </div>
                <Badge className={getPriorityColor(requirement.priority)} variant="secondary">
                  {requirement.priority}
                </Badge>
              </div>
              
              {requirement.assignedTAs.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-600 mb-1">Assigned TAs:</div>
                  <div className="flex flex-wrap gap-1">
                    {requirement.assignedTAs.map((taId) => {
                      const ta = availableTAs.find(t => t.id === taId);
                      return ta ? (
                        <div key={taId} className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {ta.name}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
                            onClick={() => onUnassignTA(taId, requirement.id)}
                          >
                            ×
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available TAs Panel */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Available TAs ({availableTAs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
          {availableTAs.map((ta) => (
            <div
              key={ta.id}
              draggable
              onDragStart={() => handleDragStart(ta.id)}
              onDragEnd={handleDragEnd}
              className={`p-4 border rounded-lg cursor-move transition-all hover:shadow-md ${
                draggedTA === ta.id ? 'opacity-50 scale-95' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-sm">{ta.name}</div>
                  <div className="text-xs text-gray-600">{ta.email}</div>
                </div>
                <Badge className={getAvailabilityColor(ta.availability)} variant="secondary">
                  {ta.availability}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

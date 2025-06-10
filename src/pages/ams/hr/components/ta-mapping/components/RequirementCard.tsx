
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Lightbulb } from 'lucide-react';

interface Requirement {
  id: string;
  name: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  targetCandidates: number;
  targetInterviews: number;
  targetClosures: number;
  deadline: string;
  assignedTAs: string[];
  progress: {
    candidates: number;
    interviews: number;
    closures: number;
  };
}

interface RequirementCardProps {
  requirement: Requirement;
  isSelected: boolean;
  onSelect: (requirementId: string) => void;
  recommendationCount: number;
  availableTAs: Array<{id: string; name: string}>;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({
  requirement,
  isSelected,
  onSelect,
  recommendationCount,
  availableTAs
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(requirement.id === isSelected ? '' : requirement.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-medium">{requirement.name}</div>
          <div className="text-sm text-gray-600">{requirement.client}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getPriorityColor(requirement.priority)} variant="secondary">
            {requirement.priority}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            {new Date(requirement.deadline).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Candidates</div>
          <div className="text-sm">
            <span className="font-semibold">{requirement.progress.candidates}</span>
            <span className="text-gray-500">/{requirement.targetCandidates}</span>
          </div>
          <Progress 
            value={(requirement.progress.candidates / requirement.targetCandidates) * 100} 
            className="h-1 mt-1"
          />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Interviews</div>
          <div className="text-sm">
            <span className="font-semibold">{requirement.progress.interviews}</span>
            <span className="text-gray-500">/{requirement.targetInterviews}</span>
          </div>
          <Progress 
            value={(requirement.progress.interviews / requirement.targetInterviews) * 100} 
            className="h-1 mt-1"
          />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Closures</div>
          <div className="text-sm">
            <span className="font-semibold">{requirement.progress.closures}</span>
            <span className="text-gray-500">/{requirement.targetClosures}</span>
          </div>
          <Progress 
            value={(requirement.progress.closures / requirement.targetClosures) * 100} 
            className="h-1 mt-1"
          />
        </div>
      </div>

      {requirement.assignedTAs.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">Assigned TAs</div>
          <div className="flex flex-wrap gap-1">
            {requirement.assignedTAs.map((taId, index) => {
              const ta = availableTAs.find(t => t.id === taId);
              return ta ? (
                <Badge key={index} variant="outline" className="text-xs">
                  {ta.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}

      {recommendationCount > 0 && (
        <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
          <div className="flex items-center gap-1 text-xs text-yellow-800">
            <Lightbulb className="h-3 w-3" />
            {recommendationCount} AI suggestion(s)
          </div>
        </div>
      )}
    </div>
  );
};

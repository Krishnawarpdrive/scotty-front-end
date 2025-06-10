
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { TACard } from './components/TACard';
import { RequirementCard } from './components/RequirementCard';

interface TAProfile {
  id: string;
  name: string;
  email: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiencyScore: number;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  assignments: number;
}

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

interface AIRecommendation {
  id: string;
  taId: string;
  requirementId: string;
  confidence: number;
  reason: string;
  impact: string;
}

interface SimplifiedTAAllocationProps {
  availableTAs: TAProfile[];
  requirements: Requirement[];
  recommendations: AIRecommendation[];
  onAssignTA: (taId: string, requirementId: string) => void;
  onApplyRecommendation: (recommendationId: string) => void;
}

export const SimplifiedTAAllocation: React.FC<SimplifiedTAAllocationProps> = ({
  availableTAs,
  requirements,
  recommendations,
  onAssignTA,
  onApplyRecommendation
}) => {
  const [selectedTA, setSelectedTA] = useState<string>('');
  const [selectedRequirement, setSelectedRequirement] = useState<string>('');

  const getRecommendationForPair = (taId: string, requirementId: string) => {
    return recommendations.find(r => r.taId === taId && r.requirementId === requirementId);
  };

  const handleAssign = () => {
    if (selectedTA && selectedRequirement) {
      onAssignTA(selectedTA, selectedRequirement);
      setSelectedTA('');
      setSelectedRequirement('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">TA Allocation</h3>
          <p className="text-sm text-gray-600">
            Select a TA and requirement to make assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            {recommendations.length} AI Suggestions
          </Badge>
        </div>
      </div>

      {(selectedTA || selectedRequirement) && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    TA: {selectedTA ? availableTAs.find(ta => ta.id === selectedTA)?.name : 'None selected'}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    Requirement: {selectedRequirement ? requirements.find(r => r.id === selectedRequirement)?.name : 'None selected'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedTA && selectedRequirement && (
                  <>
                    {getRecommendationForPair(selectedTA, selectedRequirement) && (
                      <Badge className="bg-green-100 text-green-800">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        AI Recommended
                      </Badge>
                    )}
                    <Button onClick={handleAssign} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSelectedTA('');
                    setSelectedRequirement('');
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex-1 grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Available TAs ({availableTAs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {availableTAs.map((ta) => (
              <TACard
                key={ta.id}
                ta={ta}
                isSelected={selectedTA === ta.id}
                onSelect={setSelectedTA}
                recommendationCount={recommendations.filter(r => r.taId === ta.id).length}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Requirements ({requirements.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {requirements.map((requirement) => (
              <RequirementCard
                key={requirement.id}
                requirement={requirement}
                isSelected={selectedRequirement === requirement.id}
                onSelect={setSelectedRequirement}
                recommendationCount={recommendations.filter(r => r.requirementId === requirement.id).length}
                availableTAs={availableTAs}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {recommendations.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {recommendations.slice(0, 3).map((rec) => {
                const ta = availableTAs.find(t => t.id === rec.taId);
                const requirement = requirements.find(r => r.id === rec.requirementId);
                
                return (
                  <div key={rec.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Assign {ta?.name} to {requirement?.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{rec.reason}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {rec.confidence}% match
                        </Badge>
                        <span className="text-xs text-green-600">{rec.impact}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => onApplyRecommendation(rec.id)}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Apply
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

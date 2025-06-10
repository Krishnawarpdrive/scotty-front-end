
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ArrowRight,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

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
  const [selectedTA, setSelectedTA] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getRecommendationForPair = (taId: string, requirementId: string) => {
    return recommendations.find(r => r.taId === taId && r.requirementId === requirementId);
  };

  const handleAssign = () => {
    if (selectedTA && selectedRequirement) {
      onAssignTA(selectedTA, selectedRequirement);
      setSelectedTA(null);
      setSelectedRequirement(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
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

      {/* Assignment Action Bar */}
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
                    setSelectedTA(null);
                    setSelectedRequirement(null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left Panel - Available TAs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Available TAs ({availableTAs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {availableTAs.map((ta) => (
              <div
                key={ta.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedTA === ta.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedTA(ta.id === selectedTA ? null : ta.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(ta.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{ta.name}</div>
                      <div className="text-xs text-gray-600">{ta.email}</div>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(ta.availability)} variant="secondary">
                    {ta.availability}
                  </Badge>
                </div>

                {/* Workload */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Workload</span>
                    <span>{ta.currentWorkload}/{ta.maxWorkload}</span>
                  </div>
                  <Progress value={(ta.currentWorkload / ta.maxWorkload) * 100} className="h-2" />
                </div>

                {/* Efficiency */}
                <div className="flex items-center justify-between text-sm">
                  <span>Efficiency</span>
                  <div className="flex items-center gap-1">
                    <span className={`font-medium ${
                      ta.efficiencyScore >= 85 ? 'text-green-600' : 
                      ta.efficiencyScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {ta.efficiencyScore}%
                    </span>
                    {ta.efficiencyScore >= 85 ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : ta.efficiencyScore < 70 ? (
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    ) : null}
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {ta.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {ta.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{ta.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* AI Recommendations for this TA */}
                {recommendations.filter(r => r.taId === ta.id).length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-1 text-xs text-yellow-800">
                      <Lightbulb className="h-3 w-3" />
                      {recommendations.filter(r => r.taId === ta.id).length} AI suggestion(s)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Panel - Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Requirements ({requirements.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {requirements.map((requirement) => (
              <div
                key={requirement.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedRequirement === requirement.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedRequirement(requirement.id === selectedRequirement ? null : requirement.id)}
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

                {/* Progress Metrics */}
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

                {/* Assigned TAs */}
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

                {/* AI Recommendations for this requirement */}
                {recommendations.filter(r => r.requirementId === requirement.id).length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-1 text-xs text-yellow-800">
                      <Lightbulb className="h-3 w-3" />
                      {recommendations.filter(r => r.requirementId === requirement.id).length} AI suggestion(s)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Panel */}
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

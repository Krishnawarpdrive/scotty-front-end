
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ArrowRight,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import { sampleTAProfiles, sampleRequirements, sampleAIRecommendations } from './SampleTAData';

interface RestructuredTAAllocationProps {
  onAssignTA: (taId: string, requirementId: string) => void;
  onApplyRecommendation: (recommendationId: string) => void;
}

export const RestructuredTAAllocation: React.FC<RestructuredTAAllocationProps> = ({
  onAssignTA,
  onApplyRecommendation
}) => {
  const [selectedTA, setSelectedTA] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);
  const [isTAMappingCollapsed, setIsTAMappingCollapsed] = useState(false);

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
    return sampleAIRecommendations.find(r => r.taId === taId && r.requirementId === requirementId);
  };

  const handleAssign = () => {
    if (selectedTA && selectedRequirement) {
      onAssignTA(selectedTA, selectedRequirement);
      setSelectedTA(null);
      setSelectedRequirement(null);
    }
  };

  // Calculate summary stats
  const totalTAs = sampleTAProfiles.length;
  const availableTAs = sampleTAProfiles.filter(ta => ta.availability === 'available').length;
  const totalRequirements = sampleRequirements.length;
  const highPriorityReqs = sampleRequirements.filter(r => r.priority === 'high').length;
  const avgEfficiency = Math.round(sampleTAProfiles.reduce((acc, ta) => acc + ta.efficiencyScore, 0) / totalTAs);

  return (
    <div className="space-y-6">
      {/* Collapsible Header with Quick Stats */}
      <Collapsible open={!isTAMappingCollapsed} onOpenChange={setIsTAMappingCollapsed}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">TA Allocation Dashboard</h2>
                {isTAMappingCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
              </div>
            </Button>
          </CollapsibleTrigger>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              {sampleAIRecommendations.length} AI Suggestions
            </Badge>
          </div>
        </div>

        <CollapsibleContent className="space-y-4">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Available TAs</p>
                    <p className="text-xl font-bold">{availableTAs}/{totalTAs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Requirements</p>
                    <p className="text-xl font-bold">{totalRequirements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">High Priority</p>
                    <p className="text-xl font-bold">{highPriorityReqs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Efficiency</p>
                    <p className="text-xl font-bold">{avgEfficiency}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Assignments</p>
                    <p className="text-xl font-bold">{sampleTAProfiles.reduce((acc, ta) => acc + ta.assignments, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Assignment Action Bar */}
      {(selectedTA || selectedRequirement) && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    Requirement: {selectedRequirement ? sampleRequirements.find(r => r.id === selectedRequirement)?.name : 'None selected'}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    TA: {selectedTA ? sampleTAProfiles.find(ta => ta.id === selectedTA)?.name : 'None selected'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedTA && selectedRequirement && (
                  <>
                    {getRecommendationForPair(selectedTA, selectedRequirement) && (
                      <Badge className="bg-green-100 text-green-800">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        AI Recommended ({getRecommendationForPair(selectedTA, selectedRequirement)?.confidence}%)
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

      {/* Main Content Grid - Flipped Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Panel - Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Requirements ({sampleRequirements.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {sampleRequirements.map((requirement) => (
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
                    <div className="text-xs text-gray-500 mt-1">
                      {requirement.department} • {requirement.experience}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
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
                        const ta = sampleTAProfiles.find(t => t.id === taId);
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
                {sampleAIRecommendations.filter(r => r.requirementId === requirement.id).length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-1 text-xs text-yellow-800">
                      <Lightbulb className="h-3 w-3" />
                      {sampleAIRecommendations.filter(r => r.requirementId === requirement.id).length} AI suggestion(s)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Panel - Available TAs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Available TAs ({sampleTAProfiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {sampleTAProfiles.map((ta) => (
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
                      <div className="text-xs text-gray-500 mt-1">
                        {ta.department} • {ta.experience}
                      </div>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(ta.availability)} variant="secondary">
                    {ta.availability}
                  </Badge>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Workload</span>
                      <span>{ta.currentWorkload}/{ta.maxWorkload}</span>
                    </div>
                    <Progress value={(ta.currentWorkload / ta.maxWorkload) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span className={`font-medium ${
                        ta.efficiencyScore >= 85 ? 'text-green-600' : 
                        ta.efficiencyScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {ta.efficiencyScore}%
                      </span>
                    </div>
                    <Progress value={ta.efficiencyScore} className="h-2" />
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="text-center">
                    <div className="text-gray-600">Success Rate</div>
                    <div className="font-semibold">{ta.successRate}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Assignments</div>
                    <div className="font-semibold">{ta.assignments}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Avg Fill Time</div>
                    <div className="font-semibold">{ta.avgTimeToFill}</div>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mb-2">
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
                {sampleAIRecommendations.filter(r => r.taId === ta.id).length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-1 text-xs text-yellow-800">
                      <Lightbulb className="h-3 w-3" />
                      {sampleAIRecommendations.filter(r => r.taId === ta.id).length} AI suggestion(s)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Panel */}
      {sampleAIRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Smart AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sampleAIRecommendations.map((rec) => {
                const ta = sampleTAProfiles.find(t => t.id === rec.taId);
                const requirement = sampleRequirements.find(r => r.id === rec.requirementId);
                
                return (
                  <div key={rec.id} className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Perfect Match Found!</div>
                          <div className="text-xs text-gray-600">
                            {ta?.name} → {requirement?.name}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {rec.confidence}% match
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-3">{rec.reason}</div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Skills</div>
                        <div className="text-sm font-semibold text-purple-600">{rec.matchScore.skills}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Workload</div>
                        <div className="text-sm font-semibold text-blue-600">{rec.matchScore.workload}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Experience</div>
                        <div className="text-sm font-semibold text-green-600">{rec.matchScore.experience}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Available</div>
                        <div className="text-sm font-semibold text-orange-600">{rec.matchScore.availability}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600 font-medium">{rec.impact}</div>
                      <Button 
                        size="sm" 
                        onClick={() => onApplyRecommendation(rec.id)}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Apply
                      </Button>
                    </div>
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

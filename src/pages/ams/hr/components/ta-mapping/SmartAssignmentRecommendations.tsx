
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

interface RecommendationScore {
  overall: number;
  skillMatch: number;
  workloadFit: number;
  efficiency: number;
  availability: number;
}

interface AssignmentRecommendation {
  id: string;
  type: 'optimal_assignment' | 'workload_rebalance' | 'skill_optimization' | 'capacity_alert';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  suggestedAction: {
    taId: string;
    taName: string;
    requirementId: string;
    requirementName: string;
    client: string;
  };
  score: RecommendationScore;
  reasoning: string[];
  estimatedOutcome: {
    efficiencyGain: number;
    timeToFill: string;
    riskReduction: number;
  };
}

interface SmartAssignmentRecommendationsProps {
  recommendations: AssignmentRecommendation[];
  onApplyRecommendation: (recommendationId: string) => void;
  onDismissRecommendation: (recommendationId: string) => void;
}

export const SmartAssignmentRecommendations: React.FC<SmartAssignmentRecommendationsProps> = ({
  recommendations,
  onApplyRecommendation,
  onDismissRecommendation
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimal_assignment': return <Target className="h-4 w-4" />;
      case 'workload_rebalance': return <Users className="h-4 w-4" />;
      case 'skill_optimization': return <Zap className="h-4 w-4" />;
      case 'capacity_alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimal_assignment': return 'text-blue-600 bg-blue-100';
      case 'workload_rebalance': return 'text-green-600 bg-green-100';
      case 'skill_optimization': return 'text-purple-600 bg-purple-100';
      case 'capacity_alert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const highPriorityRecommendations = recommendations.filter(r => r.priority === 'high');
  const mediumPriorityRecommendations = recommendations.filter(r => r.priority === 'medium');
  const lowPriorityRecommendations = recommendations.filter(r => r.priority === 'low');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Smart Assignment Recommendations
          </h3>
          <p className="text-sm text-gray-600">
            AI-powered suggestions to optimize TA allocation and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {highPriorityRecommendations.length} High Priority
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {recommendations.length} Total
          </Badge>
        </div>
      </div>

      {/* High Priority Recommendations */}
      {highPriorityRecommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            High Priority Actions Required
          </h4>
          <div className="space-y-4">
            {highPriorityRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)}`}>
                        {getTypeIcon(recommendation.type)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{recommendation.title}</CardTitle>
                        <p className="text-sm text-gray-700 mt-1">{recommendation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(recommendation.priority)} variant="secondary">
                        {recommendation.priority}
                      </Badge>
                      <div className={`text-sm font-medium ${getConfidenceColor(recommendation.confidence)}`}>
                        {recommendation.confidence}% confidence
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Suggested Action */}
                  <div className="p-3 bg-white rounded-lg border">
                    <h5 className="text-sm font-medium mb-2">Suggested Action</h5>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(recommendation.suggestedAction.taName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          Assign <span className="font-medium">{recommendation.suggestedAction.taName}</span> to
                        </div>
                        <div className="text-sm text-gray-600">
                          {recommendation.suggestedAction.requirementName} ({recommendation.suggestedAction.client})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-5 gap-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Overall</div>
                      <div className="text-lg font-bold text-blue-600">{recommendation.score.overall}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Skills</div>
                      <div className="text-lg font-bold text-purple-600">{recommendation.score.skillMatch}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Workload</div>
                      <div className="text-lg font-bold text-green-600">{recommendation.score.workloadFit}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Efficiency</div>
                      <div className="text-lg font-bold text-yellow-600">{recommendation.score.efficiency}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Available</div>
                      <div className="text-lg font-bold text-indigo-600">{recommendation.score.availability}</div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">AI Reasoning</h5>
                    <ul className="space-y-1">
                      {recommendation.reasoning.map((reason, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Outcome */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="text-sm font-medium text-green-800 mb-2">Expected Outcome</h5>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-green-600 font-bold">
                          +{recommendation.estimatedOutcome.efficiencyGain}%
                        </div>
                        <div className="text-green-700">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-600 font-bold">
                          {recommendation.estimatedOutcome.timeToFill}
                        </div>
                        <div className="text-green-700">Time to Fill</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-600 font-bold">
                          -{recommendation.estimatedOutcome.riskReduction}%
                        </div>
                        <div className="text-green-700">Risk</div>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="text-sm">
                    <span className="font-medium">Impact:</span>
                    <span className="text-gray-700 ml-1">{recommendation.impact}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDismissRecommendation(recommendation.id)}
                    >
                      Dismiss
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onApplyRecommendation(recommendation.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority Recommendations */}
      {mediumPriorityRecommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-yellow-700 mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Medium Priority Optimizations
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mediumPriorityRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="border-yellow-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)}`}>
                        {getTypeIcon(recommendation.type)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{recommendation.title}</CardTitle>
                        <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-medium ${getConfidenceColor(recommendation.confidence)}`}>
                      {recommendation.confidence}%
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Score</span>
                    <span className="font-bold text-blue-600">{recommendation.score.overall}/100</span>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDismissRecommendation(recommendation.id)}
                    >
                      Later
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onApplyRecommendation(recommendation.id)}
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Low Priority Recommendations */}
      {lowPriorityRecommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Low Priority Improvements ({lowPriorityRecommendations.length})
          </h4>
          <div className="space-y-2">
            {lowPriorityRecommendations.slice(0, 3).map((recommendation) => (
              <div key={recommendation.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className={`p-1 rounded ${getTypeColor(recommendation.type)}`}>
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{recommendation.title}</div>
                    <div className="text-xs text-gray-600">{recommendation.impact}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-blue-600 font-medium">
                    {recommendation.confidence}% match
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onApplyRecommendation(recommendation.id)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
            {lowPriorityRecommendations.length > 3 && (
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View {lowPriorityRecommendations.length - 3} more recommendations
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">All Optimized!</h3>
            <p className="text-gray-600">
              Your TA assignments are currently optimized. Check back later for new recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

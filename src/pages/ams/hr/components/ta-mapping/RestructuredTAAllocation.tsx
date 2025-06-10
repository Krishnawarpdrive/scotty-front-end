
import React from 'react';
import { SimplifiedTAAllocation } from './SimplifiedTAAllocation';
import { SmartAssignmentRecommendations } from './SmartAssignmentRecommendations';
import { sampleTAProfiles, sampleRequirements, sampleAIRecommendations } from './SampleTAData';

interface RestructuredTAAllocationProps {
  onAssignTA: (taId: string, requirementId: string) => void;
  onApplyRecommendation: (recommendationId: string) => void;
}

export const RestructuredTAAllocation: React.FC<RestructuredTAAllocationProps> = ({
  onAssignTA,
  onApplyRecommendation
}) => {
  // Transform sample data for the components
  const transformedTAs = sampleTAProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    email: ta.email,
    currentWorkload: ta.currentWorkload,
    maxWorkload: ta.maxWorkload,
    efficiencyScore: ta.efficiencyScore,
    skills: ta.skills,
    availability: ta.availability,
    assignments: ta.assignments
  }));

  const transformedRecommendations = sampleAIRecommendations.map(rec => {
    const ta = sampleTAProfiles.find(t => t.id === rec.taId);
    const requirement = sampleRequirements.find(r => r.id === rec.requirementId);
    
    return {
      id: rec.id,
      type: 'optimal_assignment' as const,
      priority: 'high' as const,
      title: `Assign ${ta?.name} to ${requirement?.name}`,
      description: rec.reason,
      impact: rec.impact,
      confidence: rec.confidence,
      suggestedAction: {
        taId: rec.taId,
        taName: ta?.name || '',
        requirementId: rec.requirementId,
        requirementName: requirement?.name || '',
        client: requirement?.client || ''
      },
      score: {
        overall: rec.confidence,
        skillMatch: rec.matchScore?.skills || 90,
        workloadFit: rec.matchScore?.workload || 85,
        efficiency: rec.matchScore?.experience || 88,
        availability: rec.matchScore?.availability || 95
      },
      reasoning: [rec.reason],
      estimatedOutcome: {
        efficiencyGain: 25,
        timeToFill: '8 days',
        riskReduction: 15
      }
    };
  });

  const handleDismissRecommendation = (recommendationId: string) => {
    console.log(`Dismissing recommendation ${recommendationId}`);
  };

  return (
    <div className="space-y-6">
      <SmartAssignmentRecommendations
        recommendations={transformedRecommendations}
        onApplyRecommendation={onApplyRecommendation}
        onDismissRecommendation={handleDismissRecommendation}
      />
      
      <SimplifiedTAAllocation
        availableTAs={transformedTAs}
        requirements={sampleRequirements}
        recommendations={sampleAIRecommendations}
        onAssignTA={onAssignTA}
        onApplyRecommendation={onApplyRecommendation}
      />
    </div>
  );
};

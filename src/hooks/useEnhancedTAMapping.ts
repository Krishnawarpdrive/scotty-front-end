
import { useState, useCallback } from 'react';
import { sampleTAProfiles, sampleRequirements, sampleAIRecommendations } from '@/pages/ams/hr/components/ta-mapping/SampleTAData';

export const useEnhancedTAMapping = (roleId?: string) => {
  const [loading, setLoading] = useState(false);

  // Transform sample data to match expected interface
  const taProfiles = sampleTAProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    email: ta.email,
    current_workload: ta.currentWorkload,
    max_workload: ta.maxWorkload,
    efficiency_score: ta.efficiencyScore,
    skills: ta.skills,
    status: ta.availability === 'available' ? 'active' : 'inactive',
    assignments: ta.assignments,
    department: ta.department,
    experience: ta.experience,
    last_activity: ta.lastActivity,
    success_rate: ta.successRate,
    avg_time_to_fill: ta.avgTimeToFill
  }));

  const assignments = sampleRequirements.map(req => ({
    id: req.id,
    ta_id: req.assignedTAs[0] || '',
    requirement_id: req.id,
    assigned_at: new Date().toISOString(),
    status: 'active',
    progress: req.progress
  }));

  const workloadData = taProfiles.map(ta => ({
    ta_id: ta.id,
    current_load: ta.current_workload,
    target_load: ta.max_workload,
    efficiency: ta.efficiency_score
  }));

  const roleTargets = {
    candidates: 50,
    interviews: 25,
    closures: 10
  };

  const assignmentMetrics = assignments.map(assignment => ({
    id: assignment.id,
    efficiency: Math.floor(Math.random() * 30) + 70,
    time_to_fill: Math.floor(Math.random() * 20) + 5,
    success_rate: Math.floor(Math.random() * 30) + 70
  }));

  const collaborations = [];

  const performanceInsights = [
    {
      id: 'insight-1',
      ta_id: taProfiles[0]?.id || '',
      insight_type: 'efficiency_improvement',
      confidence_score: 0.85,
      insight_data: { recommendation: 'Consider optimizing workload distribution' },
      created_at: new Date().toISOString()
    }
  ];

  const actions = {
    assignTAToRole: useCallback((taId: string, requirementId: string) => {
      console.log(`Assigning TA ${taId} to requirement ${requirementId}`);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }, []),

    updateWorkload: useCallback((taId: string, newWorkload: number) => {
      console.log(`Updating workload for ${taId} to ${newWorkload}`);
    }, []),

    createCollaboration: useCallback((primaryTaId: string, secondaryTaId: string, assignmentId: string) => {
      console.log(`Creating collaboration between ${primaryTaId} and ${secondaryTaId} for ${assignmentId}`);
    }, []),

    updateAssignmentStatus: useCallback((assignmentId: string, status: string) => {
      console.log(`Updating assignment ${assignmentId} status to ${status}`);
    }, []),

    refreshData: useCallback(() => {
      console.log('Refreshing TA mapping data');
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }, [])
  };

  return {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    assignmentMetrics,
    collaborations,
    performanceInsights,
    loading,
    actions
  };
};

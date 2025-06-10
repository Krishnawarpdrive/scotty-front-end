import { useState, useCallback } from 'react';

export interface TAWorkloadData {
  id: string;
  name: string;
  workload: number;
  efficiency: number;
  skills: string[];
}

interface Collaboration {
  id: string;
  role: string;
  tas: string[];
  type: 'shared' | 'backup' | 'mentor';
}

export const useEnhancedTAMapping = (roleId?: string) => {
  const [workloadData, setWorkloadData] = useState<TAWorkloadData[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [taProfiles, setTAProfiles] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [roleTargets, setRoleTargets] = useState<any[]>([]);
  const [assignmentMetrics, setAssignmentMetrics] = useState<any[]>([]);
  const [performanceInsights, setPerformanceInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const updateTAWorkload = useCallback((taId: string, newWorkload: Partial<TAWorkloadData>) => {
    setWorkloadData(prev => 
      prev.map(ta => 
        ta.id === taId ? { ...ta, ...newWorkload } : ta
      )
    );
  }, []);

  const addCollaboration = useCallback((collaboration: Collaboration) => {
    setCollaborations(prev => [...prev, collaboration]);
  }, []);

  const removeCollaboration = useCallback((collaborationId: string) => {
    setCollaborations(prev => 
      prev.filter(collab => collab.id !== collaborationId)
    );
  }, []);

  const getOptimalAssignments = useCallback(() => {
    return workloadData
      .filter(ta => ta.efficiency > 80 && ta.workload < 90)
      .sort((a, b) => b.efficiency - a.efficiency);
  }, [workloadData]);

  const getWorkloadInsights = useCallback(() => {
    const overloaded = workloadData.filter(ta => ta.workload > 90);
    const underutilized = workloadData.filter(ta => ta.workload < 50);
    const optimal = workloadData.filter(ta => ta.workload >= 50 && ta.workload <= 90);

    return {
      overloaded,
      underutilized,
      optimal,
      averageWorkload: workloadData.reduce((acc, ta) => acc + ta.workload, 0) / workloadData.length,
      averageEfficiency: workloadData.reduce((acc, ta) => acc + ta.efficiency, 0) / workloadData.length,
    };
  }, [workloadData]);

  const getTARecommendations = useCallback((roleRequirements: any) => {
    return workloadData
      .filter(ta => ta.skills.some((skill: string) => 
        roleRequirements.skills?.includes(skill)
      ))
      .sort((a, b) => {
        const aScore = a.efficiency * (100 - a.workload) / 100;
        const bScore = b.efficiency * (100 - b.workload) / 100;
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [workloadData]);

  // Action functions that the component expects
  const assignTAToRole = useCallback((taId: string, requirementId: string) => {
    console.log(`Assigning TA ${taId} to requirement ${requirementId}`);
    // Implementation would go here
  }, []);

  const updateWorkload = useCallback((taId: string, workload: any) => {
    console.log(`Updating workload for TA ${taId}:`, workload);
    updateTAWorkload(taId, workload);
  }, [updateTAWorkload]);

  const createCollaboration = useCallback((collaboration: any) => {
    console.log('Creating collaboration:', collaboration);
    addCollaboration(collaboration);
  }, [addCollaboration]);

  const updateAssignmentStatus = useCallback((assignmentId: string, status: string) => {
    console.log(`Updating assignment ${assignmentId} status to ${status}`);
    // Implementation would go here
  }, []);

  const refreshData = useCallback(() => {
    console.log('Refreshing TA mapping data');
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    assignmentMetrics,
    collaborations,
    performanceInsights,
    loading,
    // Group all actions in an actions object as expected by the component
    actions: {
      assignTAToRole,
      updateWorkload,
      createCollaboration,
      updateAssignmentStatus,
      refreshData
    },
    // Keep the original functions for backward compatibility
    updateTAWorkload,
    addCollaboration,
    removeCollaboration,
    getOptimalAssignments,
    getWorkloadInsights,
    getTARecommendations,
    setWorkloadData,
    setCollaborations,
  };
};

export default useEnhancedTAMapping;

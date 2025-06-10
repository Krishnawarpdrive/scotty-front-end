
import { useState, useCallback } from 'react';
import { TAWorkloadData } from '@/pages/ams/hr/components/ta-mapping/SampleTAData';

interface Collaboration {
  id: string;
  role: string;
  tas: string[];
  type: 'shared' | 'backup' | 'mentor';
}

export const useEnhancedTAMapping = () => {
  const [workloadData, setWorkloadData] = useState<TAWorkloadData[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);

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
      .filter(ta => ta.skills.some(skill => 
        roleRequirements.skills?.includes(skill)
      ))
      .sort((a, b) => {
        const aScore = a.efficiency * (100 - a.workload) / 100;
        const bScore = b.efficiency * (100 - b.workload) / 100;
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [workloadData]);

  return {
    workloadData,
    collaborations,
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

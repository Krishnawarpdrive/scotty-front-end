
import { useState, useEffect } from 'react';
import { taManagementService } from '@/services/taManagementService';
import { 
  TAProfile, 
  TAAssignment, 
  TAWorkload, 
  TADashboardData,
  TAManagementFilters 
} from '@/types/TAManagementTypes';

export const useTAManagement = () => {
  const [taProfiles, setTAProfiles] = useState<TAProfile[]>([]);
  const [assignments, setAssignments] = useState<TAAssignment[]>([]);
  const [workloads, setWorkloads] = useState<TAWorkload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TAManagementFilters>({});

  const fetchTAProfiles = async () => {
    try {
      setLoading(true);
      const data = await taManagementService.fetchTAProfiles();
      setTAProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch TA profiles');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async (taId?: string) => {
    try {
      setLoading(true);
      const data = await taManagementService.fetchTAAssignments(taId);
      setAssignments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkloads = async () => {
    try {
      setLoading(true);
      const data = await taManagementService.fetchTAWorkloads();
      setWorkloads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workloads');
    } finally {
      setLoading(false);
    }
  };

  const createTAProfile = async (profile: Omit<TAProfile, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newProfile = await taManagementService.createTAProfile(profile);
      setTAProfiles(prev => [...prev, newProfile]);
      return newProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create TA profile');
      throw err;
    }
  };

  const assignTA = async (assignment: Omit<TAAssignment, 'id' | 'assigned_at'>) => {
    try {
      const newAssignment = await taManagementService.createTAAssignment(assignment);
      setAssignments(prev => [...prev, newAssignment]);
      return newAssignment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign TA');
      throw err;
    }
  };

  const updateAssignmentStatus = async (id: string, status: 'active' | 'completed' | 'on_hold') => {
    try {
      const updatedAssignment = await taManagementService.updateTAAssignment(id, { status });
      setAssignments(prev => 
        prev.map(assignment => 
          assignment.id === id ? updatedAssignment : assignment
        )
      );
      return updatedAssignment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update assignment');
      throw err;
    }
  };

  const applyFilters = (newFilters: TAManagementFilters) => {
    setFilters(newFilters);
  };

  const getFilteredTAProfiles = () => {
    let filtered = taProfiles;

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(ta => filters.status!.includes(ta.status));
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(ta => 
        filters.skills!.some(skill => ta.skills.includes(skill))
      );
    }

    if (filters.workloadRange) {
      filtered = filtered.filter(ta => 
        ta.current_workload >= filters.workloadRange!.min &&
        ta.current_workload <= filters.workloadRange!.max
      );
    }

    return filtered;
  };

  useEffect(() => {
    fetchTAProfiles();
    fetchWorkloads();
  }, []);

  return {
    taProfiles: getFilteredTAProfiles(),
    assignments,
    workloads,
    loading,
    error,
    filters,
    actions: {
      fetchTAProfiles,
      fetchAssignments,
      fetchWorkloads,
      createTAProfile,
      assignTA,
      updateAssignmentStatus,
      applyFilters
    }
  };
};

export const useTADashboard = (taId: string) => {
  const [dashboardData, setDashboardData] = useState<TADashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await taManagementService.fetchTADashboardData(taId);
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taId) {
      fetchDashboardData();
    }
  }, [taId]);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardData
  };
};

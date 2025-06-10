
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, UserPlus, Zap, BarChart3, Activity } from 'lucide-react';
import { TAInsightsPanel } from './TAInsightsPanel';
import { RestructuredTAAllocation } from './RestructuredTAAllocation';
import { TAWorkloadDashboard } from './TAWorkloadDashboard';
import { useEnhancedTAMapping } from '@/hooks/useEnhancedTAMapping';

interface EnhancedTAMappingInterfaceProps {
  roleData: any;
}

export const EnhancedTAMappingInterface: React.FC<EnhancedTAMappingInterfaceProps> = ({
  roleData
}) => {
  const [activeView, setActiveView] = useState<'allocation' | 'workload' | 'insights'>('allocation');
  
  const {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    assignmentMetrics,
    collaborations,
    performanceInsights,
    loading,
    actions: {
      assignTAToRole,
      updateWorkload,
      createCollaboration,
      updateAssignmentStatus,
      refreshData
    }
  } = useEnhancedTAMapping(roleData?.id);

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const handleAssignTA = (taId: string, requirementId: string) => {
    console.log(`Assigning TA ${taId} to requirement ${requirementId}`);
    assignTAToRole(taId, requirementId);
  };

  const handleApplyRecommendation = (recommendationId: string) => {
    console.log(`Applying recommendation ${recommendationId}`);
    // Implementation for applying recommendations
  };

  const handleRebalance = (fromTaId: string, toTaId: string, assignmentId: string) => {
    console.log(`Rebalancing from ${fromTaId} to ${toTaId} assignment ${assignmentId}`);
  };

  const handleUpdateCapacity = (taId: string, newCapacity: number) => {
    console.log(`Updating capacity for ${taId} to ${newCapacity}`);
  };

  // Transform workload data for the dashboard
  const transformedWorkloads = taProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    currentWorkload: ta.current_workload,
    maxWorkload: ta.max_workload,
    efficiency: ta.efficiency_score,
    metrics: {
      candidates: {
        current: Math.floor(Math.random() * 10) + 5,
        target: 12,
        trend: 'up' as const,
        change: 15
      },
      interviews: {
        current: Math.floor(Math.random() * 6) + 3,
        target: 8,
        trend: 'stable' as const,
        change: 0
      },
      closures: {
        current: Math.floor(Math.random() * 3) + 1,
        target: 3,
        trend: 'down' as const,
        change: -10
      }
    },
    assignments: [{
      id: '1',
      name: 'Senior Software Engineer',
      client: 'TechCorp Inc.',
      priority: 'high' as const,
      deadline: '2024-07-15'
    }],
    availability: ta.status === 'active' ? 'available' as const : 'busy' as const,
    riskLevel: ta.efficiency_score < 70 ? 'high' as const : ta.efficiency_score < 85 ? 'medium' as const : 'low' as const
  }));

  return (
    <div className="space-y-6">
      {/* Simplified Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TA Management</h2>
          <p className="text-gray-600">Role: {roleData?.name || 'All Roles'}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add TA
          </Button>
        </div>
      </div>

      {/* Simplified Tabs */}
      <Tabs value={activeView} onValueChange={(value: any) => setActiveView(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allocation">
            <Zap className="h-4 w-4 mr-2" />
            Smart Allocation
          </TabsTrigger>
          <TabsTrigger value="workload">
            <BarChart3 className="h-4 w-4 mr-2" />
            Workload Dashboard
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Activity className="h-4 w-4 mr-2" />
            Performance Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="allocation" className="space-y-4">
          <RestructuredTAAllocation
            onAssignTA={handleAssignTA}
            onApplyRecommendation={handleApplyRecommendation}
          />
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <TAWorkloadDashboard 
            workloads={transformedWorkloads} 
            onRebalance={handleRebalance} 
            onUpdateCapacity={handleUpdateCapacity} 
          />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <TAInsightsPanel 
            taProfiles={taProfiles} 
            assignments={assignments} 
            performanceInsights={performanceInsights} 
            assignmentMetrics={assignmentMetrics} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

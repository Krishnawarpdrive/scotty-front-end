import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Target, Clock, TrendingUp, AlertTriangle, RefreshCw, Settings, BarChart3, UserPlus, Activity, Lightbulb, Zap } from 'lucide-react';
import { TAWorkloadPanel } from './TAWorkloadPanel';
import { RoleAssignmentPanel } from './RoleAssignmentPanel';
import { TACollaborationPanel } from './TACollaborationPanel';
import { TAInsightsPanel } from './TAInsightsPanel';
import { SimplifiedTAAllocation } from './SimplifiedTAAllocation';
import { TAWorkloadDashboard } from './TAWorkloadDashboard';
import { SmartAssignmentRecommendations } from './SmartAssignmentRecommendations';
import { useEnhancedTAMapping } from '@/hooks/useEnhancedTAMapping';

interface EnhancedTAMappingInterfaceProps {
  roleData: any;
}

export const EnhancedTAMappingInterface: React.FC<EnhancedTAMappingInterfaceProps> = ({
  roleData
}) => {
  const [selectedTA, setSelectedTA] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'allocation' | 'workload' | 'recommendations' | 'assignments' | 'collaboration' | 'insights'>('allocation');
  
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

  // Transform data for simplified interface
  const transformedTAs = taProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    email: ta.email,
    currentWorkload: ta.current_workload,
    maxWorkload: ta.max_workload,
    efficiencyScore: ta.efficiency_score,
    skills: Array.isArray(ta.skills) ? ta.skills : [],
    availability: ta.status === 'active' ? 'available' as const : ta.current_workload >= ta.max_workload * 0.9 ? 'busy' as const : 'unavailable' as const,
    assignments: ta.current_workload
  }));

  const mockRequirements = [{
    id: 'req-1',
    name: 'Senior Software Engineer',
    client: 'TechCorp Inc.',
    priority: 'high' as const,
    targetCandidates: 15,
    targetInterviews: 8,
    targetClosures: 3,
    deadline: '2024-07-15',
    assignedTAs: ['ta1'],
    progress: {
      candidates: 8,
      interviews: 4,
      closures: 1
    }
  }, {
    id: 'req-2',
    name: 'Product Manager',
    client: 'StartupX',
    priority: 'medium' as const,
    targetCandidates: 10,
    targetInterviews: 5,
    targetClosures: 2,
    deadline: '2024-07-30',
    assignedTAs: [],
    progress: {
      candidates: 3,
      interviews: 1,
      closures: 0
    }
  }, {
    id: 'req-3',
    name: 'Data Scientist',
    client: 'DataFlow Ltd.',
    priority: 'low' as const,
    targetCandidates: 8,
    targetInterviews: 4,
    targetClosures: 2,
    deadline: '2024-08-15',
    assignedTAs: ['ta2'],
    progress: {
      candidates: 5,
      interviews: 2,
      closures: 0
    }
  }];

  const mockRecommendations = [{
    id: 'rec-1',
    taId: transformedTAs[0]?.id || 'ta1',
    requirementId: 'req-1',
    confidence: 92,
    reason: 'Perfect skill match and optimal workload capacity',
    impact: '+25% efficiency gain expected'
  }, {
    id: 'rec-2',
    taId: transformedTAs[1]?.id || 'ta2',
    requirementId: 'req-2',
    confidence: 78,
    reason: 'Good experience match, available capacity',
    impact: '+15% faster time-to-fill'
  }];

  const handleAssignTA = (taId: string, requirementId: string) => {
    console.log(`Assigning TA ${taId} to requirement ${requirementId}`);
    assignTAToRole(taId, requirementId);
  };
  const handleUnassignTA = (taId: string, requirementId: string) => {
    console.log(`Unassigning TA ${taId} from requirement ${requirementId}`);
  };
  const handleUpdateTargets = (requirementId: string, targets: any) => {
    console.log(`Updating targets for requirement ${requirementId}:`, targets);
  };
  const handleApplyRecommendation = (recommendationId: string) => {
    const recommendation = mockRecommendations.find(r => r.id === recommendationId);
    if (recommendation) {
      handleAssignTA(recommendation.taId, recommendation.requirementId);
    }
  };
  const handleDismissRecommendation = (recommendationId: string) => {
    console.log(`Dismissing recommendation ${recommendationId}`);
  };
  const totalTAs = taProfiles.length;
  const activeTAs = taProfiles.filter(ta => ta.status === 'active').length;
  const avgWorkload = taProfiles.reduce((acc, ta) => acc + ta.current_workload, 0) / totalTAs || 0;
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => a.status === 'active').length;
  const avgEfficiency = taProfiles.reduce((acc, ta) => acc + ta.efficiency_score, 0) / totalTAs || 0;

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TA Mapping & Assignment</h2>
          <p className="text-gray-600">Role: {roleData?.name}</p>
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

      {/* Enhanced Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active TAs</p>
                <p className="text-xl font-bold">{activeTAs}/{totalTAs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-xl font-bold">{activeAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Workload</p>
                <p className="text-xl font-bold">{avgWorkload.toFixed(1)}</p>
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
                <p className="text-xl font-bold">{avgEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">AI Suggestions</p>
                <p className="text-xl font-bold">{mockRecommendations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface with Simplified Tabs */}
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
          <SimplifiedTAAllocation
            availableTAs={transformedTAs}
            requirements={mockRequirements}
            recommendations={mockRecommendations}
            onAssignTA={handleAssignTA}
            onApplyRecommendation={handleApplyRecommendation}
          />
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <TAWorkloadDashboard 
            workloads={taProfiles.map(ta => ({
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
            }))} 
            onRebalance={(fromTaId, toTaId, assignmentId) => {
              console.log(`Rebalancing from ${fromTaId} to ${toTaId} assignment ${assignmentId}`);
            }} 
            onUpdateCapacity={(taId, newCapacity) => {
              console.log(`Updating capacity for ${taId} to ${newCapacity}`);
            }} 
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

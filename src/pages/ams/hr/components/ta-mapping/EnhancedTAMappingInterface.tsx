import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Target, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw,
  Settings,
  BarChart3,
  UserPlus,
  Activity,
  Lightbulb,
  Zap
} from 'lucide-react';
import { TAWorkloadPanel } from './TAWorkloadPanel';
import { RoleAssignmentPanel } from './RoleAssignmentPanel';
import { TACollaborationPanel } from './TACollaborationPanel';
import { TAInsightsPanel } from './TAInsightsPanel';
import { DragDropTAAllocation } from './DragDropTAAllocation';
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

  // Transform data for drag-and-drop interface
  const mockRequirements = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const mockTAWorkloads = taProfiles.map(ta => ({
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
    assignments: [
      {
        id: '1',
        name: 'Senior Software Engineer',
        client: 'TechCorp Inc.',
        priority: 'high' as const,
        deadline: '2024-07-15'
      }
    ],
    availability: ta.status === 'active' ? 'available' as const : 'busy' as const,
    riskLevel: ta.efficiency_score < 70 ? 'high' as const : ta.efficiency_score < 85 ? 'medium' as const : 'low' as const
  }));

  const mockRecommendations = [
    {
      id: 'rec-1',
      type: 'optimal_assignment' as const,
      priority: 'high' as const,
      title: 'High-Impact Assignment Opportunity',
      description: 'Sarah Chen is an optimal match for the Senior Software Engineer role at TechCorp Inc.',
      impact: 'Could reduce time-to-fill by 40% and increase placement success rate by 25%',
      confidence: 92,
      suggestedAction: {
        taId: 'ta1',
        taName: 'Sarah Chen',
        requirementId: 'req-1',
        requirementName: 'Senior Software Engineer',
        client: 'TechCorp Inc.'
      },
      score: {
        overall: 92,
        skillMatch: 95,
        workloadFit: 88,
        efficiency: 90,
        availability: 95
      },
      reasoning: [
        'Exact skill match with React, Node.js, and AWS expertise',
        'Current workload at 60% capacity, ideal for taking on high-priority requirements',
        'Historical success rate of 85% for similar technical roles',
        'Available immediately with no conflicting deadlines'
      ],
      estimatedOutcome: {
        efficiencyGain: 25,
        timeToFill: '3-4 weeks',
        riskReduction: 35
      }
    },
    {
      id: 'rec-2',
      type: 'workload_rebalance' as const,
      priority: 'medium' as const,
      title: 'Workload Rebalancing Needed',
      description: 'Mike Rodriguez is approaching capacity limit. Consider redistributing assignments.',
      impact: 'Prevent burnout and maintain consistent performance across the team',
      confidence: 78,
      suggestedAction: {
        taId: 'ta2',
        taName: 'Emily Watson',
        requirementId: 'req-2',
        requirementName: 'Product Manager',
        client: 'StartupX'
      },
      score: {
        overall: 78,
        skillMatch: 82,
        workloadFit: 95,
        efficiency: 75,
        availability: 90
      },
      reasoning: [
        'Mike Rodriguez currently at 95% capacity',
        'Emily Watson has bandwidth and relevant PM experience',
        'Risk of quality degradation if current assignments continue'
      ],
      estimatedOutcome: {
        efficiencyGain: 15,
        timeToFill: '2-3 weeks',
        riskReduction: 50
      }
    }
  ];

  const transformedTAs = taProfiles.map(ta => ({
    id: ta.id,
    name: ta.name,
    email: ta.email,
    currentWorkload: ta.current_workload,
    maxWorkload: ta.max_workload,
    efficiencyScore: ta.efficiency_score,
    skills: Array.isArray(ta.skills) ? ta.skills : [],
    availability: ta.status === 'active' ? 'available' as const : 
                ta.current_workload >= ta.max_workload * 0.9 ? 'busy' as const : 'unavailable' as const,
    assignments: ta.current_workload
  }));

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
      handleAssignTA(recommendation.suggestedAction.taId, recommendation.suggestedAction.requirementId);
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
          <h2 className="text-2xl font-bold">Enhanced TA Mapping</h2>
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
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
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
              <Activity className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">Collaborations</p>
                <p className="text-xl font-bold">{collaborations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface with Enhanced Tabs */}
      <Tabs value={activeView} onValueChange={(value: any) => setActiveView(value)}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="allocation">
            <Zap className="h-4 w-4 mr-2" />
            Allocation
          </TabsTrigger>
          <TabsTrigger value="workload">
            <BarChart3 className="h-4 w-4 mr-2" />
            Workload
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Lightbulb className="h-4 w-4 mr-2" />
            AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="allocation" className="space-y-4">
          <DragDropTAAllocation
            requirements={mockRequirements}
            availableTAs={transformedTAs}
            onAssignTA={handleAssignTA}
            onUnassignTA={handleUnassignTA}
            onUpdateTargets={handleUpdateTargets}
          />
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <TAWorkloadDashboard
            workloads={mockTAWorkloads}
            onRebalance={(fromTaId, toTaId, assignmentId) => {
              console.log(`Rebalancing from ${fromTaId} to ${toTaId} assignment ${assignmentId}`);
            }}
            onUpdateCapacity={(taId, newCapacity) => {
              console.log(`Updating capacity for ${taId} to ${newCapacity}`);
            }}
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <SmartAssignmentRecommendations
            recommendations={mockRecommendations}
            onApplyRecommendation={handleApplyRecommendation}
            onDismissRecommendation={handleDismissRecommendation}
          />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          
          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Assignment #{assignment.id.slice(0, 8)}</h4>
                      <p className="text-sm text-gray-600">
                        TA: {taProfiles.find(ta => ta.id === assignment.ta_id)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        assignment.priority === 'high' ? 'destructive' :
                        assignment.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {assignment.priority}
                      </Badge>
                      <Badge variant={
                        assignment.status === 'active' ? 'default' :
                        assignment.status === 'completed' ? 'secondary' : 'destructive'
                      }>
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <TACollaborationPanel
            taProfiles={taProfiles}
            assignments={assignments}
            collaborations={collaborations}
            onCreateCollaboration={createCollaboration}
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

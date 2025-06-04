
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
  Activity
} from 'lucide-react';
import { TAWorkloadPanel } from './TAWorkloadPanel';
import { RoleAssignmentPanel } from './RoleAssignmentPanel';
import { TACollaborationPanel } from './TACollaborationPanel';
import { TAInsightsPanel } from './TAInsightsPanel';
import { useEnhancedTAMapping } from '@/hooks/useEnhancedTAMapping';

interface EnhancedTAMappingInterfaceProps {
  roleData: any;
}

export const EnhancedTAMappingInterface: React.FC<EnhancedTAMappingInterfaceProps> = ({
  roleData
}) => {
  const [selectedTA, setSelectedTA] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'workload' | 'assignments' | 'collaboration' | 'insights'>('overview');
  
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

  const getWorkloadStatus = (workload: number, maxWorkload: number) => {
    const percentage = (workload / maxWorkload) * 100;
    if (percentage >= 90) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Overloaded' };
    if (percentage >= 75) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'High' };
    if (percentage >= 50) return { color: 'text-blue-600', bg: 'bg-blue-100', status: 'Moderate' };
    return { color: 'text-green-600', bg: 'bg-green-100', status: 'Light' };
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
          <Button variant="outline" size="sm">
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - TA List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  TA Team Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taProfiles.map((ta) => {
                    const workloadStatus = getWorkloadStatus(ta.current_workload, ta.max_workload);
                    const workloadPercentage = (ta.current_workload / ta.max_workload) * 100;
                    const taCollaborations = collaborations.filter(c => 
                      c.primary_ta_id === ta.id || c.secondary_ta_id === ta.id
                    ).length;
                    
                    return (
                      <div 
                        key={ta.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTA === ta.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTA(ta.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{ta.name}</h4>
                            <p className="text-sm text-gray-600">{ta.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={workloadStatus.bg + ' ' + workloadStatus.color} variant="secondary">
                              {workloadStatus.status}
                            </Badge>
                            {taCollaborations > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {taCollaborations} collab
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Workload</span>
                            <span>{ta.current_workload}/{ta.max_workload}</span>
                          </div>
                          <Progress value={workloadPercentage} className="h-2" />
                          
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                            <div className="text-center">
                              <p>Success: {ta.success_rate}%</p>
                            </div>
                            <div className="text-center">
                              <p>Efficiency: {ta.efficiency_score}</p>
                            </div>
                            <div className="text-center">
                              <p>Exp: {ta.experience_years}y</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Assignment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Assignment Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTA ? (
                  <RoleAssignmentPanel 
                    taId={selectedTA} 
                    roleId={roleData?.id}
                    assignments={assignments.filter(a => a.ta_id === selectedTA)}
                    assignmentMetrics={assignmentMetrics}
                    onAssignmentUpdate={updateAssignmentStatus}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">Select a TA</h3>
                    <p>Choose a TA from the left panel to view their assignment details and analytics.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <TAWorkloadPanel 
            taProfiles={taProfiles}
            workloadData={workloadData}
            roleTargets={roleTargets}
            onWorkloadUpdate={updateWorkload}
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

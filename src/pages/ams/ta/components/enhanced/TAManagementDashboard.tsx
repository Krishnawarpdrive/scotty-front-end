
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTAManagement } from '@/hooks/useTAManagement';
import { Users, UserCheck, Clock, TrendingUp, AlertCircle, Plus } from 'lucide-react';

interface TAManagementDashboardProps {
  className?: string;
}

export const TAManagementDashboard: React.FC<TAManagementDashboardProps> = ({ className }) => {
  const { taProfiles, workloads, loading, error } = useTAManagement();
  const [selectedTA, setSelectedTA] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Error loading TA management data: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalTAs = taProfiles.length;
  const activeTAs = taProfiles.filter(ta => ta.status === 'active').length;
  const averageUtilization = workloads.reduce((sum, w) => sum + w.utilization_percentage, 0) / workloads.length || 0;
  const overloadedTAs = workloads.filter(w => w.utilization_percentage > 90).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total TAs</p>
                <p className="text-2xl font-bold">{totalTAs}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active TAs</p>
                <p className="text-2xl font-bold text-green-600">{activeTAs}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Utilization</p>
                <p className="text-2xl font-bold">{averageUtilization.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overloaded</p>
                <p className="text-2xl font-bold text-red-600">{overloadedTAs}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workload">Workload</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add TA
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TA Profiles Overview */}
            <Card>
              <CardHeader>
                <CardTitle>TA Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taProfiles.slice(0, 5).map((ta) => (
                    <div key={ta.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {ta.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{ta.name}</p>
                          <p className="text-sm text-gray-600">{ta.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={ta.status === 'active' ? 'default' : 'secondary'}>
                          {ta.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {ta.efficiency_score}% efficiency
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workload Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workloads.slice(0, 5).map((workload) => (
                    <div key={workload.ta_id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{workload.ta_name}</span>
                        <span className="text-sm text-gray-600">
                          {workload.active_assignments}/{workload.total_capacity}
                        </span>
                      </div>
                      <Progress value={workload.utilization_percentage} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{workload.utilization_percentage.toFixed(1)}% utilized</span>
                        {workload.overdue_tasks > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {workload.overdue_tasks} overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TA Workload Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {workloads.map((workload) => (
                  <Card key={workload.ta_id} className="border">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{workload.ta_name}</h3>
                          <Badge variant={workload.utilization_percentage > 90 ? 'destructive' : 'default'}>
                            {workload.utilization_percentage.toFixed(1)}%
                          </Badge>
                        </div>
                        
                        <Progress value={workload.utilization_percentage} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Active:</span>
                            <span className="ml-1 font-medium">{workload.active_assignments}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Capacity:</span>
                            <span className="ml-1 font-medium">{workload.total_capacity}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Upcoming:</span>
                            <span className="ml-1 font-medium">{workload.upcoming_deadlines}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Overdue:</span>
                            <span className="ml-1 font-medium text-red-600">{workload.overdue_tasks}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                Performance metrics will be displayed here based on individual TA data.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TA Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                Assignment management interface will be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

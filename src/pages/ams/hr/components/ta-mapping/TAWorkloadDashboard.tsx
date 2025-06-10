
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface WorkloadMetrics {
  candidates: {
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  interviews: {
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  closures: {
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
}

interface Assignment {
  id: string;
  name: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

interface TAWorkload {
  id: string;
  name: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiency: number;
  metrics: WorkloadMetrics;
  assignments: Assignment[];
  availability: 'available' | 'busy' | 'unavailable';
  riskLevel: 'low' | 'medium' | 'high';
}

interface TAWorkloadDashboardProps {
  workloads: TAWorkload[];
  onRebalance: (fromTaId: string, toTaId: string, assignmentId: string) => void;
  onUpdateCapacity: (taId: string, newCapacity: number) => void;
}

export const TAWorkloadDashboard: React.FC<TAWorkloadDashboardProps> = ({
  workloads,
  onRebalance,
  onUpdateCapacity
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      case 'stable': return <Minus className="h-3 w-3 text-gray-600" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate overall stats
  const totalWorkload = workloads.reduce((acc, ta) => acc + ta.currentWorkload, 0);
  const totalCapacity = workloads.reduce((acc, ta) => acc + ta.maxWorkload, 0);
  const avgEfficiency = Math.round(workloads.reduce((acc, ta) => acc + ta.efficiency, 0) / workloads.length);
  const overloadedTAs = workloads.filter(ta => (ta.currentWorkload / ta.maxWorkload) > 0.9).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Overall Utilization</p>
                <p className="text-xl font-bold">{Math.round((totalWorkload / totalCapacity) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Efficiency</p>
                <p className="text-xl font-bold">{avgEfficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total TAs</p>
                <p className="text-xl font-bold">{workloads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overloaded</p>
                <p className="text-xl font-bold">{overloadedTAs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual TA Workload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workloads.map((ta) => (
          <Card key={ta.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(ta.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{ta.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRiskColor(ta.riskLevel)} variant="secondary">
                        {ta.riskLevel} risk
                      </Badge>
                      <Badge variant="outline">
                        {ta.efficiency}% efficiency
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {ta.currentWorkload}/{ta.maxWorkload}
                  </div>
                  <div className="text-sm text-gray-600">workload</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Workload Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Capacity Utilization</span>
                  <span>{Math.round((ta.currentWorkload / ta.maxWorkload) * 100)}%</span>
                </div>
                <Progress 
                  value={(ta.currentWorkload / ta.maxWorkload) * 100} 
                  className="h-3"
                />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs text-gray-600">Candidates</span>
                    {getTrendIcon(ta.metrics.candidates.trend)}
                  </div>
                  <div className="text-lg font-bold">
                    {ta.metrics.candidates.current}
                  </div>
                  <div className="text-xs text-gray-500">
                    Target: {ta.metrics.candidates.target}
                  </div>
                  {ta.metrics.candidates.change !== 0 && (
                    <div className={`text-xs ${ta.metrics.candidates.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {ta.metrics.candidates.change > 0 ? '+' : ''}{ta.metrics.candidates.change}%
                    </div>
                  )}
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs text-gray-600">Interviews</span>
                    {getTrendIcon(ta.metrics.interviews.trend)}
                  </div>
                  <div className="text-lg font-bold">
                    {ta.metrics.interviews.current}
                  </div>
                  <div className="text-xs text-gray-500">
                    Target: {ta.metrics.interviews.target}
                  </div>
                  {ta.metrics.interviews.change !== 0 && (
                    <div className={`text-xs ${ta.metrics.interviews.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {ta.metrics.interviews.change > 0 ? '+' : ''}{ta.metrics.interviews.change}%
                    </div>
                  )}
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs text-gray-600">Closures</span>
                    {getTrendIcon(ta.metrics.closures.trend)}
                  </div>
                  <div className="text-lg font-bold">
                    {ta.metrics.closures.current}
                  </div>
                  <div className="text-xs text-gray-500">
                    Target: {ta.metrics.closures.target}
                  </div>
                  {ta.metrics.closures.change !== 0 && (
                    <div className={`text-xs ${ta.metrics.closures.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {ta.metrics.closures.change > 0 ? '+' : ''}{ta.metrics.closures.change}%
                    </div>
                  )}
                </div>
              </div>

              {/* Current Assignments */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Active Assignments ({ta.assignments.length})
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {ta.assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div>
                        <div className="text-sm font-medium">{assignment.name}</div>
                        <div className="text-xs text-gray-600">{assignment.client}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                          {assignment.priority}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Adjust Capacity
                </Button>
                {ta.currentWorkload > ta.maxWorkload * 0.8 && (
                  <Button variant="outline" size="sm" className="flex-1 text-orange-600 border-orange-200">
                    Rebalance Load
                  </Button>
                )}
              </div>
            </CardContent>

            {/* Risk Indicator */}
            {ta.riskLevel === 'high' && (
              <div className="absolute top-2 right-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

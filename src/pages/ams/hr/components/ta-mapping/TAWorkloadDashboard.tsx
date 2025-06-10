
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface WorkloadMetric {
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface TAWorkload {
  id: string;
  name: string;
  avatar?: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiency: number;
  metrics: {
    candidates: WorkloadMetric;
    interviews: WorkloadMetric;
    closures: WorkloadMetric;
  };
  assignments: Array<{
    id: string;
    name: string;
    client: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
  }>;
  availability: 'available' | 'busy' | 'unavailable';
  riskLevel: 'low' | 'medium' | 'high';
}

interface TAWorkloadDashboardProps {
  workloads: TAWorkload[];
  onRebalance?: (fromTaId: string, toTaId: string, assignmentId: string) => void;
  onUpdateCapacity?: (taId: string, newCapacity: number) => void;
}

export const TAWorkloadDashboard: React.FC<TAWorkloadDashboardProps> = ({
  workloads,
  onRebalance,
  onUpdateCapacity
}) => {
  const getWorkloadColor = (workload: number, maxWorkload: number) => {
    const percentage = (workload / maxWorkload) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    if (percentage >= 50) return 'text-blue-600';
    return 'text-green-600';
  };

  const getWorkloadBgColor = (workload: number, maxWorkload: number) => {
    const percentage = (workload / maxWorkload) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <div className="h-3 w-3" />;
  };

  const overloadedTAs = workloads.filter(ta => ta.currentWorkload >= ta.maxWorkload * 0.9);
  const availableTAs = workloads.filter(ta => ta.currentWorkload < ta.maxWorkload * 0.7);
  const avgEfficiency = workloads.reduce((acc, ta) => acc + ta.efficiency, 0) / workloads.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
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
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overloaded</p>
                <p className="text-xl font-bold">{overloadedTAs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-xl font-bold">{availableTAs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-xl font-bold">
                  {workloads.filter(ta => ta.riskLevel === 'high').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TA Workload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workloads.map((ta) => (
          <Card key={ta.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={ta.avatar} />
                    <AvatarFallback>{getInitials(ta.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{ta.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {ta.availability}
                      </Badge>
                      <Badge className={getRiskColor(ta.riskLevel)} variant="secondary">
                        {ta.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getWorkloadColor(ta.currentWorkload, ta.maxWorkload)}`}>
                    {ta.currentWorkload}/{ta.maxWorkload}
                  </div>
                  <div className="text-xs text-gray-600">workload</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Workload Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Capacity Utilization</span>
                  <span className="text-sm text-gray-600">
                    {Math.round((ta.currentWorkload / ta.maxWorkload) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(ta.currentWorkload / ta.maxWorkload) * 100} 
                  className="h-2"
                />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xs font-medium">Candidates</span>
                    {getTrendIcon(ta.metrics.candidates.trend, ta.metrics.candidates.change)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{ta.metrics.candidates.current}</span>
                    <span className="text-gray-500">/{ta.metrics.candidates.target}</span>
                  </div>
                  <Progress 
                    value={(ta.metrics.candidates.current / ta.metrics.candidates.target) * 100} 
                    className="h-1 mt-1"
                  />
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xs font-medium">Interviews</span>
                    {getTrendIcon(ta.metrics.interviews.trend, ta.metrics.interviews.change)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{ta.metrics.interviews.current}</span>
                    <span className="text-gray-500">/{ta.metrics.interviews.target}</span>
                  </div>
                  <Progress 
                    value={(ta.metrics.interviews.current / ta.metrics.interviews.target) * 100} 
                    className="h-1 mt-1"
                  />
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xs font-medium">Closures</span>
                    {getTrendIcon(ta.metrics.closures.trend, ta.metrics.closures.change)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{ta.metrics.closures.current}</span>
                    <span className="text-gray-500">/{ta.metrics.closures.target}</span>
                  </div>
                  <Progress 
                    value={(ta.metrics.closures.current / ta.metrics.closures.target) * 100} 
                    className="h-1 mt-1"
                  />
                </div>
              </div>

              {/* Efficiency Score */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Efficiency Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-lg font-bold ${
                    ta.efficiency >= 85 ? 'text-green-600' : 
                    ta.efficiency >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {ta.efficiency}%
                  </div>
                  {ta.efficiency >= 85 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : ta.efficiency < 70 ? (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  ) : null}
                </div>
              </div>

              {/* Current Assignments */}
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Current Assignments ({ta.assignments.length})
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {ta.assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{assignment.name}</div>
                        <div className="text-xs text-gray-600">{assignment.client}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            assignment.priority === 'high' ? 'border-red-300 text-red-700' :
                            assignment.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {assignment.priority}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Indicators */}
              {ta.riskLevel === 'high' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">High Risk Alert</span>
                  </div>
                  <p className="text-xs text-red-700">
                    This TA is at risk of burnout. Consider redistributing workload.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

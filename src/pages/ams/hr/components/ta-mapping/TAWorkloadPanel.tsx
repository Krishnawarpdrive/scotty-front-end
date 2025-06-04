
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface TAProfile {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'on_leave';
  skills: string[];
  certifications: string[];
  experience_years: number;
  current_workload: number;
  max_workload: number;
  efficiency_score: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

interface TAWorkloadPanelProps {
  taProfiles: TAProfile[];
  workloadData: any[];
  roleTargets: any[];
  onWorkloadUpdate: (taId: string, updates: Partial<TAProfile>) => Promise<void>;
}

export const TAWorkloadPanel: React.FC<TAWorkloadPanelProps> = ({
  taProfiles,
  workloadData,
  roleTargets,
  onWorkloadUpdate
}) => {
  const [editingWorkload, setEditingWorkload] = useState<string | null>(null);
  const [workloadValues, setWorkloadValues] = useState<{[key: string]: number}>({});

  const getWorkloadTrend = (taId: string) => {
    // Mock trend calculation - in real app, this would compare current vs previous period
    const trend = Math.random() > 0.5 ? 'up' : 'down';
    const percentage = Math.floor(Math.random() * 20) + 1;
    return { trend, percentage };
  };

  const getEfficiencyColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleWorkloadEdit = (taId: string, currentWorkload: number) => {
    setEditingWorkload(taId);
    setWorkloadValues({...workloadValues, [taId]: currentWorkload});
  };

  const handleWorkloadSave = async (taId: string) => {
    try {
      await onWorkloadUpdate(taId, { current_workload: workloadValues[taId] });
      setEditingWorkload(null);
    } catch (error) {
      console.error('Failed to update workload:', error);
    }
  };

  const handleWorkloadCancel = () => {
    setEditingWorkload(null);
    setWorkloadValues({});
  };

  return (
    <div className="space-y-6">
      {/* Workload Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-xl font-bold">{taProfiles.reduce((acc, ta) => acc + ta.max_workload, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Current Load</p>
                <p className="text-xl font-bold">{taProfiles.reduce((acc, ta) => acc + ta.current_workload, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-xl font-bold">
                  {Math.round((taProfiles.reduce((acc, ta) => acc + ta.current_workload, 0) / 
                    taProfiles.reduce((acc, ta) => acc + ta.max_workload, 0)) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual TA Workload Management */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Workload Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taProfiles.map((ta) => {
              const workloadPercentage = (ta.current_workload / ta.max_workload) * 100;
              const trend = getWorkloadTrend(ta.id);
              const efficiencyClass = getEfficiencyColor(ta.efficiency_score);
              const isEditing = editingWorkload === ta.id;
              
              return (
                <div key={ta.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium">{ta.name}</h4>
                        <p className="text-sm text-gray-600">{ta.email}</p>
                      </div>
                      <Badge 
                        className={efficiencyClass}
                        variant="secondary"
                      >
                        {ta.efficiency_score}% Efficiency
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right text-sm">
                        <div className="flex items-center space-x-1">
                          {trend.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                            {trend.percentage}%
                          </span>
                        </div>
                        <p className="text-gray-500">vs last week</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Workload</span>
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={workloadValues[ta.id] || ta.current_workload}
                            onChange={(e) => setWorkloadValues({
                              ...workloadValues, 
                              [ta.id]: parseInt(e.target.value) || 0
                            })}
                            className="w-20 h-7"
                            min="0"
                            max={ta.max_workload}
                          />
                          <span className="text-sm text-gray-500">/ {ta.max_workload}</span>
                          <Button size="sm" onClick={() => handleWorkloadSave(ta.id)}>
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleWorkloadCancel}>
                            ×
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{ta.current_workload} / {ta.max_workload}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleWorkloadEdit(ta.id, ta.current_workload)}
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Progress value={workloadPercentage} className="h-3" />
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-medium">{ta.success_rate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Avg Response Time</p>
                        <p className="font-medium">2.3h</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Active Tasks</p>
                        <p className="font-medium">{ta.current_workload}</p>
                      </div>
                    </div>

                    {workloadPercentage > 90 && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Workload critical - consider redistribution</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Workload Redistribution Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-blue-900">Redistribute high workload</p>
                  <p className="text-sm text-blue-700">
                    Consider moving 2 assignments from John Doe (95% capacity) to Emily Watson (60% capacity)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-green-900">Efficiency opportunity</p>
                  <p className="text-sm text-green-700">
                    Mike Rodriguez shows 92% efficiency - consider increasing capacity by 2 assignments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Target, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Settings,
  Calendar,
  Activity
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

interface WorkloadData {
  id: string;
  ta_id: string;
  role_id: string;
  week_start_date: string;
  target_candidates: number;
  actual_candidates: number;
  target_interviews: number;
  actual_interviews: number;
  target_closures: number;
  actual_closures: number;
  efficiency_score: number;
}

interface RoleTarget {
  id: string;
  role_id: string;
  target_type: string;
  candidates_target: number;
  interviews_target: number;
  closures_target: number;
  target_period_start: string;
  target_period_end: string;
}

interface TAWorkloadPanelProps {
  taProfiles: TAProfile[];
  workloadData: WorkloadData[];
  roleTargets: RoleTarget[];
  onWorkloadUpdate: (taId: string, updates: Partial<TAProfile>) => void;
}

export const TAWorkloadPanel: React.FC<TAWorkloadPanelProps> = ({
  taProfiles,
  workloadData,
  roleTargets,
  onWorkloadUpdate
}) => {
  const [selectedTA, setSelectedTA] = useState<string | null>(null);
  const [editingWorkload, setEditingWorkload] = useState<string | null>(null);

  const getWorkloadStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Overloaded' };
    if (percentage >= 75) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'High' };
    if (percentage >= 50) return { color: 'text-blue-600', bg: 'bg-blue-100', status: 'Moderate' };
    return { color: 'text-green-600', bg: 'bg-green-100', status: 'Light' };
  };

  const getTAWorkloadData = (taId: string) => {
    return workloadData.filter(w => w.ta_id === taId);
  };

  const calculateWeeklyMetrics = (taWorkload: WorkloadData[]) => {
    const totalTarget = taWorkload.reduce((acc, w) => acc + w.target_candidates, 0);
    const totalActual = taWorkload.reduce((acc, w) => acc + w.actual_candidates, 0);
    const achievement = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;
    
    return {
      totalTarget,
      totalActual,
      achievement: Math.round(achievement)
    };
  };

  const handleWorkloadEdit = (taId: string, field: string, value: number) => {
    const updates = { [field]: value };
    onWorkloadUpdate(taId, updates);
    setEditingWorkload(null);
  };

  return (
    <div className="space-y-6">
      {/* Workload Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Workload Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Workload Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taProfiles.map((ta) => {
                const workloadStatus = getWorkloadStatus(ta.current_workload, ta.max_workload);
                const utilization = (ta.current_workload / ta.max_workload) * 100;
                const taWorkload = getTAWorkloadData(ta.id);
                const weeklyMetrics = calculateWeeklyMetrics(taWorkload);
                
                return (
                  <div 
                    key={ta.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTA === ta.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTA(ta.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{ta.name}</h4>
                        <p className="text-sm text-gray-600">{ta.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={workloadStatus.bg + ' ' + workloadStatus.color} variant="secondary">
                          {workloadStatus.status}
                        </Badge>
                        <Badge variant="outline">
                          {weeklyMetrics.achievement}% weekly
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Workload</span>
                        <div className="flex items-center space-x-2">
                          {editingWorkload === `${ta.id}-current` ? (
                            <Input
                              type="number"
                              className="w-16 h-6 text-xs"
                              defaultValue={ta.current_workload}
                              onBlur={(e) => handleWorkloadEdit(ta.id, 'current_workload', parseInt(e.target.value))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleWorkloadEdit(ta.id, 'current_workload', parseInt(e.currentTarget.value));
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-gray-100 px-1 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingWorkload(`${ta.id}-current`);
                              }}
                            >
                              {ta.current_workload}
                            </span>
                          )}
                          <span>/</span>
                          {editingWorkload === `${ta.id}-max` ? (
                            <Input
                              type="number"
                              className="w-16 h-6 text-xs"
                              defaultValue={ta.max_workload}
                              onBlur={(e) => handleWorkloadEdit(ta.id, 'max_workload', parseInt(e.target.value))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleWorkloadEdit(ta.id, 'max_workload', parseInt(e.currentTarget.value));
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-gray-100 px-1 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingWorkload(`${ta.id}-max`);
                              }}
                            >
                              {ta.max_workload}
                            </span>
                          )}
                        </div>
                      </div>
                      <Progress value={utilization} className="h-2" />
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <div className="text-center">
                          <p>Efficiency: {ta.efficiency_score}%</p>
                        </div>
                        <div className="text-center">
                          <p>Success: {ta.success_rate}%</p>
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

        {/* Workload Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Workload Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-900">Optimal Load</span>
                  <span className="text-lg font-bold text-green-600">
                    {taProfiles.filter(ta => {
                      const util = (ta.current_workload / ta.max_workload) * 100;
                      return util >= 50 && util <= 75;
                    }).length}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-900">High Load</span>
                  <span className="text-lg font-bold text-yellow-600">
                    {taProfiles.filter(ta => {
                      const util = (ta.current_workload / ta.max_workload) * 100;
                      return util >= 75 && util < 90;
                    }).length}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-900">Overloaded</span>
                  <span className="text-lg font-bold text-red-600">
                    {taProfiles.filter(ta => {
                      const util = (ta.current_workload / ta.max_workload) * 100;
                      return util >= 90;
                    }).length}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">Underutilized</span>
                  <span className="text-lg font-bold text-blue-600">
                    {taProfiles.filter(ta => {
                      const util = (ta.current_workload / ta.max_workload) * 100;
                      return util < 50;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Workload View */}
      {selectedTA && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Detailed Workload Analysis - {taProfiles.find(ta => ta.id === selectedTA)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance */}
              <div>
                <h4 className="font-medium mb-3">Weekly Performance</h4>
                <div className="space-y-3">
                  {getTAWorkloadData(selectedTA).map((workload) => (
                    <div key={workload.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Week of {new Date(workload.week_start_date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline">
                          {workload.efficiency_score}% efficiency
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-gray-600">Candidates</p>
                          <p className="font-medium">{workload.actual_candidates}/{workload.target_candidates}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Interviews</p>
                          <p className="font-medium">{workload.actual_interviews}/{workload.target_interviews}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Closures</p>
                          <p className="font-medium">{workload.actual_closures}/{workload.target_closures}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity Management */}
              <div>
                <h4 className="font-medium mb-3">Capacity Management</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current Capacity</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingWorkload(`${selectedTA}-settings`)}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                    <Progress 
                      value={(taProfiles.find(ta => ta.id === selectedTA)?.current_workload || 0) / 
                             (taProfiles.find(ta => ta.id === selectedTA)?.max_workload || 1) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded">
                    <h5 className="text-sm font-medium mb-2">Recommendations</h5>
                    <div className="space-y-1 text-xs text-gray-600">
                      {(() => {
                        const ta = taProfiles.find(ta => ta.id === selectedTA);
                        if (!ta) return null;
                        
                        const utilization = (ta.current_workload / ta.max_workload) * 100;
                        
                        if (utilization >= 90) {
                          return (
                            <p className="text-red-600">
                              <AlertTriangle className="h-3 w-3 inline mr-1" />
                              Consider redistributing assignments or increasing capacity
                            </p>
                          );
                        } else if (utilization < 50) {
                          return (
                            <p className="text-blue-600">
                              <TrendingUp className="h-3 w-3 inline mr-1" />
                              Can take on additional assignments
                            </p>
                          );
                        } else {
                          return (
                            <p className="text-green-600">
                              <Target className="h-3 w-3 inline mr-1" />
                              Optimal workload distribution
                            </p>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Targets Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Role Targets Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roleTargets.map((target) => (
              <div key={target.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Role Target #{target.id.slice(0, 8)}</h4>
                  <Badge variant="outline">{target.target_type}</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Candidates:</span>
                    <span className="font-medium">{target.candidates_target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interviews:</span>
                    <span className="font-medium">{target.interviews_target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closures:</span>
                    <span className="font-medium">{target.closures_target}</span>
                  </div>
                  <div className="text-xs text-gray-500 pt-2">
                    Period: {new Date(target.target_period_start).toLocaleDateString()} - 
                    {new Date(target.target_period_end).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

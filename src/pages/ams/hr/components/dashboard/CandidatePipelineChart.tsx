
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserPlus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockCandidatePipelineData } from '../../mock-dashboard-data';

interface CandidatePipelineChartProps {
  onStageClick: (stage: string, data: any) => void;
}

export const CandidatePipelineChart: React.FC<CandidatePipelineChartProps> = ({ onStageClick }) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  
  const totalCandidates = mockCandidatePipelineData.reduce((sum, stage) => sum + stage.count, 0);

  // Calculate health status based on count and timeInStage
  const getHealthStatus = (stage: any) => {
    // In a real app, this would use more complex logic based on timeInStage, candidate count, etc.
    if (stage.avgDaysInStage > 7) return 'critical';
    if (stage.avgDaysInStage > 4) return 'warning';
    return 'good';
  };

  return (
    <Card className="p-6 mb-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
            Healthy
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mx-1"></span>
            Attention Needed
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>
            Critical
          </div>
          <h2 className="text-2xl font-bold">Candidate Pipeline Overview</h2>
          <p className="text-gray-600">Total candidates: {totalCandidates}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Export Pipeline</Button>
          <Button size="sm">Add Candidate</Button>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex h-16 rounded-lg overflow-hidden border">
          {mockCandidatePipelineData.map((stage, index) => {
            const percentage = (stage.count / totalCandidates) * 100;
            const healthStatus = getHealthStatus(stage);
            
            return (
              <motion.div
                key={stage.stage}
                className="relative cursor-pointer flex items-center justify-center text-white font-medium"
                style={{ 
                  width: `${percentage}%`, 
                  backgroundColor: healthStatus === 'good' ? stage.color : 
                                   healthStatus === 'warning' ? '#f59e0b' : '#ef4444',
                  minWidth: '80px'
                }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                onHoverStart={() => setHoveredStage(stage.stage)}
                onHoverEnd={() => setHoveredStage(null)}
                onClick={() => onStageClick(stage.stage, stage)}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{stage.count}</div>
                  <div className="text-sm opacity-90">{stage.stage}</div>
                </div>
                
                {hoveredStage === stage.stage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 mt-2 text-gray-800"
                    style={{ minWidth: '320px' }}
                  >
                    <h4 className="font-semibold mb-2">{stage.stage} Details</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Avg. time in stage: <span className={`font-medium ${healthStatus === 'critical' ? 'text-red-600' : healthStatus === 'warning' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {stage.avgDaysInStage} days
                        </span>
                      </span>
                      {healthStatus === 'warning' && <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Attention Needed</Badge>}
                      {healthStatus === 'critical' && <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Critical</Badge>}
                    </div>
                    
                    <h5 className="text-sm font-medium mb-2">TA Workload</h5>
                    <div className="space-y-3 mb-4">
                      {stage.taDistribution && stage.taDistribution.map((ta: any, i: number) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{ta.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{ta.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">{ta.count} candidates</span>
                            {ta.overloaded && (
                              <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Overloaded
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="text-sm font-medium mb-2">Candidates ({stage.candidates.length})</h5>
                    <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                      {stage.candidates.map((candidate: any, i: number) => (
                        <div key={i} className="text-sm flex justify-between items-center">
                          <span className="font-medium">{candidate.name}</span>
                          <span className="text-gray-500">{candidate.ta}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Message TAs
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

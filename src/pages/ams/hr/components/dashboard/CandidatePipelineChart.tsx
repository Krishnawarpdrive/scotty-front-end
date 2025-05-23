
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCandidatePipelineData } from '../../mock-dashboard-data';

interface CandidatePipelineChartProps {
  onStageClick: (stage: string, data: any) => void;
}

export const CandidatePipelineChart: React.FC<CandidatePipelineChartProps> = ({ onStageClick }) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  
  const totalCandidates = mockCandidatePipelineData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
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
            return (
              <motion.div
                key={stage.stage}
                className="relative cursor-pointer flex items-center justify-center text-white font-medium"
                style={{ 
                  width: `${percentage}%`, 
                  backgroundColor: stage.color,
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
                    style={{ minWidth: '250px' }}
                  >
                    <h4 className="font-semibold mb-2">{stage.stage} Details</h4>
                    <div className="space-y-2">
                      {stage.candidates.slice(0, 2).map((candidate, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{candidate.name}</span>
                          <span className="text-gray-500">{candidate.ta}</span>
                        </div>
                      ))}
                      {stage.candidates.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{stage.candidates.length - 2} more candidates
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Message TAs
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" />
                        Reassign
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


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ProcessStage {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface HiringProcessPentagonProps {
  data: ProcessStage[];
  isLoading: boolean;
}

export const HiringProcessPentagon: React.FC<HiringProcessPentagonProps> = ({
  data,
  isLoading
}) => {
  // Pentagon coordinates for 5 points
  const pentagonPoints = [
    { x: 150, y: 50 },   // Top
    { x: 250, y: 100 },  // Top Right
    { x: 210, y: 200 },  // Bottom Right
    { x: 90, y: 200 },   // Bottom Left
    { x: 50, y: 100 }    // Top Left
  ];

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Hiring Process Flow</CardTitle>
          <CardDescription>Pentagon visualization of hiring stages</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-pulse">
            <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pathData = pentagonPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Hiring Process Flow</CardTitle>
        <CardDescription>Pentagon visualization of hiring stages</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-80 h-64">
          <svg viewBox="0 0 300 250" className="w-full h-full">
            {/* Pentagon outline */}
            <motion.path
              d={pathData}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            
            {/* Stage points and labels */}
            {data.map((stage, index) => {
              const point = pentagonPoints[index];
              const radius = Math.max(5, (stage.percentage / 100) * 15);
              
              return (
                <g key={stage.name}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={radius}
                    fill={stage.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="drop-shadow-lg"
                  />
                  
                  <motion.text
                    x={point.x + (index === 0 ? 0 : index <= 2 ? 20 : -20)}
                    y={point.y + (index === 0 ? -20 : index >= 3 ? 25 : 5)}
                    textAnchor={index === 0 ? "middle" : index <= 2 ? "start" : "end"}
                    className="text-xs font-medium fill-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {stage.name}
                  </motion.text>
                  
                  <motion.text
                    x={point.x + (index === 0 ? 0 : index <= 2 ? 20 : -20)}
                    y={point.y + (index === 0 ? -8 : index >= 3 ? 37 : 17)}
                    textAnchor={index === 0 ? "middle" : index <= 2 ? "start" : "end"}
                    className="text-xs font-bold fill-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    {stage.value}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.map((stage, index) => (
            <div key={stage.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <span className="text-sm text-gray-600">
                {stage.name}: {stage.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

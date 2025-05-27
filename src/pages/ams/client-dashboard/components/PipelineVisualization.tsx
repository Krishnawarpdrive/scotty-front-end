
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon, ArrowRightIcon } from 'lucide-react';

interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

interface ConversionRate {
  from: string;
  to: string;
  rate: number;
}

interface PipelineData {
  stages: PipelineStage[];
  conversionRates: ConversionRate[];
}

interface PipelineVisualizationProps {
  data: PipelineData;
}

export const PipelineVisualization: React.FC<PipelineVisualizationProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="h-5 w-5 text-primary" />
          Hiring Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pipeline Stages */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {data.stages.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.count}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{stage.name}</div>
                  <div className="text-xs text-gray-600">candidates</div>
                </div>
                {index < data.stages.length - 1 && (
                  <div className="hidden md:block absolute">
                    <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Conversion Rates */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Conversion Rates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.conversionRates.map((conversion, index) => (
                <motion.div
                  key={`${conversion.from}-${conversion.to}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{conversion.from}</span>
                    <ArrowRightIcon className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{conversion.to}</span>
                  </div>
                  <Badge 
                    variant={conversion.rate >= 60 ? 'default' : conversion.rate >= 40 ? 'secondary' : 'destructive'}
                  >
                    {conversion.rate}%
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

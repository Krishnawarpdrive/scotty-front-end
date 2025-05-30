
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

interface TechnicalArea {
  name: string;
  weight: number;
  score: number;
}

interface TechnicalAssessmentAreasProps {
  technicalAreas: TechnicalArea[];
}

export const TechnicalAssessmentAreas: React.FC<TechnicalAssessmentAreasProps> = ({
  technicalAreas
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Assessment Areas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {technicalAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{area.name}</h4>
                  <Badge variant="outline">{area.weight}% weight</Badge>
                </div>
                <Progress value={area.score} className="h-2" />
              </div>
              <div className="ml-4 text-right">
                <span className="text-lg font-semibold text-gray-900">{area.score}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

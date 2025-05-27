
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileTextIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

interface ComplianceData {
  id: string;
  documentType: string;
  required: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}

interface DocumentComplianceTrackerProps {
  data: ComplianceData[];
}

export const DocumentComplianceTracker: React.FC<DocumentComplianceTrackerProps> = ({ data }) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5 text-primary" />
          Document Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{item.documentType}</h4>
              <Badge 
                variant={item.completionRate >= 90 ? 'default' : item.completionRate >= 70 ? 'secondary' : 'destructive'}
              >
                {item.completionRate}%
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900">{item.completed}/{item.required}</span>
              </div>
              <Progress value={item.completionRate} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircleIcon className="h-3 w-3 text-green-600" />
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium">{item.completed}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileTextIcon className="h-3 w-3 text-yellow-600" />
                <span className="text-gray-600">Pending:</span>
                <span className="font-medium">{item.pending}</span>
              </div>
              {item.overdue > 0 && (
                <div className="flex items-center gap-1">
                  <AlertTriangleIcon className="h-3 w-3 text-red-600" />
                  <span className="text-gray-600">Overdue:</span>
                  <span className="font-medium text-red-600">{item.overdue}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

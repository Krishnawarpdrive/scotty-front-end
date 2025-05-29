
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DepartmentBreakdownProps {
  data: any[];
  isLoading: boolean;
}

export const DepartmentBreakdown: React.FC<DepartmentBreakdownProps> = ({
  data,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((dept) => (
            <div key={dept.department} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{dept.department}</h3>
                <Badge variant={dept.efficiency >= 90 ? 'default' : 'secondary'}>
                  {dept.efficiency}% Efficiency
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{dept.totalHires}</p>
                  <p className="text-sm text-gray-600">Total Hires</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{dept.averageTimeToHire}</p>
                  <p className="text-sm text-gray-600">Avg. Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">${dept.costPerHire.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Cost per Hire</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency Score</span>
                  <span>{dept.efficiency}%</span>
                </div>
                <Progress value={dept.efficiency} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

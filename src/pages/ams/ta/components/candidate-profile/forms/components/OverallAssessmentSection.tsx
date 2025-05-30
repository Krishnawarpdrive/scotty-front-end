
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

export const OverallAssessmentSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Overall Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Rating
            </label>
            <div className="flex items-center gap-2">
              <Progress value={0} className="flex-1 h-3" />
              <span className="text-sm font-medium">0/10</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Rating
            </label>
            <div className="flex items-center gap-2">
              <Progress value={0} className="flex-1 h-3" />
              <span className="text-sm font-medium">0/10</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Record detailed observations, strengths, and areas for improvement..."
          />
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline">Save Draft</Button>
          <Button>Complete Assessment</Button>
        </div>
      </CardContent>
    </Card>
  );
};

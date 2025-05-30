
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export const InterviewQuestionsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Interview Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Technical Problem Solving</h4>
            <p className="text-sm text-gray-600 mb-3">
              Present a coding problem that requires algorithmic thinking and optimization.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Add Notes</Button>
              <Button variant="outline" size="sm">Record Answer</Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">System Design</h4>
            <p className="text-sm text-gray-600 mb-3">
              Discuss how they would design a scalable system for a given use case.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Add Notes</Button>
              <Button variant="outline" size="sm">Record Answer</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

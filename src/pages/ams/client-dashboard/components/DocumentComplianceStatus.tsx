
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileCheck, AlertTriangle, Download, Upload } from 'lucide-react';

interface DocumentStatus {
  category: string;
  submitted: number;
  required: number;
  pending: string[];
  urgent: number;
}

interface DocumentComplianceStatusProps {
  data: DocumentStatus[];
}

export const DocumentComplianceStatus: React.FC<DocumentComplianceStatusProps> = ({ data }) => {
  const mockData: DocumentStatus[] = [
    {
      category: 'Identity Documents',
      submitted: 8,
      required: 10,
      pending: ['John Smith - Passport', 'Sarah Wilson - Driver License'],
      urgent: 1
    },
    {
      category: 'Employment Contracts',
      submitted: 5,
      required: 8,
      pending: ['Mike Johnson', 'Alex Rodriguez', 'Emily Davis'],
      urgent: 2
    },
    {
      category: 'Background Checks',
      submitted: 6,
      required: 8,
      pending: ['John Smith', 'Sarah Wilson'],
      urgent: 0
    },
    {
      category: 'References',
      submitted: 7,
      required: 8,
      pending: ['Mike Johnson'],
      urgent: 0
    }
  ];

  const getCompletionPercentage = (submitted: number, required: number) => {
    return (submitted / required) * 100;
  };

  const getStatusColor = (submitted: number, required: number, urgent: number) => {
    if (urgent > 0) return 'text-red-600';
    if (submitted === required) return 'text-green-600';
    if (submitted / required >= 0.8) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const totalSubmitted = mockData.reduce((sum, item) => sum + item.submitted, 0);
  const totalRequired = mockData.reduce((sum, item) => sum + item.required, 0);
  const totalUrgent = mockData.reduce((sum, item) => sum + item.urgent, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Document & Compliance Status
          </CardTitle>
          {totalUrgent > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {totalUrgent} Urgent
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Compliance</span>
            <span className="text-sm text-gray-600">
              {totalSubmitted} / {totalRequired} documents
            </span>
          </div>
          <Progress value={getCompletionPercentage(totalSubmitted, totalRequired)} className="h-2" />
          <div className="text-right text-xs text-gray-600 mt-1">
            {getCompletionPercentage(totalSubmitted, totalRequired).toFixed(1)}% complete
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          {mockData.map((category) => (
            <div key={category.category} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  {category.category}
                  {category.urgent > 0 && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </h4>
                <span className={`text-sm font-medium ${getStatusColor(category.submitted, category.required, category.urgent)}`}>
                  {category.submitted}/{category.required}
                </span>
              </div>
              
              <Progress 
                value={getCompletionPercentage(category.submitted, category.required)} 
                className="h-1 mb-2" 
              />
              
              {category.pending.length > 0 && (
                <div className="text-xs text-gray-600 mb-2">
                  Pending: {category.pending.join(', ')}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                {category.pending.length > 0 && (
                  <Button variant="default" size="sm" className="flex-1">
                    <Upload className="h-3 w-3 mr-1" />
                    Request Docs
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <Button className="w-full" variant="outline">
            View Compliance Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

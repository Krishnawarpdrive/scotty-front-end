
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricData } from '../../../hooks/useDashboardData';

interface MetricActionsViewProps {
  metric: MetricData;
}

export const MetricActionsView: React.FC<MetricActionsViewProps> = ({ metric }) => {
  const renderActionButtons = () => {
    if (metric.title === 'Time to Hire') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Assign Additional TA</Button>
          <Button size="sm" variant="outline">Review Candidate Pipeline</Button>
          <Button size="sm" variant="outline">Schedule Review Meeting</Button>
        </div>
      );
    } else if (metric.title === 'TA Work Progress') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Reassign Tasks</Button>
          <Button size="sm" variant="outline">Send Motivational Alert</Button>
          <Button size="sm" variant="outline">Flag TA for Review</Button>
        </div>
      );
    } else if (metric.title === 'TA Success Rate') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Arrange Peer Learning</Button>
          <Button size="sm" variant="outline">Review Performance</Button>
        </div>
      );
    } else if (metric.title === 'Interviewer Load') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Request Additional Slots</Button>
          <Button size="sm" variant="outline">View Calendar</Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Adjust Algorithm</Button>
          <Button size="sm" variant="outline">View Details</Button>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h4 className="font-medium mb-2">Available Actions</h4>
        <p className="text-sm text-gray-600 mb-4">
          Select an action to take based on the current metrics.
        </p>
        {renderActionButtons()}
      </Card>
      
      {metric.title === 'TA Work Progress' && (
        <Card className="p-4">
          <h4 className="font-medium mb-2">TA Performance</h4>
          <div className="space-y-3">
            {[
              { name: "John Smith", progress: 92, status: "Excellent" },
              { name: "Sarah Johnson", progress: 78, status: "Good" },
              { name: "Mike Peterson", progress: 61, status: "Needs Improvement" }
            ].map((ta) => (
              <div key={ta.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{ta.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className={`h-2.5 rounded-full ${
                        ta.progress > 80 ? 'bg-emerald-500' : 
                        ta.progress > 70 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${ta.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  ta.status === "Excellent" ? 'bg-emerald-100 text-emerald-800' : 
                  ta.status === "Good" ? 'bg-blue-100 text-blue-800' : 
                  'bg-amber-100 text-amber-800'
                }`}>
                  {ta.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

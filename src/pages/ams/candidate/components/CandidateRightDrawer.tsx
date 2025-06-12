
import React from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  Calendar
} from 'lucide-react';

interface CandidateRightDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export const CandidateRightDrawer: React.FC<CandidateRightDrawerProps> = ({
  open,
  onOpenChange,
  data
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] w-[60%] ml-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle>Analytics & Insights</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Application Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Application Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Response Rate</span>
                  <span>{data?.responseRate || 75}%</span>
                </div>
                <Progress value={data?.responseRate || 75} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Interview Success</span>
                  <span>{data?.interviewSuccess || 65}%</span>
                </div>
                <Progress value={data?.interviewSuccess || 65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-gray-500">Senior Frontend Developer at TechCorp</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Interview Scheduled</p>
                  <p className="text-gray-500">Technical round scheduled for tomorrow</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

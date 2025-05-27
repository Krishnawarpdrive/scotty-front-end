
import React from 'react';
import { Calendar, Download, Settings, Plus, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  const notificationCount = 3; // Mock notification count

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Client Dashboard</h1>
            <p className="text-[13px] text-gray-600 mt-1">Track your hiring progress and manage recruitment activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={onDateRangeChange}>
              <SelectTrigger className="w-40 h-9 text-[13px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="h-9 text-[13px]">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="outline" size="sm" className="h-9 text-[13px] relative">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center p-0">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            <Button className="h-9 text-[13px] bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
            
            <Button variant="outline" size="sm" className="h-9 text-[13px]">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

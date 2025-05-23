
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Download } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div>
        <div className="text-sm text-gray-500 mb-1">HR / Hiring Dashboard</div>
        <h1 className="text-2xl font-bold">Hiring Analytics Dashboard</h1>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>Advanced Filters</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
        <Button size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

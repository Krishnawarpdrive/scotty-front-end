
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyMetrics } from './components/DailyMetrics';
import { StandardizedApplicationTable } from './components/StandardizedApplicationTable';

const TAMissionControlPage = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mission Control</h1>
            <p className="text-sm text-gray-600 mt-1">Track your daily progress and manage applications</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Daily Metrics */}
        <DailyMetrics />

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-6">
            <StandardizedApplicationTable />
          </TabsContent>
          
          <TabsContent value="pipeline" className="mt-6">
            <div className="bg-white rounded-lg border p-6">
              <p className="text-gray-600">Pipeline view coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TAMissionControlPage;

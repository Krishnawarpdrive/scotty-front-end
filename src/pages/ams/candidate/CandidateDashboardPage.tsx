
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Settings } from 'lucide-react';
import { CandidateLeftSidebar } from './components/CandidateLeftSidebar';
import { CandidateTopNavigation } from './components/CandidateTopNavigation';
import { CandidateActivityFeed } from './components/CandidateActivityFeed';
import { CandidateQuickActions } from './components/CandidateQuickActions';
import { CandidateDataTables } from './components/CandidateDataTables';
import { CandidateRightDrawer } from './components/CandidateRightDrawer';
import { ProfileCompletionWidget } from './components/ProfileCompletionWidget';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidateId] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const { dashboardData, notifications, messages, isLoading } = useCandidateDashboardData(selectedCandidateId);

  const handleNavigationClick = (section: string) => {
    console.log(`Navigation clicked: ${section}`);
    // Here you would implement navigation logic based on the section
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
    // Here you would implement the specific action logic
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Always Visible */}
      <CandidateLeftSidebar data={dashboardData} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Actions */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your application progress.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRightDrawer(true)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <CandidateTopNavigation 
          data={dashboardData} 
          onSectionClick={handleNavigationClick}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Activity Feed - Takes 2 columns */}
              <div className="lg:col-span-2">
                <CandidateActivityFeed data={dashboardData} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Profile Completion Widget */}
                <ProfileCompletionWidget 
                  completionPercentage={dashboardData?.profile_completion_percentage || 0} 
                />
                
                {/* Quick Actions */}
                <CandidateQuickActions onActionClick={handleQuickAction} />
              </div>
            </div>

            {/* Bottom Tables Section */}
            <CandidateDataTables candidateId={selectedCandidateId} />
          </div>
        </div>
      </div>

      {/* Right Sidebar Drawer */}
      <CandidateRightDrawer
        open={showRightDrawer}
        onOpenChange={setShowRightDrawer}
        data={dashboardData}
      />
    </div>
  );
};

export default CandidateDashboardPage;

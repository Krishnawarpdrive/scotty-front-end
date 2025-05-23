
import React from 'react';
import { RecentActivityPanel, CollapsedActivityPanel } from './RecentActivityPanel';

interface DashboardSidebarProps {
  activityPanelCollapsed: boolean;
  onToggleActivityPanel: () => void;
  onActivityClick: (activity: any) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activityPanelCollapsed,
  onToggleActivityPanel,
  onActivityClick
}) => {
  return (
    <>
      {activityPanelCollapsed ? (
        <CollapsedActivityPanel onToggle={onToggleActivityPanel} />
      ) : (
        <RecentActivityPanel 
          collapsed={activityPanelCollapsed} 
          onToggle={onToggleActivityPanel}
          onActivityClick={onActivityClick}
        />
      )}
    </>
  );
};

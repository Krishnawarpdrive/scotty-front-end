
import React from 'react';
import { Button } from '@/components/ui/button';

interface TabItem {
  id: string;
  label: string;
  count: number;
}

interface RoleManagementHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabCounts: Record<string, number>;
}

export const RoleManagementHeader: React.FC<RoleManagementHeaderProps> = ({
  activeTab,
  setActiveTab,
  tabCounts
}) => {
  const tabs: TabItem[] = [
    { id: 'clients', label: 'Clients', count: tabCounts.clients },
    { id: 'roles', label: 'Roles', count: tabCounts.roles },
    { id: 'requirements', label: 'Requirements', count: tabCounts.requirements },
    { id: 'tas', label: 'Team', count: tabCounts.tas },
    { id: 'ta-mapping', label: 'TA Mapping', count: tabCounts['ta-mapping'] || 0 }
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
        </div>
        
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

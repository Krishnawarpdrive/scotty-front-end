
import React, { useState } from 'react';
import { RoleManagementHeader } from './components/page/RoleManagementHeader';
import { RoleManagementContent } from './components/page/RoleManagementContent';

// Mock data
const mockTAs = [
  { id: 1, name: 'John Doe', email: 'john@company.com', activeAssignments: 3, efficiency: 85 },
  { id: 2, name: 'Jane Smith', email: 'jane@company.com', activeAssignments: 5, efficiency: 92 },
  { id: 3, name: 'Mike Johnson', email: 'mike@company.com', activeAssignments: 2, efficiency: 78 }
];

const mockRolesWithRequirements = [
  { id: 1, roleName: 'Software Engineer', requirements: 3, priority: 'High' },
  { id: 2, roleName: 'Product Manager', requirements: 2, priority: 'Medium' },
  { id: 3, roleName: 'Data Scientist', requirements: 1, priority: 'Low' }
];

const mockMetrics = [
  { metric: 'Total Roles', value: 15, trend: 'up' },
  { metric: 'Active Requirements', value: 8, trend: 'stable' },
  { metric: 'Team Members', value: 12, trend: 'up' }
];

export default function RoleManagementPage() {
  const [activeTab, setActiveTab] = useState('clients');

  const tabCounts = {
    clients: 12,
    roles: 15,
    requirements: 8,
    tas: 12,
    'ta-mapping': 5
  };

  const handleClientClick = (clientName: string) => {
    console.log('Client clicked:', clientName);
  };

  const handleRowClick = (item: any) => {
    console.log('Row clicked:', item);
  };

  const handleCreateRole = () => {
    console.log('Create role clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleManagementHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabCounts={tabCounts}
      />
      
      <RoleManagementContent
        activeTab={activeTab}
        mockTAs={mockTAs}
        mockRolesWithRequirements={mockRolesWithRequirements}
        mockMetrics={mockMetrics}
        handleClientClick={handleClientClick}
        handleRowClick={handleRowClick}
        handleCreateRole={handleCreateRole}
      />
    </div>
  );
}

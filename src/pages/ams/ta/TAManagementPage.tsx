
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { TAManagementDashboard } from './components/enhanced/TAManagementDashboard';

export const TAManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="TA Management"
        subtitle="Comprehensive talent acquisition team management and workload optimization"
      />
      
      <TAManagementDashboard />
    </div>
  );
};

export default TAManagementPage;

import React from 'react';
import { motion } from 'framer-motion';
import { ClientDashboardHeader } from './client-dashboard/components/ClientDashboardHeader';
import { ClientKPICards } from './client-dashboard/components/ClientKPICards';
import { VendorScorecard } from './client-dashboard/components/VendorScorecard';
import { RolesRequirementsTable } from './client-dashboard/components/RolesRequirementsTable';
import { PipelineVisualization } from './client-dashboard/components/PipelineVisualization';
import { DocumentComplianceTracker } from './client-dashboard/components/DocumentComplianceTracker';
import { ActivityFeed } from './client-dashboard/components/ActivityFeed';
import { ClientVendorIntegration } from './client-dashboard/components/ClientVendorIntegration';
import { ClientRoleOwnership } from './client-dashboard/components/ClientRoleOwnership';
import { useClientDashboardData } from './client-dashboard/hooks/useClientDashboardData';

const ClientDashboardPage: React.FC = () => {
  const { 
    kpis, 
    vendorScores, 
    rolesData, 
    pipelineData, 
    complianceData, 
    activities,
    vendorSummary,
    roleOwnership,
    isLoading 
  } = useClientDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleViewAllVendors = () => {
    // Navigate to vendor management page
    console.log('Navigate to vendor management');
  };

  const handleAssignVendor = (roleId: string) => {
    // Open vendor assignment modal
    console.log('Assign vendor to role:', roleId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <ClientDashboardHeader />
          
          <ClientKPICards kpis={kpis} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RolesRequirementsTable data={rolesData} />
              <PipelineVisualization data={pipelineData} />
            </div>
            
            <div className="space-y-6">
              <VendorScorecard scores={vendorScores} />
              <ClientVendorIntegration 
                vendors={vendorSummary} 
                onViewAllVendors={handleViewAllVendors}
              />
              <DocumentComplianceTracker data={complianceData} />
              <ActivityFeed activities={activities} />
            </div>
          </div>

          {/* Role Ownership Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ClientRoleOwnership 
              roles={roleOwnership}
              onAssignVendor={handleAssignVendor}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;

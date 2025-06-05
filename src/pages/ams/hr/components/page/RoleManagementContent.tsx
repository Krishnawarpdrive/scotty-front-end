
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from "@/components/ui/tabs";
import ClientsTabContent from '../ClientsTabContent';
import RolesTabContent from '../RolesTabContent';
import RequirementsTabContent from '../RequirementsTabContent';
import { DashboardTab } from './DashboardTab';
import { MissionTab } from './MissionTab';
import { RoleRequirementsTab } from './RoleRequirementsTab';
import { TeamTab } from './TeamTab';
import { EnhancedTAMappingInterface } from '../ta-mapping/EnhancedTAMappingInterface';
import { clientsData, rolesData, requirementsData } from '../../mockData';

interface RoleManagementContentProps {
  activeTab: string;
  mockTAs: any[];
  mockRolesWithRequirements: any[];
  mockMetrics: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
  handleCreateRole: () => void;
}

export const RoleManagementContent: React.FC<RoleManagementContentProps> = ({
  activeTab,
  mockTAs,
  mockRolesWithRequirements,
  mockMetrics,
  handleClientClick,
  handleRowClick,
  handleCreateRole
}) => {
  return (
    <div className="px-6 space-y-6">
      <AnimatePresence mode="wait">
        {activeTab === "clients" && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ClientsTabContent 
              clientsData={clientsData} 
              handleClientClick={handleClientClick}
              handleRowClick={handleRowClick}
            />
          </motion.div>
        )}

        {activeTab === "roles" && (
          <motion.div
            key="roles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RolesTabContent 
              rolesData={rolesData}
              handleClientClick={handleClientClick}
              handleRowClick={handleRowClick}
            />
          </motion.div>
        )}

        {activeTab === "requirements" && (
          <motion.div
            key="requirements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RequirementsTabContent 
              requirementsData={requirementsData}
              handleRowClick={handleRowClick}
            />
          </motion.div>
        )}

        {activeTab === "tas" && (
          <TeamTab 
            mockTAs={mockTAs}
            handleRowClick={handleRowClick}
          />
        )}

        {activeTab === "ta-mapping" && (
          <motion.div
            key="ta-mapping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EnhancedTAMappingInterface 
              roleData={{ id: 'current-role', name: 'Current Role' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

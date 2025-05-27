
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs } from "@/components/ui/tabs";
import ClientDetailDrawer from './components/ClientDetailDrawer';
import { RoleConfigurationDrawer } from './components/RoleConfigurationDrawer';
import { StreakCelebration } from './components/animations/StreakCelebration';
import { FloatingActionButton, defaultRoleManagementActions } from './components/animations/FloatingActionButton';
import { RoleManagementHeader } from './components/page/RoleManagementHeader';
import { RoleManagementContent } from './components/page/RoleManagementContent';
import { useRoleManagementState } from './hooks/useRoleManagementState';
import { useRoleManagementData } from './hooks/useRoleManagementData';

const RoleManagementPage = () => {
  const {
    activeTab,
    setActiveTab,
    selectedClient,
    clientDrawerOpen,
    setClientDrawerOpen,
    selectedRole,
    roleConfigDrawerOpen,
    setRoleConfigDrawerOpen,
    streakCount,
    showStreakCelebration,
    setShowStreakCelebration,
    handleClientClick,
    handleRowClick,
    handleCreateRole,
    handleCreateClient,
    tabCounts
  } = useRoleManagementState();

  const { mockTAs, mockRolesWithRequirements, mockMetrics } = useRoleManagementData();

  const enhancedActions = [
    {
      ...defaultRoleManagementActions[0],
      action: handleCreateClient
    },
    {
      ...defaultRoleManagementActions[1],
      action: handleCreateRole
    },
    {
      ...defaultRoleManagementActions[2],
      action: () => console.log("Create requirement")
    }
  ];

  return (
    <motion.div 
      className="space-y-6 bg-slate-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
      </Tabs>

      <FloatingActionButton 
        actions={enhancedActions}
        position="bottom-right"
      />

      <StreakCelebration
        streakCount={streakCount}
        milestone={streakCount % 7 === 0}
        onComplete={() => setShowStreakCelebration(false)}
      />

      <ClientDetailDrawer
        client={selectedClient}
        open={clientDrawerOpen}
        onOpenChange={setClientDrawerOpen}
      />

      <RoleConfigurationDrawer
        role={selectedRole}
        open={roleConfigDrawerOpen}
        onOpenChange={setRoleConfigDrawerOpen}
      />
    </motion.div>
  );
};

export default RoleManagementPage;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from "@/components/ui/tabs";
import { clientsData, rolesData, requirementsData, tasData } from './mockData';
import ClientDetailDrawer from './components/ClientDetailDrawer';
import PageHeader from './components/PageHeader';
import ClientsTabContent from './components/ClientsTabContent';
import RolesTabContent from './components/RolesTabContent';
import RequirementsTabContent from './components/RequirementsTabContent';
import TasTabContent from './components/TasTabContent';
import { TAAssignmentCard } from './components/TAAssignmentCard';
import { RoleConfigurationDrawer } from './components/RoleConfigurationDrawer';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useRoleManagementShortcuts } from '@/hooks/useRoleManagementShortcuts';

// New animated components
import { StreakCelebration } from './components/animations/StreakCelebration';
import { AnimatedMetrics } from './components/animations/AnimatedMetrics';
import { FloatingActionButton, defaultRoleManagementActions } from './components/animations/FloatingActionButton';
import { InteractiveCardContainer } from './components/animations/InteractiveCardContainer';
import { triggerGoalCompletionToast } from './components/animations/GoalCompletionToast';

const RoleManagementPage = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleConfigDrawerOpen, setRoleConfigDrawerOpen] = useState(false);
  
  // Animation states
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [dailyGoalsCompleted, setDailyGoalsCompleted] = useState(0);

  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('role-management');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  // Simulate streak and goals for demo
  useEffect(() => {
    // Simulate daily streak
    const streak = Math.floor(Math.random() * 15) + 1;
    setStreakCount(streak);
    
    // Show celebration for milestones
    if (streak === 7 || streak === 14 || streak % 5 === 0) {
      setShowStreakCelebration(true);
    }

    // Check for completed goals
    const completed = Math.floor(Math.random() * 3);
    setDailyGoalsCompleted(completed);
    
    if (completed > 0) {
      setTimeout(() => {
        triggerGoalCompletionToast({
          id: '1',
          title: 'Process 5 new applications',
          type: 'daily',
          value: 5,
          target: 5
        });
      }, 2000);
    }
  }, []);
  
  // Function to handle client click
  const handleClientClick = (clientName: string) => {
    // Find client by name
    const client = clientsData.find(c => c.name === clientName);
    if (client) {
      setSelectedClient(client);
      setClientDrawerOpen(true);
    }
  };
  
  const handleRowClick = (item: any) => {
    console.log('Row clicked:', item);
    // Check if it's a role item and open role configuration drawer
    if (item.name && item.client && activeTab === 'roles') {
      setSelectedRole(item);
      setRoleConfigDrawerOpen(true);
    }
  };

  const handleCreateRole = () => {
    console.log('Creating new role...');
    // Implementation for creating role
  };

  const handleCreateClient = () => {
    console.log('Creating new client...');
    // Implementation for creating client
  };

  const handleExportData = () => {
    console.log('Exporting data for tab:', activeTab);
    // Implementation for exporting current tab data
  };

  const handleImportData = () => {
    console.log('Importing data for tab:', activeTab);
    // Implementation for importing data
  };

  // Register role management specific shortcuts
  useRoleManagementShortcuts({
    onCreateRole: handleCreateRole,
    onCreateClient: handleCreateClient,
    onExportData: handleExportData,
    onImportData: handleImportData,
    onSwitchToRoles: () => setActiveTab('roles'),
    onSwitchToClients: () => setActiveTab('clients'),
    onSwitchToRequirements: () => setActiveTab('requirements'),
    onSwitchToTAs: () => setActiveTab('tas')
  });

  // Tab count data for badges
  const tabCounts = {
    clients: clientsData.length,
    roles: rolesData.length,
    requirements: requirementsData.length,
    tas: tasData.length
  };

  // Mock TA data for the assignment cards
  const mockTAs = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      currentLoad: 8,
      maxLoad: 10,
      dailyTargets: {
        interviews: 5,
        completedInterviews: 3,
        sourcing: 10,
        completedSourcing: 7,
        offers: 2,
        completedOffers: 1
      },
      assignedRoles: 8,
      efficiency: 87
    },
    {
      name: 'Mike Chen',
      email: 'mike.c@company.com',
      currentLoad: 12,
      maxLoad: 10,
      dailyTargets: {
        interviews: 6,
        completedInterviews: 6,
        sourcing: 8,
        completedSourcing: 5,
        offers: 3,
        completedOffers: 2
      },
      assignedRoles: 12,
      efficiency: 72
    },
    {
      name: 'Emma Davis',
      email: 'emma.d@company.com',
      currentLoad: 6,
      maxLoad: 10,
      dailyTargets: {
        interviews: 4,
        completedInterviews: 4,
        sourcing: 12,
        completedSourcing: 10,
        offers: 1,
        completedOffers: 1
      },
      assignedRoles: 6,
      efficiency: 92
    }
  ];

  // Mock metrics data
  const mockMetrics = [
    {
      id: 'active-roles',
      title: 'Active Roles',
      value: rolesData.length,
      target: 50,
      trend: 'up' as const,
      trendValue: 12
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: 78,
      target: 85,
      unit: '%',
      trend: 'up' as const,
      trendValue: 5
    },
    {
      id: 'avg-time-hire',
      title: 'Avg. Time to Hire',
      value: 18.5,
      target: 15,
      unit: 'days',
      trend: 'down' as const,
      trendValue: -8
    }
  ];

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
        {/* Page Header with Tabs */}
        <PageHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
        />

        {/* Content Area */}
        <div className="px-6 space-y-6">
          {/* Animated Metrics Dashboard */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatedMetrics 
              metrics={mockMetrics}
              title="Today's Performance"
              animationStagger={150}
            />
          </motion.div>

          {/* TA Assignment Dashboard - show on TAs tab */}
          <AnimatePresence mode="wait">
            {activeTab === "tas" && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">TA Assignment Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {mockTAs.map((ta, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <InteractiveCardContainer 
                        hoverEffect="lift"
                        onCardClick={() => console.log(`Clicked TA: ${ta.name}`)}
                      >
                        <TAAssignmentCard ta={ta} />
                      </InteractiveCardContainer>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="overflow-auto max-h-[calc(100vh-280px)]"
            layout
          >
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
                <motion.div
                  key="tas"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TasTabContent 
                    tasData={tasData}
                    handleRowClick={handleRowClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Tabs>

      {/* Floating Action Button */}
      <FloatingActionButton 
        actions={enhancedActions}
        position="bottom-right"
      />

      {/* Streak Celebration */}
      <StreakCelebration
        streakCount={streakCount}
        milestone={streakCount % 7 === 0}
        onComplete={() => setShowStreakCelebration(false)}
      />

      {/* Client Detail Drawer */}
      <ClientDetailDrawer
        client={selectedClient}
        open={clientDrawerOpen}
        onOpenChange={setClientDrawerOpen}
      />

      {/* Role Configuration Drawer */}
      <RoleConfigurationDrawer
        role={selectedRole}
        open={roleConfigDrawerOpen}
        onOpenChange={setRoleConfigDrawerOpen}
      />
    </motion.div>
  );
};

export default RoleManagementPage;

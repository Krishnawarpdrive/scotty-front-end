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

// Enhanced components
import { StreakCelebration } from './components/animations/StreakCelebration';
import { AnimatedMetrics } from './components/animations/AnimatedMetrics';
import { FloatingActionButton, defaultRoleManagementActions } from './components/animations/FloatingActionButton';
import { InteractiveCardContainer } from './components/animations/InteractiveCardContainer';
import { triggerGoalCompletionToast } from './components/animations/GoalCompletionToast';
import { TAMissionControl } from './components/gamification/TAMissionControl';
import { RoleRequirementsIntegration } from './components/role-requirements/RoleRequirementsIntegration';
import { UniversalCommentingSystem } from './components/commenting/UniversalCommentingSystem';

const RoleManagementPage = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleConfigDrawerOpen, setRoleConfigDrawerOpen] = useState(false);
  
  // Animation and gamification states
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [dailyGoalsCompleted, setDailyGoalsCompleted] = useState(0);
  const [selectedTA, setSelectedTA] = useState<any>(null);

  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('role-management');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  // Simulate streak and goals for demo
  useEffect(() => {
    const streak = Math.floor(Math.random() * 15) + 1;
    setStreakCount(streak);
    
    if (streak === 7 || streak === 14 || streak % 5 === 0) {
      setShowStreakCelebration(true);
    }

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
    const client = clientsData.find(c => c.name === clientName);
    if (client) {
      setSelectedClient(client);
      setClientDrawerOpen(true);
    }
  };
  
  const handleRowClick = (item: any) => {
    console.log('Row clicked:', item);
    if (item.name && item.client && activeTab === 'roles') {
      setSelectedRole(item);
      setRoleConfigDrawerOpen(true);
    }
  };

  const handleCreateRole = () => {
    console.log('Creating new role...');
  };

  const handleCreateClient = () => {
    console.log('Creating new client...');
  };

  const handleExportData = () => {
    console.log('Exporting data for tab:', activeTab);
  };

  const handleImportData = () => {
    console.log('Importing data for tab:', activeTab);
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
    dashboard: 0,
    clients: clientsData.length,
    roles: rolesData.length,
    requirements: requirementsData.length,
    tas: tasData.length,
    'role-requirements': rolesData.length,
    mission: 0
  };

  // Mock TA data for the assignment cards and mission control - FIXED TYPES
  const mockTAs = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      currentLoad: 8,
      maxLoad: 10,
      level: 15,
      xp: 2340,
      xpToNext: 2500,
      streak: 12,
      totalMissionsCompleted: 47,
      rank: 'Senior TA',
      achievements: [
        {
          id: 'streak-7',
          title: '7 Day Streak',
          description: 'Complete daily goals for 7 consecutive days',
          type: 'streak' as const,
          level: 'gold' as const,
          unlockedAt: new Date()
        },
        {
          id: 'hiring-machine',
          title: 'Hiring Machine',
          description: 'Complete 50 successful hires',
          type: 'milestone' as const,
          level: 'platinum' as const,
          unlockedAt: new Date()
        }
      ],
      currentMissions: [
        {
          id: 'daily-sourcing',
          title: 'Daily Sourcing Goal',
          description: 'Source 10 qualified candidates',
          type: 'daily' as const,
          progress: 7,
          target: 10,
          reward: '+50 XP',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          status: 'active' as const
        },
        {
          id: 'weekly-interviews',
          title: 'Weekly Interview Target',
          description: 'Conduct 25 candidate interviews',
          type: 'weekly' as const,
          progress: 18,
          target: 25,
          reward: '+200 XP + Bonus',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          status: 'active' as const
        }
      ],
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
    // ... keep existing code (other TAs)
  ];

  // Mock roles for role-requirements integration - FIXED TYPES
  const mockRolesWithRequirements = [
    {
      id: 'role-1',
      name: 'Senior Frontend Developer',
      client: 'TechCorp Inc.',
      status: 'active' as const,
      totalVacancies: 3,
      filledPositions: 1,
      budget: 150000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: [
        {
          id: 'req-1',
          name: 'Frontend Developer - Team A',
          roleId: 'role-1',
          status: 'in_progress' as const,
          priority: 'high' as const,
          vacancies: 2,
          assignedTo: 'Sarah Johnson',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          progress: {
            sourced: 12,
            screened: 8,
            interviewed: 4,
            offered: 2,
            hired: 1
          }
        }
      ]
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
        {/* Enhanced Page Header with new tabs */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Talent Acquisition Management</h1>
            </div>
            
            <div className="flex items-center gap-6">
              {[
                { id: 'dashboard', label: 'Dashboard', count: tabCounts.dashboard },
                { id: 'mission', label: 'Mission Control', count: tabCounts.mission },
                { id: 'role-requirements', label: 'Roles & Requirements', count: tabCounts['role-requirements'] },
                { id: 'clients', label: 'Clients', count: tabCounts.clients },
                { id: 'roles', label: 'Roles', count: tabCounts.roles },
                { id: 'requirements', label: 'Requirements', count: tabCounts.requirements },
                { id: 'tas', label: 'Team', count: tabCounts.tas }
              ].map((tab) => (
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

        {/* Content Area */}
        <div className="px-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <AnimatedMetrics 
                  metrics={mockMetrics}
                  title="Today's Performance"
                  animationStagger={150}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <UniversalCommentingSystem
                    entityType="dashboard"
                    entityId="main-dashboard"
                    title="Dashboard Updates"
                    allowReplies={true}
                    allowReactions={true}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Create Role', 'Add Client', 'New Requirement', 'Team Analytics'].map((action, index) => (
                        <InteractiveCardContainer key={action} hoverEffect="scale">
                          <div className="p-4 bg-white rounded-lg border cursor-pointer text-center">
                            <p className="font-medium">{action}</p>
                          </div>
                        </InteractiveCardContainer>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockTAs.slice(0, 2).map((ta, index) => (
                    <motion.div
                      key={ta.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TAMissionControl
                        ta={ta}
                        onMissionClick={(mission) => console.log('Mission clicked:', mission)}
                        onAchievementClick={(achievement) => console.log('Achievement clicked:', achievement)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "role-requirements" && (
              <motion.div
                key="role-requirements"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RoleRequirementsIntegration
                  roles={mockRolesWithRequirements}
                  onCreateRole={handleCreateRole}
                  onCreateRequirement={(roleId) => console.log('Create requirement for role:', roleId)}
                  onEditRole={(role) => console.log('Edit role:', role)}
                  onEditRequirement={(req) => console.log('Edit requirement:', req)}
                />
              </motion.div>
            )}

            {/* Keep existing tab content */}
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
                <div className="mb-6">
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
                </div>
                
                <TasTabContent 
                  tasData={tasData}
                  handleRowClick={handleRowClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* Existing Drawers */}
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


import { useState, useEffect } from 'react';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useRoleManagementShortcuts } from '@/hooks/useRoleManagementShortcuts';
import { clientsData, rolesData, requirementsData, tasData } from '../mockData';

export const useRoleManagementState = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState("clients");
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

  return {
    activeTab,
    setActiveTab,
    selectedClient,
    setSelectedClient,
    clientDrawerOpen,
    setClientDrawerOpen,
    selectedRole,
    setSelectedRole,
    roleConfigDrawerOpen,
    setRoleConfigDrawerOpen,
    streakCount,
    showStreakCelebration,
    setShowStreakCelebration,
    dailyGoalsCompleted,
    selectedTA,
    setSelectedTA,
    handleClientClick,
    handleRowClick,
    handleCreateRole,
    handleCreateClient,
    handleExportData,
    handleImportData,
    tabCounts
  };
};

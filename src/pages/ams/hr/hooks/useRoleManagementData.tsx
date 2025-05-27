
import { useEffect, useState } from 'react';

export const useRoleManagementData = () => {
  // Mock TA data for the assignment cards and mission control
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
    }
  ];

  // Mock roles for role-requirements integration
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
      value: 42,
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

  return {
    mockTAs,
    mockRolesWithRequirements,
    mockMetrics
  };
};

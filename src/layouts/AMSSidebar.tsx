import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users,
  FileText,
  Building,
  UserCheck,
  BookOpen,
  BarChart3,
  UserPlus,
  CheckSquare,
  Award,
  DollarSign,
  Calendar
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/ams', icon: BarChart3 },
  { name: 'Clients', href: '/ams/clients', icon: Building },
  { name: 'Requirements', href: '/ams/requirements', icon: FileText },
  { name: 'Roles Library', href: '/ams/roles-library', icon: BookOpen },
  { name: 'Candidate Pool', href: '/ams/hr/candidate-pool', icon: Users },
  { name: 'Role Management', href: '/ams/hr/role-management', icon: UserCheck },
  { name: 'Search', href: '/ams/search', icon: Users },
  { name: 'Interview Panelist Library', href: '/ams/interview-panelist-library', icon: UserPlus },
  { name: 'Vendor Management', href: '/ams/vendor-management', icon: Building },
  { name: 'Checklists', href: '/ams/checklists', icon: CheckSquare },
  { name: 'Skills', href: '/ams/skills', icon: Award },
  { name: 'Certifications', href: '/ams/certifications', icon: Award },
  { name: 'Commissions', href: '/ams/commissions', icon: DollarSign },
  { name: 'Workflow Management', href: '/ams/workflow-management', icon: Calendar },
];

export const AMSSidebar = () => {
  const location = useLocation();

  const getNavItemState = (href: string) => {
    const currentPath = location.pathname;
    return {
      current: currentPath === href
    };
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex-shrink-0 flex items-center justify-center h-16 border-b border-gray-200">
        <span className="text-lg font-semibold text-gray-800">
          AMS - Lovable
        </span>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {sidebarItems.map((item) => {
          const { current } = getNavItemState(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

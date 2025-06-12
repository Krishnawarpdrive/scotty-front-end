
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Building2, 
  UserCheck, 
  FileText, 
  Star, 
  Target, 
  CheckSquare, 
  Award, 
  DollarSign,
  BarChart3,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: SidebarItem[];
  roles?: string[];
}

export const AMSSidebar: React.FC = () => {
  const location = useLocation();
  const { hasAnyRole } = useAuthContext();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Talent Management']);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      path: '/ams/dashboard'
    },
    {
      title: 'Talent Management',
      icon: Users,
      children: [
        { title: 'Clients', icon: Building2, path: '/ams/clients' },
        { title: 'Requirements', icon: FileText, path: '/ams/requirements' },
        { title: 'Roles Library', icon: Star, path: '/ams/roles' },
        { title: 'Skills Library', icon: Target, path: '/ams/skills/library' },
        { title: 'Vendors', icon: UserCheck, path: '/ams/vendors' },
        { title: 'Talent Acquisition', icon: Users, path: '/ams/talent-acquisition' },
        { title: 'Human Resources', icon: Users, path: '/ams/human-resources' }
      ]
    },
    {
      title: 'Quality & Standards',
      icon: CheckSquare,
      children: [
        { title: 'Interview Panelists', icon: Users, path: '/ams/interview-panelists' },
        { title: 'Checklists', icon: CheckSquare, path: '/ams/checklists' },
        { title: 'Certifications', icon: Award, path: '/ams/certifications' }
      ]
    },
    {
      title: 'Analytics & Reports',
      icon: BarChart3,
      children: [
        { title: 'Commission Tracker', icon: DollarSign, path: '/ams/commissions' },
        { title: 'Analytics', icon: BarChart3, path: '/ams/analytics' }
      ]
    }
  ];

  const renderSidebarItem = (item: SidebarItem) => {
    if (item.roles && !hasAnyRole(item.roles as any)) {
      return null;
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.title} className="mb-2">
          <Button
            variant="ghost"
            className="w-full justify-between text-left"
            onClick={() => toggleExpanded(item.title)}
          >
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children?.map(renderSidebarItem)}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link key={item.title} to={item.path || '#'}>
        <Button
          variant={location.pathname === item.path ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <Icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AMS</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              {sidebarItems.map(renderSidebarItem)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AMSSidebar;

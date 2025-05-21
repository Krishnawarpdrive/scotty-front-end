
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase,
  ListChecks, 
  ClipboardList,
  Award,
  TrendingUp,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NavigationItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { title: 'Dashboard', path: '/ams/dashboard', icon: LayoutDashboard },
  { title: 'Clients', path: '/ams/clients', icon: Users },
  { title: 'Roles Library', path: '/ams/roles', icon: Briefcase },
  { title: 'Requirements', path: '/ams/requirements', icon: FileText },
  { title: 'Skill Master', path: '/ams/skills', icon: ListChecks },
  { title: 'Checklist Master', path: '/ams/checklists', icon: ClipboardList },
  { title: 'Certifications', path: '/ams/certifications', icon: Award },
  { title: 'Commission Tracker', path: '/ams/commissions', icon: TrendingUp }
];

export const AMSSidebar = () => {
  const location = useLocation();
  
  // Helper to check if a path is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-xl font-semibold px-2">AMS</h2>
            <SidebarTrigger />
          </div>
          <div className="px-2 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-full bg-background pl-8"
              />
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive(item.path)}>
                      <NavLink to={item.path} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

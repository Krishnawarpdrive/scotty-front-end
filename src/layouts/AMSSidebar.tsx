
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
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
  Search,
  BarChart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface NavigationItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { title: 'Dashboard', path: '/ams/dashboard', icon: LayoutDashboard },
  { title: 'HR Dashboard', path: '/ams/hr/dashboard', icon: BarChart },
  { title: 'Role Management', path: '/ams/hr/role-management', icon: Briefcase },
  { title: 'Clients', path: '/ams/clients', icon: Users },
  { title: 'Global Role Library', path: '/ams/roles', icon: Briefcase },
  { title: 'Requirements', path: '/ams/requirements', icon: FileText },
  { title: 'Skills Library', path: '/ams/skills', icon: ListChecks },
  { title: 'Checklist Master', path: '/ams/checklists', icon: ClipboardList },
  { title: 'Certifications', path: '/ams/certifications', icon: Award },
  { title: 'Commission Tracker', path: '/ams/commissions', icon: TrendingUp }
];

export const AMSSidebar = () => {
  const location = useLocation();
  const { open } = useSidebar();
  
  // Helper to check if a path is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar 
      className="border-r transition-all duration-300 ease-in-out"
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="border-b p-2">
        <div className="flex items-center justify-between">
          {open && <h2 className="text-xl font-semibold px-2">AMS</h2>}
          <SidebarTrigger className="ml-auto h-8 w-8" />
        </div>
        {open && (
          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-full bg-background pl-8"
              />
            </div>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive(item.path)} 
                          className="my-1"
                        >
                          <NavLink to={item.path} className="flex items-center">
                            <item.icon className="h-4 w-4 min-w-4" />
                            {open && <span className="ml-2 truncate">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {!open && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

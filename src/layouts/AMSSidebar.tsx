
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
  Search
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Helper to check if a path is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar 
      className="border-r transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? '64px' : '240px' }} 
      collapsible="icon" 
      variant="sidebar"
    >
      <SidebarHeader>
        <div className="p-2 flex justify-between items-center">
          {!isCollapsed && <h2 className="text-xl font-semibold px-2">AMS</h2>}
          <SidebarTrigger />
        </div>
        {!isCollapsed && (
          <div className="px-2 pb-2">
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
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
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
                            {!isCollapsed && <span className="ml-2 truncate">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && (
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

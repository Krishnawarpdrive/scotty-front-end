
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
  BarChart,
  UserCheck
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
  { title: 'Candidate Pool', path: '/ams/hr/candidate-pool', icon: UserCheck },
  { title: 'TA Mission Control', path: '/ams/ta/mission-control', icon: LayoutDashboard },
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
      className="border-r border-slate-200 bg-white shadow-sm"
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="border-b border-slate-200 p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-bold text-slate-900 transition-all duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            ATS Pro
          </h2>
          <SidebarTrigger className="hover:bg-slate-100 transition-colors duration-200 rounded-lg p-2" />
        </div>
        {!isCollapsed && (
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search navigation..."
                className="w-full bg-white border-slate-200 pl-10 h-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-4 py-3">
              Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-3">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive(item.path)}
                          className={`
                            sidebar-nav-item rounded-lg h-12 transition-all duration-200
                            ${isActive(item.path) ? 'active bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 text-slate-700'}
                          `}
                        >
                          <NavLink to={item.path} className="flex items-center w-full px-4 py-3">
                            <item.icon className={`h-5 w-5 min-w-5 sidebar-nav-icon ${isActive(item.path) ? 'text-primary' : 'text-slate-500'}`} />
                            {!isCollapsed && (
                              <span className={`ml-3 truncate sidebar-nav-text transition-colors ${isActive(item.path) ? 'text-primary font-semibold' : 'text-slate-700'}`}>
                                {item.title}
                              </span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="ml-2">
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

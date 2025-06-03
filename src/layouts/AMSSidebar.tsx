
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
  Menu,
  UserCheck,
  Building2,
  BookOpen,
  UserCog,
  Target,
  UserPlus,
  Crown,
  UserCircle,
  CheckCircle,
  HandHeart,
  DollarSign,
  Presentation,
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
  // { title: 'Dashboard', path: '/ams/dashboard', icon: LayoutDashboard },
  // { title: 'HR Dashboard', path: '/ams/hr/dashboard', icon: BarChart },
  // { title: 'Role Management', path: '/ams/hr/role-management', icon: Briefcase },
  // { title: 'Candidate Pool', path: '/ams/hr/candidate-pool', icon: UserCheck },
  // { title: 'TA Mission Control', path: '/ams/ta/mission-control', icon: LayoutDashboard },
  // { title: 'Clients', path: '/ams/clients', icon: Users },
  // { title: 'Client Dashboard', path: '/ams/client-dashboard', icon: BarChart },
  // { title: 'Client Roles & Requirements', path: '/ams/client-roles-requirements', icon: FileText },
  // { title: 'Global Role Library', path: '/ams/roles', icon: Briefcase },
  // { title: 'Requirements', path: '/ams/requirements', icon: FileText },
  // { title: 'Skills Library', path: '/ams/skills', icon: ListChecks },
  // { title: 'Checklist Master', path: '/ams/checklists', icon: ClipboardList },
  // { title: 'Certifications', path: '/ams/certifications', icon: Award },
  // { title: 'Commission Tracker', path: '/ams/commissions', icon: TrendingUp }

  {title: "Dashboard", path: "/ams/dashboard", icon: LayoutDashboard},
  {title: "Clients", path: "/ams/clients",icon: Building2},
  {title: "Requirements", path: "/ams/requirements",icon: FileText},
  {title: "Roles Library", path: "/ams/roles",icon: Briefcase},
  {title: "Skills Library", path: "/ams/skills/library",icon: BookOpen},

  {title: "HR Dashboard", path: "/ams/hr/dashboard", icon: UserCheck},
  {title: "Candidate Pool", path: "/ams/hr/candidate-pool", icon: Users},
  {title: "Role Management", path: "/ams/hr/role-management", icon: UserCog},
  {title: "TA Mission Control", path: "/ams/ta/mission-control", icon: Target},
  {title: "Candidate Dashboard", path: "/ams/candidate-dashboard", icon: UserPlus},
  {title: "Executive Dashboard", path: "/ams/executive/dashboard", icon: Crown},

  {title: "Interview Panelists", path: "/ams/interview-panelists", icon: UserCircle},
  {title: "Checklists", path: "/ams/checklists", icon: CheckCircle},
  {title: "Certifications", path: "/ams/certifications", icon: Award},
  {title: "Vendor Management", path: "/ams/vendor-management", icon: HandHeart},

  {title: "Commissions", path: "/ams/commissions", icon: DollarSign},
  {title: "Executive Clients", path: "/ams/executive/clients", icon: Presentation},
];

export const AMSSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar 
      className="border-r transition-all duration-300 ease-in-out bg-white shadow-sm"
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="border-b p-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className={`text-xl font-semibold text-primary transition-all duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              AMS
            </h2>
          <div className="flex items-center justify-between"></div>
        {!isCollapsed && (
          <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full bg-white border-gray-200 pl-8 focus:ring-2 focus:ring-primary/20 text-[13px] h-9"
            />
          </div>
        </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
            <SidebarTrigger className={isCollapsed ? 'space-y-2 ml-2' : ''} /> 
          </div>
          
          <SidebarGroupContent>
            <SidebarMenu className={`${!isCollapsed ? 'space-y-1 p-2' : 'mx-auto'}`}>
              
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive(item.path)} 
                          className={`
                            sidebar-nav-item rounded-lg mx-1 h-11 text-[13px]
                            ${isActive(item.path) ? 'active' : ''}
                            hover:bg-slate-50 hover:shadow-sm
                            ${isActive(item.path) ? 'bg-primary/10 border-r-4 border-primary text-primary font-medium' : ''}
                          `}
                        >
                          <NavLink to={item.path} className="flex items-center">
                            <item.icon className="h-4 w-4 min-w-4" />
                            {!isCollapsed && <span className="ml-2 truncate">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {!isCollapsed && (
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

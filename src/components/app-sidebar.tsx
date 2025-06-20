
import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Building2,
  Calendar,
  FileText,
  Briefcase,
  BookOpen,
  UserCheck,
  Users,
  UserCog,
  Target,
  UserPlus,
  Crown,
  ClipboardList,
  UserCircle,
  CheckCircle,
  Award,
  HandHeart,
  DollarSign,
  Presentation,
  Database,
  LayoutDashboard,
  MessageSquare,
  Video,
  Zap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationSections = [
  {
    title: "Interviewer Portal",
    items: [
      { 
        title: "My Interviews", 
        url: "/ams/interviewer/my-interviews", 
        icon: Calendar
      },
      { 
        title: "Interviewer Dashboard", 
        url: "/ams/interviewer/dashboard", 
        icon: MessageSquare
      },
    ]
  },
  {
    title: "Core Functions",
    items: [
      { 
        title: "AMS Dashboard", 
        url: "/ams/dashboard", 
        icon: LayoutDashboard
      },
      { 
        title: "Clients", 
        url: "/ams/clients", 
        icon: Building2
      },
      { 
        title: "Requirements", 
        url: "/ams/requirements", 
        icon: FileText
      },
      { 
        title: "Roles Library", 
        url: "/ams/roles", 
        icon: Briefcase
      },
      { 
        title: "Skills Library", 
        url: "/ams/skills/library", 
        icon: BookOpen
      },
    ]
  },
  {
    title: "Specialized Modules",
    items: [
      { 
        title: "HR Dashboard", 
        url: "/ams/hr/dashboard", 
        icon: UserCheck
      },
      { 
        title: "Candidate Pool", 
        url: "/ams/hr/candidate-pool", 
        icon: Users
      },
      { 
        title: "Role Management", 
        url: "/ams/hr/role-management", 
        icon: UserCog
      },
      { 
        title: "TA Management", 
        url: "/ams/ta/management", 
        icon: Target
      },
      { 
        title: "TA Mission Control", 
        url: "/ams/ta/mission-control", 
        icon: Target
      },
      { 
        title: "Candidate Dashboard", 
        url: "/ams/candidate-dashboard", 
        icon: UserPlus
      },
      { 
        title: "Executive Dashboard", 
        url: "/ams/executive/dashboard", 
        icon: Crown
      },
    ]
  },
  {
    title: "Resource Libraries",
    items: [
      { 
        title: "Checklist Bar", 
        url: "/ams/checklist-bar", 
        icon: ClipboardList
      },
      { 
        title: "Interview Panelists", 
        url: "/ams/interview-panelists", 
        icon: UserCircle
      },
      { 
        title: "Checklists", 
        url: "/ams/checklists", 
        icon: CheckCircle
      },
      { 
        title: "Certifications", 
        url: "/ams/certifications", 
        icon: Award
      },
      { 
        title: "Vendor Management", 
        url: "/ams/vendor-management", 
        icon: HandHeart
      },
    ]
  },
  {
    title: "Analytics & Insights",
    items: [
      { 
        title: "Commissions", 
        url: "/ams/commissions", 
        icon: DollarSign
      },
      { 
        title: "Executive Clients", 
        url: "/ams/executive/clients", 
        icon: Presentation
      },
      { 
        title: "Data Analytics", 
        url: "/ams/analytics", 
        icon: Database
      },
    ]
  }
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  
  const isActive = (url: string) => location.pathname === url

  return (
    <Sidebar className="border-r" style={{ backgroundColor: 'white' }}>
      <SidebarHeader className="border-b" style={{ backgroundColor: '#009933' }}>
        <div className="flex items-center gap-3 text-white p-2">
          <Zap className="h-8 w-8" />
          {state === "expanded" && <span className="text-xl font-bold">AMS</span>}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {navigationSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      className={isActive(item.url) ? "bg-[#009933] text-white hover:bg-[#007728]" : ""}
                    >
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#009933' }}>
            <UserCheck className="h-4 w-4 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <div className="font-medium">System User</div>
              <div className="text-xs">Administrator</div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

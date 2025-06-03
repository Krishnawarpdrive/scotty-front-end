
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Briefcase,
  Settings,
  ChevronDown,
  ChevronRight,
  FileText,
  CheckCircle,
  Award,
  DollarSign,
  Workflow,
  Search,
  UserPlus,
  BarChart3,
  Target,
  Star,
  Calendar,
  Zap,
  BookOpen,
  UserCog,
  Presentation,
  Crown,
  UserCircle,
  HandHeart,
  ClipboardList,
  Database
} from "lucide-react";

const AMSSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    core: true,
    specialized: true,
    libraries: true,
    analytics: true,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const isActive = (path: string) => location.pathname === path;
  const isInPath = (path: string) => location.pathname.startsWith(path);

  const navigationSections = [
    {
      key: "core",
      title: "Core Functions",
      icon: LayoutDashboard,
      items: [
        { 
          title: "AMS Dashboard", 
          path: "/ams/dashboard", 
          icon: LayoutDashboard,
          description: "Main overview"
        },
        { 
          title: "Clients", 
          path: "/ams/clients", 
          icon: Building2,
          description: "Client management"
        },
        { 
          title: "Requirements", 
          path: "/ams/requirements", 
          icon: FileText,
          description: "Job requirements"
        },
        { 
          title: "Roles Library", 
          path: "/ams/roles", 
          icon: Briefcase,
          description: "Role templates"
        },
        { 
          title: "Skills Library", 
          path: "/ams/skills/library", 
          icon: BookOpen,
          description: "Skills database"
        },
      ]
    },
    {
      key: "specialized",
      title: "Specialized Modules",
      icon: UserCog,
      items: [
        { 
          title: "HR Dashboard", 
          path: "/ams/hr/dashboard", 
          icon: UserCheck,
          description: "HR management"
        },
        { 
          title: "Candidate Pool", 
          path: "/ams/hr/candidate-pool", 
          icon: Users,
          description: "Candidate database"
        },
        { 
          title: "Role Management", 
          path: "/ams/hr/role-management", 
          icon: UserCog,
          description: "Role configuration"
        },
        { 
          title: "TA Management", 
          path: "/ams/ta/management", 
          icon: Target,
          description: "TA operations"
        },
        { 
          title: "TA Mission Control", 
          path: "/ams/ta/mission-control", 
          icon: Target,
          description: "TA operations"
        },
        { 
          title: "Candidate Dashboard", 
          path: "/ams/candidate-dashboard", 
          icon: UserPlus,
          description: "Candidate view"
        },
        { 
          title: "Executive Dashboard", 
          path: "/ams/executive/dashboard", 
          icon: Crown,
          description: "Executive insights"
        },
      ]
    },
    {
      key: "libraries",
      title: "Resource Libraries",
      icon: BookOpen,
      items: [
        { 
          title: "Checklist Bar", 
          path: "/ams/checklist-bar", 
          icon: ClipboardList,
          description: "Process checklists"
        },
        { 
          title: "Interview Panelists", 
          path: "/ams/interview-panelists", 
          icon: UserCircle,
          description: "Panelist management"
        },
        { 
          title: "Checklists", 
          path: "/ams/checklists", 
          icon: CheckCircle,
          description: "Process checklists"
        },
        { 
          title: "Certifications", 
          path: "/ams/certifications", 
          icon: Award,
          description: "Certification library"
        },
        { 
          title: "Vendor Management", 
          path: "/ams/vendor-management", 
          icon: HandHeart,
          description: "Vendor portal"
        },
      ]
    },
    {
      key: "analytics",
      title: "Analytics & Insights",
      icon: BarChart3,
      items: [
        { 
          title: "Commissions", 
          path: "/ams/commissions", 
          icon: DollarSign,
          description: "Commission tracking"
        },
        { 
          title: "Executive Clients", 
          path: "/ams/executive/clients", 
          icon: Presentation,
          description: "Client analytics"
        },
        { 
          title: "Data Analytics", 
          path: "/ams/analytics", 
          icon: Database,
          description: "System analytics"
        },
      ]
    }
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg border-r font-rubik">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b" style={{ backgroundColor: '#009933' }}>
        <div className="flex items-center gap-3 text-white">
          <Zap className="h-8 w-8" />
          <span className="text-xl font-bold">AMS</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-3">
          {navigationSections.map((section) => (
            <Collapsible
              key={section.key}
              open={expandedSections[section.key]}
              onOpenChange={() => toggleSection(section.key)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left font-medium text-xs"
                >
                  <div className="flex items-center gap-2">
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </div>
                  {expandedSections[section.key] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all hover:bg-gray-100",
                        isActive
                          ? "text-white border-l-4" 
                          : "text-gray-600 hover:text-gray-900",
                        isActive && "bg-[#009933] border-[#007728]"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#009933' }}>
            <UserCheck className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-medium">System User</div>
            <div className="text-xs">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMSSidebar;

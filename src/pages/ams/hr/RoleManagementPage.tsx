
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Briefcase, 
  Users, 
  ClipboardList, 
  GraduationCap,
  Phone,
  Mail,
  AlertCircle,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { clientsData, rolesData, requirementsData, tasData } from './mockData';

const RoleManagementPage = () => {
  const [activeTab, setActiveTab] = useState("clients");
  
  // Columns definition for Clients tab
  const clientsColumns = [
    {
      id: "clientName",
      header: "Client Name + ID",
      accessorKey: "name",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <div className="flex flex-col">
          <span className="font-medium hover:text-primary cursor-pointer">
            {client.name}
          </span>
          <span className="text-[10px] text-muted-foreground">
            #{client.id.substring(0, 8)}
          </span>
        </div>
      ),
    },
    {
      id: "contactPerson",
      header: "Contact Person",
      accessorKey: "contactPerson",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <div className="flex items-center gap-1">
          <span>{client.contactPerson}</span>
          <div className="flex ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                    <Phone className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Call via operator</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                    <Mail className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ),
    },
    {
      id: "rolesProgress",
      header: "Roles Needed / Hired",
      accessorKey: "rolesProgress",
      enableSorting: true,
      enableFiltering: false,
      cell: (client: any) => (
        <div className="flex items-center">
          <span>{client.rolesHired} / {client.rolesNeeded}</span>
        </div>
      ),
    },
    {
      id: "requirementsCount",
      header: "Requirements Count",
      accessorKey: "requirementsCount",
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: "unassignedItems",
      header: "Roles / Requirements Unassigned",
      accessorKey: "unassignedRoles",
      enableSorting: true,
      enableFiltering: false,
      cell: (client: any) => (
        <div className="flex items-center">
          <span className={client.unassignedRoles > 0 ? "text-amber-600" : ""}>
            {client.unassignedRoles} / {client.totalRoles}
          </span>
        </div>
      ),
    },
    {
      id: "tasAssigned",
      header: "TAs Assigned",
      accessorKey: "tasAssigned",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {client.tasAssigned.length}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{client.tasAssigned.join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "status",
      header: "Client Status",
      accessorKey: "status",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <Badge variant={client.status === "Active" ? "default" : "outline"}>
          {client.status}
        </Badge>
      ),
    },
    {
      id: "nextDueDate",
      header: "Next Due Date",
      accessorKey: "nextDueDate",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => {
        const dueDate = new Date(client.nextDueDate);
        const today = new Date();
        const isOverdue = dueDate < today;
        
        return (
          <span className={isOverdue ? "text-red-500 font-medium" : ""}>
            {dueDate.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "priority",
      header: "Priority",
      accessorKey: "priority",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <Badge variant="outline" className={
          client.priority === "High" 
            ? "bg-red-100 text-red-800 border-red-200" 
            : client.priority === "Medium" 
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-green-100 text-green-800 border-green-200"
        }>
          {client.priority}
        </Badge>
      ),
    },
    {
      id: "lastActivity",
      header: "Last Activity Date",
      accessorKey: "lastActivity",
      enableSorting: true,
      enableFiltering: true,
      cell: (client: any) => (
        <span className="text-muted-foreground text-sm">
          {new Date(client.lastActivity).toLocaleDateString()}
        </span>
      ),
    },
  ];

  // Columns definition for Roles tab
  const rolesColumns = [
    {
      id: "roleName",
      header: "Role Name + ID",
      accessorKey: "name",
      enableSorting: true,
      enableFiltering: true,
      cell: (role: any) => (
        <div className="flex flex-col">
          <span className="font-medium hover:text-primary cursor-pointer">
            {role.name}
          </span>
          <span className="text-[10px] text-muted-foreground">
            #{role.id.substring(0, 8)}
          </span>
        </div>
      ),
    },
    {
      id: "clientName",
      header: "Client Name",
      accessorKey: "clientName",
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: "dueDate",
      header: "Due Date",
      accessorKey: "dueDate",
      enableSorting: true,
      enableFiltering: true,
      cell: (role: any) => {
        const dueDate = new Date(role.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today;
        
        return (
          <div className="flex items-center">
            <span className={isOverdue ? "text-red-500 font-medium" : ""}>
              {dueDate.toLocaleDateString()}
            </span>
            {isOverdue && (
              <AlertCircle className="h-3 w-3 ml-1 text-red-500" />
            )}
          </div>
        );
      },
    },
    {
      id: "budget",
      header: "Budget",
      accessorKey: "budget",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => (
        <span>
          ${role.budget.toLocaleString()}
        </span>
      ),
    },
    {
      id: "vacancies",
      header: "Vacancies Filled / Open",
      accessorKey: "vacanciesFilled",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => (
        <span>
          {role.vacanciesFilled} / {role.vacanciesOpen + role.vacanciesFilled}
        </span>
      ),
    },
    {
      id: "activeRole",
      header: "Active Role",
      accessorKey: "isActive",
      enableSorting: true,
      enableFiltering: true,
      cell: (role: any) => (
        <Badge variant={role.isActive ? "default" : "outline"}>
          {role.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "visibleExternally",
      header: "Visible Externally",
      accessorKey: "visibleExternally",
      enableSorting: true,
      enableFiltering: true,
      cell: (role: any) => (
        role.visibleExternally ? 
          <CheckCircle className="h-4 w-4 text-green-500" /> :
          <CheckCircle className="h-4 w-4 text-gray-300" />
      ),
    },
    {
      id: "stageConfigured",
      header: "Stage Configured",
      accessorKey: "stageConfiguredPercent",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => (
        <div className="flex items-center w-full">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
            <div 
              className={`h-1.5 rounded-full ${
                role.stageConfiguredPercent < 50 ? "bg-red-500" : 
                role.stageConfiguredPercent < 80 ? "bg-amber-500" : "bg-green-500"
              }`} 
              style={{ width: `${role.stageConfiguredPercent}%` }}
            />
          </div>
          <span className="text-xs">{role.stageConfiguredPercent}%</span>
        </div>
      ),
    },
    {
      id: "taAssigned",
      header: "TA Assigned",
      accessorKey: "taAssigned",
      enableSorting: true,
      enableFiltering: true,
      cell: (role: any) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {role.taAssigned.length}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{role.taAssigned.join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "timeInStage",
      header: "Time in Stage",
      accessorKey: "timeInStage",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => (
        <span className={role.timeInStage > 14 ? "text-amber-600" : ""}>
          {role.timeInStage} days
        </span>
      ),
    },
    {
      id: "candidateProgress",
      header: "Candidate Progress",
      accessorKey: "candidatesProgressed",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => {
        const ratio = role.candidatesProgressed / role.candidatesTotal;
        let color = "text-red-500";
        if (ratio >= 0.7) color = "text-green-500";
        else if (ratio >= 0.4) color = "text-amber-500";
        
        return (
          <span className={color}>
            {role.candidatesProgressed} / {role.candidatesTotal}
          </span>
        );
      },
    },
    {
      id: "interviewRatio",
      header: "Interview-to-Offer Ratio",
      accessorKey: "interviewRatio",
      enableSorting: true,
      enableFiltering: false,
      cell: (role: any) => (
        <span>{role.interviewRatio}%</span>
      ),
    },
    {
      id: "openActions",
      header: "Open Actions / Alerts",
      accessorKey: "openActions",
      enableSorting: false,
      enableFiltering: false,
      cell: (role: any) => (
        <div className="flex">
          {role.openActions > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="destructive" className="mr-1">
                    {role.openActions}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{role.openActions} pending actions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {role.alerts > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {role.alerts}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{role.alerts} alerts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      ),
    },
  ];

  // Columns definition for Requirements tab
  const requirementsColumns = [
    {
      id: "requirementId",
      header: "Requirement ID",
      accessorKey: "id",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => (
        <span className="font-medium hover:text-primary cursor-pointer">
          #{req.id.substring(0, 8)}
        </span>
      ),
    },
    {
      id: "requirementName",
      header: "Requirement Name",
      accessorKey: "name",
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: "linkedRole",
      header: "Linked Role",
      accessorKey: "linkedRole",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => (
        <span className="hover:text-primary cursor-pointer">
          {req.linkedRole}
        </span>
      ),
    },
    {
      id: "clientName",
      header: "Client Name",
      accessorKey: "clientName",
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: "taAssigned",
      header: "TA(s) Assigned",
      accessorKey: "taAssigned",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {req.taAssigned.length}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{req.taAssigned.join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => {
        let badgeVariant = "default";
        if (req.status === "Closed") badgeVariant = "outline";
        else if (req.status === "Pending Approval") badgeVariant = "secondary";
        
        return (
          <Badge variant={badgeVariant as any}>
            {req.status}
          </Badge>
        );
      },
    },
    {
      id: "priority",
      header: "Priority",
      accessorKey: "priority",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => (
        <Badge variant="outline" className={
          req.priority === "High" 
            ? "bg-red-100 text-red-800 border-red-200" 
            : req.priority === "Medium" 
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-green-100 text-green-800 border-green-200"
        }>
          {req.priority}
        </Badge>
      ),
    },
    {
      id: "dueDate",
      header: "Due Date",
      accessorKey: "dueDate",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => {
        const dueDate = new Date(req.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today;
        
        return (
          <span className={isOverdue ? "text-red-500 font-medium" : ""}>
            {dueDate.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "candidatesSourced",
      header: "Candidates Sourced",
      accessorKey: "candidatesSourced",
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: "interviewRatio",
      header: "Interview-to-Offer Ratio",
      accessorKey: "interviewRatio",
      enableSorting: true,
      enableFiltering: false,
      cell: (req: any) => (
        <span>{req.interviewRatio}%</span>
      ),
    },
    {
      id: "candidateProgress",
      header: "Candidate Stage Progress",
      accessorKey: "candidateStageProgress",
      enableSorting: true,
      enableFiltering: false,
      cell: (req: any) => (
        <div className="flex items-center w-full">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
            <div 
              className={`h-1.5 rounded-full ${
                req.candidateStageProgress < 30 ? "bg-red-500" : 
                req.candidateStageProgress < 70 ? "bg-amber-500" : "bg-green-500"
              }`} 
              style={{ width: `${req.candidateStageProgress}%` }}
            />
          </div>
          <span className="text-xs">{req.candidateStageProgress}%</span>
        </div>
      ),
    },
    {
      id: "modifiedPipeline",
      header: "Modified Pipeline Flag",
      accessorKey: "modifiedPipeline",
      enableSorting: true,
      enableFiltering: true,
      cell: (req: any) => (
        req.modifiedPipeline ? (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Modified
          </Badge>
        ) : null
      ),
    },
  ];

  // Columns definition for TAs tab
  const tasColumns = [
    {
      id: "taName",
      header: "TA Name",
      accessorKey: "name",
      enableSorting: true,
      enableFiltering: true,
      cell: (ta: any) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <div className="flex h-full w-full items-center justify-center bg-muted text-xs">
              {ta.name.charAt(0)}
            </div>
          </Avatar>
          <span className="font-medium hover:text-primary cursor-pointer">
            {ta.name}
          </span>
        </div>
      ),
    },
    {
      id: "requirementsAssigned",
      header: "Requirements Assigned",
      accessorKey: "requirementsAssigned",
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: "rolesManaged",
      header: "Roles Managed",
      accessorKey: "rolesManaged",
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: "candidatesSourced",
      header: "Candidates Sourced",
      accessorKey: "candidatesSourced",
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: "outreachActivities",
      header: "Outreach Activities",
      accessorKey: "outreachActivities",
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: "efficiencyMetrics",
      header: "Efficiency Metrics",
      accessorKey: "conversionRate",
      enableSorting: true,
      enableFiltering: false,
      cell: (ta: any) => (
        <div className="flex flex-col">
          <span>
            Conv: {ta.conversionRate}%
          </span>
          <span className="text-[10px] text-muted-foreground">
            Avg. Time: {ta.averageSourcingTime} days
          </span>
        </div>
      ),
    },
    {
      id: "workloadStatus",
      header: "Workload Status",
      accessorKey: "workloadStatus",
      enableSorting: true,
      enableFiltering: true,
      cell: (ta: any) => {
        let colorClass = "bg-green-100 text-green-800 border-green-200";
        if (ta.workloadStatus === "Overloaded") {
          colorClass = "bg-red-100 text-red-800 border-red-200";
        } else if (ta.workloadStatus === "Balanced") {
          colorClass = "bg-blue-100 text-blue-800 border-blue-200";
        }
        
        return (
          <Badge variant="outline" className={colorClass}>
            {ta.workloadStatus}
          </Badge>
        );
      },
    },
    {
      id: "contactInfo",
      header: "Contact Info",
      accessorKey: "id",
      enableSorting: false,
      enableFiltering: false,
      cell: (ta: any) => (
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                  <Phone className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Call via operator</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                  <Mail className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const handleRowClick = (item: any) => {
    console.log('Row clicked:', item);
    // Handle sidebar opening here
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/hr" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              HR
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="ml-1 text-sm font-medium text-foreground">
                Role Management
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Role Management Dashboard</h1>
        <div className="flex space-x-2">
          <Button size="sm">
            <Users className="h-4 w-4 mr-1" />
            Assign TA
          </Button>
          <Button size="sm" variant="outline">
            <Briefcase className="h-4 w-4 mr-1" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clients" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-background border">
          <TabsTrigger value="clients" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Clients</span>
            <Badge className="ml-1 h-5 text-[10px]">{clientsData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Roles</span>
            <Badge className="ml-1 h-5 text-[10px]">{rolesData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Requirements</span>
            <Badge className="ml-1 h-5 text-[10px]">{requirementsData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tas" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">TAs</span>
            <Badge className="ml-1 h-5 text-[10px]">{tasData.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4 pt-4">
          <Card>
            <div className="p-4">
              <DataTable 
                data={clientsData}
                columns={clientsColumns}
                onRowClick={handleRowClick}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 pt-4">
          <Card>
            <div className="p-4">
              <DataTable 
                data={rolesData}
                columns={rolesColumns}
                onRowClick={handleRowClick}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4 pt-4">
          <Card>
            <div className="p-4">
              <DataTable 
                data={requirementsData}
                columns={requirementsColumns}
                onRowClick={handleRowClick}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tas" className="space-y-4 pt-4">
          <Card>
            <div className="p-4">
              <DataTable 
                data={tasData}
                columns={tasColumns}
                onRowClick={handleRowClick}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleManagementPage;

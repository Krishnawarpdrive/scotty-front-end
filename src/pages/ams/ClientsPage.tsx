
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Edit, Plus, Trash2, ArrowDown, ArrowUp, Filter } from "lucide-react";

// Sample data for the clients table
const clientsData = [
  {
    id: 1,
    name: "Acme Corporation",
    accountType: "Customer",
    createdOn: "2023-05-15",
    lastActivity: { days: 2, active: true },
    activeRoles: 12,
    totalRequirements: 24,
    assignedHR: "John Smith",
    assignedVendor: "VendorCorp",
    hiringStatus: "Active",
    clientTier: "A",
    industry: "Technology",
    currency: "USD",
    healthScore: 87,
    budgetUtilized: 65,
    notes: "Key account, premium service",
  },
  {
    id: 2,
    name: "Globex Industries",
    accountType: "Partner",
    createdOn: "2023-06-22",
    lastActivity: { days: 5, active: true },
    activeRoles: 8,
    totalRequirements: 16,
    assignedHR: "Sarah Johnson",
    assignedVendor: "HRPartners",
    hiringStatus: "Active",
    clientTier: "A",
    industry: "Manufacturing",
    currency: "EUR",
    healthScore: 92,
    budgetUtilized: 45,
    notes: "Strategic partner, quarterly review",
  },
  {
    id: 3,
    name: "Initech Solutions",
    accountType: "Customer",
    createdOn: "2023-04-10",
    lastActivity: { days: 12, active: false },
    activeRoles: 3,
    totalRequirements: 7,
    assignedHR: "Michael Lee",
    assignedVendor: "TalentFirst",
    hiringStatus: "Paused",
    clientTier: "B",
    industry: "Finance",
    currency: "USD",
    healthScore: 58,
    budgetUtilized: 80,
    notes: "Budget constraints",
  },
  {
    id: 4,
    name: "Wayne Enterprises",
    accountType: "Customer",
    createdOn: "2023-03-05",
    lastActivity: { days: 3, active: true },
    activeRoles: 25,
    totalRequirements: 42,
    assignedHR: "Lisa Wong",
    assignedVendor: "StaffingPlus",
    hiringStatus: "Active",
    clientTier: "A",
    industry: "Defense",
    currency: "USD",
    healthScore: 95,
    budgetUtilized: 72,
    notes: "VIP client, priority service",
  },
  {
    id: 5,
    name: "Stark Industries",
    accountType: "Vendor",
    createdOn: "2023-07-18",
    lastActivity: { days: 1, active: true },
    activeRoles: 18,
    totalRequirements: 30,
    assignedHR: "Robert Davis",
    assignedVendor: "InnovateHR",
    hiringStatus: "Active",
    clientTier: "A",
    industry: "Technology",
    currency: "USD",
    healthScore: 98,
    budgetUtilized: 60,
    notes: "Technology partner, innovative solutions",
  },
  {
    id: 6,
    name: "Cyberdyne Systems",
    accountType: "Customer",
    createdOn: "2023-02-12",
    lastActivity: { days: 15, active: false },
    activeRoles: 2,
    totalRequirements: 5,
    assignedHR: "Jessica Brown",
    assignedVendor: "TechTalent",
    hiringStatus: "Blacklisted",
    clientTier: "C",
    industry: "Robotics",
    currency: "JPY",
    healthScore: 30,
    budgetUtilized: 95,
    notes: "Payment issues, service suspended",
  },
];

// Account type badge variants
const getAccountTypeBadge = (type: string) => {
  switch (type) {
    case "Customer":
      return <Badge variant="default" className="bg-primary">{type}</Badge>;
    case "Vendor":
      return <Badge variant="secondary" className="bg-purple-600">{type}</Badge>;
    case "Partner":
      return <Badge variant="outline" className="border-blue-400 text-blue-500">{type}</Badge>;
    default:
      return <Badge>{type}</Badge>;
  }
};

// Client tier badge variants
const getClientTierBadge = (tier: string) => {
  switch (tier) {
    case "A":
      return <Badge className="bg-green-600">{tier}</Badge>;
    case "B":
      return <Badge className="bg-blue-500">{tier}</Badge>;
    case "C":
      return <Badge className="bg-amber-500">{tier}</Badge>;
    default:
      return <Badge>{tier}</Badge>;
  }
};

// Hiring status badge variants
const getHiringStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500">{status}</Badge>;
    case "Paused":
      return <Badge variant="outline" className="border-amber-400 text-amber-500">{status}</Badge>;
    case "Blacklisted":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

// Last activity indicator
const LastActivityIndicator = ({ days, active }: { days: number, active: boolean }) => {
  const statusColor = active ? "bg-green-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <span>{days}d ago</span>
      <span className={`inline-block w-2 h-2 rounded-full ${statusColor}`}></span>
    </div>
  );
};

// Client detail drawer
const ClientDetailDrawer = ({ client }: { client: any }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto">{client.name}</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Client Details: {client.name}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Account Type:</dt>
                    <dd>{getAccountTypeBadge(client.accountType)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Industry:</dt>
                    <dd>{client.industry}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Client Tier:</dt>
                    <dd>{getClientTierBadge(client.tier)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Currency:</dt>
                    <dd>{client.currency}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hiring Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Hiring Status:</dt>
                    <dd>{getHiringStatusBadge(client.hiringStatus)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Active Roles:</dt>
                    <dd>{client.activeRoles}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Requirements:</dt>
                    <dd>{client.totalRequirements}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Health & Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Client Health Score</span>
                    <span className="font-bold">{client.healthScore}/100</span>
                  </div>
                  <Progress value={client.healthScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Budget Utilized</span>
                    <span className="font-bold">{client.budgetUtilized}%</span>
                  </div>
                  <Progress value={client.budgetUtilized} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{client.notes}</p>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Roles modal - stub for now
const RolesPopover = ({ client }: { client: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto underline">{client.activeRoles}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <h3 className="font-medium mb-2">Active Roles for {client.name}</h3>
        <div className="border rounded-md p-2">
          <p className="text-center text-muted-foreground">Role details would be displayed here</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// HR contact information tooltip
const HRTooltip = ({ hrName }: { hrName: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{hrName}</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <p className="font-bold">{hrName}</p>
            <p>hr.{hrName.split(' ')[0].toLowerCase()}@example.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState({ field: "", direction: "asc" });
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  
  // Handle sort click
  const handleSort = (field: string) => {
    if (currentSort.field === field) {
      setCurrentSort({
        field,
        direction: currentSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setCurrentSort({
        field,
        direction: "asc",
      });
    }
  };
  
  // Get sort icon
  const getSortIcon = (field: string) => {
    if (currentSort.field !== field) {
      return null;
    }
    return currentSort.direction === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };
  
  // Handle client selection
  const toggleClientSelection = (clientId: number) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };
  
  // Select all clients
  const toggleSelectAll = () => {
    if (selectedClients.length === clientsData.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clientsData.map(client => client.id));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Sticky search and filters bar */}
      <div className="sticky top-0 z-10 bg-background pt-2 pb-3 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <div className="p-2">
                  <h4 className="font-medium mb-2">Account Type</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">Customer</Badge>
                    <Badge variant="outline">Vendor</Badge>
                    <Badge variant="outline">Partner</Badge>
                  </div>
                  
                  <h4 className="font-medium mb-2 mt-3">Client Tier</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">A</Badge>
                    <Badge variant="outline">B</Badge>
                    <Badge variant="outline">C</Badge>
                  </div>
                  
                  <h4 className="font-medium mb-2 mt-3">Status</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">Active</Badge>
                    <Badge variant="outline">Paused</Badge>
                    <Badge variant="outline">Blacklisted</Badge>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-1/2">Clear</Button>
                    <Button size="sm" className="w-1/2 bg-primary hover:bg-primary/90">Apply</Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Bulk Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={selectedClients.length === 0}>
                  Assign HR
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedClients.length === 0}>
                  Assign Vendor
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedClients.length === 0}>
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedClients.length === 0} className="text-red-500">
                  Archive Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Clients table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedClients.length === clientsData.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4"
                    />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                      Client Name
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("createdOn")}>
                      Created On
                      {getSortIcon("createdOn")}
                    </div>
                  </TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Active Roles</TableHead>
                  <TableHead>Total Requirements</TableHead>
                  <TableHead>Assigned HR</TableHead>
                  <TableHead>Assigned Vendor</TableHead>
                  <TableHead>Hiring Status</TableHead>
                  <TableHead>Client Tier</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("healthScore")}>
                      Health Score
                      {getSortIcon("healthScore")}
                    </div>
                  </TableHead>
                  <TableHead>Budget Used</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsData.map((client) => (
                  <TableRow key={client.id} className="h-10 text-xs">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleClientSelection(client.id)}
                        className="h-4 w-4"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <ClientDetailDrawer client={client} />
                    </TableCell>
                    <TableCell>{getAccountTypeBadge(client.accountType)}</TableCell>
                    <TableCell>{new Date(client.createdOn).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <LastActivityIndicator days={client.lastActivity.days} active={client.lastActivity.active} />
                    </TableCell>
                    <TableCell>
                      <RolesPopover client={client} />
                    </TableCell>
                    <TableCell>{client.totalRequirements}</TableCell>
                    <TableCell>
                      <HRTooltip hrName={client.assignedHR} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.assignedVendor}</Badge>
                    </TableCell>
                    <TableCell>{getHiringStatusBadge(client.hiringStatus)}</TableCell>
                    <TableCell>{getClientTierBadge(client.clientTier)}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.currency}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{client.healthScore}</span>
                        <Progress value={client.healthScore} className="h-2 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-20">
                        <Progress value={client.budgetUtilized} className="h-2" />
                        <span className="text-xs">{client.budgetUtilized}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate" title={client.notes}>
                      {client.notes}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Client</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Archive Client</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;

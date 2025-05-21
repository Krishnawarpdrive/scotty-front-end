
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ClientDetailDrawer from './ClientDetailDrawer';
import RolesPopover from './RolesPopover';
import HRTooltip from './HRTooltip';
import { getHiringStatusBadge, getClientTierBadge, LastActivityIndicator } from './ClientBadges';

interface ClientsTableProps {
  clients: any[];
  selectedClients: number[];
  currentSort: {
    field: string;
    direction: string;
  };
  onSort: (field: string) => void;
  onSelectClient: (clientId: number) => void;
  onSelectAll: () => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  selectedClients,
  currentSort,
  onSort,
  onSelectClient,
  onSelectAll,
}) => {
  // Get sort icon
  const getSortIcon = (field: string) => {
    if (currentSort.field !== field) {
      return null;
    }
    return currentSort.direction === "asc" ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-10 py-2">
                <input
                  type="checkbox"
                  checked={selectedClients.length === clients.length && clients.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("name")}>
                  Client Name
                  {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Account Type</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("createdOn")}>
                  Created On
                  {getSortIcon("createdOn")}
                </div>
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Last Activity</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Active Roles</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Total Requirements</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Assigned HR</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Assigned Vendor</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Hiring Status</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Client Tier</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Industry</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Currency</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("healthScore")}>
                  Health Score
                  {getSortIcon("healthScore")}
                </div>
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Budget Used</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Notes</TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow 
                key={client.id} 
                className={cn(
                  selectedClients.includes(client.id) ? "bg-blue-50" : "",
                  "h-12 text-xs"
                )}
              >
                <TableCell className="py-2">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => onSelectClient(client.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626] cursor-pointer hover:text-blue-600 hover:underline">
                  <ClientDetailDrawer client={client} />
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">{client.accountType}</TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">
                  {new Date(client.createdOn).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-2">
                  <LastActivityIndicator days={client.lastActivity.days} active={client.lastActivity.active} />
                </TableCell>
                <TableCell className="py-2">
                  <RolesPopover client={client} />
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">{client.totalRequirements}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarFallback className="text-[10px] bg-green-100">
                        {client.assignedHR.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {client.assignedHR}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Badge variant="outline" className="text-xs">{client.assignedVendor}</Badge>
                </TableCell>
                <TableCell className="py-2">{getHiringStatusBadge(client.hiringStatus)}</TableCell>
                <TableCell className="py-2">{getClientTierBadge(client.clientTier)}</TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">{client.industry}</TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">{client.currency}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">{client.healthScore}</span>
                    <Progress value={client.healthScore} className="h-2 w-16" />
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="w-20">
                    <Progress value={client.budgetUtilized} className="h-2" />
                    <span className="text-xs">{client.budgetUtilized}%</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626] max-w-[150px] truncate" title={client.notes}>
                  {client.notes}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex gap-1 justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Client</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
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
    </div>
  );
};

export default ClientsTable;

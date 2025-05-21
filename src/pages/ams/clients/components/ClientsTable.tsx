
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Edit, Trash2 } from "lucide-react";
import ClientDetailDrawer from './ClientDetailDrawer';
import RolesPopover from './RolesPopover';
import HRTooltip from './HRTooltip';
import { getAccountTypeBadge, getClientTierBadge, getHiringStatusBadge, LastActivityIndicator } from './ClientBadges';

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
    <Table>
      <TableHeader className="bg-muted/50 sticky top-0">
        <TableRow>
          <TableHead className="w-10">
            <input
              type="checkbox"
              checked={selectedClients.length === clients.length}
              onChange={onSelectAll}
              className="h-4 w-4"
            />
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("name")}>
              Client Name
              {getSortIcon("name")}
            </div>
          </TableHead>
          <TableHead>Account Type</TableHead>
          <TableHead>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("createdOn")}>
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
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort("healthScore")}>
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
        {clients.map((client) => (
          <TableRow key={client.id} className="h-10 text-xs">
            <TableCell>
              <input
                type="checkbox"
                checked={selectedClients.includes(client.id)}
                onChange={() => onSelectClient(client.id)}
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
  );
};

export default ClientsTable;

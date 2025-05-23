
import React from 'react';
import { Button } from "@/components/ui/button";
import { SideDrawer } from "@/components/ui/side-drawer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Plus, FileText, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ClientDetailDrawerProps {
  client: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientDetailDrawer = ({ client, open, onOpenChange }: ClientDetailDrawerProps) => {
  if (!client) return null;

  // Extract roles from client data
  const roles = client.roles || [];
  
  // Calculate metrics
  const totalRoles = roles.length;
  const totalRequirements = client.requirementsCount || 0;
  const unassignedRoles = client.unassignedRoles || 0;
  const earliestDueDate = client.nextDueDate || new Date().toISOString();

  return (
    <SideDrawer
      title={`${client.name}`}
      subtitle={`ID: ${client.id}`}
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
    >
      <div className="p-6 space-y-8">
        {/* Section 1: Client Overview */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-semibold text-primary-foreground">
                  {client.name?.charAt(0) || "C"}
                </div>
              </Avatar>
              
              <div>
                <h3 className="text-xl font-semibold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">#{client.id.substring(0, 8)}</p>
                <div className="flex items-center mt-1">
                  <Badge variant={client.status === "Active" ? "default" : "outline"}>
                    {client.status}
                  </Badge>
                  <Badge variant="outline" className={`ml-2 ${
                    client.priority === "High" 
                      ? "bg-red-100 text-red-800 border-red-200" 
                      : client.priority === "Medium" 
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-green-100 text-green-800 border-green-200"
                  }`}>
                    {client.priority} Priority
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p className="font-medium">{client.contactPerson}</p>
            </div>
            <div className="flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
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
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        {/* Section 2: Roles under this Client */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Roles</h3>
            <Badge variant="outline" className="ml-2">
              {roles.length} Total
            </Badge>
          </div>
          
          {roles && roles.length > 0 ? (
            <div className="space-y-4">
              {roles.map((role: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <Badge variant={role.status === "Active" ? "default" : "outline"} className="mt-1">
                        {role.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-right">
                      <p>
                        <span className="text-muted-foreground">Vacancies:</span> {role.filled} / {role.total}
                      </p>
                      <p className="mt-1">
                        <span className="text-muted-foreground">Due:</span> {new Date(role.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Candidate Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-green-500" 
                        style={{ width: `${role.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">TAs Assigned</p>
                      <p className="text-sm">{role.tasAssigned?.length || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">No roles found</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-1" /> Add Role
              </Button>
            </div>
          )}
        </div>
        
        {/* Section 3: Aggregated Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Roles</p>
            <p className="text-2xl font-semibold">{totalRoles}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Requirements</p>
            <p className="text-2xl font-semibold">{totalRequirements}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Unassigned</p>
            <p className="text-2xl font-semibold">{unassignedRoles} / {totalRoles}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Earliest Due Date</p>
            <p className="text-xl font-semibold">{new Date(earliestDueDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* Section 4: Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Edit Client Info
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Role
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> View JD Summary
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Upload className="h-4 w-4" /> Upload Agreement
            </Button>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default ClientDetailDrawer;

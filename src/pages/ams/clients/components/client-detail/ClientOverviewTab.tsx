
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Client } from '../../types/ClientTypes';
import { Progress } from "@/components/ui/progress";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ClientOverviewTabProps {
  client: Client;
}

const ClientOverviewTab: React.FC<ClientOverviewTabProps> = ({ client }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['details', 'metrics', 'notes']);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section: string) => expandedSections.includes(section);

  return (
    <div className="space-y-4 pb-4">
      <Accordion type="multiple" value={expandedSections} className="space-y-2">
        <AccordionItem value="details" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-xs font-medium">Client Details</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <dl className="space-y-1 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Industry:</dt>
                <dd>{client.industry || "Not specified"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location:</dt>
                <dd>{client.headquarters || "Not specified"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Contact:</dt>
                <dd>{client.contact || "Not specified"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email:</dt>
                <dd>{client.email || "Not specified"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Created On:</dt>
                <dd>{new Date(client.createdOn).toLocaleDateString()}</dd>
              </div>
            </dl>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="metrics" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-xs font-medium">Key Metrics</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-medium">{client.healthScore}%</span>
                </div>
                <Progress value={client.healthScore} className="h-1.5" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Budget Utilized</span>
                  <span className="font-medium">{client.budgetUtilized}%</span>
                </div>
                <Progress value={client.budgetUtilized} className="h-1.5" />
              </div>
              
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Roles:</dt>
                  <dd className="font-medium">{client.roles?.length || 0}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Requirements:</dt>
                  <dd className="font-medium">{client.totalRequirements}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Assigned HR:</dt>
                  <dd className="font-medium">{client.assignedHR || "None"}</dd>
                </div>
              </dl>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="notes" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-xs font-medium">Notes & Activity</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="text-xs">
              <p className="text-muted-foreground italic">
                {client.notes || "No notes available for this client."}
              </p>
              
              <div className="mt-3 pt-3 border-t">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <ul className="space-y-2">
                  <li className="text-xs text-muted-foreground">
                    <span className="block">Last login: {client.lastActivity?.days} days ago</span>
                    <span className="block text-green-600">Status: {client.lastActivity?.active ? "Active" : "Inactive"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button 
          className="h-auto py-4 flex flex-col items-center justify-center space-y-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Role</span>
        </Button>
        
        <Button 
          className="h-auto py-4 flex flex-col items-center justify-center space-y-1 text-xs"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          <span>Add Requirement</span>
        </Button>
        
        <Button 
          className="h-auto py-4 flex flex-col items-center justify-center space-y-1 text-xs"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Meeting</span>
        </Button>
      </div>
    </div>
  );
};

export default ClientOverviewTab;

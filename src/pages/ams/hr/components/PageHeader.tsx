
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Plus, Users, Briefcase, ClipboardList, GraduationCap } from "lucide-react";

interface PageHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabCounts: {
    clients: number;
    roles: number;
    requirements: number;
    tas: number;
  };
}

const PageHeader = ({ activeTab, setActiveTab, tabCounts }: PageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 pt-4">
        <h1 className="text-2xl font-semibold">Role Management Dashboard</h1>
        <div className="flex space-x-2">
          <Button size="sm" className="gap-1">
            <UserPlus className="h-4 w-4 mr-1" />
            Assign TA
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Plus className="h-4 w-4 mr-1" />
            Add Role
          </Button>
        </div>
      </div>

      <div className="px-6 pt-4">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-background border">
            <TabsTrigger value="clients" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clients</span>
              <Badge className="ml-1 h-5 text-[10px]">{tabCounts.clients}</Badge>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Roles</span>
              <Badge className="ml-1 h-5 text-[10px]">{tabCounts.roles}</Badge>
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Requirements</span>
              <Badge className="ml-1 h-5 text-[10px]">{tabCounts.requirements}</Badge>
            </TabsTrigger>
            <TabsTrigger value="tas" className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">TAs</span>
              <Badge className="ml-1 h-5 text-[10px]">{tabCounts.tas}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default PageHeader;

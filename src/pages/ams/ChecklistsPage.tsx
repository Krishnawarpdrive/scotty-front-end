
import React, { useState } from 'react';
import { Search, Plus, CheckSquare, Filter, Trash2, Edit, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChecklistCreationDrawer from './checklists/components/ChecklistCreationDrawer';
import { useChecklistsData } from './checklists/hooks/useChecklistsData';
import { ChecklistTypeFilter } from './checklists/components/ChecklistTypeFilter';
import { ChecklistsTable } from './checklists/components/ChecklistsTable';
import { ChecklistEmptyState } from './checklists/components/ChecklistEmptyState';

const ChecklistsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const { 
    checklists,
    isLoading,
    deleteChecklist,
    editChecklist
  } = useChecklistsData();
  
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedType(null);
  };
  
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
  };
  
  // Filter checklists based on search term and active tab/type
  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch && (selectedType ? checklist.type === selectedType : true);
    }
    
    return matchesSearch && checklist.type === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Checklist Master</h1>
        <Button 
          onClick={handleOpenDrawer} 
          className="bg-primary text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Checklist
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checklists Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[12px] mb-4">
            Manage standard checklists for onboarding, interviews, and other recruitment processes.
          </p>
          
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full mb-6"
          >
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="role">Role-based</TabsTrigger>
              <TabsTrigger value="client">Client-based</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search checklists by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {activeTab === 'all' && (
                <ChecklistTypeFilter 
                  selectedType={selectedType}
                  onTypeChange={handleTypeChange}
                />
              )}
            </div>
            
            {filteredChecklists.length > 0 ? (
              <ChecklistsTable 
                checklists={filteredChecklists}
                onEdit={editChecklist}
                onDelete={deleteChecklist}
              />
            ) : (
              <ChecklistEmptyState 
                onCreateClick={handleOpenDrawer}
                isFiltering={searchTerm !== '' || selectedType !== null}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <ChecklistCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
};

export default ChecklistsPage;

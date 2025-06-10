import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChecklistsTable } from './checklists/components/ChecklistsTable';
import { ChecklistCreationDrawer } from './checklists/components/ChecklistCreationDrawer';
import { ChecklistEmptyState } from './checklists/components/ChecklistEmptyState';
import { ChecklistTypeFilter } from './checklists/components/ChecklistTypeFilter';
import { useChecklistsData } from './checklists/hooks/useChecklistsData';

const ChecklistsPage = () => {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const {
    checklists,
    pagination,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handleSearch,
    handleCreateChecklist
  } = useChecklistsData();

  const filteredChecklists = checklists.filter(checklist => {
    if (activeTab !== 'all' && checklist.status !== activeTab) return false;
    if (typeFilter !== 'all' && checklist.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Checklists Management" 
        subtitle="Create and manage role-specific checklists for candidate evaluation"
        action={
          <Button onClick={() => setCreateDrawerOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Checklist
          </Button>
        }
      />

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-4">
          <ChecklistTypeFilter value={typeFilter} onTypeChange={setTypeFilter} />
          <div className="relative">
            <Input
              placeholder="Search checklists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredChecklists.length === 0 ? (
        <ChecklistEmptyState onCreateFirst={() => setCreateDrawerOpen(true)} />
      ) : (
        <ChecklistsTable 
          checklists={filteredChecklists}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}

      <ChecklistCreationDrawer
        open={createDrawerOpen}
        onOpenChange={setCreateDrawerOpen}
        onChecklistCreated={handleCreateChecklist}
      />
    </div>
  );
};

export default ChecklistsPage;

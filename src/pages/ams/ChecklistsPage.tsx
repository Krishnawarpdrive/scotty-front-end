import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Checklist {
  id: string;
  name: string;
  type: 'onboarding' | 'compliance' | 'performance';
  items: string[];
}

const mockChecklists: Checklist[] = [
  {
    id: '1',
    name: 'New Employee Onboarding',
    type: 'onboarding',
    items: ['Complete HR paperwork', 'Attend company orientation', 'Meet team members'],
  },
  {
    id: '2',
    name: 'Annual Compliance Review',
    type: 'compliance',
    items: ['Review code of conduct', 'Complete ethics training', 'Sign compliance agreement'],
  },
  {
    id: '3',
    name: 'Performance Improvement Plan',
    type: 'performance',
    items: ['Set performance goals', 'Regular check-ins with manager', 'Complete training modules'],
  },
];

export const ChecklistsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreationDrawer, setShowCreationDrawer] = useState(false);

  const filteredChecklists = mockChecklists.filter((checklist) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(checklist.name);
    const matchesTab = activeTab === 'all' || activeTab === checklist.type;
    const matchesType = selectedType === 'all' || selectedType === checklist.type;

    return matchesSearch && matchesTab && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Checklists</CardTitle>
          <Button onClick={() => setShowCreationDrawer(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Checklist
          </Button>
        </CardHeader>
        <CardContent>
          <p>Manage and organize checklists for various processes.</p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

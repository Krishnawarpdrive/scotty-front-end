
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Briefcase } from 'lucide-react';
import RoleCreationDrawer from './components/RoleCreationDrawer';

const RolesLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  const popularRoles = ['UX Designer', 'Java Dev', 'Recruiter', 'Project Manager', 'DevOps Engineer'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global Role Library</h1>
        <Button 
          className="bg-primary text-white" 
          onClick={() => setDrawerOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search by Role Name, Category, Skills..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="used">Most Used</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {popularRoles.map(role => (
          <Badge key={role} variant="outline" className="cursor-pointer hover:bg-primary/10">
            {role}
          </Badge>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Empty state */}
          <div className="h-64 flex flex-col items-center justify-center border rounded-md mt-4 bg-muted/20">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">You haven't created any global roles yet.</p>
            <Button 
              variant="outline" 
              onClick={() => setDrawerOpen(true)}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create your first role template
            </Button>
          </div>
        </CardContent>
      </Card>

      <RoleCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </div>
  );
};

export default RolesLibraryPage;

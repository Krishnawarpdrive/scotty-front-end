
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  CalendarDays, 
  Plus, 
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import RoleCreationDrawer from './components/RoleCreationDrawer';
import EnhancedGlobalRoleCreationDrawer from './components/drawer/EnhancedGlobalRoleCreationDrawer';
import { supabase } from "@/integrations/supabase/client";

interface Role {
  id: string;
  name: string;
  category: string;
  work_mode: string;
  min_experience: string;
  max_experience: string;
  created_by: string | null;
  updated_at: string | null;
  usage_count: number | null;
  is_template: boolean | null;
  employment_type: string;
  department?: string;
}

const RoleLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [globalDrawerOpen, setGlobalDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState('updated');
  const [roles, setRoles] = useState<Role[]>([]);
  const [globalRoles, setGlobalRoles] = useState<any[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Fetch roles from Supabase
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        // Fetch roles table (templates)
        const { data: rolesData, error: rolesError } = await supabase
          .from('roles')
          .select('*')
          .eq('is_template', true);
        
        if (rolesError) {
          throw rolesError;
        }
        
        // Fetch global_roles table
        const { data: globalRolesData, error: globalRolesError } = await supabase
          .from('global_roles')
          .select('*');
        
        if (globalRolesError) {
          throw globalRolesError;
        }
        
        console.log('Fetched roles:', rolesData?.length || 0);
        console.log('Fetched global roles:', globalRolesData?.length || 0);
        
        setRoles(rolesData || []);
        setGlobalRoles(globalRolesData || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
        toast({
          title: "Error",
          description: "Failed to load roles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchPopularTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('name')
          .limit(8);
        
        if (error) {
          throw error;
        }
        
        setPopularTags(data.map(tag => tag.name) || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchRoles();
    fetchPopularTags();

    // Set up real-time subscription for roles
    const rolesChannel = supabase
      .channel('roles-page-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'roles'
      }, () => {
        console.log('Roles changed, refetching...');
        fetchRoles();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'global_roles'
      }, () => {
        console.log('Global roles changed, refetching...');
        fetchRoles();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(rolesChannel);
    };
  }, [toast]);

  // Open drawer if navigated from create role page
  useEffect(() => {
    if (location.state?.openRoleDrawer) {
      setDrawerOpen(true);
      // Clear the state to prevent reopening on future navigations
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Combine and filter roles based on search term
  const combinedRoles = [
    ...roles.map(role => ({ ...role, source: 'template' as const })),
    ...globalRoles.map(role => ({ 
      ...role, 
      source: 'global' as const,
      category: role.department,
      min_experience: role.experience_range.split('-')[0]?.trim() || '0',
      max_experience: role.experience_range.split('-')[1]?.trim() || '10'
    }))
  ];

  const filteredRoles = combinedRoles.filter((role) => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format experience range
  const formatExperienceRange = (min: string, max: string) => {
    return `${min}-${max} years`;
  };

  // Sort roles based on selected option
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    switch (sortOption) {
      case 'updated':
        return new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime();
      case 'usage':
        return (b.usage_count || 0) - (a.usage_count || 0);
      case 'alpha':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Handle tag filter click
  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  // Handle create role button click - open the global drawer
  const handleCreateGlobalRole = () => {
    setGlobalDrawerOpen(true);
  };

  // Handle role creation success
  const handleRoleCreated = () => {
    toast({
      title: "Success",
      description: "Role has been created successfully and added to all relevant libraries.",
    });
  };

  const handleGlobalRoleCreated = () => {
    toast({
      title: "Success",
      description: "Global role has been created successfully and added to all relevant libraries.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global Role Library</h1>
        <Button 
          onClick={handleCreateGlobalRole} 
          className="bg-primary text-white flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Global Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Roles Management</CardTitle>
            <div className="flex gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Latest Updated</SelectItem>
                  <SelectItem value="usage">Most Used</SelectItem>
                  <SelectItem value="alpha">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Role Name, Category, Skills..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Popular Tags */}
            {popularTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className="cursor-pointer hover:bg-gray-200" 
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{globalRoles.length}</div>
                  <p className="text-xs text-muted-foreground">Global Roles</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{roles.length}</div>
                  <p className="text-xs text-muted-foreground">Role Templates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{combinedRoles.length}</div>
                  <p className="text-xs text-muted-foreground">Total Roles</p>
                </CardContent>
              </Card>
            </div>

            {/* Table or Empty State */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : sortedRoles.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Work Mode</TableHead>
                      <TableHead>Experience Range</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Usage Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRoles.map((role) => (
                      <TableRow key={`${role.source}-${role.id}`}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.category}</TableCell>
                        <TableCell>{role.work_mode}</TableCell>
                        <TableCell>{formatExperienceRange(role.min_experience, role.max_experience)}</TableCell>
                        <TableCell>
                          <Badge variant={role.source === 'global' ? 'default' : 'secondary'}>
                            {role.source === 'global' ? 'Global' : 'Template'}
                          </Badge>
                        </TableCell>
                        <TableCell>{role.created_by || 'System'}</TableCell>
                        <TableCell>{role.usage_count || 0}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate(`/ams/roles/${role.id}`)}
                            className="hover:bg-gray-100"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No roles found</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't created any global roles yet. Start by creating your first role template.
                </p>
                <Button onClick={handleCreateGlobalRole} className="hover:bg-primary/90">
                  Create Your First Global Role
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters Sheet/Drawer */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Roles</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your search results
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-8">5-8 years</SelectItem>
                  <SelectItem value="8+">8+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employment Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Updated On</label>
              <div className="flex gap-2">
                <Input type="date" className="flex-1" />
                <span className="flex items-center">to</span>
                <Input type="date" className="flex-1" />
              </div>
            </div>
            <div className="pt-4 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setFilterOpen(false)} className="hover:bg-gray-100">Cancel</Button>
              <Button onClick={() => setFilterOpen(false)} className="hover:bg-primary/90">Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Enhanced Global Role Creation Drawer */}
      <EnhancedGlobalRoleCreationDrawer 
        open={globalDrawerOpen} 
        onOpenChange={setGlobalDrawerOpen}
        onRoleCreated={handleGlobalRoleCreated}
      />

      {/* Regular Role Creation Drawer */}
      <RoleCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
        onRoleCreated={handleRoleCreated}
      />
    </div>
  );
};

export default RoleLibraryPage;

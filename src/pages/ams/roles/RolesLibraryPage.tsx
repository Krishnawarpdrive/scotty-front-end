import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  CalendarDays, 
  Plus, 
  Briefcase, 
  Clock, 
  Building, 
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleCreationDrawer from './components/RoleCreationDrawer';

// Mock data for roles
const mockRoles = [
  {
    id: 1,
    name: "UX Designer",
    category: "Design",
    workMode: "Remote",
    experienceRange: "3-5 years",
    lastUpdatedBy: "Alex Johnson",
    updatedOn: "2025-04-20",
    usageCount: 12
  },
  {
    id: 2,
    name: "Java Developer",
    category: "Technology",
    workMode: "Hybrid",
    experienceRange: "5-8 years",
    lastUpdatedBy: "Maria Garcia",
    updatedOn: "2025-05-01",
    usageCount: 24
  },
  {
    id: 3,
    name: "Product Manager",
    category: "Management",
    workMode: "Onsite",
    experienceRange: "8+ years",
    lastUpdatedBy: "David Kim",
    updatedOn: "2025-05-10",
    usageCount: 8
  },
  {
    id: 4,
    name: "DevOps Engineer",
    category: "Technology",
    workMode: "Remote",
    experienceRange: "4-7 years",
    lastUpdatedBy: "Sophie Chen",
    updatedOn: "2025-05-05",
    usageCount: 18
  },
  {
    id: 5,
    name: "Sales Executive",
    category: "Sales",
    workMode: "Hybrid",
    experienceRange: "3-6 years",
    lastUpdatedBy: "James Wilson",
    updatedOn: "2025-04-28",
    usageCount: 15
  }
];

const popularTags = ["UX Designer", "Java Dev", "Product Manager", "DevOps", "Sales", "Recruiter"];

const RoleLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState('updated');
  const [roles, setRoles] = useState(mockRoles);
  const navigate = useNavigate();
  const location = useLocation();

  // Open drawer if navigated from create role page
  useEffect(() => {
    if (location.state?.openRoleDrawer) {
      setDrawerOpen(true);
      // Clear the state to prevent reopening on future navigations
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort roles based on selected option
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    switch (sortOption) {
      case 'updated':
        return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime();
      case 'usage':
        return b.usageCount - a.usageCount;
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

  // Handle create role button click
  const handleCreateRole = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global Role Library</h1>
        <Button onClick={handleCreateRole} className="bg-primary text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Role
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
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="cursor-pointer hover:bg-primary/70" 
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Table or Empty State */}
            {sortedRoles.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Role Category</TableHead>
                      <TableHead>Work Mode</TableHead>
                      <TableHead>Experience Range</TableHead>
                      <TableHead>Last Updated By</TableHead>
                      <TableHead>Usage Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.category}</TableCell>
                        <TableCell>{role.workMode}</TableCell>
                        <TableCell>{role.experienceRange}</TableCell>
                        <TableCell>{role.lastUpdatedBy}</TableCell>
                        <TableCell>{role.usageCount}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
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
                <Button onClick={handleCreateRole}>
                  Create Your First Role
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
              <Button variant="outline" onClick={() => setFilterOpen(false)}>Cancel</Button>
              <Button onClick={() => setFilterOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Role Creation Drawer */}
      <RoleCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </div>
  );
};

export default RoleLibraryPage;

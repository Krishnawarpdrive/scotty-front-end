
import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Download, 
  Upload,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import SkillFormDrawer from './components/SkillFormDrawer';

// Mock data for skills
const mockSkills = [
  {
    id: 1,
    name: "React",
    category: "Frontend Development",
    aliases: ["ReactJS", "React.js"],
    usageCount: 42,
    dateAdded: "2025-01-15"
  },
  {
    id: 2,
    name: "TypeScript",
    category: "Programming Languages",
    aliases: ["TS", "JavaScript with Types"],
    usageCount: 38,
    dateAdded: "2025-01-20"
  },
  {
    id: 3,
    name: "Leadership",
    category: "Soft Skills",
    aliases: ["Team Leadership", "People Management"],
    usageCount: 27,
    dateAdded: "2025-02-03"
  },
  {
    id: 4,
    name: "AWS",
    category: "Cloud Services",
    aliases: ["Amazon Web Services", "Amazon Cloud"],
    usageCount: 35,
    dateAdded: "2025-02-10"
  },
  {
    id: 5,
    name: "Project Management",
    category: "Management",
    aliases: ["PM", "Project Coordination"],
    usageCount: 31,
    dateAdded: "2025-03-05"
  }
];

// Mock categories for filter
const skillCategories = [
  "Frontend Development",
  "Backend Development",
  "Programming Languages",
  "Cloud Services",
  "DevOps",
  "Database",
  "Mobile Development",
  "Soft Skills",
  "Management",
  "Design",
  "QA"
];

const SkillsLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [skillDrawerOpen, setSkillDrawerOpen] = useState(false);
  const [editSkill, setEditSkill] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  // Filter skills based on search term
  const filteredSkills = mockSkills.filter((skill) => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort skills based on selected column and direction
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const compareValue = (col: string) => {
      switch (col) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'usageCount':
          return a.usageCount - b.usageCount;
        case 'dateAdded':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        default:
          return 0;
      }
    };

    return sortDirection === 'asc' 
      ? compareValue(sortColumn) 
      : -compareValue(sortColumn);
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleEditSkill = (skill: any) => {
    setEditSkill(skill);
    setSkillDrawerOpen(true);
  };

  const handleCreateSkill = () => {
    setEditSkill(null);
    setSkillDrawerOpen(true);
  };

  const handleSelectSkill = (id: number) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter(skillId => skillId !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const handleSelectAllSkills = () => {
    if (selectedSkills.length === sortedSkills.length) {
      setSelectedSkills([]);
    } else {
      setSelectedSkills(sortedSkills.map(skill => skill.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {}}
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {}}
            disabled={selectedSkills.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleCreateSkill}
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Skill Name, Category, Aliases..."
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
            
            {/* Table */}
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <input 
                        type="checkbox" 
                        checked={selectedSkills.length === sortedSkills.length && sortedSkills.length > 0}
                        onChange={handleSelectAllSkills}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Skill Name
                        {sortColumn === 'name' && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                      <div className="flex items-center">
                        Category
                        {sortColumn === 'category' && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Aliases</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('usageCount')}>
                      <div className="flex items-center">
                        Usage Count
                        {sortColumn === 'usageCount' && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('dateAdded')}>
                      <div className="flex items-center">
                        Date Added
                        {sortColumn === 'dateAdded' && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          checked={selectedSkills.includes(skill.id)}
                          onChange={() => handleSelectSkill(skill.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{skill.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {skill.aliases.map((alias, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {alias}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{skill.usageCount}</TableCell>
                      <TableCell>{new Date(skill.dateAdded).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditSkill(skill)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Usage</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Sheet/Drawer */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent>
          <div className="py-6">
            <h3 className="text-lg font-medium mb-4">Filter Skills</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Added Range</label>
                <div className="flex gap-2">
                  <Input type="date" className="flex-1" />
                  <span className="flex items-center">to</span>
                  <Input type="date" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Min Usage Count</label>
                <Input type="number" min={0} placeholder="Minimum usage" />
              </div>
              
              <div className="pt-4 flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setFilterOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Skill Creation/Edit Drawer */}
      <SkillFormDrawer 
        open={skillDrawerOpen} 
        onOpenChange={setSkillDrawerOpen}
        skill={editSkill}
      />
    </div>
  );
};

export default SkillsLibraryPage;

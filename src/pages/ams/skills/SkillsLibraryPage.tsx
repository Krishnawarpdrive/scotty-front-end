
import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Download, 
  Upload,
  ArrowUpDown,
  ChevronDown,
  X
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SkillFormDrawer from './components/SkillFormDrawer';
import { cn } from "@/lib/utils";

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
  
  // Column filters state
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({
    name: [],
    category: [],
    usageCount: [],
    dateAdded: []
  });
  
  // Column filter search terms
  const [columnSearchTerms, setColumnSearchTerms] = useState<Record<string, string>>({
    name: '',
    category: '',
    usageCount: '',
    dateAdded: ''
  });

  // Filter skills based on search term
  const filteredSkills = mockSkills.filter((skill) => {
    // Main search filter
    const matchesSearch = searchTerm === '' || 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Column filters
    const matchesNameFilter = columnFilters.name.length === 0 || 
      columnFilters.name.some(filter => skill.name.includes(filter));
    
    const matchesCategoryFilter = columnFilters.category.length === 0 || 
      columnFilters.category.includes(skill.category);
    
    // Add other column filters as needed
    
    return matchesSearch && matchesNameFilter && matchesCategoryFilter;
  });

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
  
  // Handle column filter changes
  const handleColumnFilterChange = (column: string, value: string) => {
    if (columnFilters[column].includes(value)) {
      setColumnFilters({
        ...columnFilters,
        [column]: columnFilters[column].filter(item => item !== value)
      });
    } else {
      setColumnFilters({
        ...columnFilters,
        [column]: [...columnFilters[column], value]
      });
    }
  };
  
  // Clear all filters for a column
  const clearColumnFilter = (column: string) => {
    setColumnFilters({
      ...columnFilters,
      [column]: []
    });
    setColumnSearchTerms({
      ...columnSearchTerms,
      [column]: ''
    });
  };
  
  // Update column search term
  const handleColumnSearchChange = (column: string, value: string) => {
    setColumnSearchTerms({
      ...columnSearchTerms,
      [column]: value
    });
  };

  // Get available options for column filters
  const getColumnFilterOptions = (column: string) => {
    switch (column) {
      case 'name':
        return mockSkills.map(skill => skill.name)
          .filter(name => name.toLowerCase().includes(columnSearchTerms.name.toLowerCase()));
      case 'category':
        return skillCategories
          .filter(category => category.toLowerCase().includes(columnSearchTerms.category.toLowerCase()));
      case 'usageCount':
        return [...new Set(mockSkills.map(skill => String(skill.usageCount)))]
          .filter(count => count.includes(columnSearchTerms.usageCount));
      case 'dateAdded':
        return [...new Set(mockSkills.map(skill => skill.dateAdded))]
          .filter(date => date.includes(columnSearchTerms.dateAdded));
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9"
            onClick={() => {}}
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9"
            onClick={() => {}}
            disabled={selectedSkills.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="flex items-center gap-2 h-9 bg-primary hover:bg-primary/90"
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
                className="flex items-center gap-2 h-9"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Table */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-10 py-2">
                        <input
                          type="checkbox"
                          checked={selectedSkills.length === sortedSkills.length && sortedSkills.length > 0}
                          onChange={handleSelectAllSkills}
                          className="rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer">
                              Skill Name
                              {sortColumn === 'name' && (
                                <ArrowUpDown className="h-3 w-3" />
                              )}
                              {columnFilters.name.length > 0 && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1">
                                  {columnFilters.name.length}
                                </Badge>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0" align="start">
                            <div className="p-2 border-b">
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                  placeholder="Search skills..."
                                  className="pl-7 h-8 text-xs"
                                  value={columnSearchTerms.name}
                                  onChange={(e) => handleColumnSearchChange('name', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="py-2 max-h-60 overflow-auto">
                              {getColumnFilterOptions('name').length > 0 ? (
                                getColumnFilterOptions('name').map((option) => (
                                  <div key={option} className="flex items-center space-x-2 px-3 py-1 text-xs">
                                    <Checkbox
                                      id={`name-${option}`}
                                      checked={columnFilters.name.includes(option)}
                                      onCheckedChange={() => handleColumnFilterChange('name', option)}
                                    />
                                    <Label htmlFor={`name-${option}`} className="text-xs">
                                      {option}
                                    </Label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-center py-2 text-muted-foreground">No options found</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 border-t bg-muted/20">
                              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => clearColumnFilter('name')}>
                                Clear
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer">
                              Category
                              {sortColumn === 'category' && (
                                <ArrowUpDown className="h-3 w-3" />
                              )}
                              {columnFilters.category.length > 0 && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1">
                                  {columnFilters.category.length}
                                </Badge>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0" align="start">
                            <div className="p-2 border-b">
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                  placeholder="Search categories..."
                                  className="pl-7 h-8 text-xs"
                                  value={columnSearchTerms.category}
                                  onChange={(e) => handleColumnSearchChange('category', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="py-2 max-h-60 overflow-auto">
                              {getColumnFilterOptions('category').length > 0 ? (
                                getColumnFilterOptions('category').map((option) => (
                                  <div key={option} className="flex items-center space-x-2 px-3 py-1 text-xs">
                                    <Checkbox
                                      id={`category-${option}`}
                                      checked={columnFilters.category.includes(option)}
                                      onCheckedChange={() => handleColumnFilterChange('category', option)}
                                    />
                                    <Label htmlFor={`category-${option}`} className="text-xs">
                                      {option}
                                    </Label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-center py-2 text-muted-foreground">No categories found</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 border-t bg-muted/20">
                              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => clearColumnFilter('category')}>
                                Clear
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                        Aliases
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer">
                              Usage Count
                              {sortColumn === 'usageCount' && (
                                <ArrowUpDown className="h-3 w-3" />
                              )}
                              {columnFilters.usageCount.length > 0 && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1">
                                  {columnFilters.usageCount.length}
                                </Badge>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0" align="start">
                            {/* Usage Count filter content */}
                            <div className="p-2 border-b">
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                  placeholder="Search usage counts..."
                                  className="pl-7 h-8 text-xs"
                                  value={columnSearchTerms.usageCount}
                                  onChange={(e) => handleColumnSearchChange('usageCount', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="py-2 max-h-60 overflow-auto">
                              {getColumnFilterOptions('usageCount').length > 0 ? (
                                getColumnFilterOptions('usageCount').map((option) => (
                                  <div key={option} className="flex items-center space-x-2 px-3 py-1 text-xs">
                                    <Checkbox
                                      id={`usageCount-${option}`}
                                      checked={columnFilters.usageCount.includes(option)}
                                      onCheckedChange={() => handleColumnFilterChange('usageCount', option)}
                                    />
                                    <Label htmlFor={`usageCount-${option}`} className="text-xs">
                                      {option}
                                    </Label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-center py-2 text-muted-foreground">No options found</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 border-t bg-muted/20">
                              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => clearColumnFilter('usageCount')}>
                                Clear
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer">
                              Date Added
                              {sortColumn === 'dateAdded' && (
                                <ArrowUpDown className="h-3 w-3" />
                              )}
                              {columnFilters.dateAdded.length > 0 && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1">
                                  {columnFilters.dateAdded.length}
                                </Badge>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0" align="start">
                            {/* Date Added filter content */}
                            <div className="p-2 border-b">
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                  placeholder="Search dates..."
                                  className="pl-7 h-8 text-xs"
                                  value={columnSearchTerms.dateAdded}
                                  onChange={(e) => handleColumnSearchChange('dateAdded', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="py-2 max-h-60 overflow-auto">
                              {getColumnFilterOptions('dateAdded').length > 0 ? (
                                getColumnFilterOptions('dateAdded').map((option) => (
                                  <div key={option} className="flex items-center space-x-2 px-3 py-1 text-xs">
                                    <Checkbox
                                      id={`dateAdded-${option}`}
                                      checked={columnFilters.dateAdded.includes(option)}
                                      onCheckedChange={() => handleColumnFilterChange('dateAdded', option)}
                                    />
                                    <Label htmlFor={`dateAdded-${option}`} className="text-xs">
                                      {new Date(option).toLocaleDateString()}
                                    </Label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-center py-2 text-muted-foreground">No options found</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 border-t bg-muted/20">
                              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => clearColumnFilter('dateAdded')}>
                                Clear
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button size="sm" className="h-7 text-xs" onClick={() => {}}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableHead>
                      <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSkills.map((skill) => (
                      <TableRow key={skill.id} className={cn(
                        selectedSkills.includes(skill.id) ? "bg-blue-50" : "",
                        "h-12"
                      )}>
                        <TableCell className="py-2">
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill.id)}
                            onChange={() => handleSelectSkill(skill.id)}
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell className="py-2 text-[12px] text-[#262626] cursor-pointer hover:text-blue-600 hover:underline">
                          {skill.name}
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline">{skill.category}</Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex flex-wrap gap-1">
                            {skill.aliases.map((alias, index) => (
                              <Badge key={index} variant="secondary" className="text-[10px]">
                                {alias}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-[12px] text-[#262626]">{skill.usageCount}</TableCell>
                        <TableCell className="py-2 text-[12px] text-[#262626]">
                          {new Date(skill.dateAdded).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex gap-1 justify-end">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => handleEditSkill(skill)}
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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

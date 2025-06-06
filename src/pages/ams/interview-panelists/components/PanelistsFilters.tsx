
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import TagsInput from "@/components/shared/TagsInput";

interface PanelistsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  skillsFilter: string[];
  onSkillsChange: (skills: string[]) => void;
  availabilityFilter: string;
  onAvailabilityChange: (value: string) => void;
  seniorityFilter: string;
  onSeniorityChange: (value: string) => void;
}

export const PanelistsFilters: React.FC<PanelistsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  skillsFilter,
  onSkillsChange,
  availabilityFilter,
  onAvailabilityChange,
  seniorityFilter,
  onSeniorityChange
}) => {
  const clearFilters = () => {
    onSearchChange("");
    onDepartmentChange("");
    onStatusChange("");
    onSkillsChange([]);
    onAvailabilityChange("");
    onSeniorityChange("");
  };

  const hasActiveFilters = searchQuery || departmentFilter || statusFilter || skillsFilter.length > 0 || availabilityFilter || seniorityFilter;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search panelists by name, title, or skills..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={departmentFilter} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on_leave">On Leave</SelectItem>
          </SelectContent>
        </Select>

        <Select value={availabilityFilter} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Availability</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>

        <Select value={seniorityFilter} onValueChange={onSeniorityChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Seniority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="principal">Principal</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Filter by Skills:</label>
        <TagsInput
          tags={skillsFilter}
          onTagsChange={onSkillsChange}
          placeholder="Add skills to filter..."
        />
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary">Search: {searchQuery}</Badge>
          )}
          {departmentFilter && departmentFilter !== "all" && (
            <Badge variant="secondary">Department: {departmentFilter}</Badge>
          )}
          {statusFilter && statusFilter !== "all" && (
            <Badge variant="secondary">Status: {statusFilter}</Badge>
          )}
          {availabilityFilter && availabilityFilter !== "all" && (
            <Badge variant="secondary">Availability: {availabilityFilter}</Badge>
          )}
          {seniorityFilter && seniorityFilter !== "all" && (
            <Badge variant="secondary">Seniority: {seniorityFilter}</Badge>
          )}
          {skillsFilter.map((skill) => (
            <Badge key={skill} variant="secondary">Skill: {skill}</Badge>
          ))}
        </div>
      )}
    </div>
  );
};

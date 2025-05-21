
import React from 'react';
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SearchFiltersBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedClientsCount: number;
}

const SearchFiltersBar: React.FC<SearchFiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedClientsCount,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-background pt-2 pb-3 border-b w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="p-2">
                <h4 className="font-medium mb-2">Account Type</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">Customer</Badge>
                  <Badge variant="outline">Vendor</Badge>
                  <Badge variant="outline">Partner</Badge>
                </div>
                
                <h4 className="font-medium mb-2 mt-3">Client Tier</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">A</Badge>
                  <Badge variant="outline">B</Badge>
                  <Badge variant="outline">C</Badge>
                </div>
                
                <h4 className="font-medium mb-2 mt-3">Status</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">Active</Badge>
                  <Badge variant="outline">Paused</Badge>
                  <Badge variant="outline">Blacklisted</Badge>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="w-1/2">Clear</Button>
                  <Button size="sm" className="w-1/2 bg-primary hover:bg-primary/90">Apply</Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Bulk Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled={selectedClientsCount === 0}>
                Assign HR
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selectedClientsCount === 0}>
                Assign Vendor
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selectedClientsCount === 0}>
                Export Selected
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selectedClientsCount === 0} className="text-red-500">
                Archive Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersBar;

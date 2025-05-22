
import React from 'react';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ChecklistTypeFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  className?: string;
}

export const ChecklistTypeFilter: React.FC<ChecklistTypeFilterProps> = ({ 
  selectedType, 
  onTypeChange,
  className 
}) => {
  const handleTypeChange = (value: string) => {
    if (value === "all") {
      onTypeChange(null);
    } else {
      onTypeChange(value);
    }
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select 
        value={selectedType || "all"}
        onValueChange={handleTypeChange}
      >
        <SelectTrigger className="w-full sm:w-[180px] flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="general">
            <div className="flex items-center gap-2">
              General
              <Badge variant="outline" className="bg-gray-100 text-gray-800 ml-1">
                General
              </Badge>
            </div>
          </SelectItem>
          <SelectItem value="role">
            <div className="flex items-center gap-2">
              Role-based
              <Badge variant="outline" className="bg-gray-100 text-gray-800 ml-1">
                Role
              </Badge>
            </div>
          </SelectItem>
          <SelectItem value="client">
            <div className="flex items-center gap-2">
              Client-based
              <Badge variant="outline" className="bg-gray-100 text-gray-800 ml-1">
                Client
              </Badge>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableHeaderProps {
  searchable?: boolean;
  filterable?: boolean;
  filters?: any[];
  selectedFilterValues?: Record<string, string[]>;
  onSearch?: (term: string) => void;
}

export function DataTableHeader({
  searchable,
  onSearch,
}: DataTableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchable && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

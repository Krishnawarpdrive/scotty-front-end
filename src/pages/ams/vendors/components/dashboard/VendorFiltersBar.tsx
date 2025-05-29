
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchIcon } from 'lucide-react';

interface VendorFiltersBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const VendorFiltersBar: React.FC<VendorFiltersBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) => {
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Paused', label: 'Paused' }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {statusOptions.map((option) => (
              <Badge
                key={option.value}
                variant={statusFilter === option.value ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

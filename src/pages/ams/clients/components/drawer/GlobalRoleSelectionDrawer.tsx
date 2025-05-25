
import React, { useState, useEffect } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, Briefcase } from 'lucide-react';
import { useRoleLibraries } from '../hooks/useRoleLibraries';

interface GlobalRoleSelectionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleSelected: (role: any) => void;
  clientName: string;
}

const GlobalRoleSelectionDrawer: React.FC<GlobalRoleSelectionDrawerProps> = ({
  open,
  onOpenChange,
  onRoleSelected,
  clientName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { globalRoles, loading, searchGlobalRoles } = useRoleLibraries();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchGlobalRoles(searchTerm);
    } else {
      // Clear results if search term is too short
    }
  }, [searchTerm, searchGlobalRoles]);

  const handleRoleSelect = (role: any) => {
    onRoleSelected(role);
    onOpenChange(false);
    setSearchTerm('');
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Select Global Role Template"
      description={`Choose a role template from the global library for ${clientName}`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for roles... (minimum 2 characters)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Searching roles...</p>
            </div>
          )}

          {!loading && searchTerm.length >= 2 && globalRoles.length === 0 && (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No roles found</h3>
              <p className="text-sm text-muted-foreground">
                Try different search terms or browse the global roles library
              </p>
            </div>
          )}

          {!loading && searchTerm.length < 2 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Search Global Roles</h3>
              <p className="text-sm text-muted-foreground">
                Enter at least 2 characters to search for role templates
              </p>
            </div>
          )}

          {globalRoles.map((role) => (
            <div
              key={role.id}
              className="p-4 border rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => handleRoleSelect(role)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{role.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{role.employment_type}</Badge>
                    <Badge variant="outline">{role.work_mode}</Badge>
                    <Badge variant="outline">{role.experience_range}</Badge>
                    <Badge variant="outline">{role.department}</Badge>
                  </div>
                  {role.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {role.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Skills: {role.recommended_skills?.length || 0}</span>
                    <span>Certifications: {role.recommended_certifications?.length || 0}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <p className="text-sm text-muted-foreground">
              Select a role to pre-fill details from the global template
            </p>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default GlobalRoleSelectionDrawer;


import React from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillsFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillCategories: string[];
}

const SkillsFilterSheet: React.FC<SkillsFilterSheetProps> = ({
  open,
  onOpenChange,
  skillCategories
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SkillsFilterSheet;

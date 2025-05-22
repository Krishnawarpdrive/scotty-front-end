
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface SkillsFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  skillsData?: {
    nameFilter: string;
    setNameFilter: React.Dispatch<React.SetStateAction<string>>;
    categoryFilter: string[];
    setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
    popularityFilter: [number, number];
    setPopularityFilter: React.Dispatch<React.SetStateAction<[number, number]>>;
    resetFilters: () => void;
  };
}

const SkillsFilterSheet: React.FC<SkillsFilterSheetProps> = ({
  open,
  onOpenChange,
  categories,
  skillsData
}) => {
  if (!skillsData) return null;
  
  const { 
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
    popularityFilter,
    setPopularityFilter,
    resetFilters
  } = skillsData;

  // Handle popularity filter change
  const handlePopularityChange = (values: number[]) => {
    setPopularityFilter([values[0], values[1]]);
  };

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setCategoryFilter(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Skills</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-6">
          {/* Name Filter */}
          <div>
            <label className="text-sm font-medium">Skill Name</label>
            <input 
              type="text" 
              placeholder="Filter by name..."
              className="w-full p-2 mt-1 border rounded"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium">Categories</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    categoryFilter.includes(category)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Popularity Filter */}
          <div>
            <label className="text-sm font-medium">Popularity</label>
            <div className="mt-2">
              <Slider
                defaultValue={[0, 100]}
                value={[popularityFilter[0], popularityFilter[1]]}
                onValueChange={handlePopularityChange}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between">
                <span className="text-xs">{popularityFilter[0]}</span>
                <span className="text-xs">{popularityFilter[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
            <Button onClick={() => onOpenChange(false)}>Apply</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SkillsFilterSheet;

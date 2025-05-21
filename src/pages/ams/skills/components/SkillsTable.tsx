
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  id: number;
  name: string;
  category: string;
  aliases: string[];
  usageCount: number;
  dateAdded: string;
}

interface SkillsTableProps {
  skills: Skill[];
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  selectedSkills: number[];
  handleSort: (column: string) => void;
  handleSelectSkill: (id: number) => void;
  handleSelectAllSkills: () => void;
  handleEditSkill: (skill: Skill) => void;
}

const SkillsTable: React.FC<SkillsTableProps> = ({
  skills,
  sortColumn,
  sortDirection,
  selectedSkills,
  handleSort,
  handleSelectSkill,
  handleSelectAllSkills,
  handleEditSkill
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-10 py-2">
                <input
                  type="checkbox"
                  checked={selectedSkills.length === skills.length && skills.length > 0}
                  onChange={handleSelectAllSkills}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead 
                className="py-2 text-[12px] font-normal text-[#262626]"
                onClick={() => handleSort('name')}
              >
                Skill Name
              </TableHead>
              <TableHead 
                className="py-2 text-[12px] font-normal text-[#262626]"
                onClick={() => handleSort('category')}
              >
                Category
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Aliases
              </TableHead>
              <TableHead 
                className="py-2 text-[12px] font-normal text-[#262626]"
                onClick={() => handleSort('usageCount')}
              >
                Usage Count
              </TableHead>
              <TableHead 
                className="py-2 text-[12px] font-normal text-[#262626]"
                onClick={() => handleSort('dateAdded')}
              >
                Date Added
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
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
  );
};

export default SkillsTable;

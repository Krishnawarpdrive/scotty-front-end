
import React from 'react';
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skill } from '../data/mockData';

interface SkillsTableBodyProps {
  skills: Skill[];
  selectedSkills: number[];
  handleSelectSkill: (id: number) => void;
  handleEditSkill: (skill: Skill) => void;
}

const SkillsTableBody: React.FC<SkillsTableBodyProps> = ({
  skills,
  selectedSkills,
  handleSelectSkill,
  handleEditSkill
}) => {
  return (
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
  );
};

export default SkillsTableBody;

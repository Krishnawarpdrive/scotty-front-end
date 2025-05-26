
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TAContribution } from './types';
import { StatusBadge } from './StatusBadge';
import { ActionButtons } from './ActionButtons';

interface TATableViewProps {
  taContributions: TAContribution[];
}

export const TATableView: React.FC<TATableViewProps> = ({ taContributions }) => {
  return (
    <Card className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="h-[48px]">
            <TableHead className="w-[200px] text-[12px] text-[#262626] font-rubik font-medium uppercase">TA Name</TableHead>
            <TableHead className="w-[80px] text-[12px] text-[#262626] font-rubik font-medium uppercase">Done</TableHead>
            <TableHead className="w-[100px] text-[12px] text-[#262626] font-rubik font-medium uppercase">Progress</TableHead>
            <TableHead className="w-[140px] text-[12px] text-[#262626] font-rubik font-medium uppercase">Status</TableHead>
            <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taContributions.map((ta, index) => (
            <TableRow key={index} className="hover:bg-gray-50 h-[60px]">
              <TableCell className="text-[12px] text-[#262626] font-rubik">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {ta.initials}
                    </AvatarFallback>
                  </Avatar>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-medium cursor-pointer text-[12px] text-[#262626] font-rubik">
                        {ta.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-1 text-xs">
                        <p><strong>Roles:</strong> {ta.roles.join(', ')}</p>
                        <p><strong>Candidates:</strong> {ta.candidates.length > 0 ? ta.candidates.join(', ') : 'None assigned'}</p>
                        <p><strong>Avg Delay:</strong> {ta.avgDelay}</p>
                        {ta.hasConflicts && <p className="text-red-600">⚠️ Time slot conflicts detected</p>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className="text-[12px] text-[#262626] font-rubik">
                <span className="font-medium">
                  {ta.contribution}/{ta.target}
                </span>
              </TableCell>
              <TableCell className="text-[12px] text-[#262626] font-rubik">
                <div className="flex items-center gap-2">
                  <Progress value={ta.progress} className="h-2 w-12" />
                  <span className="text-xs font-medium">{ta.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-[12px] text-[#262626] font-rubik">
                <StatusBadge status={ta.status} />
              </TableCell>
              <TableCell className="text-[12px] text-[#262626] font-rubik">
                <ActionButtons ta={ta} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

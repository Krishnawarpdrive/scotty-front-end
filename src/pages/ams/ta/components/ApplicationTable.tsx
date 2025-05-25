
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Sheet, 
  SheetContent
} from "@/components/ui/sheet";
import { CandidateDetails } from "./CandidateDetails";
import { Phone, MessageCircle } from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  role: string;
  hiring: string;
  interviewing: string;
  stage: number;
  responsible: {
    name: string;
    avatar?: string;
  };
  status: {
    text: string;
    type: 'scheduled' | 'awaited' | 'delay' | 'needs' | 'screening';
    time?: string;
    date?: string;
  };
  timeSpent: string;
  targetDate: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Aditi Sharma',
    role: 'Network Administrator',
    hiring: 'Innovation Labs',
    interviewing: 'Network Administrator',
    stage: 4,
    responsible: { name: 'Uma Kunniah' },
    status: { text: 'Schedule Interview', type: 'scheduled', time: '2d' },
    timeSpent: '2d 5h',
    targetDate: '18 Apr 2025'
  },
  {
    id: 2,
    name: 'Neha Gupta',
    role: 'Product Manager',
    hiring: 'Tech Corp Inc.',
    interviewing: 'Product Manager',
    stage: 5,
    responsible: { name: 'Neha Gupta' },
    status: { text: 'Feedback Awaited', type: 'awaited', time: '4h' },
    timeSpent: '4d 2h',
    targetDate: '20 Apr 2025'
  },
  {
    id: 3,
    name: 'Summit Chandhar',
    role: 'DevOps Engineer',
    hiring: 'Tech Corp Inc.',
    interviewing: 'DevOps Engineer',
    stage: 4,
    responsible: { name: 'Summit Chandhar' },
    status: { text: 'Feedback Delay', type: 'delay', time: '1d' },
    timeSpent: '3d 4h',
    targetDate: '17 Apr 2025'
  },
  {
    id: 4,
    name: 'Sneha Patil',
    role: 'Marketing Executive',
    hiring: 'Tech Corp Inc.',
    interviewing: 'Marketing Executive',
    stage: 6,
    responsible: { name: 'Sneha Patil' },
    status: { text: 'Need to Send Offer', type: 'needs', time: '4h' },
    timeSpent: '1d 12h',
    targetDate: '22 Apr 2025'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Network Administrator',
    hiring: 'Innovation Labs',
    interviewing: 'Network Administrator',
    stage: 5,
    responsible: { name: 'Vikram Singh' },
    status: { text: 'Scheduled', type: 'scheduled', date: '14 Apr' },
    timeSpent: '3d 1h',
    targetDate: '23 Apr 2025'
  }
];

export const ApplicationTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === candidates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(candidates.map(candidate => candidate.id));
    }
  };

  const renderStageDots = (stage: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5, 6].map((dot) => (
          <div
            key={dot}
            className={`h-2 w-2 rounded-full ${dot <= stage ? 'bg-green-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const renderStatusBadge = (status: Candidate['status']) => {
    let bgColor = '';
    let icon = null;
    
    switch (status.type) {
      case 'scheduled':
        bgColor = 'bg-gray-100 text-gray-700';
        icon = <span className="mr-1">📅</span>;
        break;
      case 'awaited':
        bgColor = 'bg-amber-100 text-amber-700';
        icon = <span className="mr-1">🔄</span>;
        break;
      case 'delay':
        bgColor = 'bg-red-100 text-red-700';
        icon = <span className="mr-1">🚫</span>;
        break;
      case 'needs':
        bgColor = 'bg-amber-100 text-amber-700';
        icon = <span className="mr-1">📝</span>;
        break;
      case 'screening':
        bgColor = 'bg-gray-100 text-gray-700';
        icon = <span className="mr-1">🔎</span>;
        break;
    }
    
    return (
      <div className={`flex items-center text-xs px-2 py-1 rounded ${bgColor}`}>
        {icon}
        {status.text} {status.time && <span className="ml-1">· {status.time}</span>}
        {status.date && <span className="ml-1">on {status.date}</span>}
      </div>
    );
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  return (
    <div className="w-full mt-1">
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-10 py-2">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === candidates.length && candidates.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead className="w-10 py-2 text-[12px] font-normal text-[#262626]">ACTIONS</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">CANDIDATE</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">HIRING FOR</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">INTERVIEWING FOR</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">STAGES</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">RESPONSIBLE PERSON</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">ACTION STATUS</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">TIME SPENT</TableHead>
                <TableHead className="py-2 text-[12px] font-normal text-[#262626]">TARGET DATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map(candidate => (
                <TableRow 
                  key={candidate.id} 
                  className={cn(
                    selectedIds.includes(candidate.id) ? "bg-blue-50" : "",
                    "h-12 hover:bg-gray-50"
                  )}
                >
                  <TableCell className="text-center py-2">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(candidate.id)} 
                      onChange={() => toggleSelect(candidate.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex space-x-1">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Phone className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MessageCircle className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell 
                    className="py-2 text-[12px] text-[#262626] cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => handleCandidateClick(candidate)}
                  >
                    {candidate.name}
                  </TableCell>
                  <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.hiring}</TableCell>
                  <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.interviewing}</TableCell>
                  <TableCell className="py-2">
                    {renderStageDots(candidate.stage)}
                  </TableCell>
                  <TableCell className="py-2 text-[12px] text-[#262626]">
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src={candidate.responsible.avatar} />
                        <AvatarFallback className="text-[10px] bg-green-100">
                          {candidate.responsible.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {candidate.responsible.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    {renderStatusBadge(candidate.status)}
                  </TableCell>
                  <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.timeSpent}</TableCell>
                  <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.targetDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent side="right" className="p-0 overflow-y-auto">
          <CandidateDetails onClose={() => setIsDetailsOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

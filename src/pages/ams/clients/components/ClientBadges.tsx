
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Client tier badge variants
export const getClientTierBadge = (tier: string) => {
  switch (tier) {
    case "A":
      return <Badge className="bg-[#F2FCE2] text-green-800 hover:bg-[#E2ECD2]">{tier}</Badge>;
    case "B":
      return <Badge className="bg-[#D3E4FD] text-blue-800 hover:bg-[#C3D4ED]">{tier}</Badge>;
    case "C":
      return <Badge className="bg-[#FEF7CD] text-amber-800 hover:bg-[#EEE7BD]">{tier}</Badge>;
    default:
      return <Badge className="bg-[#F1F0FB] text-gray-800 hover:bg-[#E1E0EB]">{tier}</Badge>;
  }
};

// Hiring status badge variants
export const getHiringStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-[#F2FCE2] text-green-800 hover:bg-[#E2ECD2] border-0">{status}</Badge>;
    case "Paused":
      return <Badge className="bg-[#FEF7CD] text-amber-800 hover:bg-[#EEE7BD] border-0">{status}</Badge>;
    case "Blacklisted":
      return <Badge className="bg-[#FFDEE2] text-red-800 hover:bg-[#EFCED2] border-0">{status}</Badge>;
    default:
      return <Badge className="bg-[#F1F0FB] text-gray-800 hover:bg-[#E1E0EB] border-0">{status}</Badge>;
  }
};

// Last activity indicator
export const LastActivityIndicator = ({ days, active }: { days: number, active: boolean }) => {
  const statusColor = active ? "bg-green-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <span>{days}d ago</span>
      <span className={`inline-block w-2 h-2 rounded-full ${statusColor}`}></span>
    </div>
  );
};

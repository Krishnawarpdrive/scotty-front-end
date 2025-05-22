
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Client tier badge variants
export const getClientTierBadge = (tier: string) => {
  switch (tier) {
    case "A":
      return <Badge className="bg-green-600">{tier}</Badge>;
    case "B":
      return <Badge className="bg-blue-500">{tier}</Badge>;
    case "C":
      return <Badge className="bg-amber-500">{tier}</Badge>;
    default:
      return <Badge>{tier}</Badge>;
  }
};

// Hiring status badge variants
export const getHiringStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500">{status}</Badge>;
    case "Paused":
      return <Badge variant="outline" className="border-amber-400 text-amber-500">{status}</Badge>;
    case "Blacklisted":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
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

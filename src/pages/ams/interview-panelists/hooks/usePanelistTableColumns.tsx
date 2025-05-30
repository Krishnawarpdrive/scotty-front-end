
import React from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { Panelist } from "../types/PanelistTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Eye, Edit, Trash2, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface UsePanelistTableColumnsProps {
  onSelectPanelist: (id: string) => void;
  onUpdatePanelist: (id: string, data: Partial<Panelist>) => Promise<void>;
  onDeletePanelist: (id: string) => Promise<void>;
}

export const usePanelistTableColumns = ({
  onSelectPanelist,
  onUpdatePanelist,
  onDeletePanelist
}: UsePanelistTableColumnsProps): DataTableColumn<Panelist>[] => {
  return [
    {
      id: "panelist_id",
      header: "ID",
      accessorKey: "panelist_id",
      cell: (panelist) => (
        <div className="font-mono text-sm text-muted-foreground">
          {panelist.panelist_id}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "panelist",
      header: "Panelist",
      cell: (panelist) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={panelist.avatar_url} />
            <AvatarFallback>
              {panelist.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{panelist.name}</div>
            <div className="text-sm text-muted-foreground">{panelist.title}</div>
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "department",
      header: "Department",
      accessorKey: "department",
      cell: (panelist) => (
        <Badge variant="outline">{panelist.department}</Badge>
      ),
      enableSorting: true,
    },
    {
      id: "seniority",
      header: "Seniority",
      accessorKey: "seniority_level",
      cell: (panelist) => {
        const colorMap = {
          junior: "bg-blue-100 text-blue-800",
          mid: "bg-green-100 text-green-800",
          senior: "bg-purple-100 text-purple-800",
          principal: "bg-orange-100 text-orange-800",
          executive: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={colorMap[panelist.seniority_level]}>
            {panelist.seniority_level}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      id: "authorization",
      header: "Auth Level",
      accessorKey: "interview_authorization_level",
      cell: (panelist) => {
        const authColorMap = {
          basic: "bg-gray-100 text-gray-800",
          intermediate: "bg-blue-100 text-blue-800",
          advanced: "bg-purple-100 text-purple-800",
          expert: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={authColorMap[panelist.interview_authorization_level]}>
            {panelist.interview_authorization_level}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      id: "rating",
      header: "Rating",
      accessorKey: "rating",
      cell: (panelist) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{panelist.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({panelist.total_interviews})
          </span>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "allocation",
      header: "Daily Allocation",
      accessorKey: "interviews_allocated_per_day",
      cell: (panelist) => (
        <div className="text-center">
          <div className="font-medium">{panelist.interviews_allocated_per_day}</div>
          <div className="text-xs text-muted-foreground">per day</div>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (panelist) => {
        const statusConfig = {
          active: { label: "Active", color: "bg-green-100 text-green-800" },
          inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
          on_leave: { label: "On Leave", color: "bg-yellow-100 text-yellow-800" }
        };
        const config = statusConfig[panelist.status];
        return <Badge className={config.color}>{config.label}</Badge>;
      },
      enableSorting: true,
    },
    {
      id: "availability",
      header: "Availability",
      accessorKey: "availability_status",
      cell: (panelist) => {
        const availabilityConfig = {
          available: { label: "Available", color: "bg-green-100 text-green-800" },
          busy: { label: "Busy", color: "bg-yellow-100 text-yellow-800" },
          unavailable: { label: "Unavailable", color: "bg-red-100 text-red-800" }
        };
        const config = availabilityConfig[panelist.availability_status];
        return <Badge className={config.color}>{config.label}</Badge>;
      },
      enableSorting: true,
    },
    {
      id: "skills",
      header: "Key Skills",
      cell: (panelist) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {panelist.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {panelist.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{panelist.skills.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "contact",
      header: "Contact",
      cell: (panelist) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={`mailto:${panelist.email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          {panelist.phone && (
            <Button variant="ghost" size="sm" asChild>
              <a href={`tel:${panelist.phone}`}>
                <Phone className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (panelist) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSelectPanelist(panelist.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onUpdatePanelist(panelist.id, { 
                availability_status: panelist.availability_status === 'available' ? 'busy' : 'available' 
              })}
            >
              <Edit className="mr-2 h-4 w-4" />
              Toggle Availability
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDeletePanelist(panelist.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};

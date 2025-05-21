
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RolesPopoverProps {
  client: any;
}

const RolesPopover: React.FC<RolesPopoverProps> = ({ client }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto underline">{client.activeRoles}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <h3 className="font-medium mb-2">Active Roles for {client.name}</h3>
        <div className="border rounded-md p-2">
          <p className="text-center text-muted-foreground">Role details would be displayed here</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RolesPopover;

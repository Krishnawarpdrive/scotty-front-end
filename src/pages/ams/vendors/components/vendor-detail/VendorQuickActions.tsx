
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlusIcon, 
  BriefcaseIcon, 
  FileTextIcon, 
  MessageSquareIcon,
  SettingsIcon
} from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface VendorQuickActionsProps {
  vendor: Vendor;
}

export const VendorQuickActions: React.FC<VendorQuickActionsProps> = ({ vendor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <BriefcaseIcon className="h-4 w-4 mr-2" />
          Assign New Role
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <UserPlusIcon className="h-4 w-4 mr-2" />
          Request Candidates
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileTextIcon className="h-4 w-4 mr-2" />
          View Contracts
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MessageSquareIcon className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};

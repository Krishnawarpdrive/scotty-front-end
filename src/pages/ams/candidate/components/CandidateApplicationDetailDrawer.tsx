
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Calendar,
  Users,
  FileText,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

interface CandidateApplicationDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;
}

export const CandidateApplicationDetailDrawer: React.FC<CandidateApplicationDetailDrawerProps> = ({
  open,
  onOpenChange,
  application
}) => {
  if (!application) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{application.role}</SheetTitle>
          <SheetDescription>{application.company}</SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Status and Progress */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{application.status}</Badge>
            <span className="text-sm text-gray-500">{application.progress}% Complete</span>
          </div>

          {/* Company Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">Company Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span>500-1000 employees</span>
              </div>
            </div>
          </div>

          {/* Role Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">Role Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span>$120k - $150k</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Full-time</span>
              </div>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold">Application Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Application Submitted</span>
                <span className="text-gray-500">{application.appliedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="text-gray-500">{application.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>hr@techcorp.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
              <ExternalLink className="h-4 w-4" />
              <span>View Job Posting</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm">
              <FileText className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

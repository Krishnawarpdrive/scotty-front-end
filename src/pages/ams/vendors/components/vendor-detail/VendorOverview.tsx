
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BuildingIcon, 
  UserIcon, 
  MapPinIcon, 
  CalendarIcon,
  FileTextIcon,
  TrendingUpIcon
} from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';
import { format } from 'date-fns';

interface VendorOverviewProps {
  vendor: Vendor;
}

export const VendorOverview: React.FC<VendorOverviewProps> = ({ vendor }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BuildingIcon className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Primary Contact</label>
            <div className="flex items-center gap-2 mt-1">
              <UserIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{vendor.contactInfo.primaryContact}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-900 mt-1">{vendor.contactInfo.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-gray-900 mt-1">{vendor.contactInfo.phone}</p>
          </div>
          {vendor.contactInfo.address && (
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <div className="flex items-start gap-2 mt-1">
                <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-900">{vendor.contactInfo.address}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5" />
            Contract & Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">Vendor Tier</label>
            <Badge variant="outline">{vendor.tier}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <Badge variant={vendor.status === 'Active' ? 'default' : 'destructive'}>
              {vendor.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">Contract Status</label>
            <Badge variant={vendor.contractStatus === 'Active' ? 'default' : 'secondary'}>
              {vendor.contractStatus}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">SLA Status</label>
            <Badge variant={vendor.slaStatus === 'Good' ? 'default' : vendor.slaStatus === 'Warning' ? 'secondary' : 'destructive'}>
              {vendor.slaStatus}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Last Active</label>
            <div className="flex items-center gap-2 mt-1">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">
                {format(new Date(vendor.lastActiveDate), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{vendor.performanceMetrics.qualityScore}%</div>
              <div className="text-sm text-gray-600">Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{vendor.performanceMetrics.timelinessScore}%</div>
              <div className="text-sm text-gray-600">Timeliness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{vendor.performanceMetrics.complianceScore}%</div>
              <div className="text-sm text-gray-600">Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{vendor.performanceMetrics.submissionRate}%</div>
              <div className="text-sm text-gray-600">Submission Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{vendor.performanceMetrics.interviewRate}%</div>
              <div className="text-sm text-gray-600">Interview Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{vendor.performanceMetrics.offerRate}%</div>
              <div className="text-sm text-gray-600">Offer Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

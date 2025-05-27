
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  DollarSignIcon,
  UsersIcon,
  CalendarIcon
} from 'lucide-react';
import { Vendor } from '../types/VendorTypes';
import { useVendorDetail } from '../hooks/useVendors';
import { format } from 'date-fns';

interface VendorDetailDrawerProps {
  vendor: Vendor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VendorDetailDrawer: React.FC<VendorDetailDrawerProps> = ({
  vendor,
  open,
  onOpenChange
}) => {
  const { vendorRoles, vendorSubmissions, isLoading } = useVendorDetail(vendor?.id || '');

  if (!vendor) return null;

  const getStatusBadgeVariant = (status: Vendor['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'destructive';
      case 'Paused': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <SideDrawer
      title={vendor.name}
      description={`Vendor ID: ${vendor.vendorId}`}
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
    >
      <div className="p-6 space-y-6">
        {/* Overview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overview</h3>
            <div className="flex gap-2">
              <Badge variant={getStatusBadgeVariant(vendor.status)}>
                {vendor.status}
              </Badge>
              <Badge variant="outline">{vendor.tier}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Primary Contact</span>
                  </div>
                  <div>
                    <p className="font-medium">{vendor.contactInfo.primaryContact}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <MailIcon className="h-3 w-3" />
                      <span>{vendor.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <PhoneIcon className="h-3 w-3" />
                      <span>{vendor.contactInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{vendor.rating}</span>
                      <span className="text-yellow-400 text-xl">★</span>
                    </div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">Roles & Requirements</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Roles</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading roles...</div>
                ) : vendorRoles.length > 0 ? (
                  <div className="space-y-3">
                    {vendorRoles.map((role) => (
                      <div key={role.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{role.roleName}</h4>
                            <p className="text-sm text-gray-600">{role.clientName}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Vacancies: {role.vacancies}</span>
                              <span>Filled: {role.filledPositions}</span>
                              <span>Due: {format(new Date(role.deadline), 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                          <Badge variant={role.priority === 'High' ? 'destructive' : role.priority === 'Medium' ? 'secondary' : 'outline'}>
                            {role.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No active roles assigned</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quality Score</span>
                      <span>{vendor.performanceMetrics.qualityScore}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.qualityScore} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Timeliness</span>
                      <span>{vendor.performanceMetrics.timelinessScore}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.timelinessScore} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance</span>
                      <span>{vendor.performanceMetrics.complianceScore}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.complianceScore} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conversion Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Submission Rate</span>
                      <span>{vendor.performanceMetrics.submissionRate}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.submissionRate} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Interview Rate</span>
                      <span>{vendor.performanceMetrics.interviewRate}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.interviewRate} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Offer Rate</span>
                      <span>{vendor.performanceMetrics.offerRate}%</span>
                    </div>
                    <Progress value={vendor.performanceMetrics.offerRate} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading submissions...</div>
                ) : vendorSubmissions.length > 0 ? (
                  <div className="space-y-3">
                    {vendorSubmissions.map((submission) => (
                      <div key={submission.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{submission.candidateName}</h4>
                            <p className="text-sm text-gray-600">{submission.roleName}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Submitted: {format(new Date(submission.submissionDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{submission.status}</Badge>
                            <p className="text-xs text-gray-500 mt-1">{submission.stage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No submissions found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Billing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Invoiced</span>
                    <span className="font-medium">${vendor.billing.totalInvoiced.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Dues</span>
                    <span className="font-medium text-red-600">${vendor.billing.pendingDues.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Payment</span>
                    <span className="font-medium">{format(new Date(vendor.billing.lastPaymentDate), 'MMM dd, yyyy')}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contract Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant={vendor.contractStatus === 'Active' ? 'default' : 'destructive'}>
                      {vendor.contractStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SLA Status</span>
                    <Badge variant={vendor.slaStatus === 'Good' ? 'default' : vendor.slaStatus === 'Warning' ? 'secondary' : 'destructive'}>
                      {vendor.slaStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button size="sm">Assign Roles</Button>
          <Button variant="outline" size="sm">Request Candidates</Button>
          <Button variant="outline" size="sm">View Contract</Button>
        </div>
      </div>
    </SideDrawer>
  );
};

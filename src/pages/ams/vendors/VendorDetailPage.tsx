
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVendorDetails } from './hooks/useVendorDetails';
import { VendorDetailHeader } from './components/vendor-detail/VendorDetailHeader';
import { VendorOverview } from './components/vendor-detail/VendorOverview';
import { VendorRolesRequirements } from './components/vendor-detail/VendorRolesRequirements';
import { VendorSubmissions } from './components/vendor-detail/VendorSubmissions';
import { VendorPerformanceMetrics } from './components/vendor-detail/VendorPerformanceMetrics';
import { VendorBilling } from './components/vendor-detail/VendorBilling';
import { VendorCommunicationLogs } from './components/vendor-detail/VendorCommunicationLogs';
import { VendorQuickActions } from './components/vendor-detail/VendorQuickActions';
import { VendorRoles } from './components/vendor-detail/VendorRoles';
import { VendorRequirements } from './components/vendor-detail/VendorRequirements';
import { VendorAgreements } from './components/vendor-detail/VendorAgreements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VendorDetailPage: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const { vendor, vendorRoles, vendorSubmissions, isLoading } = useVendorDetails(vendorId || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendor details...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Vendor not found</h2>
          <p className="text-gray-600 mt-2">The vendor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <VendorDetailHeader vendor={vendor} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="roles">Roles</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="agreements">Agreements</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <VendorOverview vendor={vendor} />
                  <VendorPerformanceMetrics vendor={vendor} />
                  <VendorSubmissions 
                    vendor={vendor}
                    submissions={vendorSubmissions} 
                  />
                </TabsContent>

                <TabsContent value="roles" className="space-y-6">
                  <VendorRoles vendor={vendor} />
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <VendorRequirements vendor={vendor} />
                </TabsContent>

                <TabsContent value="agreements" className="space-y-6">
                  <VendorAgreements vendor={vendor} />
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <VendorCommunicationLogs vendor={vendor} />
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <VendorBilling vendor={vendor} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <VendorQuickActions vendor={vendor} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDetailPage;

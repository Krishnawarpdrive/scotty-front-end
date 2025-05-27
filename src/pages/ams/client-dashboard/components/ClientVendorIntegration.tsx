
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  UsersIcon, 
  TrendingUpIcon, 
  AlertTriangleIcon,
  ExternalLinkIcon
} from 'lucide-react';

interface VendorSummary {
  id: string;
  name: string;
  rolesAssigned: number;
  activeRequirements: number;
  performanceScore: number;
  status: 'Active' | 'Warning' | 'Breach';
  lastSubmission: string;
}

interface ClientVendorIntegrationProps {
  vendors: VendorSummary[];
  onViewAllVendors: () => void;
}

export const ClientVendorIntegration: React.FC<ClientVendorIntegrationProps> = ({
  vendors,
  onViewAllVendors
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Breach': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Warning': return 'secondary';
      case 'Breach': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            Vendor Performance
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onViewAllVendors}>
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            View All Vendors
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{vendor.rolesAssigned} roles</span>
                  <span>•</span>
                  <span>{vendor.activeRequirements} active</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getStatusColor(vendor.status)}`}>
                  {vendor.performanceScore}%
                </div>
                <Badge variant={getStatusBadgeVariant(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Performance Score</span>
                <span className={getStatusColor(vendor.status)}>{vendor.performanceScore}%</span>
              </div>
              <Progress value={vendor.performanceScore} className="h-2" />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Last submission: {vendor.lastSubmission}</span>
              {vendor.status === 'Breach' && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangleIcon className="h-3 w-3" />
                  <span>SLA Breach</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {vendors.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No vendors assigned yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

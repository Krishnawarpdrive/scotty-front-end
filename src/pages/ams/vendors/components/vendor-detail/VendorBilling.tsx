
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSignIcon, CalendarIcon, AlertTriangleIcon } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';
import { format } from 'date-fns';

interface VendorBillingProps {
  vendor: Vendor;
}

export const VendorBilling: React.FC<VendorBillingProps> = ({ vendor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSignIcon className="h-5 w-5" />
          Billing & Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ${vendor.billing.totalInvoiced.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Invoiced</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              ${vendor.billing.pendingDues.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Pending Dues</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600">Last Payment</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">
                {format(new Date(vendor.billing.lastPaymentDate), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>

        {vendor.billing.pendingDues > 0 && (
          <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangleIcon className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">Outstanding Payments</div>
              <div className="text-sm text-orange-700">
                ${vendor.billing.pendingDues.toLocaleString()} pending payment
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

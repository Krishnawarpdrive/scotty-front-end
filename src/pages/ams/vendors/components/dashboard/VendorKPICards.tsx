
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UsersIcon, 
  BriefcaseIcon,
  TrendingUpIcon,
  AlertTriangleIcon
} from 'lucide-react';

interface VendorKPICardsProps {
  totalVendors: number;
  activeVendors: number;
  totalRoles: number;
  slaBreaches: number;
}

export const VendorKPICards: React.FC<VendorKPICardsProps> = ({
  totalVendors,
  activeVendors,
  totalRoles,
  slaBreaches
}) => {
  const kpiData = [
    {
      title: 'Total Vendors',
      value: totalVendors,
      icon: UsersIcon,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      delay: 0
    },
    {
      title: 'Active Vendors',
      value: activeVendors,
      icon: TrendingUpIcon,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      delay: 0.1
    },
    {
      title: 'Total Roles',
      value: totalRoles,
      icon: BriefcaseIcon,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      delay: 0.2
    },
    {
      title: 'SLA Breaches',
      value: slaBreaches,
      icon: AlertTriangleIcon,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: kpi.delay }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`p-2 ${kpi.bgColor} rounded-lg`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

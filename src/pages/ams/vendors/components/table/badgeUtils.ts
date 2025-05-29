
import { Vendor } from '../../types/VendorTypes';

export const getStatusBadgeVariant = (status: Vendor['status']) => {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Inactive':
      return 'destructive';
    case 'Paused':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const getSLABadgeVariant = (slaStatus: string) => {
  switch (slaStatus) {
    case 'Good':
      return 'default';
    case 'Warning':
      return 'secondary';
    case 'Breach':
      return 'destructive';
    default:
      return 'outline';
  }
};

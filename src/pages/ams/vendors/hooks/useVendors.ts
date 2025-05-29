
import { useVendorsList } from './useVendorsList';

// Re-export the main vendors hook for backward compatibility
export const useVendors = useVendorsList;

// Re-export the vendor detail hook
export { useVendorDetails as useVendorDetail } from './useVendorDetails';

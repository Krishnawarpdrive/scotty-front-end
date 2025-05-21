
import { z } from "zod";

// Define form schema using zod
export const formSchema = z.object({
  // Account Information
  accountName: z.string().min(1, { message: "Account name is required" }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  customerCode: z.string().optional(),
  parentAccount: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).or(z.string().length(0)).optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  description: z.string().optional(),
  
  // Company Profile
  currency: z.string().min(1, { message: "Currency is required" }),
  headquarters: z.string().min(1, { message: "Headquarters is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  employees: z.string().optional(),
  segment: z.string().optional(),
  
  // Sourcing Details
  sourcingType: z.string().min(1, { message: "Sourcing type is required" }),
  sourcingAccount: z.string().optional(),
  sourcingPerson: z.string().optional(),
  referrerAccount: z.string().optional(),
  commission: z.string().optional(),
  campaignName: z.string().optional(),
  
  // Billing Address
  billingCountry: z.string().min(1, { message: "Country is required" }),
  billingState: z.string().min(1, { message: "State/Province is required" }),
  billingCity: z.string().min(1, { message: "City is required" }),
  billingZip: z.string().min(1, { message: "Zip/Postal code is required" }),
  billingStreet: z.string().min(1, { message: "Street address is required" }),
  
  // Shipping Address
  sameAsBilling: z.boolean().default(true),
  shippingCountry: z.string().optional(),
  shippingState: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingZip: z.string().optional(),
  shippingStreet: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

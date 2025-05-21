import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormProgressIndicator from './FormProgressIndicator';
import DynamicFieldGroup from '@/components/DynamicFieldGroup';

// Define form schema using zod
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface ClientAccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientAccountDrawer: React.FC<ClientAccountDrawerProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);
  
  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountType: "",
      customerCode: "",
      parentAccount: "",
      website: "",
      phone: "",
      email: "",
      description: "",
      currency: "",
      headquarters: "",
      industry: "",
      employees: "",
      segment: "",
      sourcingType: "",
      sourcingAccount: "",
      sourcingPerson: "",
      referrerAccount: "",
      commission: "",
      campaignName: "",
      billingCountry: "",
      billingState: "",
      billingCity: "",
      billingZip: "",
      billingStreet: "",
      sameAsBilling: true,
      shippingCountry: "",
      shippingState: "",
      shippingCity: "",
      shippingZip: "",
      shippingStreet: "",
    },
    mode: "onChange"
  });
  
  // Calculate progress based on form completion
  useEffect(() => {
    const values = form.getValues();
    const fields = Object.keys(values);
    
    // Count filled fields
    const filledFields = fields.filter(field => {
      const value = values[field as keyof FormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Calculate percentage
    const percentage = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(percentage);
  }, [form.watch()]);
  
  // Handle form submission
  const onSubmit = (values: FormValues) => {
    // Create complete data with custom fields
    const completeData = {
      ...values,
      customFields: {
        account: customAccountFields,
        profile: customProfileFields,
        sourcing: customSourcingFields,
      }
    };
    
    console.log("Form submitted:", completeData);
    
    toast({
      title: "Success!",
      description: `🎉 Client '${values.accountName}' has been created successfully!`,
    });
    
    // Close drawer
    onOpenChange(false);
  };
  
  // Handle step navigation
  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 0 && step < formSections.length) {
      setCurrentStep(step);
    }
  };
  
  // When sameAsBilling changes
  useEffect(() => {
    const billingData = form.getValues();
    
    if (sameAsBilling) {
      form.setValue("shippingCountry", billingData.billingCountry);
      form.setValue("shippingState", billingData.billingState);
      form.setValue("shippingCity", billingData.billingCity);
      form.setValue("shippingZip", billingData.billingZip);
      form.setValue("shippingStreet", billingData.billingStreet);
    }
  }, [sameAsBilling]);
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[70vw] p-0 overflow-y-hidden flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Add Client Account</SheetTitle>
          <SheetDescription>
            Let's onboard your client — enter their profile, sourcing setup, and contact info to get started.
          </SheetDescription>
        </SheetHeader>
        
        <FormProgressIndicator
          steps={formSections}
          currentStep={currentStep}
          onStepClick={goToStep}
          progress={formProgress}
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 px-6 overflow-y-auto">
              {/* Account Information - Step 0 */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Account Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ABC Corp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Customer">Customer</SelectItem>
                              <SelectItem value="Vendor">Vendor</SelectItem>
                              <SelectItem value="Partner">Partner</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Auto-generated optional" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parentAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent Account</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select parent account" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="account1">Account 1</SelectItem>
                              <SelectItem value="account2">Account 2</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            
                              <FormLabel>Website</FormLabel>
                            
                            <FormControl>
                              <Input placeholder="https://abc.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. +91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="contact@abc.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Summary about company" 
                            {...field} 
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DynamicFieldGroup
                    title="Additional Account Fields"
                    fields={customAccountFields}
                    onFieldsChange={setCustomAccountFields}
                  />
                </div>
              )}
              
              {/* Company Profile - Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Company Profile</h2>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="headquarters"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Headquarters <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="IN">India</SelectItem>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="BFSI">BFSI</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employees</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 250" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="segment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Segment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select segment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Enterprise">Enterprise</SelectItem>
                              <SelectItem value="SME">SME</SelectItem>
                              <SelectItem value="Startup">Startup</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DynamicFieldGroup
                    title="Additional Profile Fields"
                    fields={customProfileFields}
                    onFieldsChange={setCustomProfileFields}
                  />
                </div>
              )}
              
              {/* Sourcing Details - Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Sourcing Details</h2>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="sourcingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sourcing Type <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Direct">Direct</SelectItem>
                              <SelectItem value="Referral">Referral</SelectItem>
                              <SelectItem value="Agency">Agency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sourcingAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sourcing Account</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="account1">ABC Recruiters</SelectItem>
                              <SelectItem value="account2">XYZ Agency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="sourcingPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sourcing Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Person of contact" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="referrerAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referrer Account</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select referrer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ref1">John Doe</SelectItem>
                              <SelectItem value="ref2">Jane Smith</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="commission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission %</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5.0" type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="campaignName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Marketing/Referral ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DynamicFieldGroup
                    title="Additional Sourcing Fields"
                    fields={customSourcingFields}
                    onFieldsChange={setCustomSourcingFields}
                  />
                </div>
              )}
              
              {/* Address Details - Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Address Details</h2>
                  
                  <div>
                    <h3 className="text-md font-medium mb-3">Billing Address</h3>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="billingCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="IN">India</SelectItem>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="billingState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MH">Maharashtra</SelectItem>
                                <SelectItem value="DL">Delhi</SelectItem>
                                <SelectItem value="KA">Karnataka</SelectItem>
                                <SelectItem value="TN">Tamil Nadu</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                      <FormField
                        control={form.control}
                        name="billingCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Mumbai">Mumbai</SelectItem>
                                <SelectItem value="Delhi">Delhi</SelectItem>
                                <SelectItem value="Bangalore">Bangalore</SelectItem>
                                <SelectItem value="Chennai">Chennai</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="billingZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="billingStreet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Street address" 
                                {...field} 
                                rows={2}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="sameAsBilling" 
                        checked={sameAsBilling}
                        onCheckedChange={(checked) => {
                          setSameAsBilling(!!checked);
                          form.setValue("sameAsBilling", !!checked);
                        }}
                      />
                      <label
                        htmlFor="sameAsBilling"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Shipping address same as billing
                      </label>
                    </div>
                    
                    {!sameAsBilling && (
                      <div>
                        <h3 className="text-md font-medium mb-3">Shipping Address</h3>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="shippingCountry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="IN">India</SelectItem>
                                    <SelectItem value="US">United States</SelectItem>
                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                    <SelectItem value="CA">Canada</SelectItem>
                                    <SelectItem value="AU">Australia</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="shippingState"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="MH">Maharashtra</SelectItem>
                                    <SelectItem value="DL">Delhi</SelectItem>
                                    <SelectItem value="KA">Karnataka</SelectItem>
                                    <SelectItem value="TN">Tamil Nadu</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                          <FormField
                            control={form.control}
                            name="shippingCity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                                    <SelectItem value="Chennai">Chennai</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="shippingZip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zip/Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Postal code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="mt-4">
                          <FormField
                            control={form.control}
                            name="shippingStreet"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Street address" 
                                    {...field} 
                                    rows={2}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sticky footer with navigation buttons */}
            <SheetFooter className="p-4 border-t mt-auto">
              <div className="flex justify-between w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < formSections.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ClientAccountDrawer;

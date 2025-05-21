import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

import FormProgressIndicator from './FormProgressIndicator';
import { useIsMobile } from "@/hooks/use-mobile";

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

interface ClientAccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientAccountDrawer: React.FC<ClientAccountDrawerProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<number | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  
  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
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
    }
  });
  
  // Handle form submission
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      console.log("Form submitted:", values);
      
      toast({
        title: "Success!",
        description: `🎉 Client '${values.accountName}' has been created successfully!`,
      });
      
      // Close drawer and redirect
      onOpenChange(false);
      navigate("/ams/clients");
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("clientAccountDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        
        // Check if the draft has a timestamp
        const draftTimestamp = parsedDraft._timestamp;
        if (draftTimestamp) {
          setLastSaved(new Date(draftTimestamp));
          delete parsedDraft._timestamp;
        }
        
        // Set form values from draft
        form.reset(parsedDraft);
        setSameAsBilling(!!parsedDraft.sameAsBilling);
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
  }, [open]);
  
  // Set up auto-save
  useEffect(() => {
    if (!open) return;

    // Save form values to localStorage every 15 seconds
    const intervalId = window.setInterval(() => {
      const formValues = form.getValues();
      const dataToSave = {
        ...formValues,
        _timestamp: new Date().toISOString(),
      };
      localStorage.setItem("clientAccountDraft", JSON.stringify(dataToSave));
      setLastSaved(new Date());
    }, 15000);
    
    setAutoSaveTimer(intervalId);
    
    // Clean up on unmount
    return () => {
      if (autoSaveTimer) {
        clearInterval(autoSaveTimer);
      }
    };
  }, [open]);
  
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
  
  // Detect active section based on scroll
  useEffect(() => {
    if (!open || !formRef.current) return;

    const handleScroll = () => {
      const container = formRef.current;
      if (!container) return;
      
      // Get the scroll position
      const scrollPos = container.scrollTop + 100; // Offset to trigger slightly earlier
      
      // Check each section
      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return;
        
        const sectionTop = ref.current.offsetTop;
        const nextRef = sectionRefs[index + 1]?.current;
        const sectionBottom = nextRef ? nextRef.offsetTop : container.scrollHeight;
        
        // If the scroll position is within this section
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    
    const containerElement = formRef.current;
    containerElement.addEventListener('scroll', handleScroll);
    
    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, [open, sectionRefs]);

  // Handle zipcode auto-complete
  const handleZipCodeChange = (zipCode: string) => {
    // This would typically be an API call, but for demo purposes we'll hardcode some values
    if (zipCode === "400001") {
      form.setValue("billingCity", "Mumbai");
      form.setValue("billingState", "MH");
      form.setValue("billingCountry", "IN");
    } else if (zipCode === "110001") {
      form.setValue("billingCity", "Delhi");
      form.setValue("billingState", "DL");
      form.setValue("billingCountry", "IN");
    }
  };
  
  // Handle cancel button
  const handleCancel = () => {
    // Check if form is dirty
    if (form.formState.isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        onOpenChange(false);
      }
    } else {
      onOpenChange(false);
    }
  };
  
  const DrawerComponent = isMobile ? Drawer : Sheet;
  const DrawerContentComponent = isMobile ? DrawerContent : SheetContent;
  const DrawerHeaderComponent = isMobile ? DrawerHeader : SheetHeader;
  const DrawerTitleComponent = isMobile ? DrawerTitle : SheetTitle;
  const DrawerCloseComponent = isMobile ? DrawerClose : SheetClose;
  
  return (
    <DrawerComponent open={open} onOpenChange={onOpenChange}>
      <DrawerContentComponent className={isMobile ? "h-[90%]" : "w-[70vw]"}>
        <DrawerHeaderComponent className="border-b pb-4 mb-2">
          <DrawerTitleComponent className="text-2xl font-medium text-[#262626]">
            Add Client Account
          </DrawerTitleComponent>
          <DrawerCloseComponent className="absolute right-4 top-4">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DrawerCloseComponent>
        </DrawerHeaderComponent>

        <div className="text-gray-600 mb-4 px-6">
          Let's onboard your client — enter their profile, sourcing setup, and contact info to get started.
        </div>
        
        <FormProgressIndicator
          steps={formSections}
          currentStep={activeSection}
          onStepClick={(step) => {
            if (sectionRefs[step]?.current) {
              formRef.current?.scrollTo({ 
                top: sectionRefs[step].current?.offsetTop - 20,
                behavior: 'smooth' 
              });
            }
          }}
        />
        
        {lastSaved && (
          <div className="text-xs text-gray-500 text-right px-6">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
            <ScrollArea 
              ref={formRef} 
              className="px-6 max-h-[calc(100vh-280px)]"
            >
              {/* Account Information - Section 0 */}
              <div ref={sectionRefs[0]} className="space-y-4 mb-10">
                <h2 className="text-lg font-semibold border-b pb-2 pt-4">Account Information</h2>
                
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
                  <TooltipProvider>
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <FormLabel>Website</FormLabel>
                            </TooltipTrigger>
                            <TooltipContent>
                              Please enter the official website of the company
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Input placeholder="https://abc.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TooltipProvider>
                  
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
              </div>
              
              {/* Company Profile - Section 1 */}
              <div ref={sectionRefs[1]} className="space-y-4 mb-10">
                <h2 className="text-lg font-semibold border-b pb-2 pt-4">Company Profile</h2>
                
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
              </div>
              
              {/* Sourcing Details - Section 2 */}
              <div ref={sectionRefs[2]} className="space-y-4 mb-10">
                <h2 className="text-lg font-semibold border-b pb-2 pt-4">Sourcing Details</h2>
                
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
              </div>
              
              {/* Address Details - Section 3 */}
              <div ref={sectionRefs[3]} className="space-y-4 mb-10">
                <h2 className="text-lg font-semibold border-b pb-2 pt-4">Address Details</h2>
                
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
                            <Input 
                              placeholder="Postal code" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleZipCodeChange(e.target.value);
                              }} 
                            />
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
            </ScrollArea>
            
            {/* Sticky footer with navigation buttons */}
            <div className="p-4 border-t bg-white sticky bottom-0 flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContentComponent>
    </DrawerComponent>
  );
};

export default ClientAccountDrawer;

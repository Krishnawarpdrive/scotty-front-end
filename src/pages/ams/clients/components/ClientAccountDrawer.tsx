
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormProgressIndicator from './FormProgressIndicator';

// Import component steps
import AccountInfoStep from './drawer/AccountInfoStep';
import CompanyProfileStep from './drawer/CompanyProfileStep';
import SourcingDetailsStep from './drawer/SourcingDetailsStep';
import AddressDetailsStep from './drawer/AddressDetailsStep';

// Import schema
import { drawerFormSchema, DrawerFormValues, CustomField } from './drawer/clientDrawerSchema';

interface ClientAccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated?: (client: any) => void;
}

const ClientAccountDrawer: React.FC<ClientAccountDrawerProps> = ({ 
  open, 
  onOpenChange,
  onClientCreated
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);
  const [justCreatedClient, setJustCreatedClient] = useState<any>(null);
  
  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<DrawerFormValues>({
    resolver: zodResolver(drawerFormSchema),
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
      const value = values[field as keyof DrawerFormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Calculate percentage
    const percentage = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(percentage);
  }, [form.watch()]);
  
  // Handle form submission
  const onSubmit = (values: DrawerFormValues) => {
    // Create complete data with custom fields
    const newClient = {
      ...values,
      customFields: {
        account: customAccountFields,
        profile: customProfileFields,
        sourcing: customSourcingFields,
      },
      id: Math.random().toString(36).substring(2, 9),
      name: values.accountName, // Important for displaying in other components
      contact: values.sourcingPerson || "Not specified",
      email: values.email,
      status: "active",
      hiringStatus: 'Active',
      clientTier: 'B',
      healthScore: 75,
      budgetUtilized: 0,
      lastActivity: { days: 0, active: true },
      roles: [],
      totalRequirements: 0,
      assignedHR: "Unassigned",
      industry: values.industry,
      headquarters: values.headquarters,
      createdOn: new Date().toISOString().split('T')[0]
    };
    
    console.log("Form submitted:", newClient);
    
    // Set the just created client for CTA display
    setJustCreatedClient({
      id: newClient.id,
      name: values.accountName
    });
    
    // Call the callback if provided
    if (onClientCreated) {
      onClientCreated(newClient);
    }

    toast({
      title: "Success!",
      description: `🎉 Client '${values.accountName}' has been created successfully!`,
    });
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

  // Reset form and state when drawer closes
  useEffect(() => {
    if (!open) {
      setJustCreatedClient(null);
    }
  }, [open]);

  // Handle role creation for the new client
  const handleCreateRole = () => {
    if (!justCreatedClient) return;
    
    // Close the drawer
    onOpenChange(false);
    
    // Navigate to the role creation page with client info
    navigate('/ams/roles/create', { 
      state: { 
        clientId: justCreatedClient.id,
        clientName: justCreatedClient.name 
      } 
    });
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
      <SheetContent className="sm:max-w-[70vw] p-0 overflow-hidden flex flex-col">
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
                <AccountInfoStep 
                  form={form} 
                  customAccountFields={customAccountFields}
                  setCustomAccountFields={setCustomAccountFields}
                />
              )}
              
              {/* Company Profile - Step 1 */}
              {currentStep === 1 && (
                <CompanyProfileStep 
                  form={form} 
                  customProfileFields={customProfileFields}
                  setCustomProfileFields={setCustomProfileFields}
                />
              )}
              
              {/* Sourcing Details - Step 2 */}
              {currentStep === 2 && (
                <SourcingDetailsStep 
                  form={form} 
                  customSourcingFields={customSourcingFields}
                  setCustomSourcingFields={setCustomSourcingFields}
                />
              )}
              
              {/* Address Details - Step 3 */}
              {currentStep === 3 && (
                <AddressDetailsStep 
                  form={form} 
                  sameAsBilling={sameAsBilling} 
                  setSameAsBilling={setSameAsBilling} 
                />
              )}

              {/* Success state with CTA */}
              {justCreatedClient && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-4 text-center">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Awesome! Client {justCreatedClient.name} has been created successfully.
                  </h3>
                  <p className="text-green-700 mb-4">
                    Would you like to create a role for this client now?
                  </p>
                  <Button 
                    onClick={handleCreateRole} 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Role for {justCreatedClient.name}
                  </Button>
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
                  {currentStep > 0 && !justCreatedClient && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < formSections.length - 1 && !justCreatedClient ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : !justCreatedClient ? (
                    <Button type="submit">
                      Save
                    </Button>
                  ) : null}
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

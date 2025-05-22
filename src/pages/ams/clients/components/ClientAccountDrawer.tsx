
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SideDrawer } from '@/components/ui/side-drawer';

import AccountInfoStep from './drawer/AccountInfoStep';
import CompanyProfileStep from './drawer/CompanyProfileStep';
import SourcingDetailsStep from './drawer/SourcingDetailsStep';
import AddressDetailsStep from './drawer/AddressDetailsStep';
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  // Custom fields state
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);
  
  // Steps titles
  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  
  // Calculate progress based on current step
  const progress = ((currentStep + 1) / formSections.length) * 100;

  const form = useForm<DrawerFormValues>({
    resolver: zodResolver(drawerFormSchema),
    defaultValues: {
      // Account Information
      accountName: '',
      accountType: '',
      customerCode: '',
      parentAccount: '',
      website: '',
      phone: '',
      email: '',
      description: '',
      
      // Company Profile
      currency: '',
      headquarters: '',
      industry: '',
      employees: '',
      segment: '',
      
      // Sourcing Details
      sourcingType: '',
      sourcingAccount: '',
      sourcingPerson: '',
      referrerAccount: '',
      commission: '',
      campaignName: '',
      
      // Address Details
      billingCountry: '',
      billingState: '',
      billingCity: '',
      billingZip: '',
      billingStreet: '',
      sameAsBilling: true,
      shippingCountry: '',
      shippingState: '',
      shippingCity: '',
      shippingZip: '',
      shippingStreet: '',
    },
    mode: "onChange"
  });

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

  const onSubmit = async (values: DrawerFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Create client in Supabase
      const { data, error } = await supabase
        .from('clients')
        .insert([
          {
            name: values.accountName,
            contact: values.sourcingPerson || 'Contact Person',
            email: values.email,
            account_type: values.accountType,
            assigned_hr: 'Sarah Lee', // Default HR
            client_tier: 'A', // Default tier
            status: 'active',
            health_score: 100, // Default values
            budget_utilized: 0,
            total_requirements: 0,
            hiring_status: 'Active',
            industry: values.industry,
            headquarters: values.headquarters,
            notes: values.description
          }
        ])
        .select();

      if (error) throw error;
      
      // Format the client data for the callback
      const createdClient = {
        id: data[0].id,
        name: data[0].name,
        contact: data[0].contact,
        email: data[0].email,
        status: data[0].status,
        accountType: data[0].account_type,
        createdOn: data[0].created_on,
        lastActivity: { days: 0, active: true },
        roles: [],
        totalRequirements: data[0].total_requirements,
        assignedHR: data[0].assigned_hr,
        hiringStatus: data[0].hiring_status,
        clientTier: data[0].client_tier,
        healthScore: data[0].health_score,
        budgetUtilized: data[0].budget_utilized,
        notes: data[0].notes,
        industry: values.industry,
        headquarters: values.headquarters
      };
      
      // Notify parent component about successful client creation
      if (onClientCreated) {
        onClientCreated(createdClient);
      }
      
      toast({
        title: 'Success!',
        description: `Client ${values.accountName} has been created successfully.`,
      });
      
      // Reset form and steps
      form.reset();
      setCurrentStep(0);
      
      // Close drawer
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating client:', error);
      toast({
        title: 'Error',
        description: 'Failed to create client. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // When sameAsBilling changes
  React.useEffect(() => {
    const billingData = form.getValues();
    
    if (sameAsBilling) {
      form.setValue("shippingCountry", billingData.billingCountry);
      form.setValue("shippingState", billingData.billingState);
      form.setValue("shippingCity", billingData.billingCity);
      form.setValue("shippingZip", billingData.billingZip);
      form.setValue("shippingStreet", billingData.billingStreet);
    }
  }, [sameAsBilling, form]);

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Client"
      description="Create a new client account in your system."
    >
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{formSections[currentStep]}</span>
          <span>Step {currentStep + 1} of {formSections.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
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
          </div>

          {/* Form navigation controls */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
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
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Client'
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </SideDrawer>
  );
};

export default ClientAccountDrawer;

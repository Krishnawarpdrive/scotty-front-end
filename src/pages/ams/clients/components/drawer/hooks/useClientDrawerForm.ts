
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { drawerFormSchema, DrawerFormValues, CustomField } from '../clientDrawerSchema';

interface UseClientDrawerFormProps {
  onClientCreated?: (client: any) => void;
  onClose: () => void;
}

export const useClientDrawerForm = ({ onClientCreated, onClose }: UseClientDrawerFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  // Custom fields state
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);
  
  // Form steps
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

  // Handle form submission
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
      onClose();
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

  // Update shipping address when billing address changes (if sameAsBilling is true)
  const updateShippingAddress = () => {
    if (sameAsBilling) {
      const billingData = form.getValues();
      
      form.setValue("shippingCountry", billingData.billingCountry);
      form.setValue("shippingState", billingData.billingState);
      form.setValue("shippingCity", billingData.billingCity);
      form.setValue("shippingZip", billingData.billingZip);
      form.setValue("shippingStreet", billingData.billingStreet);
    }
  };

  return {
    form,
    isSubmitting,
    currentStep,
    sameAsBilling,
    setSameAsBilling,
    formSections,
    progress,
    nextStep,
    prevStep,
    onSubmit,
    updateShippingAddress,
    customAccountFields,
    setCustomAccountFields,
    customProfileFields,
    setCustomProfileFields,
    customSourcingFields,
    setCustomSourcingFields,
  };
};

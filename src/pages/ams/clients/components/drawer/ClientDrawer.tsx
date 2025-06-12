import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form } from '@/components/ui/form';
import { useUnifiedToast } from '@/hooks/useUnifiedToast';
import { Client } from '../../types/ClientTypes';
import { drawerFormSchema, DrawerFormValues, CustomField } from './clientDrawerSchema';
import AccountInfoStep from './AccountInfoStep';
import CompanyProfileStep from './CompanyProfileStep';
import SourcingDetailsStep from './SourcingDetailsStep';
import AddressDetailsStep from './AddressDetailsStep';
import ClientDrawerProgress from './ClientDrawerProgress';
import ClientDrawerNavigation from './ClientDrawerNavigation';

interface ClientDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated: (client: Client) => void;
  onClientUpdated: (client: Client) => void;
  client?: Client | null;
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({
  open,
  onOpenChange,
  onClientCreated,
  onClientUpdated,
  client
}) => {
  const toast = useUnifiedToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);

  const formSections = [
    'Account Information',
    'Company Profile', 
    'Sourcing Details',
    'Address Details'
  ];

  const form = useForm<DrawerFormValues>({
    resolver: zodResolver(drawerFormSchema),
    defaultValues: {
      accountName: '',
      accountType: '',
      customerCode: '',
      parentAccount: '',
      website: '',
      phone: '',
      email: '',
      description: '',
      currency: '',
      headquarters: '',
      industry: '',
      employees: '',
      segment: '',
      sourcingType: '',
      sourcingAccount: '',
      sourcingPerson: '',
      referrerAccount: '',
      commission: '',
      campaignName: '',
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
  });

  // Reset form when client changes or drawer opens/closes
  useEffect(() => {
    if (client && open) {
      // Pre-fill form with client data when editing
      form.reset({
        accountName: client.name || '',
        accountType: 'Customer',
        phone: client.phone || '',
        email: client.email || '',
        industry: client.industry || '',
        // ... other fields can be mapped as needed
      });
    } else if (!client && open) {
      // Reset to empty form when creating new client
      form.reset();
    }
  }, [client, open, form]);

  // Reset step when drawer opens
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
    }
  }, [open]);

  const progress = ((currentStep + 1) / formSections.length) * 100;

  const handleNext = async () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid && currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof DrawerFormValues)[] => {
    switch (step) {
      case 0: return ['accountName', 'accountType', 'phone', 'email'];
      case 1: return ['currency', 'headquarters', 'industry'];
      case 2: return ['sourcingType'];
      case 3: return ['billingCountry', 'billingState', 'billingCity', 'billingZip', 'billingStreet'];
      default: return [];
    }
  };

  const handleSubmit = async (values: DrawerFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const clientData: Client = {
        id: client?.id || `client-${Date.now()}`,
        name: values.accountName,
        industry: values.industry,
        email: values.email,
        phone: values.phone,
        status: 'Active',
        budget: 0,
        healthScore: 85,
        assignedHRs: [],
        roles: [],
        lastActivity: new Date().toISOString(),
        description: values.description || '',
      };

      if (client) {
        onClientUpdated(clientData);
        toast.success({
          title: 'Success',
          description: 'Client updated successfully'
        });
      } else {
        onClientCreated(clientData);
        toast.success({
          title: 'Success', 
          description: 'Client created successfully'
        });
      }

      onOpenChange(false);
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to save client. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
    setCurrentStep(0);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AccountInfoStep
            form={form}
            customAccountFields={customAccountFields}
            setCustomAccountFields={setCustomAccountFields}
          />
        );
      case 1:
        return (
          <CompanyProfileStep
            form={form}
            customProfileFields={customProfileFields}
            setCustomProfileFields={setCustomProfileFields}
          />
        );
      case 2:
        return (
          <SourcingDetailsStep
            form={form}
            customSourcingFields={customSourcingFields}
            setCustomSourcingFields={setCustomSourcingFields}
          />
        );
      case 3:
        return <AddressDetailsStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {client ? 'Edit Client' : 'Create New Client'}
          </SheetTitle>
        </SheetHeader>

        <ClientDrawerProgress
          currentStep={currentStep}
          formSections={formSections}
          progress={progress}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {renderCurrentStep()}
            
            <ClientDrawerNavigation
              currentStep={currentStep}
              totalSteps={formSections.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onClose={handleClose}
              isSubmitting={isSubmitting}
              isLastStep={currentStep === formSections.length - 1}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ClientDrawer;

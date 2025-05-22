
import React from 'react';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { useClientDrawerForm } from './drawer/hooks/useClientDrawerForm';
import ClientDrawerProgress from './drawer/ClientDrawerProgress';
import ClientDrawerNavigation from './drawer/ClientDrawerNavigation';

// Import the form steps
import AccountInfoStep from './drawer/AccountInfoStep';
import CompanyProfileStep from './drawer/CompanyProfileStep';
import SourcingDetailsStep from './drawer/SourcingDetailsStep';
import AddressDetailsStep from './drawer/AddressDetailsStep';

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
  const {
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
  } = useClientDrawerForm({
    onClientCreated,
    onClose: () => onOpenChange(false)
  });

  // Effect to update shipping address when billing address changes (if sameAsBilling is true)
  React.useEffect(() => {
    updateShippingAddress();
  }, [sameAsBilling]);

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Client"
      description="Create a new client account in your system."
    >
      {/* Progress indicator */}
      <ClientDrawerProgress
        currentStep={currentStep}
        formSections={formSections}
        progress={progress}
      />

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
          <ClientDrawerNavigation
            currentStep={currentStep}
            totalSteps={formSections.length}
            onPrevious={prevStep}
            onNext={nextStep}
            onClose={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
            isLastStep={currentStep === formSections.length - 1}
          />
        </form>
      </Form>
    </SideDrawer>
  );
};

export default ClientAccountDrawer;

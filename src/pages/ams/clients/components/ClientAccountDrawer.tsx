import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import FormProgressIndicator from './FormProgressIndicator';
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
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formProgress, setFormProgress] = React.useState(0);
  const [sameAsBilling, setSameAsBilling] = React.useState(true);
  const [customAccountFields, setCustomAccountFields] = React.useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = React.useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = React.useState<CustomField[]>([]);
  const [justCreatedClient, setJustCreatedClient] = React.useState<any>(null);

  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  const { toast } = useToast();

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

  React.useEffect(() => {
    const values = form.getValues();
    const fields = Object.keys(values);
    const filledFields = fields.filter(field => {
      const value = values[field as keyof DrawerFormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    const percentage = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(percentage);
  }, [form.watch()]);

  const onSubmit = (values: DrawerFormValues) => {
    const newClient = {
      ...values,
      customFields: {
        account: customAccountFields,
        profile: customProfileFields,
        sourcing: customSourcingFields,
      },
      id: Math.random().toString(36).substring(2, 9),
      name: values.accountName,
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
    };
    setJustCreatedClient(newClient);
    if (onClientCreated) onClientCreated(newClient);
    toast({ title: 'Client Created', description: `Client ${values.accountName} created successfully.` });
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, formSections.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const goToStep = (step: number) => setCurrentStep(step);

  const handleCreateRole = () => {
    // Implement role creation logic/redirect as needed
    toast({ title: 'Create Role', description: `Role creation for ${justCreatedClient?.name} not yet implemented.` });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[80vw] md:w-[50vw] overflow-hidden p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Onboard New Client</SheetTitle>
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
              {currentStep === 0 && (
                <AccountInfoStep 
                  form={form}
                  customAccountFields={customAccountFields}
                  setCustomAccountFields={setCustomAccountFields}
                />
              )}
              {currentStep === 1 && (
                <CompanyProfileStep 
                  form={form}
                  customProfileFields={customProfileFields}
                  setCustomProfileFields={setCustomProfileFields}
                />
              )}
              {currentStep === 2 && (
                <SourcingDetailsStep 
                  form={form}
                  customSourcingFields={customSourcingFields}
                  setCustomSourcingFields={setCustomSourcingFields}
                />
              )}
              {currentStep === 3 && (
                <AddressDetailsStep 
                  form={form}
                  sameAsBilling={sameAsBilling}
                  setSameAsBilling={setSameAsBilling}
                />
              )}
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
            <div className="sticky bottom-0 left-0 w-full bg-white z-10 border-t flex justify-between items-center p-4">
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
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ClientAccountDrawer;

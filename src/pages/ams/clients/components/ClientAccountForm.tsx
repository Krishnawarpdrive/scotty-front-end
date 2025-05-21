
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormProgressIndicator from './FormProgressIndicator';
import AccountInfoStep from './client-form/AccountInfoStep';
import CompanyProfileStep from './client-form/CompanyProfileStep';
import SourcingDetailsStep from './client-form/SourcingDetailsStep';
import AddressDetailsStep from './client-form/AddressDetailsStep';

// Import the client form schema
import { formSchema, FormValues, CustomField } from './client-form/clientFormSchema';

interface ClientAccountFormProps {
  isDrawer?: boolean;
}

const ClientAccountForm: React.FC<ClientAccountFormProps> = ({ isDrawer = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<number | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [formProgress, setFormProgress] = useState(0);
  
  // Custom fields state
  const [customAccountFields, setCustomAccountFields] = useState<CustomField[]>([]);
  const [customProfileFields, setCustomProfileFields] = useState<CustomField[]>([]);
  const [customSourcingFields, setCustomSourcingFields] = useState<CustomField[]>([]);
  
  const formSections = ["Account Information", "Company Profile", "Sourcing Details", "Address Details"];
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      console.log("Form submitted:", values);
      
      toast({
        title: "Success!",
        description: `🎉 Client '${values.accountName}' has been created successfully!`,
      });
      
      // Redirect to clients page after successful submission
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
  }, []);
  
  // Set up auto-save
  useEffect(() => {
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
  }, []);
  
  // Handle navigate away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const isDirty = form.formState.isDirty;
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form.formState.isDirty]);
  
  // Handle step navigation
  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
      formRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      formRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 0 && step < formSections.length) {
      setCurrentStep(step);
      formRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle cancel button
  const handleCancel = () => {
    // Check if form is dirty
    if (form.formState.isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/ams/clients");
      }
    } else {
      navigate("/ams/clients");
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
    <div className={`space-y-4 ${isDrawer ? "" : "w-full"}`}>
      {!isDrawer && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-[#262626]">Add Client Account</h1>
          </div>
          
          <div className="text-gray-600">
            Let's onboard your client — enter their profile, sourcing setup, and contact info to get started.
          </div>
        </>
      )}
      
      <FormProgressIndicator
        steps={formSections}
        currentStep={currentStep}
        onStepClick={goToStep}
        progress={formProgress}
      />
      
      {lastSaved && (
        <div className="text-xs text-gray-500 text-right">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
      
      <div className={`${isDrawer ? "" : "bg-white rounded-md shadow-sm border border-gray-200"} overflow-hidden`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div ref={formRef} className={`p-6 ${isDrawer ? "max-h-[calc(100vh-220px)]" : "max-h-[calc(100vh-320px)]"} overflow-y-auto`}>
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
            
            {/* Sticky footer with navigation buttons */}
            <div className="p-4 border-t bg-white sticky bottom-0 flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
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
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ClientAccountForm;

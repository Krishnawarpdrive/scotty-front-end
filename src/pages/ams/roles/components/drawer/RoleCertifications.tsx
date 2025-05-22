
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues, CustomField } from '../types/roleTypes';
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from 'lucide-react';
import CustomFieldInput from './CustomFieldInput';

interface RoleCertificationsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleCertifications: React.FC<RoleCertificationsProps> = ({ form }) => {
  const [certInput, setCertInput] = useState('');
  const certifications = form.watch('certifications') || [];
  const customFields = form.watch('customFields') || [];

  const handleAddCertification = () => {
    if (certInput.trim() && !certifications.includes(certInput.trim())) {
      const updatedCerts = [...certifications, certInput.trim()];
      form.setValue('certifications', updatedCerts, { shouldValidate: true });
      setCertInput('');
    }
  };

  const handleRemoveCertification = (cert: string) => {
    const updatedCerts = certifications.filter(c => c !== cert);
    form.setValue('certifications', updatedCerts, { shouldValidate: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCertification();
    }
  };

  const handleCustomFieldsChange = (updatedFields: CustomField[]) => {
    form.setValue('customFields', updatedFields, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Certifications</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Required Certifications</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {certifications.map((cert, index) => (
              <Badge 
                key={`${cert}-${index}`} 
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1"
              >
                {cert}
                <button 
                  type="button" 
                  className="ml-1 rounded-full hover:bg-muted" 
                  onClick={() => handleRemoveCertification(cert)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add certification (e.g. AWS Certified, PMP)"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddCertification}
              className="min-w-24"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            Press Enter to add a certification
          </p>
        </div>
        
        <CustomFieldInput 
          section="certifications"
          customFields={customFields}
          onFieldsChange={handleCustomFieldsChange}
        />
      </div>
    </div>
  );
};

export default RoleCertifications;

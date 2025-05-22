
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues, CustomField } from '../types/roleTypes';
import { FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import CustomFieldInput from './CustomFieldInput';

interface RoleCertificationsProps {
  form: UseFormReturn<RoleFormValues>;
}

interface Certification {
  id: string;
  name: string;
  issuer?: string;
}

const RoleCertifications: React.FC<RoleCertificationsProps> = ({ form }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCertifications, setAvailableCertifications] = useState<Certification[]>([]);
  const [customCertification, setCustomCertification] = useState('');
  
  const certifications = form.watch('certifications') || [];
  const customFields = form.watch('customFields') || [];
  
  // Mock certifications (would typically come from an API)
  useEffect(() => {
    const fetchCertifications = async () => {
      // In a real app, this would be an API call to get certifications
      // For now, we'll use mock data
      const mockCertifications: Certification[] = [
        { id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
        { id: "2", name: "Microsoft Certified: Azure Developer", issuer: "Microsoft" },
        { id: "3", name: "Certified Scrum Master (CSM)", issuer: "Scrum Alliance" },
        { id: "4", name: "Project Management Professional (PMP)", issuer: "PMI" },
        { id: "5", name: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC2" },
        { id: "6", name: "Google Professional Cloud Architect", issuer: "Google" },
        { id: "7", name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF" },
        { id: "8", name: "Oracle Certified Professional Java Programmer", issuer: "Oracle" },
        { id: "9", name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco" },
        { id: "10", name: "CompTIA Security+", issuer: "CompTIA" },
      ];
      
      setAvailableCertifications(mockCertifications);
      
      // In a real implementation, you'd do something like:
      // const { data, error } = await supabase.from('certifications').select('*');
      // if (data && !error) {
      //   setAvailableCertifications(data);
      // }
    };
    
    fetchCertifications();
  }, []);
  
  const filteredCertifications = availableCertifications.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cert.issuer && cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const toggleCertification = (certId: string) => {
    const current = [...certifications];
    const index = current.indexOf(certId);
    
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(certId);
    }
    
    form.setValue('certifications', current, { shouldValidate: true });
  };
  
  const addCustomCertification = () => {
    if (customCertification.trim() && !certifications.includes(customCertification)) {
      form.setValue('certifications', [...certifications, customCertification], { shouldValidate: true });
      setCustomCertification('');
    }
  };
  
  const removeCertification = (certId: string) => {
    form.setValue(
      'certifications', 
      certifications.filter(id => id !== certId), 
      { shouldValidate: true }
    );
  };

  const handleCustomFieldsChange = (updatedFields: CustomField[]) => {
    form.setValue('customFields', updatedFields, { shouldValidate: true });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Certifications</h3>
      <div className="space-y-4">
        <div>
          <FormLabel>Selected Certifications</FormLabel>
          <div className="flex flex-wrap gap-2 min-h-12 p-2 border rounded-md bg-muted/20 mt-2">
            {certifications.map(certId => {
              const cert = availableCertifications.find(c => c.id === certId);
              const displayName = cert ? cert.name : certId;
              
              return (
                <Badge key={certId} variant="secondary" className="flex items-center gap-1 py-1">
                  {displayName}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeCertification(certId)}
                  />
                </Badge>
              );
            })}
            {certifications.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No certifications selected yet</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <FormLabel>Available Certifications</FormLabel>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <ScrollArea className="h-[200px] border rounded-md p-2">
            <div className="space-y-2">
              {filteredCertifications.map(cert => (
                <div key={cert.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cert-${cert.id}`}
                    checked={certifications.includes(cert.id)}
                    onCheckedChange={() => toggleCertification(cert.id)}
                  />
                  <Label 
                    htmlFor={`cert-${cert.id}`}
                    className="flex-1 cursor-pointer flex justify-between"
                  >
                    <span>{cert.name}</span>
                    {cert.issuer && (
                      <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                    )}
                  </Label>
                </div>
              ))}
              {filteredCertifications.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No certifications match your search
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="space-y-2">
          <FormLabel>Add Custom Certification</FormLabel>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter certification name" 
              value={customCertification} 
              onChange={e => setCustomCertification(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomCertification();
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={addCustomCertification} 
              type="button"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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

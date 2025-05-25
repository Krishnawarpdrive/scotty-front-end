
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X, Plus, ChevronDown, Award, Clock } from 'lucide-react';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';
import { useRoleLibraries } from '../hooks/useRoleLibraries';

interface EnhancedCertificationsStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
}

const EnhancedCertificationsStep: React.FC<EnhancedCertificationsStepProps> = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const { certificationsLibrary } = useRoleLibraries();
  const selectedCertifications = form.watch('certifications') || [];

  // Filter certifications based on search
  const filteredCertifications = certificationsLibrary.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                         cert.domain.toLowerCase().includes(searchValue.toLowerCase());
    const notSelected = !selectedCertifications.includes(cert.title);
    
    return matchesSearch && notSelected;
  });

  const addCertification = (certTitle: string) => {
    if (certTitle && !selectedCertifications.includes(certTitle)) {
      form.setValue('certifications', [...selectedCertifications, certTitle]);
    }
    setSearchValue('');
    setOpen(false);
  };

  const removeCertification = (certTitle: string) => {
    form.setValue('certifications', selectedCertifications.filter(cert => cert !== certTitle));
  };

  const addCustomCertification = () => {
    if (searchValue && !selectedCertifications.includes(searchValue)) {
      addCertification(searchValue);
    }
  };

  // Group certifications by domain
  const groupedCertifications = filteredCertifications.reduce((acc, cert) => {
    if (!acc[cert.domain]) {
      acc[cert.domain] = [];
    }
    acc[cert.domain].push(cert);
    return acc;
  }, {} as Record<string, typeof filteredCertifications>);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Add relevant certifications for this role. These are optional but can help in candidate evaluation.
          </p>
        </div>

        <FormField
          control={form.control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications (Optional)</FormLabel>
              <div className="space-y-3">
                {/* Certification Input */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between text-left font-normal"
                      >
                        {searchValue || "Search certifications or add custom..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[500px] p-0">
                    <Command shouldFilter={false}>
                      <CommandInput 
                        placeholder="Search certifications..." 
                        value={searchValue}
                        onValueChange={setSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {searchValue && (
                            <div className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-2">
                                Certification "{searchValue}" not found in library.
                              </p>
                              <Button 
                                size="sm" 
                                onClick={addCustomCertification}
                                className="flex items-center gap-1"
                              >
                                <Plus className="h-3 w-3" />
                                Add "{searchValue}"
                              </Button>
                            </div>
                          )}
                        </CommandEmpty>
                        {Object.entries(groupedCertifications).map(([domain, certs]) => (
                          <CommandGroup key={domain} heading={domain}>
                            {certs.map((cert) => (
                              <CommandItem
                                key={cert.id}
                                onSelect={() => addCertification(cert.title)}
                                className="flex items-center justify-between p-3"
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">{cert.title}</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {cert.domain}
                                    </Badge>
                                    {cert.validity_period && (
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {cert.validity_period}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Award className="h-4 w-4 text-muted-foreground" />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected Certifications */}
                {selectedCertifications.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Selected Certifications ({selectedCertifications.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertifications.map((cert) => {
                        const certData = certificationsLibrary.find(c => c.title === cert);
                        return (
                          <Badge key={cert} variant="secondary" className="flex items-center gap-1 p-2">
                            <Award className="h-3 w-3" />
                            <span>{cert}</span>
                            {certData?.validity_period && (
                              <span className="text-xs opacity-70">({certData.validity_period})</span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeCertification(cert)}
                              className="hover:text-destructive ml-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Certifications Summary */}
        {selectedCertifications.length > 0 && (
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4" />
              <span className="font-medium">Certifications Summary</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedCertifications.length} certification{selectedCertifications.length !== 1 ? 's' : ''} selected. 
              These will be considered during candidate evaluation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCertificationsStep;


import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Award, Calendar, Building } from 'lucide-react';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';

interface CertificationsStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
}

// Mock certifications data
const certificationLibrary = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    provider: 'Amazon Web Services',
    validityPeriod: '3 years',
    relevantFor: ['Software Engineer', 'DevOps Engineer', 'Cloud Architect']
  },
  {
    id: '2',
    title: 'Certified Scrum Master (CSM)',
    provider: 'Scrum Alliance',
    validityPeriod: '2 years',
    relevantFor: ['Product Manager', 'Project Manager', 'Scrum Master']
  },
  {
    id: '3',
    title: 'Google UX Design Certificate',
    provider: 'Google',
    validityPeriod: 'Lifetime',
    relevantFor: ['UX Designer', 'Product Designer', 'UI Designer']
  },
  {
    id: '4',
    title: 'PMP - Project Management Professional',
    provider: 'PMI',
    validityPeriod: '3 years',
    relevantFor: ['Product Manager', 'Project Manager', 'Program Manager']
  },
  {
    id: '5',
    title: 'React Developer Certification',
    provider: 'Meta',
    validityPeriod: '2 years',
    relevantFor: ['Frontend Developer', 'Software Engineer', 'Full Stack Developer']
  }
];

const CertificationsStep: React.FC<CertificationsStepProps> = ({ form }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customCertification, setCustomCertification] = useState('');

  const roleName = form.watch('roleName');
  const selectedCertifications = form.watch('certifications') || [];

  // Filter certifications based on role relevance and search term
  const filteredCertifications = certificationLibrary.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const isRelevant = cert.relevantFor.some(role => 
      role.toLowerCase().includes(roleName.toLowerCase()) || 
      roleName.toLowerCase().includes(role.toLowerCase())
    );
    return matchesSearch && (searchTerm || isRelevant);
  });

  const addCertification = (certTitle: string) => {
    if (certTitle && !selectedCertifications.includes(certTitle)) {
      form.setValue('certifications', [...selectedCertifications, certTitle]);
    }
  };

  const removeCertification = (certToRemove: string) => {
    form.setValue('certifications', selectedCertifications.filter(cert => cert !== certToRemove));
  };

  const addCustomCertification = () => {
    if (customCertification && !selectedCertifications.includes(customCertification)) {
      addCertification(customCertification);
      setCustomCertification('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Select relevant certifications for this role. This step is optional but helps attract qualified candidates.
          </p>
        </div>

        {/* Search Certifications */}
        <FormField
          control={form.control}
          name="certifications"
          render={() => (
            <FormItem>
              <FormLabel>Search Certifications</FormLabel>
              <Input
                placeholder="Search for certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormItem>
          )}
        />

        {/* Custom Certification Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Add custom certification..."
            value={customCertification}
            onChange={(e) => setCustomCertification(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomCertification();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomCertification}
            disabled={!customCertification}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Certifications */}
        {selectedCertifications.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Certifications ({selectedCertifications.length})</label>
            <div className="flex flex-wrap gap-2">
              {selectedCertifications.map((cert) => (
                <Badge key={cert} variant="default" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(cert)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Certification Library */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">
            {searchTerm ? 'Search Results' : `Recommended for ${roleName}`}
          </h4>
          
          {filteredCertifications.length > 0 ? (
            <div className="grid gap-3">
              {filteredCertifications.map((cert) => (
                <Card 
                  key={cert.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedCertifications.includes(cert.title) 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => addCertification(cert.title)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <h5 className="font-medium">{cert.title}</h5>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            <span>{cert.provider}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Valid for {cert.validityPeriod}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {cert.relevantFor.map((role) => (
                            <Badge key={role} variant="outline" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {selectedCertifications.includes(cert.title) && (
                        <Badge variant="default" className="ml-2">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg">
              <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No certifications found matching your search.' : 'No relevant certifications found.'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You can add custom certifications using the input above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsStep;

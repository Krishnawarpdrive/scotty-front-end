
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Award } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  validUntil: string;
  verified: boolean;
}

interface CertificationsData {
  hasCertifications: boolean;
  certificationsList: Certification[];
  relevanceToRole: string;
}

interface CertificationsSectionProps {
  data: CertificationsData;
  onChange: (data: CertificationsData) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  data,
  onChange
}) => {
  const addCertification = () => {
    const newCertification: Certification = {
      name: '',
      issuer: '',
      validUntil: '',
      verified: false
    };
    onChange({
      ...data,
      certificationsList: [...data.certificationsList, newCertification]
    });
  };

  const updateCertification = (index: number, field: keyof Certification, value: string | boolean) => {
    const updated = data.certificationsList.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange({ ...data, certificationsList: updated });
  };

  const removeCertification = (index: number) => {
    const updated = data.certificationsList.filter((_, i) => i !== index);
    onChange({ ...data, certificationsList: updated });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Certifications & Qualifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasCertifications"
            checked={data.hasCertifications}
            onCheckedChange={(checked) => 
              onChange({ ...data, hasCertifications: checked as boolean })
            }
          />
          <Label htmlFor="hasCertifications">
            Candidate has relevant certifications
          </Label>
        </div>

        {data.hasCertifications && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Certifications List</h3>
              <Button onClick={addCertification} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </div>

            <div className="space-y-4">
              {data.certificationsList.map((cert, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border rounded-lg">
                  <div>
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                  </div>
                  
                  <div>
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                  
                  <div>
                    <Label>Valid Until</Label>
                    <Input
                      type="date"
                      value={cert.validUntil}
                      onChange={(e) => updateCertification(index, 'validUntil', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`verified-${index}`}
                        checked={cert.verified}
                        onCheckedChange={(checked) => 
                          updateCertification(index, 'verified', checked as boolean)
                        }
                      />
                      <Label htmlFor={`verified-${index}`}>Verified</Label>
                    </div>
                    {cert.verified && (
                      <Badge variant="default" className="mt-1 w-fit">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      onClick={() => removeCertification(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="relevanceToRole">Relevance to Applied Role</Label>
              <Textarea
                id="relevanceToRole"
                value={data.relevanceToRole}
                onChange={(e) => onChange({ ...data, relevanceToRole: e.target.value })}
                placeholder="Describe how these certifications are relevant to the position..."
                rows={3}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

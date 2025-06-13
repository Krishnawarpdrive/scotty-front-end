
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CertificationTable from './certifications/components/CertificationTable';
import CertificationFormDrawer from './certifications/components/CertificationFormDrawer';

const mockCertifications = [
  {
    id: 1,
    title: 'AWS Solutions Architect',
    domain: 'Cloud Computing',
    validityPeriod: '3 Years',
    issuedBy: 'Amazon Web Services',
    description: 'Professional-level certification for designing distributed systems on AWS',
    status: 'active'
  },
  {
    id: 2,
    title: 'PMP Certification',
    domain: 'Project Management',
    validityPeriod: '3 Years',
    issuedBy: 'PMI',
    description: 'Project Management Professional certification',
    status: 'active'
  },
  {
    id: 3,
    title: 'CISSP',
    domain: 'Cybersecurity',
    validityPeriod: '3 Years',
    issuedBy: 'ISC2',
    description: 'Certified Information Systems Security Professional',
    status: 'active'
  }
];

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState(mockCertifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<any>(null);
  const { toast } = useToast();

  const filteredCertifications = certifications.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCertification = () => {
    setEditingCertification(null);
    setIsDrawerOpen(true);
  };

  const handleEditCertification = (certification: any) => {
    setEditingCertification(certification);
    setIsDrawerOpen(true);
  };

  const handleDeleteCertification = (id: number) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
    toast({
      title: "Certification Deleted",
      description: "The certification has been removed from the library."
    });
  };

  const handleCertificationCreated = (certificationData: any) => {
    if (editingCertification) {
      setCertifications(prev => 
        prev.map(cert => 
          cert.id === editingCertification.id 
            ? { ...cert, ...certificationData }
            : cert
        )
      );
    } else {
      const newCertification = {
        ...certificationData,
        id: Math.max(...certifications.map(c => c.id)) + 1
      };
      setCertifications(prev => [...prev, newCertification]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-gray-600 mt-1">Manage certification library and requirements</p>
        </div>
        <Button onClick={handleCreateCertification} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Certification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certification Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certifications by title, domain, or issuer..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {filteredCertifications.length > 0 ? (
              <CertificationTable 
                certifications={filteredCertifications}
                onEdit={handleEditCertification}
                onDelete={handleDeleteCertification}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No certifications found
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first certification'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <CertificationFormDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onCertificationCreated={handleCertificationCreated}
        certification={editingCertification}
      />
    </div>
  );
};

export default CertificationsPage;

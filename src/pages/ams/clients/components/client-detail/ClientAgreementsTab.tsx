
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  PlusCircle, FileText, Download, Eye, Calendar, X 
} from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientAgreementsTabProps {
  client: Client;
}

interface Agreement {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  fileUrl: string;
}

const ClientAgreementsTab: React.FC<ClientAgreementsTabProps> = ({ client }) => {
  // Demo agreements data
  const agreements: Agreement[] = [
    {
      id: '1',
      name: 'Master Service Agreement',
      type: 'MSA',
      uploadDate: '2025-01-15',
      expiryDate: '2026-01-15',
      status: 'Active',
      fileUrl: '#'
    },
    {
      id: '2',
      name: 'Statement of Work',
      type: 'SOW',
      uploadDate: '2025-02-20',
      expiryDate: '2025-08-20',
      status: 'Active',
      fileUrl: '#'
    },
    {
      id: '3',
      name: 'Non-Disclosure Agreement',
      type: 'NDA',
      uploadDate: '2024-12-05',
      expiryDate: '2025-12-05',
      status: 'Active',
      fileUrl: '#'
    },
    {
      id: '4',
      name: 'Prior Agreement',
      type: 'Contract',
      uploadDate: '2024-06-10',
      expiryDate: '2025-01-10',
      status: 'Expired',
      fileUrl: '#'
    }
  ];

  const [showUploadForm, setShowUploadForm] = useState(false);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client Agreements</h2>
        <Button 
          onClick={toggleUploadForm}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Agreement
        </Button>
      </div>
      
      {/* Upload Form */}
      {showUploadForm && (
        <Card className="p-6 bg-muted/20 border-dashed">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Upload New Agreement</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleUploadForm}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Agreement Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md" 
                placeholder="Enter agreement name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Agreement Type</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">Select type</option>
                <option value="MSA">Master Service Agreement</option>
                <option value="SOW">Statement of Work</option>
                <option value="NDA">Non-Disclosure Agreement</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border rounded-md" 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border rounded-md" 
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium">File Upload</label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
              <input type="file" className="hidden" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={toggleUploadForm}>Cancel</Button>
            <Button>Upload Agreement</Button>
          </div>
        </Card>
      )}
      
      {agreements.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agreement Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agreements.map((agreement) => (
                  <TableRow key={agreement.id}>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {agreement.name}
                    </TableCell>
                    <TableCell>{agreement.type}</TableCell>
                    <TableCell>{agreement.uploadDate}</TableCell>
                    <TableCell>{agreement.expiryDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeClass(agreement.status)}>
                        {agreement.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Set Calendar Reminder"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="text-center p-12 bg-muted/20 rounded-lg border">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Agreements Found</h3>
          <p className="text-muted-foreground mb-6">
            Upload your first agreement to get started.
          </p>
          <Button onClick={toggleUploadForm} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Upload Agreement
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientAgreementsTab;

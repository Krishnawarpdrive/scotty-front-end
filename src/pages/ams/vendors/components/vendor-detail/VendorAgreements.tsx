
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  FileTextIcon, 
  SearchIcon,
  UploadIcon,
  DownloadIcon,
  CalendarIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MoreHorizontalIcon,
  EditIcon,
  EyeIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Vendor } from '../../types/VendorTypes';
import { format, isAfter, differenceInDays } from 'date-fns';

interface VendorAgreementsProps {
  vendor: Vendor;
}

interface Agreement {
  id: string;
  name: string;
  type: 'MSA' | 'SOW' | 'SLA' | 'NDA' | 'Amendment';
  status: 'Active' | 'Expired' | 'Expiring Soon' | 'Draft' | 'Under Review';
  startDate: string;
  endDate: string;
  paymentTerms: string;
  documentUrl?: string;
  reminderSet: boolean;
}

const mockAgreements: Agreement[] = [
  {
    id: '1',
    name: 'Master Service Agreement 2024',
    type: 'MSA',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    paymentTerms: 'Net 30',
    documentUrl: '/documents/msa-2024.pdf',
    reminderSet: true
  },
  {
    id: '2',
    name: 'Statement of Work - Q1 2024',
    type: 'SOW',
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-03-31',
    paymentTerms: 'Net 15',
    documentUrl: '/documents/sow-q1-2024.pdf',
    reminderSet: true
  },
  {
    id: '3',
    name: 'Service Level Agreement',
    type: 'SLA',
    status: 'Expiring Soon',
    startDate: '2023-06-01',
    endDate: '2024-02-15',
    paymentTerms: 'Net 30',
    documentUrl: '/documents/sla-2023.pdf',
    reminderSet: true
  },
  {
    id: '4',
    name: 'Non-Disclosure Agreement',
    type: 'NDA',
    status: 'Active',
    startDate: '2023-12-01',
    endDate: '2025-12-01',
    paymentTerms: 'N/A',
    documentUrl: '/documents/nda-2023.pdf',
    reminderSet: false
  }
];

export const VendorAgreements: React.FC<VendorAgreementsProps> = ({ vendor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getStatusBadgeVariant = (status: Agreement['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Expired': return 'destructive';
      case 'Expiring Soon': return 'secondary';
      case 'Draft': return 'outline';
      case 'Under Review': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: Agreement['status']) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'Expired': return <AlertTriangleIcon className="h-4 w-4 text-red-600" />;
      case 'Expiring Soon': return <ClockIcon className="h-4 w-4 text-orange-600" />;
      case 'Draft': return <FileTextIcon className="h-4 w-4 text-gray-600" />;
      case 'Under Review': return <ClockIcon className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getDaysUntilExpiry = (endDate: string) => {
    return differenceInDays(new Date(endDate), new Date());
  };

  const columns: DataTableColumn<Agreement>[] = [
    {
      id: 'name',
      header: 'Agreement Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (agreement) => (
        <div className="space-y-1">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-left">
            {agreement.name}
          </button>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {agreement.type}
            </Badge>
            {agreement.reminderSet && (
              <Badge variant="secondary" className="text-xs">
                Reminder Set
              </Badge>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: true,
      enableFiltering: true,
      cell: (agreement) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(agreement.status)}
          <Badge variant={getStatusBadgeVariant(agreement.status)}>
            {agreement.status}
          </Badge>
        </div>
      )
    },
    {
      id: 'dates',
      header: 'Period',
      enableSorting: true,
      cell: (agreement) => (
        <div className="space-y-1">
          <div className="text-sm">
            {format(new Date(agreement.startDate), 'MMM dd, yyyy')} -
          </div>
          <div className="text-sm">
            {format(new Date(agreement.endDate), 'MMM dd, yyyy')}
          </div>
          {agreement.status === 'Expiring Soon' && (
            <div className="text-xs text-orange-600">
              {getDaysUntilExpiry(agreement.endDate)} days left
            </div>
          )}
        </div>
      )
    },
    {
      id: 'paymentTerms',
      header: 'Payment Terms',
      enableSorting: true,
      cell: (agreement) => (
        <span className="text-sm">{agreement.paymentTerms}</span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (agreement) => (
        <div className="flex items-center gap-2">
          {agreement.documentUrl && (
            <Button variant="ghost" size="sm">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EditIcon className="h-4 w-4 mr-2" />
                Edit Agreement
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Set Reminder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  const filteredAgreements = mockAgreements.filter(agreement => {
    const matchesSearch = agreement.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    const matchesType = typeFilter === 'all' || agreement.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const expiringAgreements = mockAgreements.filter(agreement => 
    agreement.status === 'Expiring Soon' || agreement.status === 'Expired'
  );

  return (
    <div className="space-y-6">
      {/* Alert for expiring agreements */}
      {expiringAgreements.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium text-orange-800">
                  {expiringAgreements.length} Agreement(s) Need Attention
                </div>
                <div className="text-sm text-orange-700">
                  Some agreements are expiring soon or have already expired
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5" />
              Agreements & Contracts ({filteredAgreements.length})
            </CardTitle>
            <Button>
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Agreement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MSA">MSA</SelectItem>
                <SelectItem value="SOW">SOW</SelectItem>
                <SelectItem value="SLA">SLA</SelectItem>
                <SelectItem value="NDA">NDA</SelectItem>
                <SelectItem value="Amendment">Amendment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            data={filteredAgreements}
            columns={columns}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockAgreements.filter(a => a.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Agreements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {mockAgreements.filter(a => a.status === 'Expiring Soon').length}
            </div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {mockAgreements.filter(a => a.status === 'Expired').length}
            </div>
            <div className="text-sm text-gray-600">Expired</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {mockAgreements.filter(a => a.reminderSet).length}
            </div>
            <div className="text-sm text-gray-600">With Reminders</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { Vendor, VendorRole, VendorSubmission } from '../types/VendorTypes';

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'TechTalent Solutions',
    vendorId: 'TTS-001',
    contactInfo: {
      email: 'contact@techtalent.com',
      phone: '+1-555-0123',
      primaryContact: 'Sarah Johnson',
      address: '123 Tech Street, Silicon Valley, CA'
    },
    status: 'Active',
    tier: 'Premium',
    rating: 4.5,
    slaStatus: 'Good',
    contractStatus: 'Active',
    rolesAssigned: 8,
    activeRequirements: 5,
    lastActiveDate: '2024-01-15T10:30:00Z',
    performanceMetrics: {
      qualityScore: 92,
      timelinessScore: 88,
      complianceScore: 95,
      submissionRate: 85,
      interviewRate: 72,
      offerRate: 45
    },
    billing: {
      totalInvoiced: 125000,
      pendingDues: 15000,
      lastPaymentDate: '2024-01-10T00:00:00Z'
    },
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Global Recruiters Inc',
    vendorId: 'GRI-002',
    contactInfo: {
      email: 'info@globalrecruiters.com',
      phone: '+1-555-0456',
      primaryContact: 'Michael Chen',
      address: '456 Business Ave, New York, NY'
    },
    status: 'Active',
    tier: 'Standard',
    rating: 3.8,
    slaStatus: 'Warning',
    contractStatus: 'Active',
    rolesAssigned: 5,
    activeRequirements: 3,
    lastActiveDate: '2024-01-14T16:20:00Z',
    performanceMetrics: {
      qualityScore: 78,
      timelinessScore: 65,
      complianceScore: 82,
      submissionRate: 70,
      interviewRate: 58,
      offerRate: 32
    },
    billing: {
      totalInvoiced: 85000,
      pendingDues: 8500,
      lastPaymentDate: '2024-01-05T00:00:00Z'
    },
    createdAt: '2023-08-20T00:00:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '3',
    name: 'Executive Search Partners',
    vendorId: 'ESP-003',
    contactInfo: {
      email: 'partners@execsearch.com',
      phone: '+1-555-0789',
      primaryContact: 'Emily Davis',
      address: '789 Executive Plaza, Chicago, IL'
    },
    status: 'Active',
    tier: 'Premium',
    rating: 4.8,
    slaStatus: 'Good',
    contractStatus: 'Active',
    rolesAssigned: 3,
    activeRequirements: 2,
    lastActiveDate: '2024-01-15T08:45:00Z',
    performanceMetrics: {
      qualityScore: 96,
      timelinessScore: 94,
      complianceScore: 98,
      submissionRate: 90,
      interviewRate: 85,
      offerRate: 65
    },
    billing: {
      totalInvoiced: 200000,
      pendingDues: 0,
      lastPaymentDate: '2024-01-12T00:00:00Z'
    },
    createdAt: '2023-05-10T00:00:00Z',
    updatedAt: '2024-01-15T08:45:00Z'
  }
];

export const getMockVendorRoles = (vendorId: string): VendorRole[] => [
  {
    id: '1',
    vendorId,
    roleId: 'role-1',
    roleName: 'Senior Software Engineer',
    clientName: 'TechCorp Inc',
    vacancies: 3,
    filledPositions: 1,
    deadline: '2024-02-15',
    status: 'Active',
    priority: 'High'
  },
  {
    id: '2',
    vendorId,
    roleId: 'role-2',
    roleName: 'Product Manager',
    clientName: 'InnovateCorp',
    vacancies: 2,
    filledPositions: 0,
    deadline: '2024-02-28',
    status: 'Active',
    priority: 'Medium'
  }
];

export const getMockVendorSubmissions = (vendorId: string): VendorSubmission[] => [
  {
    id: '1',
    candidateName: 'John Doe',
    roleName: 'Senior Software Engineer',
    submissionDate: '2024-01-10',
    status: 'Interview',
    stage: 'Technical Interview'
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    roleName: 'Product Manager',
    submissionDate: '2024-01-12',
    status: 'Shortlisted',
    stage: 'Initial Screening'
  }
];

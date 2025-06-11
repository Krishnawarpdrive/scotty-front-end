
// Unified Mock Data Generator for Cross-Module Testing
import { UnifiedVendor, UnifiedRole, UnifiedRequirement, UnifiedClient, UnifiedCandidate } from './unified-types';

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Helper function to generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Mock Vendors
export const generateMockVendors = (count: number = 10): UnifiedVendor[] => {
  const vendors: UnifiedVendor[] = [];
  const vendorNames = [
    'TechTalent Solutions', 'Global Recruiters Inc', 'Executive Search Partners',
    'Digital Workforce Co', 'Innovation Staffing', 'Elite Tech Recruiting',
    'Smart Hire Solutions', 'Premier Talent Group', 'NextGen Recruiters'
  ];

  for (let i = 0; i < count; i++) {
    vendors.push({
      id: generateId(),
      name: vendorNames[i % vendorNames.length] + (i > vendorNames.length - 1 ? ` ${Math.floor(i / vendorNames.length) + 1}` : ''),
      vendor_id: `VND-${String(i + 1).padStart(3, '0')}`,
      contact_info: {
        email: `contact@vendor${i + 1}.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        primary_contact: `Contact Person ${i + 1}`,
        address: `${i + 1}00 Business Street, City, State`
      },
      status: ['Active', 'Inactive', 'Paused'][Math.floor(Math.random() * 3)] as any,
      tier: ['Premium', 'Standard', 'Basic'][Math.floor(Math.random() * 3)] as any,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
      sla_status: ['Good', 'Warning', 'Breach'][Math.floor(Math.random() * 3)] as any,
      contract_status: ['Active', 'Expired', 'Pending'][Math.floor(Math.random() * 3)] as any,
      roles_assigned: Math.floor(Math.random() * 10) + 1,
      active_requirements: Math.floor(Math.random() * 5) + 1,
      last_active_date: randomDate(new Date(2024, 0, 1), new Date()),
      performance_metrics: {
        quality_score: Math.floor(Math.random() * 40) + 60, // 60-100
        timeliness_score: Math.floor(Math.random() * 40) + 60,
        compliance_score: Math.floor(Math.random() * 40) + 60,
        submission_rate: Math.floor(Math.random() * 40) + 60,
        interview_rate: Math.floor(Math.random() * 30) + 50,
        offer_rate: Math.floor(Math.random() * 30) + 30
      },
      billing_info: {
        total_invoiced: Math.floor(Math.random() * 200000) + 50000,
        pending_dues: Math.floor(Math.random() * 20000),
        last_payment_date: randomDate(new Date(2024, 0, 1), new Date())
      },
      created_at: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
      updated_at: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  return vendors;
};

// Mock Roles
export const generateMockRoles = (count: number = 20): UnifiedRole[] => {
  const roles: UnifiedRole[] = [];
  const roleNames = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 'DevOps Engineer',
    'UX Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Business Analyst', 'Project Manager', 'QA Engineer', 'Security Engineer'
  ];

  const categories = ['Engineering', 'Product', 'Design', 'Operations', 'Analytics'];
  const workModes = ['Remote', 'On-site', 'Hybrid'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

  for (let i = 0; i < count; i++) {
    roles.push({
      id: generateId(),
      name: roleNames[i % roleNames.length],
      external_name: `Senior ${roleNames[i % roleNames.length]}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      employment_type: employmentTypes[Math.floor(Math.random() * employmentTypes.length)] as any,
      work_mode: workModes[Math.floor(Math.random() * workModes.length)] as any,
      min_experience: `${Math.floor(Math.random() * 3) + 1} years`,
      max_experience: `${Math.floor(Math.random() * 5) + 4} years`,
      job_description: `Detailed job description for ${roleNames[i % roleNames.length]} position.`,
      is_template: Math.random() > 0.5,
      source_type: Math.random() > 0.5 ? 'template' : 'custom',
      client_id: Math.random() > 0.3 ? generateId() : undefined,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'].slice(0, Math.floor(Math.random() * 3) + 2),
      certifications: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'].slice(0, Math.floor(Math.random() * 2) + 1),
      custom_fields: {},
      created_at: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
      updated_at: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  return roles;
};

// Mock Requirements
export const generateMockRequirements = (count: number = 15): UnifiedRequirement[] => {
  const requirements: UnifiedRequirement[] = [];
  const statuses = ['Open', 'In Progress', 'Closed', 'On Hold'];
  const priorities = ['High', 'Medium', 'Low'];

  for (let i = 0; i < count; i++) {
    requirements.push({
      id: generateId(),
      name: `Requirement ${i + 1}`,
      description: `Detailed requirement description for position ${i + 1}`,
      role_id: generateId(),
      client_id: generateId(),
      vacancies: Math.floor(Math.random() * 5) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      priority: priorities[Math.floor(Math.random() * priorities.length)] as any,
      due_date: randomDate(new Date(), new Date(2024, 11, 31)),
      assigned_to: `TA ${i + 1}`,
      hiring_manager: `Manager ${i + 1}`,
      custom_jd: Math.random() > 0.7 ? 'Custom job description provided' : undefined,
      budget_variance: Math.random() > 0.8 ? '±10%' : undefined,
      experience_variance: Math.random() > 0.8 ? '±1 year' : undefined,
      created_at: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
      updated_at: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  return requirements;
};

// Mock Clients
export const generateMockClients = (count: number = 12): UnifiedClient[] => {
  const clients: UnifiedClient[] = [];
  const clientNames = [
    'TechCorp Inc', 'InnovateDB', 'Digital Solutions Ltd', 'Future Systems',
    'Smart Tech Co', 'Global Innovations', 'NextGen Corp', 'Alpha Technologies'
  ];

  const tiers = ['Premium', 'Standard', 'Basic'];
  const statuses = ['Active', 'Inactive', 'Paused'];

  for (let i = 0; i < count; i++) {
    clients.push({
      id: generateId(),
      name: clientNames[i % clientNames.length] + (i > clientNames.length - 1 ? ` ${Math.floor(i / clientNames.length) + 1}` : ''),
      email: `contact@client${i + 1}.com`,
      contact: `Contact Person ${i + 1}`,
      account_type: Math.random() > 0.5 ? 'Enterprise' : 'SMB',
      client_tier: tiers[Math.floor(Math.random() * tiers.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      hiring_status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      assigned_hr: `HR Rep ${i + 1}`,
      total_requirements: Math.floor(Math.random() * 20) + 1,
      budget_utilized: Math.floor(Math.random() * 500000) + 100000,
      health_score: Math.floor(Math.random() * 40) + 60,
      last_activity_date: randomDate(new Date(2024, 0, 1), new Date()),
      notes: Math.random() > 0.7 ? 'Important client notes here' : undefined,
      created_at: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
      updated_at: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  return clients;
};

// Export all mock data
export const mockData = {
  vendors: generateMockVendors(),
  roles: generateMockRoles(),
  requirements: generateMockRequirements(),
  clients: generateMockClients(),
};

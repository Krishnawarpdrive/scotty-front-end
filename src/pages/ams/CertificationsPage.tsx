
import { PageHeader } from '@/components/layout/PageHeader';

const CertificationsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Certifications" 
        subtitle="Manage certification requirements and templates"
      />
      
      <div className="bg-white rounded-lg border p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Certifications Management</h3>
        <p className="text-gray-500">
          This page will contain certification management functionality.
        </p>
      </div>
    </div>
  );
};

export default CertificationsPage;

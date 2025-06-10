
import { PageHeader } from '@/components/layout/PageHeader';

const RequirementsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Requirements" 
        subtitle="Manage job requirements and postings"
      />
      
      <div className="bg-white rounded-lg border p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements Management</h3>
        <p className="text-gray-500">
          This page will contain requirements management functionality.
        </p>
      </div>
    </div>
  );
};

export default RequirementsPage;

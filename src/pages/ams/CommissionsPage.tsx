
import { PageHeader } from '@/components/layout/PageHeader';

const CommissionsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Commissions" 
        subtitle="Manage commission structures and tracking"
      />
      
      <div className="bg-white rounded-lg border p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Commission Management</h3>
        <p className="text-gray-500">
          This page will contain commission management functionality.
        </p>
      </div>
    </div>
  );
};

export default CommissionsPage;

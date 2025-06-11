
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RolesLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Roles Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Roles library functionality will be implemented here.</p>
          {/* Search term: {searchTerm} */}
        </CardContent>
      </Card>
    </div>
  );
};

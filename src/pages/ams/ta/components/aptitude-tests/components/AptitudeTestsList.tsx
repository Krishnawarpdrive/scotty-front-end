
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AptitudeTest } from '../types/AptitudeTestTypes';
import { AptitudeTestCard } from './AptitudeTestCard';
import { Plus, Search, Filter } from 'lucide-react';

interface AptitudeTestsListProps {
  tests: AptitudeTest[];
  loading: boolean;
  onCreateTest: () => void;
  onEditTest: (test: AptitudeTest) => void;
  onDeleteTest: (id: string) => void;
  onViewTest: (test: AptitudeTest) => void;
}

export const AptitudeTestsList: React.FC<AptitudeTestsListProps> = ({
  tests,
  loading,
  onCreateTest,
  onEditTest,
  onDeleteTest,
  onViewTest
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(tests.map(test => test.category)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading aptitude tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aptitude Tests</h2>
          <p className="text-gray-600">Manage and administer aptitude tests for candidates</p>
        </div>
        <Button onClick={onCreateTest} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Test
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tests by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test results summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredTests.length} of {tests.length} tests
        </span>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {tests.filter(t => t.is_active).length} Active
          </Badge>
          <Badge variant="secondary">
            {tests.filter(t => !t.is_active).length} Inactive
          </Badge>
        </div>
      </div>

      {/* Tests grid */}
      {filteredTests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by creating your first aptitude test.'
              }
            </p>
            {(!searchTerm && selectedCategory === 'all') && (
              <Button onClick={onCreateTest} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Test
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <AptitudeTestCard
              key={test.id}
              test={test}
              onEdit={onEditTest}
              onDelete={onDeleteTest}
              onView={onViewTest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

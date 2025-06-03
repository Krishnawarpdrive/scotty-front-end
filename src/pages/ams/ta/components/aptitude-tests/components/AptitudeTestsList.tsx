
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AptitudeTestCard } from './AptitudeTestCard';
import { AptitudeTest } from '../types/AptitudeTestTypes';
import { Search, Filter, Plus } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (test.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || test.difficulty_level === difficultyFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' ? test.is_active : !test.is_active);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-48 bg-gray-100" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aptitude Tests</h2>
          <p className="text-gray-600">Manage and create aptitude tests for candidates</p>
        </div>
        <Button onClick={onCreateTest} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Test
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="cognitive">Cognitive</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tests Grid */}
      {filteredTests.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || categoryFilter !== 'all' || difficultyFilter !== 'all' || statusFilter !== 'all'
                  ? 'No tests match your filters'
                  : 'No tests created yet'
                }
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || categoryFilter !== 'all' || difficultyFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters'
                  : 'Create your first aptitude test to get started'
                }
              </p>
              {!searchTerm && categoryFilter === 'all' && difficultyFilter === 'all' && statusFilter === 'all' && (
                <Button onClick={onCreateTest}>
                  Create Your First Test
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map(test => (
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

      {/* Summary */}
      <div className="text-sm text-gray-600 text-center">
        Showing {filteredTests.length} of {tests.length} tests
      </div>
    </div>
  );
};

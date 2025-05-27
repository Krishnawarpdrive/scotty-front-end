
import React from 'react';
import { SemanticSearch } from '@/design-system/components/SemanticSearch/SemanticSearch';
import { SemanticSearchResult } from '@/hooks/useSemanticSearch';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { Brain } from 'lucide-react';

const SearchPage: React.FC = () => {
  const handleResultSelect = (result: SemanticSearchResult) => {
    console.log('Selected result:', result);
    // Navigate to the appropriate page based on result type
    // This can be implemented based on your routing structure
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="AI-Powered Search"
        subtitle="Search across roles, requirements, clients, and skills using natural language"
        breadcrumbs={[
          { label: 'AMS', href: '/ams' },
          { label: 'AI Search' }
        ]}
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 text-center">
          <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Semantic Search
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use natural language to find exactly what you're looking for. 
            Our AI understands context and meaning, not just keywords.
          </p>
        </div>

        <SemanticSearch 
          onResultSelect={handleResultSelect}
          className="mb-8"
        />

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            How to use semantic search:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">For Roles:</h4>
              <ul className="space-y-1">
                <li>• "Senior developer with React and Node.js"</li>
                <li>• "Marketing manager with social media experience"</li>
                <li>• "Data scientist machine learning Python"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">For Skills:</h4>
              <ul className="space-y-1">
                <li>• "Frontend web development technologies"</li>
                <li>• "Cloud computing and DevOps tools"</li>
                <li>• "Mobile app development frameworks"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

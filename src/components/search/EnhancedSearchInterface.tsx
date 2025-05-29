
import React, { useState } from 'react';
import { SemanticSearchBar } from './SemanticSearchBar';
import { SemanticSearchResults } from './SemanticSearchResults';
import { SemanticSearchResult } from '@/hooks/useSemanticSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Search as SearchIcon } from 'lucide-react';

interface EnhancedSearchInterfaceProps {
  onResultSelect?: (result: SemanticSearchResult) => void;
  className?: string;
}

export const EnhancedSearchInterface: React.FC<EnhancedSearchInterfaceProps> = ({
  onResultSelect,
  className
}) => {
  const [semanticResults, setSemanticResults] = useState<SemanticSearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'semantic' | 'traditional'>('semantic');

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            AI-Powered Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="semantic" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Semantic Search
              </TabsTrigger>
              <TabsTrigger value="traditional" className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                Traditional Search
              </TabsTrigger>
            </TabsList>

            <TabsContent value="semantic" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Search by meaning and context
                </h3>
                <p className="text-xs text-gray-500">
                  Find results based on semantic similarity, not just keywords. 
                  Try: "frontend developer with React experience" or "data scientist machine learning"
                </p>
              </div>
              
              <SemanticSearchBar
                placeholder="Describe what you're looking for..."
                onResults={setSemanticResults}
              />
              
              <SemanticSearchResults
                results={semanticResults}
                onResultClick={onResultSelect}
              />
            </TabsContent>

            <TabsContent value="traditional" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Traditional keyword search
                </h3>
                <p className="text-xs text-gray-500">
                  Search using exact keywords and filters.
                </p>
              </div>
              
              {/* Placeholder for traditional search - you can integrate your existing search here */}
              <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
                Traditional search interface can be integrated here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

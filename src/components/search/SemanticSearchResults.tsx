
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Briefcase, Star, Globe } from 'lucide-react';
import { SemanticSearchResult } from '@/hooks/useSemanticSearch';
import { cn } from '@/lib/utils';

interface SemanticSearchResultsProps {
  results: SemanticSearchResult[];
  onResultClick?: (result: SemanticSearchResult) => void;
  className?: string;
}

const getTableIcon = (tableName: string) => {
  switch (tableName) {
    case 'roles': return <Briefcase className="h-4 w-4" />;
    case 'requirements': return <FileText className="h-4 w-4" />;
    case 'clients': return <Users className="h-4 w-4" />;
    case 'skills': return <Star className="h-4 w-4" />;
    case 'global_roles': return <Globe className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getTableLabel = (tableName: string) => {
  switch (tableName) {
    case 'roles': return 'Role';
    case 'requirements': return 'Requirement';
    case 'clients': return 'Client';
    case 'skills': return 'Skill';
    case 'global_roles': return 'Global Role';
    default: return tableName;
  }
};

const getTableColor = (tableName: string) => {
  switch (tableName) {
    case 'roles': return 'bg-blue-100 text-blue-800';
    case 'requirements': return 'bg-green-100 text-green-800';
    case 'clients': return 'bg-purple-100 text-purple-800';
    case 'skills': return 'bg-orange-100 text-orange-800';
    case 'global_roles': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSimilarityColor = (similarity: number) => {
  if (similarity >= 0.8) return 'text-green-600';
  if (similarity >= 0.6) return 'text-yellow-600';
  return 'text-gray-600';
};

export const SemanticSearchResults: React.FC<SemanticSearchResultsProps> = ({
  results,
  onResultClick,
  className
}) => {
  if (results.length === 0) {
    return (
      <div className={cn('text-center text-gray-500 py-8', className)}>
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No results found. Try a different search query.</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {results.map((result) => (
        <Card 
          key={`${result.table_name}-${result.id}`}
          className={cn(
            'hover:shadow-md transition-shadow cursor-pointer',
            onResultClick && 'hover:bg-gray-50'
          )}
          onClick={() => onResultClick?.(result)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getTableColor(result.table_name)}>
                    {getTableIcon(result.table_name)}
                    <span className="ml-1">{getTableLabel(result.table_name)}</span>
                  </Badge>
                  <div className={cn(
                    'text-sm font-medium',
                    getSimilarityColor(result.similarity)
                  )}>
                    {Math.round(result.similarity * 100)}% match
                  </div>
                </div>

                {/* Title/Name */}
                <h3 className="font-medium text-gray-900">
                  {result.name || result.title || 'Untitled'}
                </h3>

                {/* Description/Content */}
                {(result.description || result.content || result.job_description) && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.description || result.content || result.job_description}
                  </p>
                )}

                {/* Additional Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {result.table_name === 'roles' && (
                    <>
                      {result.category && <span>Category: {result.category}</span>}
                      {result.employment_type && <span>Type: {result.employment_type}</span>}
                    </>
                  )}
                  {result.table_name === 'requirements' && (
                    <>
                      {result.status && <span>Status: {result.status}</span>}
                      {result.priority && <span>Priority: {result.priority}</span>}
                    </>
                  )}
                  {result.table_name === 'clients' && (
                    <>
                      {result.status && <span>Status: {result.status}</span>}
                      {result.client_tier && <span>Tier: {result.client_tier}</span>}
                    </>
                  )}
                  {result.table_name === 'skills' && (
                    <>
                      {result.category && <span>Category: {result.category}</span>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

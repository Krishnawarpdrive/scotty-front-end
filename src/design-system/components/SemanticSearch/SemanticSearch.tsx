
import React from 'react';
import { EnhancedSearchInterface } from '@/components/search/EnhancedSearchInterface';
import { SemanticSearchResult } from '@/hooks/useSemanticSearch';

export interface SemanticSearchProps {
  onResultSelect?: (result: SemanticSearchResult) => void;
  className?: string;
}

export const SemanticSearch: React.FC<SemanticSearchProps> = ({
  onResultSelect,
  className
}) => {
  return (
    <EnhancedSearchInterface
      onResultSelect={onResultSelect}
      className={className}
    />
  );
};

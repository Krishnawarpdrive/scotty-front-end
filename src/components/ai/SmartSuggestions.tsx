
import React, { useState, useEffect } from 'react';
import { Lightbulb, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSmartSuggestions } from '@/hooks/useSmartSuggestions';

interface SmartSuggestionsProps {
  context: 'client-creation' | 'role-creation' | 'requirement-creation';
  data?: any;
  onApplySuggestion?: (suggestion: any) => void;
  className?: string;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  context,
  data,
  onApplySuggestion,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { suggestions, isLoading, generateSuggestions } = useSmartSuggestions(context);

  useEffect(() => {
    if (data) {
      generateSuggestions(data);
    }
  }, [data, generateSuggestions]);

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <Card className={`border-blue-200 bg-blue-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">AI Suggestions</h3>
            <Badge variant="secondary" className="text-xs">
              {suggestions.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded border hover:border-blue-300 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {suggestion.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {suggestion.description}
                </p>
                {suggestion.confidence && (
                  <Badge
                    variant="outline"
                    className={`text-xs mt-1 ${
                      suggestion.confidence > 0.8 
                        ? 'border-green-500 text-green-700' 
                        : suggestion.confidence > 0.6
                        ? 'border-yellow-500 text-yellow-700'
                        : 'border-gray-500 text-gray-700'
                    }`}
                  >
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onApplySuggestion?.(suggestion)}
                className="ml-2"
              >
                Apply
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-2">
            <p className="text-xs text-gray-600">Generating suggestions...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

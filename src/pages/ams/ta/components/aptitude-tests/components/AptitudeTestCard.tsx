
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AptitudeTest } from '../types/AptitudeTestTypes';
import { Clock, Users, BookOpen, Edit, Trash2, Eye } from 'lucide-react';

interface AptitudeTestCardProps {
  test: AptitudeTest;
  onEdit: (test: AptitudeTest) => void;
  onDelete: (id: string) => void;
  onView: (test: AptitudeTest) => void;
}

export const AptitudeTestCard: React.FC<AptitudeTestCardProps> = ({
  test,
  onEdit,
  onDelete,
  onView
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {test.test_name}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                className={getDifficultyColor(test.difficulty_level)}
                variant="secondary"
              >
                {test.difficulty_level.toUpperCase()}
              </Badge>
              <Badge variant="outline">{test.category}</Badge>
              <Badge 
                variant={test.is_active ? "default" : "secondary"}
                className={test.is_active ? "bg-green-600" : ""}
              >
                {test.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {test.description || 'No description available'}
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{test.duration_minutes}m</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{test.total_questions} Qs</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{test.passing_score}%</span>
          </div>
        </div>

        {test.skills_assessed.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Skills Assessed:</p>
            <div className="flex flex-wrap gap-1">
              {test.skills_assessed.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {test.skills_assessed.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{test.skills_assessed.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(test)}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(test)}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(test.id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Archive, Mail, Download, UserMinus, Users, AlertTriangle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onAction: (action: string, options?: any) => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onAction,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Users className="h-3 w-3 mr-1" />
            {selectedCount} candidate{selectedCount > 1 ? 's' : ''} selected
          </Badge>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAction('email')}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAction('export')}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Select onValueChange={(value) => onAction('changeStatus', { status: value })}>
              <SelectTrigger className="w-40 h-8 border-blue-300 text-blue-700">
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Mark Active</SelectItem>
                <SelectItem value="on-hold">Put On Hold</SelectItem>
                <SelectItem value="rejected">Mark Rejected</SelectItem>
                <SelectItem value="withdrawn">Mark Withdrawn</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => onAction('assignTA', { ta: value })}>
              <SelectTrigger className="w-40 h-8 border-blue-300 text-blue-700">
                <SelectValue placeholder="Assign TA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="emma">Emma Davis</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction('archive')}
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction('delete')}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <UserMinus className="h-4 w-4 mr-2" />
            Remove
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearSelection}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear Selection
          </Button>
        </div>
      </div>
      
      <div className="mt-2 flex items-center gap-2 text-sm text-blue-700">
        <AlertTriangle className="h-4 w-4" />
        <span>Bulk actions will be applied to all selected candidates. This action cannot be undone.</span>
      </div>
    </div>
  );
};

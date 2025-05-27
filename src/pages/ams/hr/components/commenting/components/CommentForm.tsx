
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

interface CommentFormProps {
  newComment: string;
  isSubmitting: boolean;
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  isSubmitting,
  currentUser,
  onCommentChange,
  onSubmit
}) => {
  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="text-xs">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[80px]"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting || !newComment.trim()}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Comment
        </Button>
      </div>
    </div>
  );
};

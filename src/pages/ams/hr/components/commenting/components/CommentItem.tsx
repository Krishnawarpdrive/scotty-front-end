
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Pin, Reply, Heart, Send } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Comment } from '../types/CommentTypes';

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  allowReplies?: boolean;
  allowReactions?: boolean;
  maxDepth?: number;
  replyingTo: string | null;
  newComment: string;
  isSubmitting: boolean;
  setReplyingTo: (id: string | null) => void;
  setNewComment: (comment: string) => void;
  onReaction: (commentId: string, reactionType: 'like' | 'love' | 'celebrate') => void;
  onSubmitComment: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  allowReplies = true,
  allowReactions = true,
  maxDepth = 3,
  replyingTo,
  newComment,
  isSubmitting,
  setReplyingTo,
  setNewComment,
  onReaction,
  onSubmitComment
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-3 ${depth > 0 ? 'ml-8 pl-4 border-l-2 border-gray-100' : ''}`}
    >
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="text-xs">
            {comment.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <Badge variant="outline" className="text-xs">{comment.author.role}</Badge>
            {comment.isPinned && (
              <Pin className="h-3 w-3 text-blue-500" />
            )}
            {comment.isPrivate && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                Private
              </Badge>
            )}
            <span className="text-xs text-gray-500">
              {formatDistance(comment.createdAt, new Date(), { addSuffix: true })}
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            {allowReactions && (
              <div className="flex items-center gap-2">
                {comment.reactions.map(reaction => (
                  <button
                    key={reaction.type}
                    onClick={() => onReaction(comment.id, reaction.type)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors
                      ${reaction.userReacted ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  >
                    {reaction.type === 'like' && <Heart className="h-3 w-3" />}
                    {reaction.type === 'love' && '❤️'}
                    {reaction.type === 'celebrate' && '🎉'}
                    <span>{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
            
            {allowReplies && depth < maxDepth && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Reply className="h-3 w-3" />
                Reply
              </button>
            )}
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[60px] text-sm"
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={onSubmitComment}
                  disabled={isSubmitting || !newComment.trim()}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              depth={depth + 1}
              allowReplies={allowReplies}
              allowReactions={allowReactions}
              maxDepth={maxDepth}
              replyingTo={replyingTo}
              newComment={newComment}
              isSubmitting={isSubmitting}
              setReplyingTo={setReplyingTo}
              setNewComment={setNewComment}
              onReaction={onReaction}
              onSubmitComment={onSubmitComment}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

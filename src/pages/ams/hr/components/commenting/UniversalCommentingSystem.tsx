
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { CommentItem } from './components/CommentItem';
import { CommentForm } from './components/CommentForm';
import { useComments } from './hooks/useComments';
import { UniversalCommentingSystemProps } from './types/CommentTypes';

export const UniversalCommentingSystem: React.FC<UniversalCommentingSystemProps> = ({
  entityType,
  entityId,
  title = "Comments",
  allowReplies = true,
  allowReactions = true,
  allowPrivateComments = false,
  maxDepth = 3,
  className = ""
}) => {
  const [showComments, setShowComments] = useState(false);
  
  const {
    comments,
    newComment,
    setNewComment,
    replyingTo,
    setReplyingTo,
    isSubmitting,
    currentUser,
    handleSubmitComment,
    handleReaction
  } = useComments(entityType, entityId);

  const topLevelComments = comments.filter(c => !c.parentId);

  return (
    <Card className={className}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium">{title}</h3>
            <Badge variant="outline" className="text-xs">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Hide' : 'Show'}
          </Button>
        </div>
        
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* New Comment Form */}
              {!replyingTo && (
                <CommentForm
                  newComment={newComment}
                  isSubmitting={isSubmitting}
                  currentUser={currentUser}
                  onCommentChange={setNewComment}
                  onSubmit={handleSubmitComment}
                />
              )}
              
              {/* Comments List */}
              <div className="space-y-6">
                {topLevelComments.map(comment => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment}
                    allowReplies={allowReplies}
                    allowReactions={allowReactions}
                    maxDepth={maxDepth}
                    replyingTo={replyingTo}
                    newComment={newComment}
                    isSubmitting={isSubmitting}
                    setReplyingTo={setReplyingTo}
                    setNewComment={setNewComment}
                    onReaction={handleReaction}
                    onSubmitComment={handleSubmitComment}
                  />
                ))}
                
                {topLevelComments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

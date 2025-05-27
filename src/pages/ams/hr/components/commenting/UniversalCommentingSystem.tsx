
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Reply, Heart, MoreHorizontal, Pin } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
  entityType: string;
  entityId: string;
  reactions: {
    type: 'like' | 'love' | 'celebrate';
    count: number;
    userReacted: boolean;
  }[];
  isPinned?: boolean;
  isPrivate?: boolean;
  mentions?: string[];
  replies?: Comment[];
}

interface UniversalCommentingSystemProps {
  entityType: string;
  entityId: string;
  title?: string;
  allowReplies?: boolean;
  allowReactions?: boolean;
  allowPrivateComments?: boolean;
  maxDepth?: number;
  className?: string;
}

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Mock current user
  const currentUser = {
    id: 'current-user',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'TA Manager'
  };

  // Mock comments data
  useEffect(() => {
    // Simulate API call
    const mockComments: Comment[] = [
      {
        id: '1',
        content: 'This role looks great! The requirements are well-defined and the compensation is competitive.',
        author: {
          id: 'user-1',
          name: 'Mike Chen',
          email: 'mike.c@company.com',
          role: 'Senior TA'
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        entityType,
        entityId,
        reactions: [
          { type: 'like', count: 3, userReacted: false },
          { type: 'love', count: 1, userReacted: true }
        ],
        isPinned: true,
        replies: [
          {
            id: '2',
            content: 'I agree! Should we reach out to our existing candidate pool first?',
            author: {
              id: 'user-2',
              name: 'Emma Davis',
              email: 'emma.d@company.com',
              role: 'TA Specialist'
            },
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            entityType,
            entityId,
            parentId: '1',
            reactions: [
              { type: 'like', count: 2, userReacted: false }
            ]
          }
        ]
      },
      {
        id: '3',
        content: 'Quick question about the technical requirements - do we need React experience specifically or would Angular work too?',
        author: {
          id: 'user-3',
          name: 'Alex Thompson',
          email: 'alex.t@company.com',
          role: 'TA Coordinator'
        },
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        entityType,
        entityId,
        reactions: [
          { type: 'like', count: 1, userReacted: false }
        ],
        isPrivate: true
      }
    ];
    setComments(mockComments);
  }, [entityType, entityId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: currentUser,
      createdAt: new Date(),
      entityType,
      entityId,
      parentId: replyingTo || undefined,
      reactions: []
    };
    
    if (replyingTo) {
      // Add as reply
      setComments(prev => prev.map(c => 
        c.id === replyingTo 
          ? { ...c, replies: [...(c.replies || []), comment] }
          : c
      ));
    } else {
      // Add as top-level comment
      setComments(prev => [comment, ...prev]);
    }
    
    setNewComment('');
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const handleReaction = (commentId: string, reactionType: 'like' | 'love' | 'celebrate') => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const reactions = comment.reactions.map(r => 
          r.type === reactionType 
            ? { ...r, count: r.userReacted ? r.count - 1 : r.count + 1, userReacted: !r.userReacted }
            : r
        );
        return { ...comment, reactions };
      }
      return comment;
    }));
  };

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => (
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
                    onClick={() => handleReaction(comment.id, reaction.type)}
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
                  onClick={handleSubmitComment}
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
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );

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
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmitComment}
                      disabled={isSubmitting || !newComment.trim()}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Comment
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Comments List */}
              <div className="space-y-6">
                {topLevelComments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
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

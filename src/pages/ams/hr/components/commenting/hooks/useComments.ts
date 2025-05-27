
import { useState, useEffect } from 'react';
import { Comment } from '../types/CommentTypes';

export const useComments = (entityType: string, entityId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock current user
  const currentUser = {
    id: 'current-user',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'TA Manager'
  };

  // Mock comments data
  useEffect(() => {
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
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
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
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
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

  return {
    comments,
    newComment,
    setNewComment,
    replyingTo,
    setReplyingTo,
    isSubmitting,
    currentUser,
    handleSubmitComment,
    handleReaction
  };
};


export interface Comment {
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

export interface UniversalCommentingSystemProps {
  entityType: string;
  entityId: string;
  title?: string;
  allowReplies?: boolean;
  allowReactions?: boolean;
  allowPrivateComments?: boolean;
  maxDepth?: number;
  className?: string;
}

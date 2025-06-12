
import { motion } from 'framer-motion';
import { CheckCircle, Target, Star } from 'lucide-react';
import { useUnifiedToast } from '@/hooks/useUnifiedToast';

interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  value: number;
  target: number;
}

export const triggerGoalCompletionToast = (goal: Goal) => {
  const toast = useUnifiedToast();
  
  const getIcon = () => {
    switch (goal.type) {
      case 'daily': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'weekly': return <Target className="h-5 w-5 text-blue-500" />;
      case 'monthly': return <Star className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  toast.success({
    title: "Goal Completed! 🎉",
    description: `You've completed your ${goal.type} goal: "${goal.title}" (${goal.value}/${goal.target})`,
    duration: 5000,
    action: {
      label: "View Details",
      onClick: () => {
        console.log('Goal details:', goal);
        // Navigate to goals page or show goal details
      }
    }
  });
};

export const triggerMilestoneToast = (milestone: number, label: string) => {
  const toast = useUnifiedToast();

  toast.success({
    title: `${milestone}% Milestone! 🎯`,
    description: `Great progress on ${label}! Keep it up!`,
    duration: 4000
  });
};

// Export as utility functions for easy usage
export const useGoalToasts = () => {
  const toast = useUnifiedToast();

  return {
    goalCompleted: triggerGoalCompletionToast,
    milestone: triggerMilestoneToast,
    
    // Additional goal-related toasts
    goalCreated: (goalTitle: string) => {
      toast.success({
        title: "Goal Created!",
        description: `New goal "${goalTitle}" has been set up successfully.`
      });
    },
    
    goalUpdated: (goalTitle: string) => {
      toast.info({
        title: "Goal Updated",
        description: `Goal "${goalTitle}" has been updated.`
      });
    },
    
    goalDeleted: (goalTitle: string, onUndo?: () => void) => {
      toast.remove(goalTitle, onUndo);
    }
  };
};

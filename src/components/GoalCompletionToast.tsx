
import { motion } from 'framer-motion';
import { CheckCircle, Target, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  value: number;
  target: number;
}

export const triggerGoalCompletionToast = (goal: Goal) => {
  const getIcon = () => {
    switch (goal.type) {
      case 'daily': return CheckCircle;
      case 'weekly': return Target;
      case 'monthly': return Star;
      default: return CheckCircle;
    }
  };

  const Icon = getIcon();
  
  toast({
    title: (
      <motion.div 
        className="flex items-center gap-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="h-5 w-5 text-green-500" />
        </motion.div>
        Goal Completed! 🎉
      </motion.div>
    ) as any,
    description: (
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        You've completed your {goal.type} goal: "{goal.title}"
        <div className="mt-1 text-xs text-gray-500">
          {goal.value}/{goal.target} ✓
        </div>
      </motion.div>
    ) as any,
    duration: 3000,
  });
};

export const triggerMilestoneToast = (milestone: number, label: string) => {
  toast({
    title: (
      <motion.div 
        className="flex items-center gap-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          🎯
        </motion.div>
        {milestone}% Milestone!
      </motion.div>
    ) as any,
    description: (
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Great progress on {label}! Keep it up!
      </motion.div>
    ) as any,
    duration: 3000,
  });
};

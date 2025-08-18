import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface GoalCompletionToastProps {
  goalName: string;
}

export const GoalCompletionToast: React.FC<GoalCompletionToastProps> = ({ goalName }) => {
  useEffect(() => {
    toast({
      title: "Goal Completed!",
      description: `Congratulations! You've completed the goal: ${goalName}.`,
    });
  }, [goalName]);

  return null;
};


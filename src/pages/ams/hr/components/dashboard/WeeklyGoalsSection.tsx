
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from './ProgressBar';
import { motion } from 'framer-motion';
import { WeeklyGoalsDetailDrawer } from './WeeklyGoalsDetailDrawer';

interface WeeklyGoalsSectionProps {
  className?: string;
}

export const WeeklyGoalsSection: React.FC<WeeklyGoalsSectionProps> = ({ className }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleGoalClick = (goalType: string) => {
    setSelectedGoal(goalType);
    setDrawerOpen(true);
  };

  return (
    <>
      <motion.div 
        className={`mb-6 ${className || ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Weekly Goals</h2>
          <span className="text-sm text-gray-500 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            3 days remaining
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleGoalClick('interviews')}
          >
            <ProgressBar 
              value={18} 
              max={25} 
              label="Interviews Scheduled" 
              color="#4C51BF"
            />
            <p className="text-xs text-gray-500 mt-2">Click to see TA contributions</p>
          </Card>
          <Card 
            className="p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleGoalClick('roles')}
          >
            <ProgressBar 
              value={7} 
              max={10} 
              label="Roles Filled" 
              color="#38A169" 
            />
            <p className="text-xs text-gray-500 mt-2">Click to see details</p>
          </Card>
          <Card 
            className="p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleGoalClick('feedback')}
          >
            <ProgressBar 
              value={15} 
              max={20} 
              label="Candidate Feedback" 
              color="#D69E2E" 
            />
            <p className="text-xs text-gray-500 mt-2">Click to see details</p>
          </Card>
        </div>
      </motion.div>

      <WeeklyGoalsDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        goalType={selectedGoal}
      />
    </>
  );
};


import React from 'react';
import { ProgressBar } from './ProgressBar';
import { motion } from 'framer-motion';

export const WeeklyGoalsSection: React.FC = () => {
  return (
    <motion.div 
      className="mb-6"
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
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <ProgressBar 
            value={18} 
            max={25} 
            label="Interviews Scheduled" 
            color="#4C51BF"
          />
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <ProgressBar 
            value={7} 
            max={10} 
            label="Roles Filled" 
            color="#38A169" 
          />
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <ProgressBar 
            value={15} 
            max={20} 
            label="Candidate Feedback" 
            color="#D69E2E" 
          />
        </div>
      </div>
    </motion.div>
  );
};

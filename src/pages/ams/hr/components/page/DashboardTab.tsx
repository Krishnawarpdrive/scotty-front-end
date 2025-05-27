
import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedMetrics } from '../animations/AnimatedMetrics';
import { UniversalCommentingSystem } from '../commenting/UniversalCommentingSystem';
import { InteractiveCardContainer } from '../animations/InteractiveCardContainer';

interface DashboardTabProps {
  mockMetrics: any[];
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ mockMetrics }) => {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <AnimatedMetrics 
        metrics={mockMetrics}
        title="Today's Performance"
        animationStagger={150}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UniversalCommentingSystem
          entityType="dashboard"
          entityId="main-dashboard"
          title="Dashboard Updates"
          allowReplies={true}
          allowReactions={true}
        />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Create Role', 'Add Client', 'New Requirement', 'Team Analytics'].map((action, index) => (
              <InteractiveCardContainer key={action} hoverEffect="scale">
                <div className="p-4 bg-white rounded-lg border cursor-pointer text-center">
                  <p className="font-medium">{action}</p>
                </div>
              </InteractiveCardContainer>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

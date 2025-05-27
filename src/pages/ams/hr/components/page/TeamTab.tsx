
import React from 'react';
import { motion } from 'framer-motion';
import { TAAssignmentCard } from '../TAAssignmentCard';
import { InteractiveCardContainer } from '../animations/InteractiveCardContainer';
import TasTabContent from '../TasTabContent';
import { tasData } from '../../mockData';

interface TeamTabProps {
  mockTAs: any[];
  handleRowClick: (item: any) => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({ mockTAs, handleRowClick }) => {
  return (
    <motion.div
      key="tas"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">TA Assignment Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mockTAs.map((ta, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <InteractiveCardContainer 
                hoverEffect="lift"
                onCardClick={() => console.log(`Clicked TA: ${ta.name}`)}
              >
                <TAAssignmentCard ta={ta} />
              </InteractiveCardContainer>
            </motion.div>
          ))}
        </div>
      </div>
      
      <TasTabContent 
        tasData={tasData}
        handleRowClick={handleRowClick}
      />
    </motion.div>
  );
};

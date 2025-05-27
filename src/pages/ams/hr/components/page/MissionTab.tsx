
import React from 'react';
import { motion } from 'framer-motion';
import { TAMissionControl } from '../gamification/TAMissionControl';

interface MissionTabProps {
  mockTAs: any[];
}

export const MissionTab: React.FC<MissionTabProps> = ({ mockTAs }) => {
  return (
    <motion.div
      key="mission"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTAs.slice(0, 2).map((ta, index) => (
          <motion.div
            key={ta.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TAMissionControl
              ta={ta}
              onMissionClick={(mission) => console.log('Mission clicked:', mission)}
              onAchievementClick={(achievement) => console.log('Achievement clicked:', achievement)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

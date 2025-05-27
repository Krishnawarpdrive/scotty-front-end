
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StreakCelebrationProps {
  streakCount: number;
  milestone?: boolean;
  onComplete?: () => void;
}

export const StreakCelebration: React.FC<StreakCelebrationProps> = ({
  streakCount,
  milestone = false,
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (streakCount > 0) {
      setIsVisible(true);
      setShowParticles(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [streakCount, onComplete]);

  const getStreakMessage = () => {
    if (milestone) return `🎉 ${streakCount} Day Milestone!`;
    if (streakCount >= 30) return `🔥 ${streakCount} Day Fire Streak!`;
    if (streakCount >= 7) return `⚡ ${streakCount} Days Strong!`;
    return `✨ ${streakCount} Day Streak!`;
  };

  const particles = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
      initial={{ 
        x: 0, 
        y: 0, 
        scale: 0,
        opacity: 1 
      }}
      animate={{
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        scale: [0, 1, 0],
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: 2,
        delay: i * 0.1,
        ease: "easeOut"
      }}
    />
  ));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15 
            }}
          >
            <Card className="p-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-2xl">
              <div className="text-center space-y-2">
                <motion.div
                  className="text-4xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {milestone ? <Trophy className="h-12 w-12 mx-auto" /> : <Zap className="h-12 w-12 mx-auto" />}
                </motion.div>
                <h3 className="text-xl font-bold">{getStreakMessage()}</h3>
                <p className="text-sm opacity-90">Keep up the amazing work!</p>
              </div>
            </Card>
            
            {showParticles && (
              <div className="absolute inset-0 pointer-events-none">
                {particles}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

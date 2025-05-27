
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardContainerProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'scale' | 'glow';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export const InteractiveCardContainer: React.FC<InteractiveCardContainerProps> = ({
  children,
  hoverEffect = 'lift',
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'lift':
        return { y: -2, scale: 1.02 };
      case 'scale':
        return { scale: 1.05 };
      case 'glow':
        return { boxShadow: '0 0 20px rgba(0, 153, 51, 0.3)' };
      default:
        return { y: -2, scale: 1.02 };
    }
  };

  return (
    <motion.div
      className={className}
      whileHover={getHoverAnimation()}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};

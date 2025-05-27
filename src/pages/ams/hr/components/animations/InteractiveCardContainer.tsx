
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface InteractiveCardContainerProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt';
  clickEffect?: boolean;
  onCardClick?: () => void;
}

export const InteractiveCardContainer: React.FC<InteractiveCardContainerProps> = ({
  children,
  className = '',
  hoverEffect = 'lift',
  clickEffect = true,
  onCardClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          hover: { 
            y: -8, 
            transition: { duration: 0.2 } 
          }
        };
      case 'glow':
        return {
          hover: { 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(59, 130, 246, 0.5)',
            transition: { duration: 0.2 }
          }
        };
      case 'scale':
        return {
          hover: { 
            scale: 1.03,
            transition: { duration: 0.2 }
          }
        };
      case 'tilt':
        return {
          hover: { 
            rotateX: rotateX,
            rotateY: rotateY,
            transition: { duration: 0.1 }
          }
        };
      default:
        return {};
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect !== 'tilt') return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 3);
    y.set((event.clientY - centerY) / 3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverEffect === 'tilt') {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      variants={getHoverVariants()}
      initial="initial"
      whileHover="hover"
      whileTap={clickEffect ? { scale: 0.98 } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onCardClick}
      style={hoverEffect === 'tilt' ? { 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      } : {}}
    >
      <Card className={`transition-all duration-200 ${isHovered ? 'shadow-lg' : 'shadow-sm'}`}>
        {children}
      </Card>
    </motion.div>
  );
};

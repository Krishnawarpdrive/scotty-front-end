
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgressBar } from "./AnimatedProgressBar";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  total: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  actionText?: string;
  onAction?: () => void;
}

const InteractiveCardContainer: React.FC<{
  children: React.ReactNode;
  hoverEffect?: 'lift';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ children, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  current,
  total,
  trend,
  trendValue,
  actionText,
  onAction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const progress = (current / total) * 100;
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
    }
  };

  return (
    <InteractiveCardContainer 
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full border-2 transition-all duration-300 hover:border-[#009933]/30 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {icon}
              <span className="font-medium">{title}</span>
            </div>
            <Badge variant="outline" className={`${getTrendColor()} border-current`}>
              {getTrendIcon()} {trendValue > 0 ? '+' : ''}{trendValue}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-end justify-between">
            <motion.div 
              className="text-2xl font-bold text-gray-900"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {current}
            </motion.div>
            <div className="text-sm text-gray-500">/ {total}</div>
          </div>
          
          <div className="space-y-2">
            <AnimatedProgressBar
              value={current}
              max={total}
              showValue={false}
              animationDelay={0}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress: {Math.round(progress)}%</span>
              <span>{total - current} remaining</span>
            </div>
          </div>

          <AnimatePresence>
            {actionText && onAction && (current < total) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onAction}
                  className="w-full bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  size="sm"
                >
                  <motion.span
                    animate={{ x: isHovered ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {actionText}
                  </motion.span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center py-2"
            >
              <Badge className="bg-green-100 text-green-800 border-green-200">
                ✅ Completed!
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </InteractiveCardContainer>
  );
};

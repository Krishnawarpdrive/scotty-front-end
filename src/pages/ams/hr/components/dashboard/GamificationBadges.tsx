
import React from 'react';
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface Badge {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  unlocked: boolean;
}

export const GamificationBadges: React.FC = () => {
  const badges: Badge[] = [
    {
      icon: Trophy,
      title: "Top Performer",
      description: "Highest efficiency score this month",
      color: "text-amber-500",
      unlocked: true
    },
    {
      icon: Star,
      title: "Speed Champion",
      description: "Fastest average time to hire",
      color: "text-blue-500",
      unlocked: true
    },
    {
      icon: Award,
      title: "Quality Master",
      description: "Best candidate satisfaction scores",
      color: "text-purple-500",
      unlocked: false
    },
    {
      icon: Target,
      title: "Goal Crusher",
      description: "Exceeded quarterly targets",
      color: "text-emerald-500",
      unlocked: true
    }
  ];

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-3">Your Achievements</h3>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {badges.map((badge, index) => (
          <BadgeItem key={index} badge={badge} index={index} />
        ))}
      </div>
    </Card>
  );
};

const BadgeItem: React.FC<{ badge: Badge; index: number }> = ({ badge, index }) => {
  const { icon: Icon, title, description, color, unlocked } = badge;
  
  return (
    <motion.div
      className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg ${
        unlocked ? "bg-white border shadow-sm" : "bg-gray-100 opacity-50"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={unlocked ? { y: -5 } : {}}
    >
      <div className={`p-2 rounded-full ${unlocked ? "bg-gray-50" : "bg-gray-200"}`}>
        <Icon className={`h-6 w-6 ${unlocked ? color : "text-gray-400"}`} />
      </div>
      <h4 className="font-medium text-sm mt-2 text-center">{title}</h4>
      <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
      {!unlocked && (
        <span className="text-xs mt-2 text-gray-400">Locked</span>
      )}
    </motion.div>
  );
};


import React, { useState } from "react";
import { motion } from "framer-motion";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";
import { EnhancedTargetItem } from "./EnhancedTargetItem";

export const EnhancedTodaysTargetsCard: React.FC = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  const targets = [
    { label: "Calls", current: 13, total: 15, showButton: true, buttonMessage: "Just 2 Calls Away" },
    { label: "Profile Reviewed", current: 20, total: 20 },
    { label: "Interviews Scheduled", current: 14, total: 25 }
  ];

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-white border min-w-[350px] min-h-[250px] flex-grow flex-shrink rounded-xl pt-[11px] pb-[19px] px-3.5 border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full flex-col items-stretch">
        <motion.div 
          className="flex items-center gap-1 text-black font-medium"
          animate={{ scale: isCardHovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="text-lg self-stretch my-auto"
            animate={{ rotate: isCardHovered ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            🗓️
          </motion.div>
          <div className="text-sm self-stretch my-auto">
            Today's Targets
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {targets.map((target, index) => (
            <motion.div
              key={target.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <EnhancedTargetItem 
                {...target}
                onAction={() => console.log(`Taking action for ${target.label}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </InteractiveCardContainer>
  );
};

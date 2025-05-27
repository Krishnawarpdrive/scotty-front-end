
import React from "react";
import { motion } from "framer-motion";

interface FunnelHeaderProps {
  isCardHovered: boolean;
}

export const FunnelHeader: React.FC<FunnelHeaderProps> = ({ isCardHovered }) => {
  return (
    <motion.div 
      className="self-stretch flex items-center gap-1.5 my-auto"
      animate={{ scale: isCardHovered ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="self-stretch flex items-center gap-1 text-black font-medium my-auto">
        <motion.div 
          className="text-lg self-stretch my-auto"
          animate={{ rotate: isCardHovered ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          🗓️
        </motion.div>
        <div className="text-sm self-stretch my-auto">Hiring Funnel</div>
      </div>
      
      <div className="self-stretch flex items-center gap-1 my-auto">
        {[
          "bg-[rgba(184,218,174,1)]", 
          "bg-[rgba(170,180,213,1)]", 
          "bg-[rgba(218,215,174,1)]"
        ].map((color, index) => (
          <motion.div 
            key={index}
            className="self-stretch flex items-center gap-px justify-center my-auto"
            whileHover={{ scale: 1.2, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${color} self-stretch flex min-h-[9px] w-[9px] h-[9px] my-auto rounded-[50%]`} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

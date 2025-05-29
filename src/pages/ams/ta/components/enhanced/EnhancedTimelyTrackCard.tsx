
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";

export const EnhancedTimelyTrackCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("4 Apr");
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border min-w-60 min-h-[198px] overflow-hidden grow shrink w-[244px] pt-[11px] pb-0.5 px-1 rounded-lg border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full items-center gap-[40px_42px] justify-space-between">
        <motion.div 
          className="self-stretch flex items-center gap-1.5 my-auto"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="self-stretch flex items-center gap-1 text-black font-medium my-auto">
            <motion.div 
              className="text-lg self-stretch my-auto"
              animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              🗓️
            </motion.div>
            <div className="text-sm mx-auto">Timely Track</div>
          </div>
          
          <div className="self-stretch flex items-center gap-1 my-auto">
            <motion.div 
              className="self-stretch flex items-center gap-px justify-center my-auto"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-[rgba(184,218,174,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-green-500 rounded-sm ml-1" />
            </motion.div>
            <motion.div 
              className="self-stretch flex items-center gap-px justify-center my-auto"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-[rgba(170,180,213,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-blue-500 rounded-sm ml-1" />
            </motion.div>
            <motion.div 
              className="self-stretch flex items-center gap-px justify-center my-auto"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-[rgba(218,215,174,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-yellow-500 rounded-sm ml-1" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.button 
          className="bg-[rgba(248,252,249,1)] self-stretch flex items-center gap-0.5 text-xs text-slate-900 font-normal my-auto px-2 py-1 rounded-md transition-all duration-200"
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "rgba(0,153,51,0.1)",
            color: "#009933" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Date picker functionality would go here
          }}
        >
          <motion.div 
            className="self-stretch my-auto"
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedDate}
          </motion.div>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className="h-3 w-3" />
          </motion.div>
        </motion.button>
      </div>
      
      <motion.div 
        className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded flex items-center justify-center h-32 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="text-gray-500 text-sm relative z-10"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Time tracking chart would go here
        </motion.div>
        
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 20% 30%, rgba(0,153,51,0.1) 0%, transparent 50%)",
          }}
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 30%, rgba(0,153,51,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(0,153,51,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(0,153,51,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </InteractiveCardContainer>
  );
};

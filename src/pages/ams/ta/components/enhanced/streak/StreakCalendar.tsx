
import React from "react";
import { motion } from "framer-motion";

export const StreakCalendar: React.FC = () => {
  const days = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, "01", "02", "03", "04"];

  const getRowData = (rowIndex: number) => {
    const rowData = Array(24).fill(null).map((_, index) => {
      let bgColor = "bg-[rgba(214,236,171,1)]";
      
      if (rowIndex === 0) {
        // Row 1 - Calls
        if (index === 1 || index === 7) bgColor = "bg-[rgba(236,236,171,1)]";
        else if (index === 6) bgColor = "bg-[rgba(236,193,171,1)]";
      } else if (rowIndex === 1) {
        // Row 2 - Profiles
        if (index === 1 || index === 7) bgColor = "bg-[rgba(236,236,171,1)]";
        else if (index === 6) bgColor = "bg-[rgba(236,214,171,1)]";
      } else if (rowIndex === 2) {
        // Row 3 - Interviews
        if (index === 1) bgColor = "bg-[rgba(236,236,171,1)]";
      }
      
      return bgColor;
    });
    
    return rowData;
  };

  const rowIcons = [
    { color: "bg-green-500", label: "Calls" },
    { color: "bg-blue-500", label: "Profiles" },
    { color: "bg-yellow-500", label: "Interviews" }
  ];

  return (
    <motion.div 
      className="flex w-full flex-col mt-2 py-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="self-stretch gap-[40px_50px] text-[10px] text-[rgba(121,126,133,1)] font-normal whitespace-nowrap px-[35px] max-md:px-5">
        Mar
      </div>
      
      <div className="flex items-center gap-0.5 text-[10px] text-gray-600 font-normal whitespace-nowrap">
        {days.map((day, index) => (
          <motion.div 
            key={index} 
            className="self-stretch w-3 my-auto"
            whileHover={{ scale: 1.2, color: "#009933" }}
            transition={{ duration: 0.2 }}
          >
            {day}
          </motion.div>
        ))}
      </div>
      
      <div className="w-full">
        {rowIcons.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full items-center gap-0.5 justify-center">
            <motion.div 
              className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto"
              whileHover={{ scale: 1.1 }}
            >
              <div className={`w-3 h-3 ${row.color} rounded-sm`} />
            </motion.div>
            {getRowData(rowIndex).map((bgColor, index) => (
              <motion.div 
                key={`row${rowIndex + 1}-${index}`} 
                className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm cursor-pointer`}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 10
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};


import React, { useState } from "react";

interface StageProps {
  label: string;
  count: string | number;
}

const Stage: React.FC<StageProps> = ({ label, count }) => {
  return (
    <div className="flex flex-col items-center justify-center py-2.5">
      <div className="self-stretch bg-[rgba(244,244,244,0)] gap-2.5 text-base font-medium whitespace-nowrap text-center px-[7px] rounded-[60px]">
        {count}
      </div>
      <div className="text-[13px] font-normal mt-1">
        {label}
      </div>
    </div>
  );
};

export const ApplicationStages: React.FC = () => {
  const [activeStage, setActiveStage] = useState("Open Applications");
  
  const stages = [
    { label: "Open Applications", count: 54 },
    { label: "Phone Screening", count: 10 },
    { label: "Hygiene Screening", count: 12 },
    { label: "Aptitude Test", count: 22 },
    { label: "Briefing Call", count: 14 },
    { label: "Internal Interview", count: "24/7" },
    { label: "Client interviews", count: 74 },
    { label: "Partner Interviews", count: "12/4" },
    { label: "Offered", count: 18 },
    { label: "Hired", count: 54 },
    { label: "Denied", count: 74 }
  ];
  
  return (
    <div className="bg-white relative w-full text-[rgba(102,102,102,1)] border border-gray-200 rounded-md max-md:max-w-full">
      <div className="bg-white z-0 flex-nowrap overflow-x-auto whitespace-nowrap px-[19px] gap-[35px] w-full flex items-center">
        {stages.map((stage, index) => (
          <div 
            key={index}
            className={`cursor-pointer hover:text-[rgba(0,153,51,1)] ${activeStage === stage.label ? "text-[rgba(0,153,51,1)]" : ""}`}
            onClick={() => setActiveStage(stage.label)}
          >
            <Stage label={stage.label} count={stage.count} />
          </div>
        ))}
      </div>
      <div 
        className="bg-[rgba(0,153,51,1)] absolute z-0 flex min-h-[3px] w-[109px] max-w-full h-[3px] left-[23px] bottom-px transition-all duration-300"
        style={{
          left: activeStage === "Open Applications" ? "23px" : 
                activeStage === "Phone Screening" ? "140px" : 
                activeStage === "Hygiene Screening" ? "260px" : 
                activeStage === "Aptitude Test" ? "380px" : 
                activeStage === "Briefing Call" ? "500px" : 
                activeStage === "Internal Interview" ? "620px" : 
                activeStage === "Client interviews" ? "740px" : 
                activeStage === "Partner Interviews" ? "860px" : 
                activeStage === "Offered" ? "980px" : 
                activeStage === "Hired" ? "1100px" : "1220px"
        }}
      />
    </div>
  );
};

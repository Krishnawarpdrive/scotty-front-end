
import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface FunnelStageProps {
  name: string;
  status: "On Track" | "Delayed";
  current: number;
  target: number;
  trend: "up" | "down";
}

const FunnelStage: React.FC<FunnelStageProps> = ({ name, status, current, target, trend }) => {
  const isDelayed = status === "Delayed";
  const statusBgColor = isDelayed 
    ? "bg-[rgba(255,45,61,0.4)]" 
    : name === "Interviewing" 
      ? "bg-[rgba(249,249,230,1)]" 
      : "bg-[rgba(243,249,230,1)]";
  
  const statusBorderColor = isDelayed 
    ? "border-[rgba(255,45,61,0)]" 
    : name === "Interviewing" 
      ? "border-[rgba(227,227,130,0.3)]" 
      : "border-[rgba(194,227,130,0.3)]";
  
  const statusTextColor = isDelayed ? "text-white" : "text-gray-600";
  
  const trendColor = trend === "up" ? "text-[rgba(0,153,51,1)]" : "text-[rgba(249,102,111,1)]";
  
  const bgColor = name === "Interviewing" 
    ? "bg-[rgba(236,236,171,0.1)]" 
    : name === "Hired" 
      ? "bg-[rgba(236,193,171,0.1)]" 
      : "bg-[rgba(214,236,171,0.1)]";

  return (
    <div className={`${bgColor} flex items-center gap-[40px_49px] justify-between mt-1.5 px-1.5 py-[5px] rounded-[3px] first:mt-0`}>
      <div className="self-stretch flex items-center gap-[5px] font-normal my-auto">
        <div className="text-black text-[13px] self-stretch my-auto">
          {name}
        </div>
        <div className={`self-stretch ${statusBgColor} border gap-2.5 text-[11px] ${statusTextColor} my-auto px-1.5 py-[3px] rounded-[20px] ${statusBorderColor} border-solid`}>
          {status}
        </div>
      </div>
      <div className="self-stretch flex items-center gap-[7px] whitespace-nowrap my-auto">
        <div className="text-gray-600 text-[13px] font-medium self-stretch my-auto">
          {current}
        </div>
        <div className={`self-stretch flex items-center text-[11px] ${trendColor} font-normal my-auto`}>
          <div className="self-stretch my-auto">
            {target}
          </div>
          {trend === "up" ? (
            <TrendingUp className="w-2.5 h-2.5 ml-1" />
          ) : (
            <TrendingDown className="w-2.5 h-2.5 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export const HiringFunnelCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("D");
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };
  
  return (
    <div className="border self-stretch flex min-w-60 flex-col items-stretch justify-center grow shrink w-[206px] px-[5px] py-[7px] rounded-lg border-[rgba(246,246,246,1)] border-solid">
      <div className="w-full">
        <div className="flex min-h-[22px] w-full items-center justify-between">
          <div className="self-stretch flex items-center gap-1.5 my-auto">
            <div className="self-stretch flex items-center gap-1 text-black font-medium my-auto">
              <div className="text-lg self-stretch my-auto">
                🗓️{" "}
              </div>
              <div className="text-sm self-stretch my-auto">
                Hiring Funnel
              </div>
            </div>
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch flex items-center gap-px justify-center my-auto">
                <div className="bg-[rgba(184,218,174,1)] self-stretch flex min-h-[9px] w-[9px] h-[9px] my-auto rounded-[50%]" />
              </div>
              <div className="self-stretch flex items-center gap-px justify-center my-auto">
                <div className="bg-[rgba(170,180,213,1)] self-stretch flex min-h-[9px] w-[9px] h-[9px] my-auto rounded-[50%]" />
              </div>
              <div className="self-stretch flex items-center gap-px justify-center my-auto">
                <div className="bg-[rgba(218,215,174,1)] self-stretch flex min-h-[9px] w-[9px] h-[9px] my-auto rounded-[50%]" />
              </div>
            </div>
          </div>
          <div className="bg-white border self-stretch flex items-center overflow-hidden text-xs text-slate-900 font-normal whitespace-nowrap w-[108px] my-auto rounded-sm border-[rgba(247,247,247,1)] border-solid">
            {["D", "W", "M", "Y"].map((option) => (
              <button
                key={option}
                className={`self-stretch ${timeframe === option ? "bg-[rgba(219,240,227,1)]" : ""} text-slate-900 flex-1 shrink basis-[0%] my-auto py-1 ${option !== "Y" ? "border-[rgba(240,240,240,1)] border-r" : ""} hover:bg-gray-100`}
                onClick={() => handleTimeframeChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-stretch text-center mt-[19px]">
          <FunnelStage 
            name="Open" 
            status="On Track" 
            current={23} 
            target={56} 
            trend="up" 
          />
          <FunnelStage 
            name="Interviewing" 
            status="On Track" 
            current={16} 
            target={25} 
            trend="up" 
          />
          <FunnelStage 
            name="Offers" 
            status="On Track" 
            current={2} 
            target={12} 
            trend="up" 
          />
          <FunnelStage 
            name="Hired" 
            status="Delayed" 
            current={1} 
            target={5} 
            trend="down" 
          />
        </div>
      </div>
    </div>
  );
};

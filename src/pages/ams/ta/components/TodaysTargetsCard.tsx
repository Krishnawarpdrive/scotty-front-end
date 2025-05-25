
import React from "react";

interface TargetItemProps {
  label: string;
  current: number;
  total: number;
  showButton?: boolean;
  buttonText?: string;
  buttonMessage?: string;
}

const TargetItem: React.FC<TargetItemProps> = ({ 
  label, 
  current, 
  total, 
  showButton = false, 
  buttonText = "Take", 
  buttonMessage = "" 
}) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full mt-3 first:mt-0">
      <div className="flex w-full items-center gap-[40px_100px] text-[11px] font-medium text-center justify-between">
        <div className="text-[rgba(2,8,23,1)] self-stretch my-auto">
          {label}
        </div>
        <div className="text-black self-stretch my-auto">
          {current}/{total}
        </div>
      </div>
      <div className="w-full mt-[5px]">
        <div className="bg-[rgba(0,0,0,0.1)] flex flex-col rounded-[10px] max-md:pr-5">
          <div 
            className="flex shrink-0 h-1.5 rounded-[10px] bg-[rgba(0,153,51,1)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {showButton && (
        <div className="flex items-center gap-[5px] font-medium text-center mt-[9px]">
          <div className="text-[rgba(102,102,102,1)] text-[11px] self-stretch my-auto">
            {buttonMessage}
          </div>
          <button className="bg-[rgba(0,153,51,1)] hover:bg-[rgba(0,133,41,1)] self-stretch flex min-h-[22px] flex-col overflow-hidden items-stretch text-[13px] text-white whitespace-nowrap tracking-[0.1px] leading-loose justify-center w-[59px] my-auto rounded-md">
            <div className="leading-[20px)]">
              {buttonText}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export const TodaysTargetsCard: React.FC = () => {
  return (
    <div className="bg-white border min-w-60 min-h-[198px] grow shrink w-72 pt-[11px] pb-[19px] px-3.5 rounded-xl border-[rgba(246,246,246,1)] border-solid">
      <div className="flex w-full max-w-[312px] flex-col items-stretch">
        <div className="flex items-center gap-1 text-black font-medium">
          <div className="text-lg self-stretch my-auto">
            🗓️{" "}
          </div>
          <div className="text-sm self-stretch my-auto">
            Today's Targets
          </div>
        </div>
        <div className="w-full mt-5">
          <TargetItem 
            label="Calls" 
            current={13} 
            total={15} 
            showButton={true} 
            buttonMessage="Just 2 Calls Away" 
          />
          <TargetItem 
            label="Profile Reviewed" 
            current={20} 
            total={20} 
          />
          <TargetItem 
            label="Interviews Schduled" 
            current={14} 
            total={25} 
          />
        </div>
      </div>
    </div>
  );
};

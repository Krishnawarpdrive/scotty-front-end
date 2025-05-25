
import React, { useState } from "react";
import { Calendar } from "lucide-react";

export const TimelyTrackCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("4 Apr");
  
  return (
    <div className="bg-white border min-w-60 min-h-[198px] overflow-hidden grow shrink w-[244px] pt-[11px] pb-0.5 px-1 rounded-lg border-[rgba(246,246,246,1)] border-solid">
      <div className="flex w-full items-center gap-[40px_42px] justify-space-between">
        <div className="self-stretch flex items-center gap-1.5 my-auto">
          <div className="self-stretch flex items-center gap-1 text-black font-medium my-auto">
            <div className="text-lg self-stretch my-auto">
              🗓️{" "}
            </div>
            <div className="text-sm mx-auto">
              Timely Track
            </div>
          </div>
          <div className="self-stretch flex items-center gap-1 my-auto">
            <div className="self-stretch flex items-center gap-px justify-center my-auto">
              <div className="bg-[rgba(184,218,174,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-green-500 rounded-sm ml-1" />
            </div>
            <div className="self-stretch flex items-center gap-px justify-center my-auto">
              <div className="bg-[rgba(170,180,213,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-blue-500 rounded-sm ml-1" />
            </div>
            <div className="self-stretch flex items-center gap-px justify-center my-auto">
              <div className="bg-[rgba(218,215,174,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto rounded-[50%]" />
              <div className="w-3 h-3 bg-yellow-500 rounded-sm ml-1" />
            </div>
          </div>
        </div>
        <button className="bg-[rgba(248,252,249,1)] hover:bg-gray-100 self-stretch flex items-center gap-0.5 text-xs text-slate-900 font-normal my-auto px-2 py-1 rounded-md" onClick={() => {
          // Date picker functionality would go here
        }}>
          <div className="self-stretch my-auto">
            {selectedDate}
          </div>
          <Calendar className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded flex items-center justify-center h-32">
        <div className="text-gray-500 text-sm">Time tracking chart would go here</div>
      </div>
    </div>
  );
};
